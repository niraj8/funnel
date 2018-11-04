const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const http = require("http")
const enforce = require("express-sslify")
const helmet = require("helmet")
const db = require("./src/db.js")
const morgan = require("morgan")
const uuid = require("uuid/v4")
const crypto = require("crypto")

const app = express()

const expiresIn = 7 * 24 * 60 * 60 * 1000 // 7 days
// Enforce traffic on ssl
// heroku reverse proxies set the x-forwarded-proto header flag
if (process.env.NODE_ENV === "production") {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
} else {
	// app.use(morgan('combined'));
}

app.use(helmet())
// app.use(bodyParser.json())
app.use(express.static(__dirname + '/ui/public'))
app.set('port', (process.env.PORT || 3001))

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// bcrypt.hash(pw, 10, (err, hash) => {})

// APIs
var hash = ""
var token = ""
app.post('/v1/token', jsonParser, (req, res) => {
	hash = crypto.createHash("md5").update(req.body.password).digest("hex")
	db.any("SELECT * FROM users WHERE id=$1 and hash=$2", [req.body.username, hash])
	.then(d => {
		if (d.length === 0) {
			res.status(401)
			res.json({error: "Invalid Credentials"})
		} else {
			token = uuid()
			// todo: the token creation timestamp should be seperate
			return db.tx(t => {
				var q1 = t.none(`UPDATE users SET _modified=NOW() WHERE id=$1`, [req.body.username])
				var q2 = t.one("UPDATE users SET token=$1 WHERE id=$2 RETURNING *", [token, req.body.username])

				return t.batch([q1, q2])
			})
			.then(d => res.json({token: d[1].token, expiry: new Date(d[1]._modified).getTime() + expiresIn}))
			.catch(err => console.log('Error', error))
		}
	})
	.catch(err => {
		res.status(500)
		res.json({error: "Something went wrong"})
		console.log("Error", err)
	})
	
})

var checkToken = (req, res, next) => {
	var token = req.headers['authorization']

	if (!token) {
		res.status(403)
		res.json({error: "Token missing"})
	} else {
		db.one("SELECT * FROM users WHERE token=$1", [token.slice(7)])
		.then(d => {
			if (d.length === 0) {
				res.status(403)
				res.json({error: 'Invalid token'})
			} else next()
		}).catch(err => {
			res.status(500)
			res.json({error: 'Something went wrong'})
			console.log("Error",err)
		})
	}
}

// Loading checkToken after the registering the /token endpoint
// https://expressjs.com/en/guide/writing-middleware.html
app.use(checkToken)

app.get('/v1/leads', cors(), (req, res) => {
	db.any("SELECT * FROM leads where visible=true")
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.get('/v1/leads/:id', cors(), (req, res) => {
	db.one("SELECT * FROM leads WHERE id = $1", [req.params.id])
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.post('/v1/leads', jsonParser, cors(), (req, res) => {
	db.one('INSERT INTO leads(data) VALUES($1) RETURNING *', [req.body])
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.put('/v1/leads/:id', urlencodedParser, cors(), (req, res) => {
	var updatedData = {}
	updatedData[req.body.name] = req.body.value

	db.tx(t => {
		var q1 = t.none(`UPDATE leads SET _modified=NOW() WHERE id=$1`, [req.params.id])
		var q2 = t.one(`UPDATE leads SET data = data::jsonb || '${JSON.stringify(updatedData)}' WHERE id=${req.params.id} RETURNING *`)
		return t.batch([q1, q2])
	}).then(d => {
		res.json(d[1])
	})
	.catch(err => {
		res.status(500)
		res.json({error: "Something went wrong"})
		console.log("Error", err)
	})
})

app.delete('/v1/leads/:id', cors(), (req, res) => {
	db.one(`UPDATE leads SET visible=false WHERE id=${req.params.id} RETURNING visible`)
	.then(d => res.json(d))
	.catch(err => console.log('ERROR: ', err))
})

http.createServer(app).listen(app.get('port'), function() {
	console.log(`Server up: http(s)://localhost:${app.get('port')}`)
});

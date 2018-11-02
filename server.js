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

// APIs
var hash = ""
var token = ""
app.post('/v1/token', jsonParser, (req, res) => {
	hash = crypto.createHash("md5").update(req.body.password).digest("hex")
	console.log(hash)
	console.log(req.body)
	db.any("SELECT * FROM users WHERE id=$1 and hash=$2", [req.body.username, hash])
	.then(d => {
		console.log(d)
		if (d.length === 0) {
			res.status(401)
			res.json({error: "Invalid Credentials"})
			res.end()
		} else {
			token = uuid()
			return db.one("UPDATE users SET token=$1 WHERE id=$2 RETURNING *", [token, req.body.username])
			.then(d => res.json({token: d.token, expiry: new Date(d._created).getTime() + expiresIn}))
		}
	})
	.catch(err => {
		res.status(500)
		res.json({error: "Something went wrong"})
	})
	
})

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

	db.one(`UPDATE leads SET data = data::jsonb || '${JSON.stringify(updatedData)}' WHERE id=${req.params.id} RETURNING data`)
	.then(d => res.json(d))
	.catch(err => console.log('ERROR: ', err))
})

app.delete('/v1/leads/:id', cors(), (req, res) => {
	db.one(`UPDATE leads SET visible=false WHERE id=${req.params.id} RETURNING visible`)
	.then(d => res.json(d))
	.catch(err => console.log('ERROR: ', err))
})

http.createServer(app).listen(app.get('port'), function() {
	console.log(`Server up: http(s)://localhost:${app.get('port')}`)
});

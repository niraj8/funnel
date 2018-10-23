const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const http = require("http")
const enforce = require("express-sslify")
const helmet = require("helmet")
const session = require("express-session")
const db = require("./src/db.js")
const sessionStore = require("connect-pg-simple")(session)
const morgan = require('morgan')

const app = express()

// Enforce traffic on ssl
// heroku reverse proxies set the x-forwarded-proto header flag
if (process.env.NODE_ENV === "production") {
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
	app.set('trust proxy', 1) // trust first proxy
	session.cookie.secure = true // serve secure cookies
} else {
	app.use(morgan('combined'));
}

app.use(session({
	store: new sessionStore(),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 30*24*60*60*1000} // 30 days
}))

app.use(helmet())
// app.use(bodyParser.json())
app.use(express.static(__dirname + '/ui/public'))
app.set('port', (process.env.PORT || 3001))

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.get('/login', (req, res) => {

// })

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
	console.log(`Server up: https://localhost:${app.get('port')}`)
});

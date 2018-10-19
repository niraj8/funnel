const express = require("express")
const bodyParser = require("body-parser")
const db = require("./src/db.js")
const cors = require("cors")
const path = require("path")

const app = express()

var corsOptions = {
	// origin: 'https://abc.herokuapp.com',
}

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(bodyParser.json())
app.use(express.static(__dirname + '/ui/public'))

app.get('/v1/leads', cors(), (req, res) => {
	db.any("SELECT * FROM leads")
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.get('/v1/leads/:id', cors(), (req, res) => {
	db.one("SELECT * FROM leads WHERE id = $1", [req.params.id])
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.post('/v1/leads', jsonParser, cors(), (req, res) => {
	db.one('INSERT INTO leads(data) VALUES($1) RETURNING id', [req.body])
	.then(d => res.json({id: d.id}))
	.catch(error => {
        console.log('ERROR:', error); // print error;
    });
})

app.put('/v1/leads/:id', urlencodedParser, cors(), (req, res) => {
	var updatedData = {}
	updatedData[req.body.name] = req.body.value
	
	db.one(`UPDATE leads SET data = data::jsonb || '${JSON.stringify(updatedData)}' WHERE id=${req.params.id} RETURNING data`)
	.then(d => res.json(d))
	.catch(err => console.log('ERROR: ', err))
})

// app.delete('/v1/leads', cors(corsOptions), (req, res) => {

// })

app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
	console.log(`Server up: https://localhost:${app.get('port')}`)
})
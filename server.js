const express = require("express")
const bodyParser = require("body-parser")
const db = require("./src/db.js")
const cors = require("cors")

const app = express()

var corsOptions = {
	// origin: 'https://abc.herokuapp.com',
}

var dataColumns = [
	"crm_id",
	"received_date",
	"isu",
	"customer_name",
	"customer_brief",
	"country",
	"geography",
	"presales_lead",
	"account_contact",
	"bd_involved",
	"tech_involved"
]

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('Hello world')
})

app.get('/v1/leads', cors(corsOptions), (req, res) => {
	db.any("SELECT * FROM leads")
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.get('/v1/leads/:id', cors(corsOptions), (req, res) => {
	db.one("SELECT * FROM leads WHERE id = $1", [req.params.id])
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.post('/v1/leads', cors(corsOptions), (req, res) => {
	db.one('INSERT INTO leads(data) VALUES($1) RETURNING id', [req.body])
	.then(d => res.json({id: d.id}))
	.catch(error => {
        console.log('ERROR:', error); // print error;
    });
})

// app.put('/v1/leads/:id', cors(corsOptions), (req, res) => {
	
// 	db.one(`UPDATE leads SET ${} WHERE id=${req.params.id}`)
// })

// app.delete('/v1/leads', cors(corsOptions), (req, res) => {

// })

app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
	console.log(`Server up: https://localhost:${app.get('port')}`)
})
const express = require("express")
const db = require("./src/db.js")
const cors = require("cors")

const app = express()

var corsOptions = {
	// origin: 'https://abc.herokuapp.com',
}

app.get('/v1/leads', cors(corsOptions), (req, res) => {
	db.any("SELECT * from leads")
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.get('/v1/leads/:id', cors(corsOptions), (req, res) => {
	db.one("SELECT * from leads WHERE id = $1", [req.params.id])
	.then(d => res.json(d))
	.catch(err => console.log('ERROR:', err))
})

app.post('/v1/leads', cors(corsOptions), (req, res) => {
	db.one('INSERT INTO leads(_crm_id, customer_name, isu) VALUES($1, $2) RETURNING id', ['xyz', 'SolarCity', 'RE'])
    .then(d => res.json(d.id))
    .catch(error => {
        console.log('ERROR:', error); // print error;
    });
})

// app.put('/v1/leads', cors(corsOptions), (req, res) => {

// })

// app.delete('/v1/leads', cors(corsOptions), (req, res) => {

// })

app.set('port', (process.env.PORT || 3001))

app.listen(app.get('port'), () => {
	console.log(`Server up: https://localhost:${app.get('port')}`)
})
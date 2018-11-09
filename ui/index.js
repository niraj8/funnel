var m = require('mithril')

var Layout = require('./views/Layout')
var Login = require('./views/Login')
var LeadList = require('./views/LeadList')
var LeadForm = require('./views/LeadForm')
var Auth = require('./models/Auth')

m.route(document.body, "/login", {
	"/login": {
		onmatch: function() {
			if (localStorage.getItem("auth-token") && localStorage.getItem("auth-expiry") > new Date().getTime()) 
				m.route.set("/list")
		},
		render: function() {
			return m(Layout, m(Login))
		}
	},
	"/list": {
		onmatch: function() {
			if (!localStorage.getItem("auth-token") && localStorage.getItem("auth-expiry") < new Date().getTime())
				m.route.set("/login")
		},
		render: function() {
			return m(Layout, m(LeadForm), m(LeadList))
		}
	}
})

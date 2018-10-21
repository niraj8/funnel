var m = require('mithril')

var Layout = require('./views/Layout')
var Login = require('./views/Login')
var LeadList = require('./views/LeadList')
var LeadForm = require('./views/LeadForm')

m.route(document.body, "/login", {
	"/login": {
		render: function() {
			return m(Login)
		}
	},
	"/list": {
		render: function() {
			return m(Layout, m(LeadList))
		}
	},
	"/lead/new": {
		render: function() {
			return m(Layout, m(LeadForm))
		}
	},
	// todo
	// :id is a route parameter
	"/edit/:id": {
		render: function(vnode) {
			return m(Layout, m(LeadForm, vnode.attrs))
		}
	}
})

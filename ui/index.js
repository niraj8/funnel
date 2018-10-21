var m = require('mithril')

var Layout = require('./views/Layout')
var Login = require('./views/Login')
var LeadList = require('./views/LeadList')
var LeadForm = require('./views/LeadForm')

m.route(document.body, "/list", {
	"/login": {
		render: function() {
			return m(Login)
		}
	},
	"/list": {
		render: function() {
			return m(Layout, m(LeadForm, m(LeadList)))
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

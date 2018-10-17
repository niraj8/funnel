var m = require('mithril')

var Layout = require('./views/Layout')
var LeadList = require('./views/LeadList')

m.route(document.body, "/list", {
	"/list": {
		render: function() {
			return m(Layout, m(LeadList))
		}
	},
	// :id is a route parameter
	"/edit/:id": {
		render: function(vnode) {
			return m(Layout, m(UserForm, vnode.attrs))
		}
	}
})

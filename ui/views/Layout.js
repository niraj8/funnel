var m = require('mithril')
var Globals = require('../models/Globals')

module.exports = {
	view: (vnode) => {
		var nav = m('nav.nav-pills.nav-fill',
			m("a.nav-item[href='/list']#nav-title", {oncreate: m.route.link}, "✅Funnel"))
		
		var flashError = m('p.text-center', {class: Globals.flash.class}, Globals.flash.message)
		return m(".container-fluid", nav, flashError, vnode.children)
	}
}
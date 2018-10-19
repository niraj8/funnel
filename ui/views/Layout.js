var m = require('mithril')

module.exports = {
	view: function(vnode) {
		var nav = m('nav.nav-pills.nav-fill',
			m("a.nav-item[href='/list']#nav-title", {oncreate: m.route.link}, "✅Funnel"))
		
		return m(".container-fluid", nav, vnode.children)
	}
}
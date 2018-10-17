var m = require('mithril')

module.exports = {
	view: function(vnode) {
		return m("main.layout", [
			m("nav.menu", [
				m("a[href='/list']", {oncreate: m.route.link}, "Funnel")
			]),
			m(".container-fluid", vnode.children)
		])
	}
}
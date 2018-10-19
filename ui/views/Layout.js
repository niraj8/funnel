var m = require('mithril')

module.exports = {
	view: function(vnode) {
		var nav = m('nav.nav-pills.nav-fill', [
			m("a.nav-item[href='/list']#nav-title", {oncreate: m.route.link}, "Funnel"),
			m("button.btn.btn-primary.nav-item.float-right#edit-toggle", "Enable editing")
		])
		
		return m(".container-fluid", nav, vnode.children)
	}
}
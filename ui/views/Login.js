var m = require('mithril')
var Auth = require('../models/Auth')

module.exports = {
	view: function(vnode) {
		var userLabel = m("span.input-group-text.sr-only", {for:'username'}, 'username')
		var userInput = m("input.form-control[type=text]", {
			id: 'username',
			oninput: m.withAttr("value", Auth.setUsername),
			placeholder: 'Username',
			required: true
		})
		var passLabel = m("span.input-group-text.sr-only", {for:'password'}, 'password')
		var passInput = m("input.form-control[type=password]", {
			id: 'password',
			oninput: m.withAttr("value", Auth.setPassword),
			placeholder: 'Password',
			required: true
		})

		var userGroup = m('.input-group', m('.input-group-prepend', userLabel), userInput)
		var passGroup = m('.input-group', m('.input-group-prepend', passLabel), passInput)
		return m("form.form-login.container", {
			onsubmit: function(e) {
				e.preventDefault()
				Auth.login()
			}
		}, [m('h3.mb-3.text-center', 'Sign in'), userGroup, passGroup, m("button.btn.btn-lg.btn-block.btn-primary[type=submit]", "Login")])
	}
}
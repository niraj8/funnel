// src/views/UserForm.js
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")

// todo: fix lead edit form
module.exports = {
	oninit: function(vnode) {Lead.load(vnode.attrs.id)},
	view: function() {
		return m("form", {
			onsubmit: function(e) {
				e.preventDefault()
				Lead.save()
			}
		}, [
		m("label.label", "First name"),
		m("input.input[type=text][placeholder=First name]", {
			oninput: m.withAttr("value", function(value) {User.current.firstName = value}),
			value: User.current.firstName
		}),
		m("label.label", "Last name"),
		m("input.input[placeholder=Last name]", {
			oninput: m.withAttr("value", function(value) {User.current.lastName = value}),
			value: User.current.lastName
		}),
		m("button.button[type=submit]", "Save"),
		])
	}
}
// src/views/UserForm.js
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedKeys = Object.keys(dataColumns)

// todo: fix lead edit form
module.exports = {
	oninit: function(vnode) {Lead.load(vnode.attrs.id)},
	view: function() {

		var inputs = []
		orderedKeys.forEach(k => {
			var label = m("label.label", dataColumns[k])
			var input = m("input.input[type=text]", {
				oninput: m.withAttr("value", function(value) {Lead.current[k] = value}),
				value: Lead.current[k]
			})
			inputs.push(label)
			inputs.push(input)
		})
		return m("form", {
			onsubmit: function(e) {
				e.preventDefault()
				Lead.save()
			}
		}, [inputs, m("button.button[type=submit]", "Save")])
	}
}
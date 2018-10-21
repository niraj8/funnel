// src/views/UserForm.js
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedKeys = Object.keys(dataColumns)

// todo: fix lead edit form
module.exports = {
	// oninit: function(vnode) {Lead.load(vnode.attrs.id)},
	view: function() {

		var inputs = []
		orderedKeys.forEach(k => {
			var label = m("span.input-group-text", dataColumns[k].value)
			var inputElement = dataColumns[k].inputType === 'textarea' ? 'textarea':'input'
			var input = m(`${inputElement}.form-control`, {
				id: k,
				oninput: m.withAttr("value", function(value) {Lead.current[k] = value})
			})
			inputs.push(m('div.col-md-4 mb-3', label, input))
			// inputs.push(input)
		})

		var formRows = []
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 1)))
		formRows.push(m('div.row', inputs.splice(0, 1)))
			
		
		return m("form", {
			onsubmit: function(e) {
				e.preventDefault()
				Lead.new()
			}
		}, [formRows, m("button.btn.btn-primary[type=submit]", "Save")])
	}
}
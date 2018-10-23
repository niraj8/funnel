// src/views/UserForm.js
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedKeys = Object.keys(dataColumns)

// todo: fix lead edit form
module.exports = {
	// oninit: function(vnode) {Lead.load(vnode.attrs.id)},
	view: function(vnode) {

		var inputs = []
		orderedKeys.forEach(k => {
			var label = m("span.input-group-text.col-form-label", {for:k}, dataColumns[k].value)
			var inputElement = dataColumns[k].inputType === 'textarea' ? 'textarea':'input'
			var input = m(`${inputElement}.form-control`, {
				id: k,
				oninput: m.withAttr("value", function(value) {Lead.current[k] = value}),
				placeholder: dataColumns[k].placeholder
			})
			inputs.push(m('div.col-md-4 mb-2', label, input))
			// inputs.push(input)
		})

		var formRows = []
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 3)))
		formRows.push(m('div.row', inputs.splice(0, 3)))

		var collapseBtn = m("button.btn.btn-primary", {"data-toggle":"collapse", "data-target": "#new-lead"}, 'New Lead')
		
		var form = m("form#new-lead.collapse.container", {
			onsubmit: function(e) {
				e.preventDefault()
				Lead.new()
			}
		}, [formRows, m("button.btn.btn-primary[type=submit]", "Save")])

		return m('div', collapseBtn, form, vnode.children)
	}
}
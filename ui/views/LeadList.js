// Components is just an object with a 'view' method
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedCols = Object.keys(dataColumns)

module.exports = {
	oninit: Lead.loadList,
	view: function() {

		var thead = m('thead', m('tr', m('th', {scope: 'col'}, 'id'), orderedCols.map(k => {
			if (dataColumns.hasOwnProperty(k)) {
				return m('th', {id: k, scope: 'col'}, dataColumns[k])
			}
		})))

		var tbody = m('tbody', Lead.list.map(lead => {
			return m('tr', m('th', {id: lead.id, scope: 'row'}, lead.id), orderedCols.map(k => {
				return m('td', m('a', {class: 'editable', href: "#", id: k, "data-url":`/v1/leads/${lead.id}`, "data-type":"text", "data-pk":lead.id, "data-title":`Enter ${dataColumns[k]}`}, lead.data[k]))
			}))
		}))

		// var delEl = m('a', {href:"#", id:"username", "data-type":"text", "data-pk":"1", "data-url":"/post", "data-title":"Enter username"}, 'superuser')
		return m('.table', thead, tbody)
	}
}
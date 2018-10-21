// Components is just an object with a 'view' method
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedCols = Object.keys(dataColumns)

module.exports = {
	oninit: Lead.loadList,
	view: function() {

		var thead = m('thead.thead-light', m('tr', m('th', {scope: 'col'}, 'id'), orderedCols.map(k => {
			if (dataColumns.hasOwnProperty(k)) {
				return m('th', {id: k, scope: 'col'}, dataColumns[k].value)
			}
		})))

		var tbody = m('tbody', Lead.list.map(lead => {
			return m('tr', m('th', {id: lead.id, scope: 'row'}, lead.id), orderedCols.map(k => {
				return m('td', m('a', {class: 'editable', id: k, "data-url":`/v1/leads/${lead.id}`, "data-type":"text", "data-pk":lead.id, "data-title":`Enter ${dataColumns[k].value}`}, lead.data[k]))
			}))
		}))

		var editBtn = m("button.btn.btn-primary.nav-item.float-right#edit-toggle", "Toggle editing")

		var newRow = m("a[href='/lead/new'].btn.btn-primary#add-new-lead", {oncreate: m.route.link}, "Add new lead")
		var table = m(".table.table-striped.table-responsive.table-sm.table-bordered", thead, tbody)

		if (Lead.list.length === 0)
			return m('div', editBtn, m("h4", "No Leads found."), newRow)
		else return m('div', editBtn, table, newRow)

	}
}
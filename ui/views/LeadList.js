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
				return m('th', {id: k, scope: 'col'}, dataColumns[k])
			}
		})))

		var tbody = m('tbody', Lead.list.map(lead => {
			return m('tr', m('th', {id: lead.id, scope: 'row'}, lead.id), orderedCols.map(k => {
				return m('td', m('a', {class: 'editable', id: k, "data-url":`/v1/leads/${lead.id}`, "data-type":"text", "data-pk":lead.id, "data-title":`Enter ${dataColumns[k]}`}, lead.data[k]))
			}))
		}))

		var table = m('.table.table-striped.table-responsive.table-sm.table-bordered', thead, tbody)

		return table
	}
}
// Components is just an object with a 'view' method
var m = require("mithril")
var Lead = require("../models/Lead")
const {dataColumns} = require("../../config.js")
const orderedCols = Object.keys(dataColumns)

// todo: Use mithril to sort the table
function sorts(list) {
    return {
        onclick: function(e) {
            var prop = e.target.getAttribute("data-sort-by")
            if (prop) {
                var first = list[0]
                list.sort(function(a, b) {
                    return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0
                })
                if (first === list[0]) list.reverse()
            }
        }
    }
}

module.exports = {
	oninit: Lead.loadList,
	oncreate: () => {
		$.ajaxSetup({
			headers: {'Authorization': `Bearer ${localStorage.getItem("auth-token")}`}
		})
		$('.editable').editable()
	},
	onupdate: () => {
		$.ajaxSetup({
			headers: {'Authorization': `Bearer ${localStorage.getItem("auth-token")}`}
		})
		$('.editable').editable()
	},
	view: function() {

		var thead = m('thead.thead-light', m('tr', m('th[data-sort-by=id]', {scope: 'col'}, 'id'), orderedCols.map(k => {
			if (dataColumns.hasOwnProperty(k)) {
				return m(`th[data-sort-by=${k}]`, {id: k, scope: 'col'}, dataColumns[k].value)
			}
		})))

		var tbody = m('tbody#table-body', Lead.list.map(lead => {
			return m(`tr#lead-${lead.id}`, m('th', {href: lead.id, id: lead.id, scope: 'row'}, lead.id), orderedCols.map(k => {
				return m('td', m('a', {class: 'editable', id: k, "data-url":`/v1/leads/${lead.id}`, "data-type":"text", "data-pk":lead.id, "data-title":`Enter ${dataColumns[k].value}`}, lead.data[k]))
			}))
		}))

		var editBtn = m("button.btn.btn-info.nav-item.float-right#edit-toggle", "Toggle editing")

		var searchInput = m("input[type=text]", {id:"search-input", class:"form-control", onkeyup:"searchTable()", placeholder:"Search"})
		var searchGroup = m(".input-group#search-group", searchInput)

		// var newRow = m("a[href='/lead/new'].btn.btn-primary#add-new-lead", {oncreate: m.route.link}, "Add new lead")
		var table = m(".table.table-striped.table-responsive.table-sm.table-bordered", thead, tbody)

		// if (Lead.list.length === 0)
		// 	return m('div', m("h4", "No Data found."))
		// else 
		return m('div', searchGroup, table)

	}
}
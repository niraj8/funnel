var m = require('mithril')
var Auth = require('./Auth')

var Lead = {
	list: [],
	loadList: () => {
		return m.request({
			method: "GET",
			url: "/v1/leads",
			headers:  {'Authorization': `Bearer ${Auth.token()}`}
		})
		.then((result) => {
			// todo: fix sort on id 
			result = result.sort((a,b) => a.id > b.id)
			Lead.list = result
		})
	},
	current: {},
	load: (id) => {
		return m.request({
			method: "GET",
			url: "/v1/leads/" + id,
			headers: {'Authorization': `Bearer ${Auth.token()}`}
		})
		.then((result) => {
			Lead.current = result
		})
	},
	// save: () => {
	// 	return m.request({
	// 		method: "PUT",
	// 		url: "/v1/leads/" + Lead.current.id,
	// 		data: Lead.current,
	//		headers: {'Authorization': `Bearer ${Auth.token()}`}
	// 	})
	// },
	new: () => {
		return m.request({
			method: "POST",
			url: "/v1/leads",
			data: Lead.current,
			headers: {'Authorization': `Bearer ${Auth.token()}`}
		}).then(d => {
			Lead.list.push(d)
			Lead.current = d
		})
	}
}

module.exports = Lead

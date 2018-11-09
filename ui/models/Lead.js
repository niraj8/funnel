var m = require('mithril')
var Auth = require('./Auth')

var Lead = {
	list: [],
	current: {},
	loadList: () => {
		return m.request({
			method: "GET",
			url: "/v1/leads",
			headers:  {'Authorization': `Bearer ${Auth.token()}`}
		})
		.then((result) => {
			// todo: fix sort on id 
			// result = result.sort((a,b) => a.id > b.id)
			Lead.list = result
		})
		.catch(err => {
			if (err.error === 'Invalid token') Auth.redirectToLogin()
			else console.log(err)
		})
	},
	load: (id) => {
		return m.request({
			method: "GET",
			url: "/v1/leads/" + id,
			headers: {'Authorization': `Bearer ${Auth.token()}`}
		})
		.then((result) => {
			Lead.current = result
		})
		.catch(err => {
			if (err.error === 'Invalid token') Auth.redirectToLogin()
			else console.log(err)
		})
	},
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
		.catch(err => {
			if (err.error === 'Invalid token') Auth.redirectToLogin()
			else console.log(err)
		})
	},
	// save: () => {
	// 	return m.request({
	// 		method: "PUT",
	// 		url: "/v1/leads/" + Lead.current.id,
	// 		data: Lead.current,
	//		headers: {'Authorization': `Bearer ${Auth.token()}`}
	// 	})
	// }
}

module.exports = Lead

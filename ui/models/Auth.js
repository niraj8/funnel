const m = require("mithril")

var Auth = {
	username: "",
	password: "",
	login: () => {
		return m.request({
			method: 'POST',
			url: "/v1/token",
			data: {username: Auth.username, password: Auth.password}
		}).then(d => {
			Auth.username = ""
			Auth.password = ""
			localStorage.setItem("auth-token", d.token)
			localStorage.setItem("auth-expiry", d.expiry)
			console.log(d)
			m.route.set("/list")
		})
	},
	clear: () => {
		// clear token from localStorage
		localStorage.clear()
	},
	setUsername: (value) => {
		Auth.username = value
	},
	setPassword: (value) => {
		Auth.password = value
	}
}

module.exports = Auth
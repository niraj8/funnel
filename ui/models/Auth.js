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
			console.log(Auth.username)
			console.log(Auth.password)
			Auth.credentials = {}
			localStorage.setItem("auth-token", d.token)
			localStorage.setItem("auth-expiry", d.expiry)
			m.route.set("/list")
		})
	},
	clear: () => {
		// clear token from localStorage
	},
	setUsername: (value) => {
		Auth.username = value
	},
	setPassword: (value) => {
		Auth.password = value
	}
}

module.exports = Auth
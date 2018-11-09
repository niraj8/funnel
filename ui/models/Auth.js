const m = require("mithril")

var Auth = {
	username: "",
	password: "",
	errorMessage: "",
	login: () => {
		return m.request({
			method: 'POST',
			url: "/v1/token",
			data: {username: Auth.username, password: Auth.password}
		}).then(d => {
			Auth.username = ""
			Auth.password = ""
			localStorage.setItem("auth-token", d.token || "")
			localStorage.setItem("auth-expiry", d.expiry || "")
			m.route.set("/list")
		}).catch(err => {
			if (err.error === "Invalid token") {
				m.route.set("/login")
				localStorage.clear()
			}
			Auth.errorMessage = err.error
		})
	},
	setUsername: (value) => { 
		Auth.username = value
		Auth.errorMessage = ""
	},
	setPassword: (value) => { 
		Auth.password = value
		Auth.errorMessage = ""
	},
	token: function() {
        var token = localStorage.getItem("auth-token")
        var expiry = localStorage.getItem("auth-expiry")
        if (!token || !expiry || expiry <= new Date().getTime()) {
			// clear token from localStorage
            // localStorage.clear()
            m.route.set('/login')
            Auth.errorMessage = "Session expired. Please login again"
        }
        else return token
    },
	redirectToLogin: () => {
		localStorage.clear()
		m.route.set('/login')
	}
}

module.exports = Auth

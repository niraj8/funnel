var m = require('mithril')

var Lead = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "/v1/leads",
            // withCredentials: true
        })
        .then(function(result) {
            Lead.list = result
        })
    },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "/v1/leads/" + id,
            withCredentials: true
        })
        .then(function(result) {
            Lead.current = result
        })
    },
    save: function() {
    	return m.request({
    		method: "PUT",
    		// url: "/v1/leads/" + Lead.current.id,
    		data: Lead.current,
    		// withCredentials: true
    	})
    }
}

module.exports = Lead

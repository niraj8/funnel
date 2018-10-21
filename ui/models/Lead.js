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
    },
    new: function() {
        return m.request({
            method: "POST",
            url: "/v1/leads",
            data: Lead.current
        }).then(d => {
            Lead.list.unshift(d)
        })
    }
}

module.exports = Lead

var dataColumns = {
	crm_id: {
		value: "CRM ID",
		inputType: "text"
	},
	received_date: {
		value: "Received date",
		inputType: "date",
		placeholder: 'Format: DD-MM-YYYY'
	},
	isu: {
		value: "ISU",
		inputType: "text"
	},
	account_contact: {
		value: "Account Contact" ,
		inputType: "text"
	},
	presales_lead: {
		value: "Presales Lead",
		inputType: "text"
	},
	bd_involved: {
		value: "BD Involved",
		inputType: "text"
	},
	customer_name: {
		value: "Customer name",
		inputType: "text"
	},
	country: {
		value: "Country",
		inputType: "dropdown"
	},
	geography: {
		value: "Geography",
		inputType: "dropdown"
	},
	customer_brief: {
		value: "Customer Brief",
		inputType: "textarea"
	},
	tech_involved: {
		value: "Technology Involved",
		inputType: "text"
	}
}

module.exports = {
	dataColumns: dataColumns
}
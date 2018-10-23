$(function(){

	// combodate
	$("input#received_date").addClass("combodate")
	$("input#received_date").attr("data-format", "DD-MM-YYYY")
	$("input#received_date").attr("data-template", "DD MMM YYYY")

	// $('.combodate').combodate({maxYear:new Date().getFullYear()})
	
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.showbuttons = false;
	$.fn.editable.defaults.ajaxOptions = {type: "PUT", dataType: 'json'};

	var editToggle = $('#edit-toggle')
	editToggle.click((e) => $('.editable').editable('toggleDisabled'));
});


$(function(){

	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.showbuttons = false;
	$.fn.editable.defaults.ajaxOptions = {type: "PUT", dataType: 'json'};

	var editToggle = $('#edit-toggle')
	editToggle.click((e) => $('.editable').editable('toggleDisabled'));
});


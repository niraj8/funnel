$(document).ready(function() {
	console.log("Run $('.editable').editable() to make it editable")
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.ajaxOptions = {type: "PUT"};
	$('.editable').editable()
});
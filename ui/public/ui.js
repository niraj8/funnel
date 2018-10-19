$(document).ready(function() {
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.showbuttons = false;
	$.fn.editable.defaults.ajaxOptions = {type: "PUT", dataType: 'json'};

	var editOn = false
	var editToggle = $('#edit-toggle')
	editToggle.click(function(e) {
		$('.editable').editable('toggleDisabled')
		if (!editOn) {
			// $('.editable').editable({showbuttons: false})
			editToggle.text('Enable editing')
			editOn = true
		} else {
			editToggle.text('Disable editing')
			editOn = false
		}
	});
});
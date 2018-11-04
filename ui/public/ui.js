$(document).ready(function(){
	$.ajaxSetup({
		headers: {
			'Authorization': `Bearer ${localStorage.getItem("auth-token")}`
		}
	})
	
	$.fn.editable.defaults.mode = 'inline';
	$.fn.editable.defaults.showbuttons = false;
	$.fn.editable.defaults.ajaxOptions = {type: "PUT", dataType: 'json'};

	var editToggle = $('#edit-toggle')
	editToggle.click((e) => $('.editable').editable('toggleDisabled'));
	
	$("#search-input").on("keyup", function() {
		var value = $(this).val().toLowerCase();
	    $("#table-body tr").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	});
});


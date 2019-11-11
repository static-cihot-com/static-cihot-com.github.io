$.get(
	'project/xml/userconsol.xml',
	null,
	function(data){

		$('#menu').html(data);
	},
	'text'
);


$('#repartition-link').on('click', function() {
	if (!$(this).hasClass('active')) {
		$('#container').empty();
	 	$('#container').load('./templates/repartition.html');
	 	$(this).siblings().removeClass('active');
	 	$(this).addClass('active');
	}
});

$('#map-link').on('click', function() {
	if (!$(this).hasClass('active')) {
		$('#container').empty();
	 	$('#container').load('./templates/map.html');
	 	$(this).siblings().removeClass('active');
	 	$(this).addClass('active');
	}
});

$('#geolocalisation-link').on('click', function() {
	if (!$(this).hasClass('active')) {
		$('#container').empty();
	 	$('#container').load('./templates/geolocalisation.html');
	 	$(this).siblings().removeClass('active');
	 	$(this).addClass('active');
	}
});
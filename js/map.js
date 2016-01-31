var mapContainer;

$(function() {
	if (hotspotList.length !== 0) {
		initMap();
	}
});

function initMap() {
	mapContainer = L.map('map').setView([48.856578, 2.351828], 12);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
		{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(mapContainer);
	initMarkerHotspotWifiInMap();
};

function initMarkerHotspotWifiInMap() {
	var markers = L.markerClusterGroup();
	var circles = L.markerClusterGroup();

  	for (var i = 0; i < hotspotList.length; i++) {
		x = hotspotList[i].geometry.coordinates[1];
		y = hotspotList[i].geometry.coordinates[0];

		var blueMarker = L.AwesomeMarkers.icon({
			icon: 'wifi',
			markerColor: 'darkblue',
			prefix: 'fa'
		});

  		var marker = L.marker([x, y], {icon: blueMarker})
  				.bindPopup('<p><b>Nom du site : </b>' + hotspotList[i].fields.nom_site 
				+ '<br /><b>Adresse : </b>' + hotspotList[i].fields.adresse
				+ '<br /><b>Code du site : </b>' + hotspotList[i].fields.code_site + '</p>');;

        var circle = L.circle([x, y], 150, {
		    color: 'transparent',
		    fillColor: '#237CC9',
		    fillOpacity: 0.3
		});
		circles.addLayer(circle);
        markers.addLayer(marker);
    }

    mapContainer.addLayer(circles);
    mapContainer.addLayer(markers);
};

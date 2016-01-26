var geoMapContainer;

$(function() {
	setTimeout(initGeolocalisationMap, 0);
});

function initGeolocalisationMap() {
	geoMapContainer = L.map('geolocalisation-map').setView([48.856578, 2.351828], 12);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
		{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(geoMapContainer);

	locateUser();
};

function locateUser() {
	var userLat, userLon;
 	geoMapContainer.locate()
 		.on('locationfound', function(e){
 			var userLat = e.latitude,
 			userLon = e.longitude;
            var marker = L.marker([userLat, userLon]).bindPopup('Your are here :)');
            geoMapContainer.setView([userLat, userLon], 15);
            geoMapContainer.addLayer(marker);
            var hwCloser = findHotspotCloser(userLat, userLon);
            console.log('hwCloser', hwCloser)
            setHotspotWifiCloser(hwCloser);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
};

function findHotspotCloser(locateLat, locateLon) {
	var distanceList = [];
	for (var i = 0; i < hotspotList.length; i++) {
		distanceList[i] = {};
		distanceList[i]['hotspotData'] = {
			'nom_site': hotspotList[i].fields.nom_site,
			'addresse': hotspotList[i].fields.adresse,
			'code_site': hotspotList[i].fields.code_site,
			'latitude': hotspotList[i].geometry.coordinates[1],
			'longitude': hotspotList[i].geometry.coordinates[0]
		};
		distanceList[i]['distance'] = L.latLng(locateLat, locateLon).distanceTo(L.latLng(hotspotList[i].geometry.coordinates[1], hotspotList[i].geometry.coordinates[0]));
	}
	distanceList.sort(sortByDistance);
	return distanceList.slice(0, 5);
};

function sortByDistance(a, b) {
	var distanceA = parseInt(a['distance']);
	var distanceB = parseInt(b['distance']);

	return distanceA - distanceB;
};

function setHotspotWifiCloser(hotspotList) {
	for (var i = 0; i < hotspotList.length; i++) {
		var marker = L.marker([hotspotList[i].hotspotData.latitude, hotspotList[i].hotspotData.longitude]);
		geoMapContainer.addLayer(marker);
	}
};
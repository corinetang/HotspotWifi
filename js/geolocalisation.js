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
 			userLat = e.latitude;
 			userLon = e.longitude;
            var marker = L.marker([userLat, userLon]).bindPopup('Your are here :)');
            geoMapContainer.setView([userLat, userLon], 15);
            geoMapContainer.addLayer(marker);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        });
    findHotspotCloser(userLat, userLon);
};

function findHotspotCloser(locateLat, locateLon) {
	var distanceList = [];
	for (var i = 0; i < hotspotList.length; i++) {
		distanceList[i] = {};
		distanceList[i]['hotspotData'] = {
			'nom_site': hotspotList[i].fields.nom_site,
			'addresse': hotspotList[i].fields.adresse,
			'code_site': hotspotList[i].fields.code_site,
		};
		distanceList[i]['distance'] = L.latLng(locateLat, locateLon).distanceTo(L.latLng(hotspotList[i].geometry.coordinates[1], hotspotList[i].geometry.coordinates[0]));
	}
	distanceList.sort(sortByDistance);
	console.log('distanceList', distanceList)
};

function sortByDistance(a, b) {
	var distanceA = parseInt(a['distance']);
	var distanceB = parseInt(b['distance']);

	return distanceA - distanceB;
};
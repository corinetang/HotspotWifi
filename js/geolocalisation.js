var geoMapContainer;
var markerList = [];

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

 			var userMarker = L.AwesomeMarkers.icon({
				icon: 'user',
				markerColor: 'red',
				prefix: 'fa'
			});

            var marker = L.marker([userLat, userLon], {icon: userMarker}).bindPopup('Your are here :)');
            geoMapContainer.setView([userLat, userLon], 12);
            geoMapContainer.addLayer(marker);
            var hwCloser = findHotspotCloser(userLat, userLon);
            setHotspotWifiCloser(hwCloser);
            setTableau(hwCloser);
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
			'adresse': hotspotList[i].fields.adresse,
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
		var wifiMarker = L.AwesomeMarkers.icon({
			icon: 'wifi',
			markerColor: 'darkblue',
			prefix: 'fa'
		});

		var marker = L.marker([hotspotList[i].hotspotData.latitude, hotspotList[i].hotspotData.longitude], {icon: wifiMarker})
			.bindPopup('<p><b>Nom du site : </b>' + hotspotList[i].hotspotData.nom_site 
				+ '<br /><b>Adresse : </b>' + hotspotList[i].hotspotData.adresse
				+ '<br /><b>Code du site : </b>' + hotspotList[i].hotspotData.code_site + '</p>');
		var circle = L.circle([hotspotList[i].hotspotData.latitude, hotspotList[i].hotspotData.longitude], 150, {
		    color: 'transparent',
		    fillColor: '#237CC9',
		    fillOpacity: 0.3
		});

		markerList.push(marker);
		geoMapContainer.addLayer(circle);
		geoMapContainer.addLayer(marker);
	}
};

function setTableau(hotspotList) {
	$('#tableauCloser tbody').empty();
    var tab = d3.select('#tableauCloser').style('visibility', 'visible'),
    tbody = tab.select('tbody').style('text-align', 'right'),
    tr = tbody.selectAll('tr')
            .data(hotspotList)
            .enter().append('tr')
            .on('click', function(d) {
            	selectMarker(d);
            });

	tr.append('td').html(function (v) { return parseInt(v.distance, 10); });
    tr.append('td').html(function (v) { return v.hotspotData.nom_site; });
    tr.append('td').html(function (v) { return v.hotspotData.adresse; });
    tr.append('td').html(function (v) { return v.hotspotData.code_site; });
};

function selectMarker(data) {
	for (var i = 0; i < markerList.length; i++) {
		var currentLatLng = markerList[i].getLatLng();
		if (data.hotspotData.latitude == currentLatLng.lat &&  data.hotspotData.longitude == currentLatLng.lng) {
			console.log('ici', markerList[i])
		}
	};
};
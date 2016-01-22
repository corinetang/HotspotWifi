var mapContainer = $('#map');
var arrondissementList = [];
var hotspotList = [];
var mapMarkers = [];

$(function() { 
	initMap();
 	$("#header").load("../templates/header.html"); 	
});

function initMap() {
	mapContainer = L.map('map').setView([48.856578, 2.351828], 12);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
		{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(mapContainer);
	initMapEvent();
	initHotspotWifiData();
};

function initMapEvent() {
	document.getElementById("map").addEventListener("mousewheel", function() {
		var zoomLevel = mapContainer.getZoom();
		if (zoomLevel < 12) {
			removeMarkers();
		}
		if (zoomLevel > 12) {
			initMarkerHotspotWifiInMap
		}
	}, false);
};

function initHotspotWifiData() {
	d3.json('http://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_sites_des_hotspots_paris_wifi&rows=316&facet=arrondissement', function(data) {
		arrondissementList = data.facet_groups[0].facets;
		hotspotList = data.records;
		initMarkerHotspotWifiInMap();
	});
};

function initMarkerHotspotWifiInMap() {
	var markers = L.markerClusterGroup();

  	for (var i = 0; i < hotspotList.length; i++) {
		x = hotspotList[i].geometry.coordinates[1];
		y = hotspotList[i].geometry.coordinates[0];
        var marker = L.marker([x, y]);
        markers.addLayer(marker);
    }

    mapContainer.addLayer(markers);
};

function removeMarkers() {
	for(var i = 0; i < mapMarkers.length; i++){
	    mapContainer.removeLayer(mapMarkers[i]);
	}
};

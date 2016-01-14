var mapContainer = $('#map');
var arrondissementList = [];
var hotspotList = [];

$(function() { 
	initMap();		
});

function initMap() {
	mapContainer = L.map('map').setView([48.856578, 2.351828], 12);
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
		{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(mapContainer);	
	initHotspotWifi();

	document.getElementById("map").addEventListener("mousewheel", function() {
		console.log('zoom', mapContainer.getZoom())
	}, false);
};

function initHotspotWifi() {
	d3.json('http://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_sites_des_hotspots_paris_wifi&rows=316&facet=arrondissement', function(data) {
		arrondissementList = data.facet_groups[0].facets;
		hotspotList = data.records;
		initMarkerInMap();
	});
};

function initMarkerInMap() {
	var x = 0;
	var y = 0;
	for (var i = 0; i < hotspotList.length; i++) {
		x = hotspotList[i].geometry.coordinates[1];
		y = hotspotList[i].geometry.coordinates[0];
		L.marker([x, y]).addTo(mapContainer);
	}
};

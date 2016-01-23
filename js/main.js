var arrondissementList = [];
var hotspotList = [];
var hotspotListByArrondissement = [];

$(function() {
	initData();
 	$('#header').load('../templates/header.html');
 	$('#container').load('../templates/map.html');
});

function initData() {
	d3.json('http://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_sites_des_hotspots_paris_wifi&rows=316&facet=arrondissement', function(data) {
		arrondissementList = data.facet_groups[0].facets;
		hotspotList = data.records;
		initMap();
		// for (var i = 0; i < arrondissementList.length; i++) {
		// 	var currentArrondissement = arrondissementList[i];
		// 	for (var j = 0; j < hotspotList.length; j++) {
		// 		var hotspotData = hotspotList[j].fields;
		// 		if (hotspotData.arrondissement === currentArrondissement)
		// 	}
		// 	hotspotListByArrondissement
		// }
	});
};

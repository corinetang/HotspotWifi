var arrondissementList = [];
var hotspotList = [];
var hotspotListByArrondissement = [];

$(function() {
	initData();
 	$('#header').load('./templates/header.html');
 	$('#container').load('./templates/map.html');
});

function sortByArrondissement(a, b) {
	var arrondissementA = parseInt(a['name']);
	var arrondissementB = parseInt(b['name']);

	return arrondissementA - arrondissementB;
};

function initData() {
	d3.json('http://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_sites_des_hotspots_paris_wifi&rows=316&facet=arrondissement', function(data) {
		arrondissementList = data.facet_groups[0].facets;
		arrondissementList.sort(sortByArrondissement);
		hotspotList = data.records;
		initMap();
	});
};

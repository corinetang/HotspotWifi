$(function() {
	initRepartition();	
});

function initRepartition() {
	var margin = {top: 40, right: 20, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom');

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient('left');

	var svg = d3.select('#repartition').append('svg')
		.attr('id', 'histoGraph')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	var popup =	d3.select('#repartition').append('div')
		.attr('id', 'newPop')
		.style('display', 'none');

	x.domain(arrondissementList.map(function(d) { return d.name; }));
	y.domain([0, d3.max(arrondissementList, function(d) { return d.count; })]);

	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(xAxis);
	svg.append('g')
		.attr('class', 'y axis')
		.call(yAxis)

	svg.selectAll('.bar')
	 	.data(arrondissementList)
		.enter().append('rect')
		.attr('class', 'bar')
		.attr('x', function(d) { return x(d.name); })
		.property("name", function (d) { return d.name })
        .property("count", function (d) { return d.count; })
		.attr('width', x.rangeBand())
		.attr('y', function(d) { return y(d.count); })
		.attr('height', function(d) { return height - y(d.count); })
		.on("mouseover", popUp)
		.on("mouseout", popDown)
		.on("mousemove", popMove)
		.on("click", showTable)
		.append('div');
};

function popMove() {
	var newPop = $('#newPop'),
	 	width = newPop.css('width').replace('px', ''),
		height = newPop.css('height').replace('px', ''),
		mouse = d3.event;

	if (mouse.clientX > (window.innerWidth - width - 10)) {
		newPop.css('left', mouse.clientX - width - 10 + 'px');
	} else {
		newPop.css('left', mouse.clientX + 10 + 'px');
	}
	if (mouse.clientY > (window.innerHeight - height - 10)) {
		newPop.css('top', mouse.clientY - height - 10 + 'px');
	} else {
		newPop.css('top', mouse.clientY + 'px');
	}
};

function popUp() {
	var newPop = $('#newPop')
		name = this.name,
		count = this.count;

	newPop.html('<div class="arrondissement">' + name + '</div>' + '<div class="hotWifi">' + count + '</div>');
	newPop.css('display', 'block');
	popMove();
};

function popDown() {
	var newPop = $('#newPop');
	newPop.css('display', 'none');
};

function showTable() {
	var filterHotspot = hotspotList.filter(filterByArrondissement);
    var tab = d3.select("#tableau").style("visibility", "visible"),
    tbody = tab.select("tbody").style("text-align", "right"),
    tr = tbody.selectAll("tr")
            .data(filterHotspot.fields)
            .enter().append("tr");

    tr.append("td").html(function (v) { console.log(v); });
};

function filterByArrondissement(element) {
    if (element.fields.arrondissement === this.name) {
        return true;
    }
    return false;
};
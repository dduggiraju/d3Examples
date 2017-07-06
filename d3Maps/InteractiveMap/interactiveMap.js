(function () {
    'use strict';
    var height = 600;
    var width = 900;
    var projection = d3.geoMercator();
    var mexico = {};
    var hover = function (d) {
        var div = document.getElementById('tooltip');
        div.style.left = d3.event.pageX + 'px';
        div.style.top = d3.event.pageY + 'px';
        div.innerHTML = d.properties.NAME_1;
    };
    var path = d3.geoPath().projection(projection);
    var svg = d3.select('#map')
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json('geo-data.json', function (data) {
        console.log('mexico', data);
        var states = topojson.feature(data, data.objects.MEX_adm1);

        //Setup the scale and translate
        var b, s, t;
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(states);
        // ar b = path.bounds(states.features[5]); this will zoom the map to state 5 
        var s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);

        var map = svg.append('g').attr('class', 'boundary');
        mexico = map.selectAll('path').data(states.features);
        mexico.enter()
            .append('path')
            .attr('d', path)
            .attr('fill', 'white')
            .on("mouseover", hover);
        mexico.exit().remove();
    });
}());
(function () {
    'use strict';
    var height = 600;
    var width = 900;
    var projection = d3.geoMercator();
    var mexico = {};

    var path = d3.geoPath().projection(projection);
    var svg1 = d3.select('#map1')
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    var geoId = function (d) {
        return "c" + d.properties.ID_1;
    };

    var click = function (d) {
        svg1.selectAll('path').attr('fill-opacity', 0.2);
        d3.select('#' + geoId(d)).attr('fill-opacity', 1);
    };


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
        var color = d3.scaleLinear().domain([0, 33]).range(['red', 'yellow']);
        var map = svg1.append('g').attr('class', 'boundary');
        mexico = map.selectAll('path').data(states.features);
        mexico.enter()
            .append('path')
            .attr('d', path)
            .attr('id', geoId)
            .attr('fill', function (d, i) {
                return color(i);
            }).on('click',click);
        d3.csv('cities.csv', function (cities) {
            var cityPoints = svg1.selectAll('circle').data(cities);
            var cityText = svg1.selectAll('text').data(cities);
            var radius = d3.scaleLinear().domain([0, 100]).range([5, 30]);
            cityPoints.enter()
                .append('circle')
                .attr('cx', function (d) {
                    return projection
                        ([d.lon, d.lat])[0]
                })
                .attr('cy', function (d) {
                    return projection
                        ([d.lon, d.lat])[1]
                })
                .attr('r', function (d) { return radius(d.tequila); })
                .attr('fill', 'steelblue');

            cityText.enter()
                .append('text')
                .attr('x', function (d) {
                    return projection
                        ([d.lon, d.lat])[0]
                })
                .attr('y', function (d) {
                    return projection
                        ([d.lon, d.lat])[1]
                })
                .attr('dx', 5)
                .attr('dy', 3)
                .text(function (d) { return d.name });
        });
        //mexico.exit().remove();
    });

}());
(function (params) {
    'use strict';

    var width = 900,
        height = 600;
    var projection = d3.geo.mercator();
    var path = d3.geo.path()
        .projection(projection);
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json("europe.json", function (error, eu) {
        var countries = topojson.feature(eu, eu.objects.continent_Europe_subunits)
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(countries),
            s = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection
            .scale(s)
            .translate(t);
        svg.append("path")
            .datum(countries)
            .attr("class", "outline")
            .attr("d", path);
    });
}());
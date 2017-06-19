(function () {
    'use strict';
    // d3.selectAll("circle").transition().duration(2000).attr("cy", 200); 
    d3.csv("cities.csv", function (data) { console.log(data) });
    d3.json("tweets.json", function (data) { console.log(data) });

    var testArray = [88, 10000, 1, 75, 12, 35];

    console.log(d3.min(testArray, function (el) { return el }));
    console.log(d3.max(testArray, function (el) { return el }));
    console.log(d3.mean(testArray, function (el) { return el }));

    d3.csv("cities.csv", function (data) {
        console.log(d3.min(data, function (el) { return +el.population }));
        console.log(d3.max(data, function (el) { return +el.population }));
        console.log(d3.mean(data, function (el) { return +el.population }));
        console.log(d3.extent(data, function (el) { return +el.population }));
    });
    d3.csv("cities.csv", function (error, data) { dataViz(data); });
    function dataViz(incomingData) {
        d3.select("body").selectAll("div.cities")
            .data(incomingData)
            .enter()
            .append("div")
            .attr("class", "cities")
            .attr("id", function (d, i) { return d.label.trim(); })
            .html(function (d, i) { return d.label; });
    }
    d3.select("svg")
        .selectAll("rect")
        .data([15, 50, 22, 8, 100, 10])
        .enter()
        .append("rect")
        .attr("width", 10)
        .attr("height", function (d) { return d; })
        .style("fill", "blue")
        .style("stroke", "red")
        .style("stroke-width", "1px")
        .style("opacity", 0.25)
        .attr("x", function(d,i) {return i * 10});;
}());
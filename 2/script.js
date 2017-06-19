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
    // d3.csv("cities.csv", function (error, data) { dataViz(data); });
    // function dataViz(incomingData) {
    //     d3.select("body").selectAll("div.cities")
    //         .data(incomingData)
    //         .enter()
    //         .append("div")
    //         .attr("class", "cities")
    //         .attr("id", function (d, i) { return d.label.trim(); })
    //         .html(function (d, i) { return d.label; });
    // }

    d3.csv("cities.csv", function (error, data) { cityDataViz(data); });
    function cityDataViz(incomingData) {
        var maxPopulation = d3.max(incomingData, function (el) {
            return parseInt(el.population);
        });
        var yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 480]);
        d3.select("svg").attr("style", "height: 480px; width: 600px;");
        d3.select("svg")
            .selectAll("rect")
            .data(incomingData)
            .enter()
            .append("rect")
            .attr("width", 50)
            .attr("height", function (d) { return yScale(parseInt(d.population)); })
            .attr("x", function (d, i) { return i * 60; })
            .attr("y", function (d) { return 480 - yScale(parseInt(d.population)); })
            .style("fill", "blue")
            .style("stroke", "red")
            .style("stroke-width", "1px")
            .style("opacity", 0.25);
    }


    var yScale = d3.scaleLinear().domain([0, 100, 500]).range([0, 50, 100]).clamp(true);
    d3.select("#nextG")
        .selectAll("rect")
        .data([14, 68, 24500, 430, 19, 1000, 5555])
        .enter()
        .append("rect")
        .attr("width", 10)
        .attr("height", function (d) { return yScale(d); })
        .style("fill", "blue")
        .style("stroke", "red")
        .style("stroke-width", "1px")
        .style("opacity", 0.25)
        .attr("x", function (d, i) { return i * 10 })
        .attr("y", function (d) { return (100 - yScale(d)); });
}());
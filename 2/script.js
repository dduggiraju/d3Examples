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

    d3.csv("cities.csv", function (error, data) { cityDataViz(data); });
    function cityDataViz(cityData) {
        var maxPopulation = d3.max(cityData, function (el) {
            return parseInt(el.population);
        });
        var yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 480]);
        d3.select("#citiesG").attr("style", "height: 480px; width: 600px;");
        d3.select("#citiesG")
            .selectAll("rect")
            .data(cityData)
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

    d3.json("tweets.json", function (error, data) { tweetDataViz(data.tweets) });
    function tweetDataViz(tweetData) {
        drawTweetBar(tweetData);
        drawTweetScatter(tweetData);
    }
    function drawTweetBar(tweetData) {
        var nestedTweets = d3.nest()
            .key(function (el) { return el.user; })
            .entries(tweetData);
        nestedTweets.forEach(function (el) {
            el.numTweets = el.values.length;
        });
        var maxTweets = d3.max(nestedTweets, function (el) { return el.numTweets; });
        var yScale = d3.scaleLinear().domain([0, maxTweets]).range([0, 100]);

        d3.select("#tweetsG")
            .selectAll("rect")
            .data(nestedTweets)
            .enter()
            .append("rect")
            .attr("width", 50)
            .attr("height", function (d) { return yScale(d.numTweets); })
            .attr("x", function (d, i) { return i * 60; })
            .attr("y", function (d) { return 100 - yScale(d.numTweets); })
            .style("fill", "blue")
            .style("stroke", "red")
            .style("stroke-width", "1px").style("opacity", 0.25);
    }

    function drawTweetScatter(tweetData) {
        tweetData.forEach(function (el) {
            el.impact = el.favorites.length + el.retweets.length;
            el.tweetTime = new Date(el.timestamp);
        });
        var maxImpact = d3.max(tweetData, function (el) { return el.impact; });
        var startEnd = d3.extent(tweetData, function (el) {
            return el.tweetTime;
        });
        var timeRamp = d3.scaleTime().domain(startEnd).range([20, 480]);
        var yScale = d3.scaleLinear().domain([0, maxImpact]).range([0, 460]);
        var radiusScale = d3.scaleLinear()
            .domain([0, maxImpact]).range([1, 20]);
        var colorScale = d3.scaleLinear()
            .domain([0, maxImpact]).range(["white", "#990000"]);
        d3.select("#teweetScatterG").attr("style", "height: 490px; width: 600px;margin: 5px");
        d3.select("#teweetScatterG")
            .selectAll("circle")
            .data(tweetData)
            .enter()
            .append("circle")
            .attr("r", function (d) { return radiusScale(d.impact); })
            .attr("cx", function (d, i) { return timeRamp(d.tweetTime); })
            .attr("cy", function (d) { return 480 - yScale(d.impact); })
            .style("fill", function (d) { return colorScale(d.impact); })
            .style("stroke", "black")
            .style("stroke-width", "1px");
    }
}());
(function () {
    'use strict';
    function scatterPlot() {
        var scatterData = [{ friends: 5, salary: 22000 }, { friends: 3, salary: 18000 }, { friends: 10, salary: 88000 },
        { friends: 0, salary: 180000 }, { friends: 27, salary: 56000 }, { friends: 8, salary: 74000 }];

        var xExtent = d3.extent(scatterData, function (data) {
            return data.salary;
        });
        var yExtent = d3.extent(scatterData, function (data) {
            return data.friends;
        });
        var xScale = d3.scaleLinear().domain(xExtent).range([0, 500]);
        var yScale = d3.scaleLinear().domain(yExtent).range([0, 500]);
        var xAxis = d3.axisBottom().scale(xScale).tickSize(500).ticks(10);
        var yAxis = d3.axisRight().scale(yScale).tickSize(500).ticks(20);
        d3.select('svg')
            .selectAll('circle')
            .data(scatterData)
            .enter()
            .append('circle')
            .attr('r', 5)
            .attr('cy', function (d) {
                return yScale(d.friends);
            })
            .attr('cx', function (d) {
                return xScale(d.salary);
            });
        d3.select('svg')
            .append('g')
            .attr('id', 'xAxisG')
            .call(xAxis);
        d3.select('svg')
            .append('g')
            .attr('id', 'yAxisG')
            .call(yAxis);
    }
    function boxPlot() {
        d3.csv('boxplots.csv', function (error, data) {
            var xExtent = d3.extent(data, function (d) {
                return d.day;
            });
            var yExtent = d3.extent(data, function (d) {
                return d.median;
            });
            var xScale = d3.scaleLinear().domain([0, 8]).range([0, 500]);
            var yScale = d3.scaleLinear().domain([0, 100]).range([500, 0]);
            var xAxis = d3.axisBottom().scale(xScale).tickSize(-500);
            var yAxis = d3.axisRight().scale(yScale).tickSize(-500);
            d3.select('#boxPlot').append('g').attr("transform", "translate(0,500)").attr('id', 'boxPlotXAxis').call(xAxis);
            d3.select('#boxPlot').append('g').attr("transform", "translate(500,0)").attr('id', 'boxPlotYAxis').call(yAxis);
            d3.select('#boxPlot').selectAll('g').data(data)
                .enter()
                .append('circle')
                .attr('r', 5)
                .attr('cx', function (d) {
                    return xScale(d.day);
                })
                .attr('cy', function (d) {
                    return yScale(d.median);
                });
            //adding the boxes
            d3.select('#boxPlot').selectAll('g.box').data(data)
                .enter()
                .append('g')
                .attr('class', 'box')
                .attr('transform', function (d) {
                    return "translate(" + xScale(d.day) + "," + yScale(d.median) + ")";
                })
                .each(function (d) {
                    d3.select(this)
                        .append('line')
                        .attr('x1', 0)
                        .attr('y1', yScale(d.min) - yScale(d.median))
                        .attr('x2', 0)
                        .attr('y2', yScale(d.max) - yScale(d.median))
                        .style('stroke', 'black')
                        .style('stroke-width', '4px');
                    d3.select(this)
                        .append('rect')
                        .attr('x', -10)
                        .attr('y', yScale(d.q3) - yScale(d.median))
                        .attr('width', 20)
                        .attr('height', yScale(d.q1) - yScale(d.q3))
                        .style('fill', 'white')
                        .style('stroke', 'black')
                        .style('stroke-width', '4px');
                    d3.select(this)
                        .append('line')
                        .attr('x1', -5)
                        .attr('y1', (yScale(d.min) - yScale(d.median)))
                        .attr('x2', 5)
                        .attr('y2', (yScale(d.min) - yScale(d.median)))
                        .style('stroke', 'black')
                        .style('stroke-width', '4px');
                    d3.select(this)
                        .append('line')
                        .attr('x1', -5)
                        .attr('y1', (yScale(d.max) - yScale(d.median)))
                        .attr('x2', 5)
                        .attr('y2', (yScale(d.max) - yScale(d.median)))
                        .style('stroke', 'black')
                        .style('stroke-width', '4px');
                    d3.select(this)
                        .append("line")
                        .attr("x1", -8)
                        .attr("x2", 8)
                        .attr("y1", 0)
                        .attr("y2", 0)
                        .style("stroke", "darkgray")
                        .style("stroke-width", "4px");
                });



        });
    }
    function scatterPlot2() {
        d3.csv('tweets.csv', function (incomingData) {
            console.log(incomingData);

            var xScale = d3.scaleLinear().domain([0, 10.5]).range([20, 500]);
            var yScale = d3.scaleLinear().domain([0, 35]).range([500, 20]);
            var xAxis = d3.axisBottom().scale(xScale).tickSize(500);
            var yAxis = d3.axisRight().scale(yScale).tickSize(500);

            d3.select('#scPlot2').selectAll('circle.tweets').data(incomingData)
                .enter()
                .append('circle')
                .attr('r', '5')
                .attr('cx', function (d) {
                    return xScale(d.day);
                })
                .attr('cy', function (d) {
                    return yScale(d.tweets);
                })
                .attr('fill', 'red')
                .attr('class', 'tweets');

            d3.select('#scPlot2').selectAll('circle.retweets').data(incomingData)
                .enter()
                .append('circle')
                .attr('r', '5')
                .attr('cx', function (d) {
                    return xScale(d.day);
                })
                .attr('cy', function (d) {
                    return yScale(d.retweets);
                })
                .attr('fill', 'blue')
                .attr('class', 'retweets');

            d3.select('#scPlot2').selectAll('circle.favs').data(incomingData)
                .enter()
                .append('circle')
                .attr('r', '5')
                .attr('cx', function (d) {
                    return xScale(d.day);
                })
                .attr('cy', function (d) {
                    return yScale(d.favorites);
                })
                .attr('fill', 'green')
                .attr('class', 'favs');
            d3.select('#scPlot2').append('g').attr('id', 'scp2Xaxis')
                .call(xAxis);
            d3.select('#scPlot2').append('g').attr('id', 'scp2YAxis').call(yAxis);

            var tweetLine = d3.line()
                .x(function (d) {
                    return xScale(d.day);
                })
                .y(function (d) {
                    return yScale(d.tweets);
                });

            d3.select('#scPlot2').append('path')
                .attr('d', tweetLine(incomingData))
                .attr('fill', 'none')
                .attr('stroke', 'red')
                .attr('stroke-width', 2);

            var retweetLine = d3.line()
                .x(function (data) {
                    return xScale(data.day);
                })
                .y(function (data) {
                    return yScale(data.retweets);
                });

            d3.select('#scPlot2').append('path')
                .attr('d', retweetLine(incomingData))
                .attr('fill', 'none')
                .attr('stroke', 'blue')
                .attr('stroke-width', '2');

            var favsLine = d3.line()
                .x(function (d) {
                    return xScale(d.day);
                })
                .y(function (d) {
                    return yScale(d.favorites);
                });
            d3.select('#scPlot2').append('path')
                .attr('d', favsLine(incomingData))
                .attr('fill', 'none')
                .attr('stroke', 'green')
                .attr('stroke-width', '2');
        });
    }
    scatterPlot();
    boxPlot();
    scatterPlot2();
}());
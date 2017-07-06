(function () {
    'use strict';
    var svg = d3.select('body')
        .append('svg')
        .attr("width", 200)
        .attr("height", 200);
    function makeData(n) {
        var arr = [];
        var i = 0;
        for (i = 0; i < n; i++) {
            arr.push({
                x: Math.floor((Math.random() * 100) + 1),
                y: Math.floor((Math.random() * 100) + 1),
                width: Math.floor((Math.random() * 100) + 1),
                height: Math.floor((Math.random() * 100) + 1)
            });
        }
        return arr;
    }
    var incomingData = makeData(2);
    drawRects(incomingData);
    function drawRects(incomingData) {
        var rect = svg.selectAll('rect')
            .data(incomingData);
        rect.enter()
            .append('rect')
            .attr('x', function (d) {
                return d.x;
            })
            .attr('y', function (d) {
                return d.y;
            })
            .attr('height', function (d) {
                return d.height;
            })
            .attr('width', function (d) {
                return d.width;
            });
    }

}());
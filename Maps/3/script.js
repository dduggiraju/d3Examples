(function () {
    'use strict';
    var svg = d3.select('body')
        .append('svg')
        .attr('height', '100vh')
        .attr('width', '100vw');

    svg.append('rect')
        .attr('x', 10)
        .attr('y', 10)
        .attr('height', 100)
        .attr('width', 100);

}());
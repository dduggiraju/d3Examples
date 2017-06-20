(function () {
    'use strict';
    var dragging = false, drawing = false, startPoint;
    var points = [], g;
    var polygons = [];
    // d3 behaviours
    var dragger = d3.behavior.drag()
        .on('drag', handleDrag)
        .on('dragend', function (d) {
            dragging = false;
        });

    function addImage(divId) {
        d3.select(divId)
            .style('background-image', 'url(img.jpg)')
            .style("background-repeat", "no-repeat")
            .style("background-position", "center center")
            .style('background-size', 'cover')
            .style('height', '600px')
            .style('width', '800px');
    }
    addImage('#topImg');
    addImage('#bottomImg');
    var svg = d3.select('#topImg')
        .append('svg')
        .style('height', '100%')
        .style('width', '100%');

    svg.on('mouseup', function () {
        if (dragging) { return; }
        drawing = true;
        startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
        if (svg.select('g.drawPoly').empty()) g = svg.append('g').attr('class', 'drawPoly');
        if (d3.event.target.hasAttribute('is-handle')) {
            closePolygon();
            return;
        }
        points.push(d3.mouse(this));
        g.select('polyline').remove();
        var polyline = g.append('polyline').attr('points', points)
            .style('fill', 'none')
            .attr('stroke', '#000');
        for (var i = 0; i < points.length; i++) {
            g.append('circle')
                .attr('cx', points[i][0])
                .attr('cy', points[i][1])
                .attr('r', 4)
                .attr('fill', 'yellow')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .style({ cursor: 'pointer' });
        }
    });
    svg.on('mousemove', function () {
        if (!drawing) return;
        var g = d3.select('g.drawPoly');
        g.select('line').remove();
        var line = g.append('line')
            .attr('x1', startPoint[0])
            .attr('y1', startPoint[1])
            .attr('x2', d3.mouse(this)[0] + 2)
            .attr('y2', d3.mouse(this)[1])
            .attr('stroke', '#53DBF3')
            .attr('stroke-width', 1);
    })
    function handleDrag() {
        if (drawing) return;
        var dragCircle = d3.select(this), newPoints = [], circle;
        dragging = true;
        var poly = d3.select(this.parentNode).select('polygon');
        var circles = d3.select(this.parentNode).selectAll('circle');
        dragCircle
            .attr('cx', d3.event.x)
            .attr('cy', d3.event.y);
        for (var i = 0; i < circles[0].length; i++) {
            circle = d3.select(circles[0][i]);
            newPoints.push([circle.attr('cx'), circle.attr('cy')]);
        }
        poly.attr('points', newPoints);
    }
    function closePolygon() {
        svg.select('g.drawPoly').remove();
        drawPolygon(points, svg);
        polygons.push(points.splice(0));
        points.splice(0);
        drawing = false;
    }
    function copyPolygons() {
        d3.select('#bottomImg').selectAll('svg').remove();
        var copiedSvg = d3.select('#bottomImg')
            .append('svg')
            .style('height', '100%')
            .style('width', '100%');
        polygons.forEach(function (polyPoints) {
            drawPolygon(polyPoints, copiedSvg);
        })
    };
    function drawPolygon(polygonPoints, surface) {
        var g = surface.append('g');
        g.append('polygon')
            .attr('points', polygonPoints)
            .style('fill', 'white')
            .style('opacity', 0.5);
        for (var i = 0; i < polygonPoints.length; i++) {
            var circle = g.selectAll('circles')
                .data([polygonPoints[i]])
                .enter()
                .append('circle')
                .attr('cx', polygonPoints[i][0])
                .attr('cy', polygonPoints[i][1])
                .attr('r', 4)
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .style({ cursor: 'move' })
                .call(dragger);
        }

        d3.select('#copy')
            .on('click', function () {
                copyPolygons();
            })
    }
}());
(function () {
    'use strict';

    var someNumbers = [82, 9, 500, 40, 17];
    var someColors = ["blue", "red", "chartreuse", "orange"];
    var somePeople = [{ name: "Amar", age: 27 }, { name: "Akbar", age: 24 }, { name: "Antony", age: 49 }];
    d3.select("#someDiv").style("border", "5px darkgray dashed");
    d3.select("#someDiv").attr("id", "newID");
    d3.select("#someCheckbox").property("checked", true);

    d3.select("#lbDiv").style("background", "lightblue").style("border", "solid black 1px").html("Something else maybe");

    d3.select("circle").remove();
    d3.select("rect").style("fill", "purple");
    d3.select("#circ").attr("class", "tentative");
    d3.select("#circ").classed("active", true).on("click", function () { console.log("You clicked a circle") });;

    var smallerNumbers = someNumbers.filter(function (el) { return el <= 400; });
    d3.select("div")
        .data(smallerNumbers)
        .enter()
        .append("div")
        .html(function (d) { return d; })
        .style("margin", "50px");

    d3.select("svg")
        .append("line")
        .attr("x1", 20)
        .attr("y1", 20)
        .attr("x2", 400)
        .attr("y2", 400)
        .style("stroke", "black")
        .style("stroke-width", "2px");
    d3.select("svg")
        .append("text")
        .attr("x", 20)
        .attr("y", 20)
        .text("HELLO");
    d3.select("svg")
        .append("circle")
        .attr("r", 20)
        .attr("cx", 20)
        .attr("cy", 20)
        .style("fill", "red");
    d3.select("svg")
        .append("circle")
        .attr("r", 100)
        .attr("cx", 400)
        .attr("cy", 400)
        .style("fill", "lightblue");
    d3.select("svg")
        .append("text")
        .attr("x", 400)
        .attr("y", 400)
        .text("WORLD");

    d3.select("svg")
        .append("circle")
        .attr("r", 20)
        .attr("cx", 20)
        .attr("cy", 20)
        .style("fill", "red");
    d3.select("svg")
        .append("text")
        .attr("id", "a")
        .attr("x", 20)
        .attr("y", 20)
        .style("opacity", 0)
        .text("HELLO WORLD");
    d3.select("svg")
        .append("circle")
        .attr("r", 100)
        .attr("cx", 400)
        .attr("cy", 400)
        .style("fill", "lightblue");
    d3.select("svg")
        .append("text")
        .attr("id", "b")
        .attr("x", 400)
        .attr("y", 400)
        .style("opacity", 0)
        .text("Uh, hi.");

    d3.select("#a").transition().delay(1000).style("opacity", 1);
    d3.select("#b").transition().delay(3000).style("opacity", 0.75);
    d3.selectAll("circle").transition().duration(2000).attr("cy", 200);
}());
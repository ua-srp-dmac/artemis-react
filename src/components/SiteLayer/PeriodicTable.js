import React, { Component } from 'react';
import * as d3 from "d3";
import elements from './elements.txt';

import './PeriodicTable.css';


export default class PeriodicTable extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.drawTable = this.drawTable.bind(this)

  }

  componentDidMount() {

    var states = [];

    d3.text(elements).then((text) => {
      console.log(text);
      text.split("\n").forEach(function(line, i) {
        var re = /\w+/g, m;
        while (m = re.exec(line)) states.push({
          name: m[0],
          x: m.index / 3,
          y: i
          });
      });

      this.setState({
        elements: states
      }, this.drawTable)
    });

  }

  drawTable() {

    var width = 950;
    var height = 600;

    var svg = d3.select("#table").append("svg")
      .attr("width", width)
      .attr("height", height)

    var gridWidth = d3.max(this.state.elements, function(d) { return d.x; }) + 1,
        gridHeight = d3.max(this.state.elements, function(d) { return d.y; }) + 1,
        cellSize = 50;

    var state = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
        .selectAll(".state")
        .data(this.state.elements)
        .enter().append("g")
        .attr("class", function(d) { return "state"})
        .attr("transform", function(d) { return "translate(" + (d.x - gridWidth / 2) * cellSize + "," + (d.y - gridHeight / 2) * cellSize + ")"; });

    // Define the div for the tooltip
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    state.append("circle")
        .attr("cx", 1)
        .attr("cy", 1)
        .attr("r", 22)
        // .on("mouseover", function(d) {
        //     div.transition()
        //         .duration(200)
        //         .style("opacity", .9);
        //     div	.html(d.name)
        //         .style("left", (d3.event.pageX) + "px")
        //         .style("top", (d3.event.pageY - 28) + "px");
        //     })
        // .on("mouseout", function(d) {
        //       div.transition()
        //           .duration(100)
        //           .style("opacity", 0);
        //   });

    state.append("text")
      .attr("dy", ".55em")
      .text(function(d) { return d.name; });
  }

  render() {

    return (
      <>
        <div id="table"></div>
      </>
    )
  }
}

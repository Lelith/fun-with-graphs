import React, { Component } from 'react';
import * as d3 from "d3";


export default class extends Component {

  componentDidMount() {
    this.dataViz();
  }

  dataViz() {
    const scatterData = [{friends: 5, salary: 22000},
       {friends: 3, salary: 18000}, {friends: 10, salary: 88000},
       {friends: 0, salary: 180000}, {friends: 27, salary: 56000},
       {friends: 8, salary: 74000}];

     const xExtent = d3.extent(scatterData, d => d.salary)
     const yExtent = d3.extent(scatterData, d => d.friends)
     const xScale = d3.scaleLinear().domain(xExtent).range([0,500]);
     const yScale = d3.scaleLinear().domain(yExtent).range([0,500]);

    const xAxis = d3.axisBottom().scale(xScale)
    .tickSize(500).ticks(4)
    const yAxis = d3.axisRight().scale(yScale)
          .ticks(16).tickSize(500)

    d3.select(this.refs.fungraph).selectAll("circle")
      .data(scatterData).enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", d => xScale(d.salary))
      .attr("cy", d => yScale(d.friends));

    d3.select(this.refs.fungraph)
      .append("g")
      .attr("id", "xAxisG")
      .call(xAxis);

    d3.select(this.refs.fungraph)
      .append("g")
      .attr("id", "yAxisG")
      .call(yAxis);
  }

  render() {
    return (
      <div>
        <svg width="100%" height="100vh" ref="fungraph"/>
      </div>
    );
  }
}

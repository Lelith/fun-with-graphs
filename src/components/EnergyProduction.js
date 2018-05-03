import React, { Component } from 'react';
import * as d3 from "d3";

export default class extends Component {
  componentDidMount() {
    const {
      data,
      color1,
      color2,
    } = this.props
  }

  dataViz(incomingData) {
    console.log(incomingData)
    const maxPopulation = d3.max(incomingData, d => parseInt(d.population));
    console.log(maxPopulation);
    const yScale = d3.scaleLinear().domain([0, maxPopulation]).range([0, 460]);

    d3.select(this.refs.fungraph)
      .selectAll("rect")
      .data(incomingData)
      .enter()
      .append("rect")
        .attr("x", (d,i) => i * 10)
        .attr("width", 10)
        .attr("height", d => yScale(parseInt(d.population)))
        .attr("y", d => 100 - yScale(parseInt(d.population)))
        .style("fill", "#FE9922")
        .style("stroke", "#9A8B7A")
        .style("stroke-width", "1px");
  }

  render() {
    return (
      <svg ref="fungraph"/>
    );
  }
}

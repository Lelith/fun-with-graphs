import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';
export default class FunGraph extends Component {
  constructor(props) {
    super(props);

    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
      this.createBarChart();
  }

  componentDidUpdate(){
    this.createBarChart();
  }

  createBarChart() {
    const {
      data,
      size,
      colorScale,
    } = this.props;

    const node = this.refs.fungraph;

    // draw legends
    const legend = legendColor()
      .scale(colorScale)
      .labels(["Wave 1", "Wave 2", "Wave 3", "Wave 4"]);

    d3.select(node)
      .selectAll("g.legend")
      .data([0])
      .enter()
      .append("g")
        .attr("class", "legend")
        .call(legend)
        .attr("transform", "translate(" + (size[0] - 100) + ", 20)");

    // draw bars
    const dataMax = d3.max(data.map(d => d3.sum(d.data)));
    const barWidth = (size[0] - data.length*5)/ data.length;
    const yScale = d3.scaleLinear()
      .domain([0, dataMax])
      .range([0, size[1]])

    d3.select(node)
      .selectAll("rect.backgroundColor")
      .data(data)
      .enter()
      .append("rect")
        .attr("class", "bar");

    d3.select(node)
      .selectAll("rect.bar")
      .data(data)
      .exit()
      .remove()

    d3.select(node)
      .selectAll("rect.bar")
      .data(data)
      .style("fill", "#fe9922")
      .attr("x", (d,i) => i * (barWidth+5))
      .attr("y", (d,i) => size[1] - yScale(d3.sum(d.data)))
      .attr("height", (d,i) => yScale(d3.sum(d.data)))
      .attr("width", barWidth)
      .style("fill", (d,i) => colorScale(d.launchday))
      .style("stroke", "black")
      .style("stroke-opacity", 0.25);
  }

  render() {
    return (
      <div>
        <svg width={this.props.size[0]} height={this.props.size[1]} ref="fungraph"/>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';
export default class FunGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    d3.csv("data/movies.csv", (error, data) => {
      if(error){
        console.log(error);
        return;
      } else {
        this.dataViz(data);
      }
    });
  }

  dataViz(data) {

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, 500]);
    const yScale = d3.scaleLinear().domain([0, 60]).range([480, 0]);
    const heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480]);

    var movies = ["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"];

    var fillScale = d3.scaleOrdinal()
    .domain(movies)
    .range(["powderblue", "royalblue", "orangered", "MediumTurquoise", "orchid", "springgreen"]);

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .tickSize(500)
        .tickValues([1,2,3,4,5,6,7,8,9,10]);

    const yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(10)
      .tickSize(520);

    d3.select(this.refs.fungraph)
    .append("g").attr("id", "yAxisG").call(yAxis)
    .append("g").attr("id", "xAxisG").call(xAxis);

    const stackLayout = d3.stack().keys(movies);

    d3.select(this.refs.fungraph).selectAll("g.bar")
    .data(stackLayout(data))
    .enter()
    .append("g")
      .attr("class", "bar")
      .each(function(d) {
        d3.select(this).selectAll("rect")
          .data(d)
          .enter()
          .append("rect")
            .attr("x", (p,q) => xScale(q) + 30)
            .attr("y", p => yScale(p[1]))
            .attr("height", p => heightScale(p[1] - p[0]))
            .attr("width", 40)
            .style("fill", fillScale(d.key));
      });

  }

  render() {
    return (
      <div>
        <svg width="100%" height="600" ref="fungraph"/>
      </div>
    );
  }
}

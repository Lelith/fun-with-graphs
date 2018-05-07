import React, { Component } from 'react';
import * as d3 from "d3";

export default class FunGraph extends Component {
  constructor(props) {
    super(props);
    this.simpleStacking = this.simpleStacking.bind(this);
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
    const fillScale = d3.scaleOrdinal()
      .domain(["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"])
      .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

    const xScale = d3.scaleLinear().domain([ 1, 10 ]).range([ 20, 470 ]);
    const yScale = d3.scaleLinear().domain([ 0, 55 ]).range([ 470, 20 ]);

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .tickSize(480)
      .tickValues([1,2,3,4,5,6,7,8,9,10]);
    const yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(10)
      .tickSize(470);

    d3.select(this.refs.fungraph).append("g").attr("id", "xAxisG").call(xAxis);

    d3.select(this.refs.fungraph).append("g").attr("id", "yAxisG").call(yAxis);

    Object.keys(data[0]).forEach(key => {
      if (key !== "day") {
        var movieArea = d3.area()
          .x(d => xScale(d.day))
          .y0(d => yScale(this.simpleStacking(d,key) - d[key]))
          .y1(d => yScale(this.simpleStacking(d, key)))
          .curve(d3.curveBasis);
        d3.select("svg")
          .append("path")
            .style("id", `${key} Area`)
            .attr("d", movieArea(data))
            .attr("fill", fillScale(key))
            .attr("stroke", "black")
            .attr("stroke-width", 1);
      }
    });
  }

  simpleStacking( lineData, lineKey) {
    var newHeight = 0;
    Object.keys(lineData).every(key => {
      if (key !== "day") {
        newHeight += parseInt(lineData[key]);
        if (key === lineKey) {
          return false;
        }
      }
      return true;
    });
    return newHeight;
  }


  render() {
    return (
      <div>
        <svg width="600" height="600" ref="fungraph"/>
      </div>
    );
  }
}

import React, { Component } from 'react';
import * as d3 from "d3";
import * as colorbrewer from "colorbrewer";

export default class extends Component {
  componentDidMount() {
    d3.csv("data/worldcup.csv", (error, data) => {
      if(error){
        console.log(error);
      }else {
        this.dataViz(data);
      }
    });
  }

  dataViz(incomingData) {
    d3.select(this.refs.fungraph)
      .append("g")
      .attr("id", "teamsG")
      .attr("transform", "translate(150,150)")
      .selectAll("g")
      .data(incomingData)
      .enter()
      .append("g")
      .attr("class", "overallG")
      .attr("transform", (d,i) => "translate(" + (i * 50) + ", 0)");

      const teamG = d3.selectAll("g.overallG");

      teamG
        .append("circle")
        .attr("r", 20);

      teamG
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", 30)
          .text(d => d.team);
  }

  render() {
    return (
      <svg width="100%" height="100vh" ref="fungraph"/>
    );
  }
}

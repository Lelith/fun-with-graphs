import React, { Component } from 'react';
import * as d3 from "d3";


export default class extends Component {
  componentDidMount() {
    d3.json("data/tweets.json", (error, data) => {
      if(error){
        console.log(error);
      }else {
        this.dataViz(data.tweets);
      }
    });
  }

  dataViz(incomingData) {
    incomingData.forEach(d => {
      d.impact = d.favorites.length + d.retweets.length;
      d.tweetTime = new Date(d.timestamp);
    });

    const maxImpact = d3.max(incomingData, d => d.impact);
    const startEnd = d3.extent(incomingData, d => d.tweetTime);
    const timeRamp = d3.scaleTime().domain(startEnd).range([20,480]);
    const yScale = d3.scaleLinear().domain([0,maxImpact]).range([0,460]);

    const radiusScale = d3.scaleLinear()
    .domain([0,maxImpact]).range([1,20]);

    const colorScale = d3.scaleLinear()
    .domain([0,maxImpact]).range(["white","purple"])

    const filteredData = incomingData.filter(d => d.impact > 0)

    var tweetG =  d3.select(this.refs.fungraph)
      .selectAll("g")
      .data(incomingData, JSON.stringify)
      .enter()
      .append("g")
      .attr("transform", d =>
        `translate( ${timeRamp(d.tweetTime)} , ${(480 - yScale(d.impact))} )`);

    tweetG.append("circle")
        .attr("r", d => radiusScale(d.impact))
        .style("fill", "purple")
        .style("stroke", "black")
        .style("stroke-width", "1px");

    tweetG.append("text")
          .text(d => `${d.user}-${d.tweetTime.getHours()}`);

    d3.selectAll("circle")
      .data(filteredData, d =>JSON.stringify(d))
      .exit()
      .remove();


  }

  render() {
    return (
      <svg width="100%" height="100vh" ref="fungraph"/>
    );
  }
}

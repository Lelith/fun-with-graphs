import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';
export default class FunGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    d3.json("data/tweets.json", (error, data) => {
      if(error){
        console.log(error);
        return;
      } else {
        this.dataViz(data);
      }
    });
  }

  dataViz(data) {
    var nestedTweets = d3.nest()
      .key(d=> d.user)
      .entries(data.tweets);

    nestedTweets.forEach(d => {
      d.numTweets = d.values.length;
      d.numFavorites = d3.sum(d.values, p => p.favorites.length);
      d.numRetweets = d3.sum(d.values, p => p.retweets.length);
   });


    const pieChart = d3.pie()
      .value(d => d.numTweets);

    const myPie = pieChart(nestedTweets)

    const newArc = d3.arc();
    newArc
    .innerRadius(50)
    .outerRadius(100);

    const fillScale = d3.scaleOrdinal()
    .range(["silver", "aquamarine", "blueviolet", "hotpink"]);

    d3.select(this.refs.fungraph)
      .append("g")
        .attr("transform", "translate(250,250)")
      .selectAll("path")
      .data(myPie)
      .enter()
      .append("path")
        .attr("d", newArc)
        .style("fill", (d,i) => fillScale(i))
        .style("stroke", "black")
        .style("stroke-width", "2px");
  }

  render() {
    return (
      <div>
        <svg width="100%" height="600" ref="fungraph"/>
      </div>
    );
  }
}

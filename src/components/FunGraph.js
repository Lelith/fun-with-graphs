import React, { Component } from 'react';
import * as d3 from "d3";
import * as colorbrewer from "colorbrewer";

export default class extends Component {
  constructor(props) {
    super(props);

    this.buttonClick = this.buttonClick.bind(this);
    this.state= {
      loading: true,
      incomingData: 0,
    };
  }

  componentDidMount() {
    d3.csv("data/worldcup.csv", (error, data) => {
      if(error){
        console.log(error);
        return;
      } else {
        this.setState({
          incomingData: data,
          loading: false
        });
        this.dataViz(this.state.incomingData);
      }
    });
  }

  dataViz(incomingData) {
    d3.select("svg")
          .append("g")
          .attr("id", "teamsG")
            .attr("transform", "translate(50,100)")
          .selectAll("g")
          .data(incomingData)
          .enter()
          .append("g")
            .attr("class", "overallG")
            .attr("transform", (d, i) =>`translate(${(i * 50)}, 0)`);

        var teamG = d3.selectAll("g.overallG");

        teamG
          .append("circle").attr("r", 0)
          .transition()
            .delay((d,i) => i * 100)
            .duration(500)
            .attr("r", 40)
          .transition()
            .duration(500)
            .attr("r", 20);

        teamG
          .append("text")
          .style("text-anchor", "middle")
          .attr("y", 30)
              .text(d => d.team)

      teamG
        .on("mouseover", this.highlightRegions);

      teamG
        .on("mouseout",this.unHighlightRegions);
  }

  highlightRegions(d, i){
    d3.select(this).select("text").classed("active", true).attr("y", 10);
       d3.selectAll("g.overallG").select("circle")
          .each(function (p) {
            p.region == d.region ?
             d3.select(this).classed("active", true) :
             d3.select(this).classed("inactive", true);
          });
    this.parentElement.appendChild(this);
  }

  unHighlight() {
    d3.selectAll("g.overallG").select("circle").attr("class", "");
    d3.selectAll("g.overallG").select("text")
      .classed("active", false).attr("y", 30);
  }

  buttonClick(datapoint) {
    const maxValue =d3.max(this.state.incomingData, d => parseFloat(d[datapoint]));
    const radiusScale = d3.scaleLinear()
      .domain([0, maxValue]).range([2,20]);

    d3.selectAll("g.overallG").select("circle")
      .transition().duration(1000)
      .attr("r", d => radiusScale(d[datapoint]));
  }

  render() {
    var dataKeys = [1,2];
    if(!this.state.loading){
      const incomingData = this.state.incomingData;
      dataKeys = Object.keys(incomingData[0])
      .filter(d => d !== "team" && d !== "region");
    }

    return (
      <div>
        {this.state.loading && (
          <p>awaiting data</p>
        )}
        {!this.state.loading && (
          <div>
            <svg width="100%" height="50vh" ref="fungraph"/>
            <div className="controls">
              {dataKeys.map(d =>
               <button
                onClick={() => this.buttonClick(d)}
                className="teams"
                key={`control-${d}`}
               >
                {d}
               </button>
             )}
           </div>
          </div>
        )}
      </div>
    );
  }
}

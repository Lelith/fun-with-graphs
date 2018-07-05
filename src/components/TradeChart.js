import React, { Component } from 'react';
import * as d3 from 'd3';
import * as scale from 'd3-scale-chromatic'


export default class TradeChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();

  }

  componentDidMount(){
    this.drawChart();
  }

  componentDidUpdate(){
    d3.select(this.refs.consumption).selectAll("g").remove();
    this.drawChart();
  }


  drawChart(){

    const {
      cumulativeTrades,
      areaNames,
      size
    } = this.props;

    const
      consumption = d3.select(this.refs.consumption),
      margins = {top: 50, right: 20, bottom: 50, left: 40},
      width = size.width - margins.left - margins.right,
      height = size.height - margins.top - margins.bottom,
      innerRadius = 120,
      outerRadius = Math.min(width, height) / 2;


    const
      stackLayout = d3.stack().keys(areaNames);

    const colorScale = d3.scaleOrdinal()
      .domain(areaNames)
      .range(scale.schemeBuPu[areaNames.length]);

    const xScale = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .align(0)
      .domain(cumulativeTrades.map(d => d.Label));


    const yScale = d3.scaleLinear()
      .range([innerRadius, outerRadius])
      .domain([0, d3.max(cumulativeTrades, (d =>  d.total ))]);

    // drawing the bars
    const g = consumption.append("g").attr("transform", "translate(" + width / 2 + "," + (height+margins.top+margins.bottom) / 2 + ")");

    g.append("g")
      .selectAll("g")
      .data(stackLayout(cumulativeTrades))
      .enter()
      .append("g")
        .attr("fill", d => colorScale(d.key))
        .attr("class", d => this.props.hoverElement === d.key ? "hoverable active" : "hoverable")
      .selectAll("path")
      .data(function(d) {return d })
      .enter()
      .append("path")
        .attr("d", d3.arc()
          .innerRadius(d => yScale(d[0]))
          .outerRadius(d => yScale(d[1]))
          .startAngle(d => xScale(d.data.Label))
          .endAngle(d => xScale(d.data.Label) + xScale.bandwidth())
          .padAngle(0.01)
          .padRadius(innerRadius));

      const label =
        g.append("g")
        .selectAll("g")
        .data(cumulativeTrades)
        .enter()
        .append("g")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => {
          return "rotate(" + ((xScale(d.Label) + xScale.bandwidth() / 2) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

      label.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000")

      label.append("text")
        .attr("transform", function(d) { return (xScale(d.Label) + xScale.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI ? "rotate(90)translate(0,16)" : "rotate(-90)translate(0,-15)"; })
        .text(function(d) { return d.Label; });

      const yAxis = g.append("g")
        .attr("text-anchor", "end");

      const yTick = yAxis
        .selectAll("g")
        .data(yScale.ticks(5).slice(1))
        .enter().append("g");

      yTick.append("circle")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)

        .attr("r", yScale);

      yTick.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(d); })
        .attr("dy", "0.35em")
        .attr("fill", "none")
        .attr("stroke", "#fff")
        .attr("stroke-width", 5)
        .text(yScale.tickFormat(10, "s"));

      yTick.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(d); })
        .attr("dy", "0.35em")
        .text(yScale.tickFormat(10, "s"));

      yAxis.append("text")
        .attr("x", -6)
        .attr("y", function(d) { return -yScale(yScale.ticks(10).pop()); })
        .attr("dy", "-1em")
        .text("kWh");
  }

  render() {
    var classes ="";
      if (this.props.hoverElement !== 'none') {
        classes = "hovered";
      }

    return (
      <svg
          className="areaConsumption"
          width={this.props.size.width}
          height={this.props.size.height}
          ref="consumption"
          className={classes}
        />
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class ArcChart extends Component {
  tau = Math.PI * 2;

  componentDidMount() {
    this.drawArc();
  }

  componentDidUpdate() {
    this.redrawArc();
  }

  drawArc() {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context)
  }

  redrawArc() {
    const context= d3.select(`#${this.props.id}`);
    context.remove();
    this.drawArc();
  }

  setContext() {
    const {
      height,
      width,
      id
    } = this.props;

    return d3.select(this.refs.arc).append('svg')
      .attr('height', height)
      .attr('width', width)
      .attr('id', id)
      .append('g')
      .attr('transform', `translate(${height / 2 }, ${width / 2})`);
  }

  setBackground(context) {
    const backgroundColor = this.props.backgroundColor;
    return context.append('path')
      .datum({ endAngle: this.tau })
      .style('fill', backgroundColor)
      .attr('d', this.arc());
  }

  setForeground(context) {
    const {
      foregroundColor,
      percentComplete
    } = this.props;

    return context.append('path')
      .datum({ endAngle: this.tau * percentComplete})
      .style('fill', foregroundColor)
      .attr('d', this.arc());
  }

  arc() {
    const {
      innerRadius,
      outerRadius
    } = this.props;
    return d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .startAngle(0)
  }

  render(){
    return (
      <div ref="arc"/>
    )
  }
};

ArcChart.propTypes = {
  id: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  percentComplete: PropTypes.number,
};

ArcChart.defaultProps = {
};

export default ArcChart;

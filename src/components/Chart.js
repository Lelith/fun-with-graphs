import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class Chart extends Component {
  tau = Math.PI * 2;

  componentDidMount() {
     const context = this.setContext();
     this.setBackground(context);
     this.setForeground(context)
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
    return d3.arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0)
  }



  render(){
    return (
      <div ref="arc"/>
    )
  }
};


Chart.propTypes = {
  id: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  innerRadius: PropTypes.number,
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  percentComplete: PropTypes.number,
};

Chart.defaultProps = {
};

export default Chart;

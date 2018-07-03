import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import * as d3 from 'd3';

import Axes from './Axes';

export default class ProductionChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
  }

  render() {
    const margins = {top: 50, right: 20, bottom: 50, left: 40};

    const {
      productionData,
      areaNames,
      size
    } = this.props;

    const
      dataMax = d3.max(productionData, d =>(d.kWh)),
      width = this.props.size.width - margins.left - margins.right,
      height = this.props.height - margins.top - margins.bottom;

    const xScale = this.xScale
      .range([0, width])
      .domain(productionData.map(d => d.Label))
      .padding(0.5);

    const yScale = this.yScale
      .domain([0, dataMax])
      .range([height, 0]);


    return (
      <svg
        className="areaProduction"
        ref={node => this.node = node }
        width={size.width} height={size.height}
      >
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={size}
        />
      </svg>
          );
  }
}

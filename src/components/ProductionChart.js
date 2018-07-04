import React, { Component } from 'react';
import { legendColor } from 'd3-svg-legend';
import { scaleBand, scaleLinear } from 'd3-scale'

import Axes from './Axes';
import Bars from './Bars';

export default class ProductionChart extends Component {
  constructor(props) {
    super(props);

    this.xScale = scaleBand();
    this.yScale = scaleLinear();
  }

  render() {
    const margins = {top: 50, right: 20, bottom: 50, left: 40};

    const {
      productionData,
      areaNames,
      size
    } = this.props;

    const
      dataMax = Math.max(...productionData.map(d => d.kWh )),
      width = this.props.size.width - margins.left - margins.right,
      height = this.props.size.height - margins.top - margins.bottom;

    console.log(dataMax);
    const xScale = this.xScale
      .padding(0.5)
      .domain(productionData.map(d => d.Label))
      .range([margins.left, width])

    const yScale = this.yScale
      .domain([0, dataMax])
      .range([height, margins.top]);


    return (
      <svg
        className="areaProduction"
        ref={node => this.node = node }
        width={size.width}
        height={size.height}
      >
        <Axes
          scales={{ xScale, yScale }}
          margins={margins}
          svgDimensions={size}
        />

        <Bars
          scales={{ xScale, yScale }}
          size = {size}
          data = {productionData}
          labels = {areaNames}
          maxValue = {dataMax}
          margins = {margins}
        />
      </svg>
          );
  }
}

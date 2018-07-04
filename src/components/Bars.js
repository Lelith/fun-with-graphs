import React, { Component } from 'react'
import { scaleOrdinal } from 'd3';
import * as scale from 'd3-scale-chromatic'

export default class Bars extends Component {

  constructor(props) {
    super(props)

  }

  render(){
    const {
      scales,
      margins,
      data,
      size,
      labels,
      dataMax,
    } = this.props

    const {
      xScale,
      yScale
    } = scales;

    const { height } = size;
    console.log(labels.length);
    const colorScale = scaleOrdinal()
      .domain(labels)
      .range(scale.schemeSpectral[labels.length])

    const bars = (
      data.map(d =>
        <rect
          key = {d.Label}
          x = {xScale(d.Label)}
          y = {yScale(d.kWh)}
          height={height - margins.bottom - yScale(d.kWh)}
          width={xScale.bandwidth()}
          fill = {colorScale(d.Label)}
        />,
      )
    );

    return (
      <g>
        {bars}
      </g>
    )

  }
}

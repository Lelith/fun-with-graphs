import React  from 'react';
import * as d3 from 'd3';
import * as scale from 'd3-scale-chromatic'

import Axes from './Axes';

const ProductionChart = (props) =>{
    const margins = {top: 50, right: 20, bottom: 50, left: 40};

    const {
      productionData,
      areaNames,
      size
    } = props;

    const
      dataMax = Math.max(...productionData.map(d => d.kWh )),
      width = size.width - margins.left - margins.right,
      height = size.height - margins.top - margins.bottom;

    const xScale = d3.scaleBand()
      .padding(0.5)
      .domain(productionData.map(d => d.Label))
      .range([margins.left, width]);

    const yScale = d3.scaleLinear()
      .domain([0, dataMax])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal()
      .domain(areaNames)
      .range(scale.schemeBuPu[areaNames.length]);

    const bars =(
      productionData.map(d =>
        <rect
        key = {d.Label}
        x = {xScale(d.Label)}
        y = {yScale(d.kWh)}
        height={height - yScale(d.kWh)}
        width={xScale.bandwidth()}
        fill = {colorScale(d.Label)}
        className = {props.hoverElement === d.Label? "bar hoverable active": "har hoverable"}
        onMouseOver= {() => {props.onMouseIn(d.Label)}}
        onMouseOut={()=>{props.onMouseOut()}}
        />
      )
    );

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
        {bars}
      </svg>
    );
  }
export default ProductionChart;

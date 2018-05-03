import React, { Component } from 'react';
import * as d3 from "d3";

export default class extends Component {
  componentDidMount() {
    this.drawStuff();
  }

  drawStuff(){
    const someNumbers = [17, 82, 9, 500, 40];
    const smallerNumbers = someNumbers.filter(
      function(el) {return el <= 40 ? el : null});
      console.log(smallerNumbers);
    d3.select(this.refs.fungraph).selectAll("div")
      .data(smallerNumbers)
      .enter()
      .append('div')
      .html(function(d){return d})
  }

  render() {

    var divStyle = {
      border: 'solid 1px purple',
      width: '200px',
      height: '50px',
    };

    var wrapperDivStyle = {
      border: 'dashed 1px lime',
    };
    return (
      <div style={wrapperDivStyle} ref="fungraph">
      </div>
    );
  }
}

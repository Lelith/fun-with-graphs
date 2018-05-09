import React, { Component } from 'react';
import './App.css';
import { scaleThreshold } from 'd3-scale'
import FunGraph from './components/FunGraph';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {percentComplete: 0.3};
    this.togglePercent = this.togglePercent.bind(this);
  }

  togglePercent() {
    const percentage = this.state.percentComplete ===0.3 ? 0.7 : 0.3;
    this.setState({percentComplete: percentage});
  }

  render() {
    const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

    return (
      <div className="App">
        <FunGraph
          colorScale={colorScale}
          data={[5,10,8,3]} size={[500,500]}
         />
      </div>
    );
  }
}

export default App;

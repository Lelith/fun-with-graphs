import React, { Component } from 'react';
import './App.css';
import { range, scaleThreshold, geoCentroid } from 'd3'
import FunGraph from './components/FunGraph';
import worlddata from "./components/world";

const appdata = worlddata.features .filter(d => geoCentroid(d)[0] < -20);

appdata.forEach((d,i) => {
  const offset = Math.random();
  d.launchday = i;
  d.data = range(30).map((p,q) =>
    q < i ? 0 : Math.random() * 2 + offset
  );
});

const colorScale = scaleThreshold().domain([5,10,20,30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"])

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

    return (
      <div className="App">
        <FunGraph
          colorScale={colorScale}
          data={appdata}
          size={[650,500]}
         />
      </div>
    );
  }
}

export default App;

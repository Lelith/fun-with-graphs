import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart'

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
      <button onClick={this.togglePercent}>Toggle Arc</button>
        <Chart
          id="myArc"
          height={400}
          width={400}
          outerRadius={110}
          innerRadius={100}
          foregroundColor="deeppink"
          backgroundColor="silver"
          percentComplete={this.state.percentComplete}
        />
      </div>
    );
  }
}

export default App;

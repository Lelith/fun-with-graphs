import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chart
          id="myArc"
          height= {400}
          width= {400}
          foregroundColor="deeppink"
          backgroundColor="silver"
          percentComplete={0.15}
        />
      </div>
    );
  }
}

export default App;

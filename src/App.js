import React, { Component } from 'react';
import './App.css';
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
    return (
      <div className="App">
        <FunGraph />
      </div>
    );
  }
}

export default App;

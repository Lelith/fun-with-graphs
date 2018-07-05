import React, { Component } from 'react';
import './App.css';

import ProductionChart from './components/ProductionChart';
import TradeChart from './components/TradeChart';

const appdata = {
  isRequesting: false,
  unit: 'kWh',
};

const productionData = [
    {
      'Label': 'Cell Tower',
      'kWh': 0,
    },
    {
      'Label': 'House 1',
      'kWh': 0.7681000000000002,
    },
    {
      'Label': 'House 2',
      'kWh': 0,
    },
    {
      'Label': 'House 3',
      'kWh': 0.9049000000000001,

    },
    {
      'Label': 'House 4',
      'kWh': 4.614199999999998,
    },
    {
      'Label': 'House 5',
      'kWh': 2.057499999999999,
    }
  ];

  const areaNames = [
    'Cell Tower',
    'House 1',
    'House 2',
    'House 3',
    'House 4',
    'House 5'
  ];

const cumulativeGridTrades =
    [
      {
        'Label': 'Cell Tower',
        'Cell Tower': 0,
        'House 1': 0.4402000000000001,
        'House 2': 0,
        'House 3': 0.10360000000000001,
        'House 5': 0.5656,
        'House 4': 0.7405999999999999,
      },
      {
        'Label': 'House 1',
        'Cell Tower': 0,
        'House 1': 0.2589,
        'House 2': 0,
        'House 3': 0.0337,
        'House 5': 0.07510000000000001,
        'House 4': 0.3281,
      },
      {
        'Label': 'House 2',
        'Cell Tower': 0,
        'House 1': 0.05,
        'House 2': 0,
        'House 3': 0.025,
        'House 5': 0.16019999999999995,
        'House 4': 0.4010000000000001,
      },
      {
        'Label': 'House 3',
        'Cell Tower': 0,
        'House 2': 0,
        'House 3': 0.0407,
        'House 1': 0.019000000000000006,
        'House 5': 0.20640000000000003,
        'House 4': 0.40220000000000006,

      },
      {
        'Label': 'House 4',
        'Cell Tower': 0,
        'House 1': 0,
        'House 2': 0,
        'House 4':  2.203899999999998,
        'House 5': 0.28030000000000005,
        'House 3': 0.6151,
      },
      {
        'Label': 'House 5',
        'Cell Tower': 0,
        'House 2': 0,
        'House 1': 0,
        'House 5': 0.8342000000000004,
        'House 3': 0.1465,
        'House 4': 0.8728,
      }
    ];

    cumulativeGridTrades.map((area, i) => {
      var t = 0;
      for(var entry in area){
        if(entry !=='Label'){
            t += area[entry];
        }
        area.total = t;
      }
    })

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: 'none'
    }

    this.onMouseIn = this.onMouseIn.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
  }

  onMouseIn(hoverElement) {
    this.setState({ hover: hoverElement })
  }

  onMouseOut(){
    this.setState({hover: 'none'})
  }

  render() {

    return (
      <div className="App">
        <ProductionChart
          areaNames = {areaNames}
          productionData = {productionData}
          size={
            {width:600,
            height:600,}
          }
          hoverElement={this.state.hover}
          onMouseIn={this.onMouseIn}
          onMouseOut={this.onMouseOut}
        />
        <TradeChart
          areaNames = {areaNames}
          cumulativeTrades = {cumulativeGridTrades}
          hoverElement={this.state.hover}
          onMouseIn={this.onMouseIn}
          onMouseOut={this.onMouseOut}
          size={
            {width:600,
            height:600,}
          }
        />
      </div>
    );
  }
}

export default App;

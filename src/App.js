import React, { Component } from 'react';
import './App.css';
import { range, scaleLinear, geoCentroid, interpolateRgb } from 'd3';

import FunGraph from './components/FunGraph';

const appdata = {
  isRequesting: false,
  unit: 'kWh',
  areas: [
    'Cell Tower',
    'House 1',
    'House 2',
    'House 3',
    'House 4',
    'House 5'
  ],
  'cumulative-grid-trades':
    [
      {
        'Label': 'Cell Tower',
        'Cell Tower': 0,
        'House 1': 0.4402000000000001,
        'House 3': 0.10360000000000001,
        'House 5': 0.5656,
        'House 4': 0.7405999999999999,
      },
      {
        'Label': 'House 1',
        'House 1': -0.7681000000000002,
        'House 1': 0.2589,
        'House 3': 0.0337,
        'House 5': 0.07510000000000001,
        'House 4': 0.3281,
      },
      {
        'Label': 'House 2',
        'House 1': 0.05,
        'House 2': 0,
        'House 3': 0.025,
        'House 5': 0.16019999999999995,
        'House 4': 0.4010000000000001,
      },
      {
        'Label': 'House 3',
        'House 3': -0.9049000000000001,
        'House 3': 0.0407,
        'House 1': 0.019000000000000006,
        'House 5': 0.20640000000000003,
        'House 4': 0.40220000000000006,

      },
      {
        'Label': 'House 4',
        'House 4': -4.614199999999998,
        'House 4':  2.203899999999998,
        'House 5': 0.28030000000000005,
        'House 3': 0.6151,
      },
      {
        'Label': 'House 5',
        'House 5': -2.057499999999999,
        'House 5': 0.8342000000000004,
        'House 3': 0.1465,
        'House 4': 0.8728,
      }
    ],
  }

class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className="App">
        <FunGraph
          data={appdata}
          size={[950,600]}
         />
      </div>
    );
  }
}

export default App;

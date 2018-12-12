import React from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';

import Column from '../../components/Column';

class ResultPage extends React.Component {

  renderPieChart() {
    const { data } = this.props;
    let fraudCount = 0;
    let notFraudCount = 0;

    data.forEach(row => {
      if (parseInt(row.flag_transaksi_fraud) === 0) {
        notFraudCount++;
      }
      else {
        fraudCount++;
      }
    });

    const info = {
      labels: [
        'Not Fraud',
        'Fraud'
      ],
      datasets: [{
        data: [notFraudCount, fraudCount],
        backgroundColor: [
          '#E8C328',
          '#DC2624',
        ],
      }]
    };

    return <Pie 
      data={info}
    />
  }

  renderResults = () => {
    const { data } = this.props;
    console.log(data.slice(0,10));
    return data.slice(0, 100).map((row, index) => {
      return <Column key={index} data={row} />
    });
  }
  
  render() {
    return (
      <div className="container">
        <div className="header">
          Your Result is Here!
        </div>
        <div className="chart">
        {this.renderPieChart()}
        </div>
        <br></br>
        <div className="contents small-contents">
          <div className="table">
            <div className="column">ID</div>
            <div className="column">Result</div>
          </div>
          
          {this.renderResults()}
        </div>
      </div>
    )
  }
}

ResultPage.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ResultPage;

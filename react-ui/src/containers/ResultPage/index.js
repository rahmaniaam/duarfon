import React from 'react';
import PropTypes from 'prop-types';

import Column from '../../components/Column';

class ResultPage extends React.Component {
  renderResults = () => {
    const { data } = this.props;
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

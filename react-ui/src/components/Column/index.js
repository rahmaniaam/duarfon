import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ColumnContainer } from './style';

class Column extends Component {
  render() {
    const { X, flag_transaksi_fraud } = this.props.data;
    
    const id = parseInt(X);
    let str = '';

    if (parseInt(flag_transaksi_fraud) === 0) {
      str = 'Not Fraud';
    } else {
      str = 'Fraud';
    }

    return (
      <ColumnContainer>
        <div className="column">{id}</div>
        <div className="column">{str}</div>
      </ColumnContainer>
    );
  }
}

Column.propTypes = {
  data: PropTypes.shape({
    X: PropTypes.string.isRequired,
    flag_transaksi_fraud: PropTypes.string.isRequired,
  }).isRequired,
}

export default Column;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ColumnContainer } from './style';

class Column extends Component {
  render() {
    const { id, result } = this.props.data;
    let str = '';

    if (result === 0) {
      str = 'NOT FRAUD';
    } else {
      str = 'FRAUD';
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
    id: PropTypes.number.isRequired,
    result: PropTypes.number.isRequired,
  }).isRequired,
}

export default Column;

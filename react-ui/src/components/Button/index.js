import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ButtonContainer, CenterButtonContainer } from './style';

class Button extends Component {

  render() {
    const { center, src, text } = this.props;

    let last = true;
    let wide = true;

    if (src) {
      last = false;
      wide = false;
    }

    return (
      center
      ? <CenterButtonContainer wide>
          {text}
        </CenterButtonContainer>
      : <ButtonContainer wide={wide} last={last}>
          {
            src
            ? <img src={src} alt="arrow"/>
            : text
          }
        </ButtonContainer>
    );
  }
}

Button.propTypes = {
  center: PropTypes.bool,
  src: PropTypes.string,
  text: PropTypes.string,
}

export default Button;

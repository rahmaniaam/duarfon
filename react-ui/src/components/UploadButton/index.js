import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Button from '../Button';
import { UploadButtonContainer } from './style';

import UploadArrow from '../../assets/UploadArrow.svg';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
    }
    this.onClickUpload = this.onClickUpload.bind(this)
  }

  onClickUpload() {
    // const file = document.getElementById('file-input');
    // file.click();
    console.log("yoo");
    
  }

  render() {
    return (
      <UploadButtonContainer>
        <Button src={UploadArrow} />
        <input type="file" id="file-input" hidden></input>
        <Button text="Upload" center={true}/>
        <Button text="Next" center={false}/>
      </UploadButtonContainer>
    );
  }
}

UploadButton.propTypes = {

}

export default UploadButton;

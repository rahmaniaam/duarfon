import React, { Component } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';

import Button from '../Button';
import { UploadButtonContainer } from './style';

import UploadArrow from '../../assets/UploadArrow.svg';

class UploadButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      filename: '',
    }
    this.onClickUpload = this.onClickUpload.bind(this)
  }

  handleChange() {
    const file = document.getElementById('file-input');
    console.log(file.value);
    this.setState({
      file: file.files[0],
      filename: file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1] + '',
    })
  }

  onClickUpload() {
    const file = document.getElementById('file-input');
    file.click();
  }

  onUpload() {
    const { file, filename } = this.state;

    if (file) {
      const data = new FormData()
      data.append('file', file, filename);
  
      axios
        .post('http://localhost:5000/upload', data)
        .then(res => {
          console.log(res.statusText)
        })
    }
    
    console.log(file.files[0]);
    console.log(file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
  }

  render() {
    // <Button onClick={() => console.log("hei")} text="Upload" center={true}/>
    // <Button onClick={() => this.onClickUpload()} text="Next" center={false}/>
    const { filename } = this.state;

    return (
      <UploadButtonContainer>
        <Button src={UploadArrow} />
        <input type="file" id="file-input" hidden></input>
        
        <button type="button" onClick={() => this.onClickUpload()}>Upload</button>
        <button type="submit" onClick={() => this.onUpload()}>Next</button>
        
        <p>{filename}</p>
      </UploadButtonContainer>
    );
  }
}

UploadButton.propTypes = {

}

export default UploadButton;

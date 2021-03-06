import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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

  handleChange(event) {
    const file = event.target.files[0];
    console.log(file.name)
   
    this.setState({
      file: file,
      filename: file.name,
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
          this.props.onClickNext(res.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error.response);
        })
    }
    // console.log(file.files[0]);
    // console.log(file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
  }

  render() {
    const { filename } = this.state;

    const nextButtonStyle = {
      width: "7rem",
      height: "3rem",
      float: "left",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      fontSize: "1rem",
      fontWeight: "100",
      color: "#fff",
      backgroundColor: "#000",
      border: "2px solid #fff",
      borderRadius: "0 6px 6px 0",
      cursor: "pointer",
    }

    const uploadButtonStyle = {
      width: "7rem",
      height: "3rem",
      float: "left",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      fontSize: "1rem",
      fontWeight: "100",
      color: "#fff",
      backgroundColor: "#000",
      border: "2px solid #fff",
      cursor: "pointer",
    }

    return (
      <React.Fragment>
        <UploadButtonContainer>
          <Button src={UploadArrow} />
          <input onChange={(e) => this.handleChange(e)} type="file" id="file-input" name="file" hidden></input>
          
          <button style={uploadButtonStyle} type="button" onClick={() => this.onClickUpload()}>Upload</button>
          <button style={nextButtonStyle} type="submit" onClick={() => this.onUpload()}>Next</button>
          <br/>
        </UploadButtonContainer>
        <p>{filename}</p>
      </React.Fragment>
    );
  }
}

UploadButton.propTypes = {
  onClickNext: PropTypes.func.isRequired,
}

export default UploadButton;

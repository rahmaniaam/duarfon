import React, { Component } from 'react';
import './App.css';

import Button from './components/Button';
import UploadButton from './components/UploadButton';

import NextArrow from './assets/NextArrow.svg';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="header">
            DuarfOn
          </div>
          <div className="contents small-contents">
            Making fraud not safe
          </div>
        </div>
        <div className="container">
          <div className="header">
            Making
            <br></br>
            Frauders
            <br></br>
            Think Twice
          </div>
          <br></br>
          <div className="contents small-contents">
            Will it be possible for customers’ cards to become confidently secure everytime they are blinking? 
            Now we built cards with brains. 
            We protect cards from fraudulence done by illegitimate users.
          </div>
        </div>
        <div className="container">
          <div className="header">
            They are Smart
            <br></br>
            But We are
            <br></br>
            Smarter!
          </div>
          <br></br>
          <div className="contents small-contents">
            We perform Machine Learning technique in constructing our agent. 
            It is developed to learn patterns and implement them to configure complete performances of credit card fraud detection task. 
            The given initial credit card transaction data set, in which identified transaction’s fraud flag is attached, will be examined using certain algorithms. 
            The product later will assist the agent to recognize patterns in determining whether a transaction is categorized as a fraud or not.
          </div>
        </div>
        <div className="container">
          <div className="header">
            Give It A Try!
          </div>
          <br></br>
          <div className="contents large-contents">
            <div className="panels">
              <div className="panel">
                Prepare your data.  
                It must contain these categories: wawawa. 
                You can also include additional categories.
              </div>
              <div className="panel">
                You can input your file manualy to the availabe fields or 
                upload your  own .csv format file. 
                Click here to see .csv exmple file. 
              </div>
              <div className="panel">
                Scroll down. 
                Upload your file by clicking the ‘Upload’ button, 
                then click ‘Next’.
              </div>
              <div className="panel">
                Or scroll down again. 
                Fill the fileds based on the category.
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="header">
            Try It Now!
          </div>
          <br></br>
          <div className="contents small-contents">
            Upload your file
          </div>
          <UploadButton></UploadButton>
        </div>
        <div className="container">
          <div className="header">
            Try It Now!
          </div>
          <br></br>
          <div className="contents small-contents">
            Input it manually
          </div>
          <div className="buttons">
            <Button src={NextArrow} />
            <Button text="Next" center={false}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

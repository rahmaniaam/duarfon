import React, { Component } from 'react';
import './App.css';

import UploadButton from './components/UploadButton';
import Column from './components/Column';

import Team from './assets/Team.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
    }
  }

  isEmptyData() {
    const { data } = this.state;

    return data === null;
  }

  onClickUpload = (data) => {
    this.setState({
      data: data
    })
  }

  renderResults = (data) => {
    const ids = data.X;
    const results = data.flag_transaksi_fraud;
    return ids.map((id, index) => {
      <Column data={{id: id, result: results[index]}} />
    });
  }

  render() {
    const { data } = this.state;

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
                <br/>
                It must contain those categories 
                <br/>
                that can be seen in .csv example file.
              </div>
              <div className="panel">
                Scroll down. 
                <br/>
                Upload your file by clicking
                <br/>
                the ‘Upload’ button, then click ‘Next’.
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
            Upload your .csv file
          </div>
          <UploadButton onClickNext={this.onClickUpload} />
        </div>
        {
          !this.isEmptyData()
          && <div className="container">
              <div className="header">
                Your Result is Here!
              </div>
              <br></br>
              <div className="contents small-contents">
                <div className="table">
                  <div className="column">ID</div>
                  <div className="column">Result</div>
                </div>
                {this.renderResults(data)}
              </div>
            </div>
        }
        <div className="container">
          <div className="header">
            Our Team
          </div>
          <br></br>
          <div className="contents small-contents">
            <img className="team-image" src={Team} alt="the-team" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

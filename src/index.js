import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { abiVoting, addressVoting, abiMyOwnToken, addressMyOwnToken } from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voting: web3.eth.contract(abiVoting).at(addressVoting)
    };
  }

  componentDidMount() {
    console.log('hola');
    if (typeof web3 !== 'undefined') {
      console.log('already');
      web3 = new Web3(web3.currentProvider);
    } else {          
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
      console.log('just set');
    } 
  }  

  newOption() {
    this.state.voting.newOption(function(error, result) {
      if (!error) {
        console.log(result);
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <button onClick={() => this.newOption()}>button</button>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
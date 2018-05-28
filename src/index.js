import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';

class App extends React.Component {
  constructor(props) {
    super(props);
    //constをclassの外に出す
    const abiVoting = [
      {
        "constant": false,
        "inputs": [],
        "name": "newOption",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "options",
        "outputs": [
          {
            "name": "id",
            "type": "uint256"
          },
          {
            "name": "point",
            "type": "uint8"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const addressVoting = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";
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
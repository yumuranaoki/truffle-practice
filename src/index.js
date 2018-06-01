import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { abiVoting, addressVoting, abiMyOwnToken, addressMyOwnToken } from './config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.voting = web3.eth.contract(abiVoting).at(addressVoting);
    this.myOwnToken = web3.eth.contract(abiMyOwnToken).at(addressMyOwnToken);
    //すべてのtoken（もしくは自分のtoken）をpropertyとして持ち、id, price, addressを表示
  }

  componentDidMount() {
    if (typeof web3 !== 'undefined') {      
      web3 = new Web3(web3.currentProvider);
    } else {          
      web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    }
    this.myOwnToken.Transfer([{_to: web3.eth.accounts[0]}], function(err, result) {
      if (!err) {
        console.log(result.args._tokenId.c[0]);
      } else {
        cosole.log(err);
      }
    })
  }

  newOption() {
    this.voting.newOption(function(error, result) {
      if (!error) {
        console.log(result);
      } else {
        console.log(error);
      }
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value}); 
  }

  handleSubmit() {
    this.myOwnToken.mint(this.state.value, function(error, result) {
      if (!error) {
        console.log("success");
      } else {
        console.log(error);
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={event => this.handleSubmit()}>
          <label>
            Value
            <input type="text" value={this.state.value} onChange={event => this.handleChange(event)} />
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
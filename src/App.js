import React from 'react';
import './App.css';
import * as math from 'mathjs';
import { cos, permutations } from 'mathjs';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1,2,3],
      display: 6
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  permutations(arr) {  
    var permArr = [], usedChars = [];
    function permute(input) {          
          var i, ch;
          for (i = 0; i < input.length; i++) {
            ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length === 0) {
              permArr.push(usedChars.slice());
            }
            permute(input);
            input.splice(i, 0, ch);
          
            usedChars.pop();
          }
          // return permArr
    } 
    permute(arr);
    // display permutations
    let list = document.querySelector("#perms");
    permArr.forEach((i) => {
      let span = document.createElement('span');
      list.appendChild(span);
      span.innerHTML += i;
    })
}

  compPerms(n) {
    // number of items in array
    let count = n.length;
    // number of possible permutations
    let num = math.permutations(count);
    // Get list of all permutations
    this.permutations(n);
    // console.log(perms);
    // update state
    this.setState({display: num})
    // console.log(this.state.totalPerms);
  }

  handleChange(event) {
    this.setState({data: event.target.value.split(',')});
    // console.log(this.state.data)
  }


  handleSubmit(event) {
    alert('Data was submitted: ' + this.state.data);
    event.preventDefault();
    // this.setState({data:})
    this.compPerms(this.state.data);
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Data Set:
            <input type="text" value={this.state.data} onChange={this.handleChange} placeholder={[1,2,3]} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div class="display">
          <h3>Permutations</h3>
          <div class="total">total: { this.state.display }</div>
          <div id="perms"></div>
        </div>
      </div>
    );
  }
}

export default App;

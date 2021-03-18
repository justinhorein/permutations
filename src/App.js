import React from 'react';
import './App.css';
import * as math from 'mathjs';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // default
      data: [1,2,3],
      display: 6,
      totPerms: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
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
    } 
    permute(arr);

    return permArr;
}

  compPerms(n) {
    // number of items in array
    let count = n.length;
    // get total number of possible perms and save to state
    let num = math.permutations(count);
    this.setState({display: num})
    // get array of all possible perms and save to state
    let totPerms = this.permutations(n);
    this.setState({totPerms: totPerms});
  }

  handleChange(event) {
    this.setState({data: event.target.value.split(',')});
  }


  handleSubmit(event) {
    alert('Data was submitted: ' + this.state.data);
    event.preventDefault();
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
        <div className="display">
          <h3>Permutations</h3>
          <div className="total">total: { this.state.display }</div>
          <div id="perms">
            {this.state.totPerms.map(item => (
              <span key={item}>{item.toString()}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

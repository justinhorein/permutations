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
      totPerms: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],
      error: ""
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
    let totPerms = this.permutations(n.toString().replace(/\s*$/,'').split(','));
    this.setState({totPerms: totPerms});
  }

  handleChange(event) {
    // Update data array
    this.setState({data: event.target.value.split(',')});
    // Check that input is present
    let error = this.state.error;
    const value = event.target.value;
    error = value.length === 0 ? "Input can't be blank!": "";
    this.setState({error:error});
  }


  handleSubmit(event) {
    if (this.state.error === "") {
    alert('Data was submitted: ' + this.state.data);
    event.preventDefault();
    this.compPerms(this.state.data);
    } else {
      alert("Input can't be blank!");
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="App">
        <h3>Permutations</h3>
        <div className="container">
          <div className="instructions">
            Please enter data seperated by commas. Spaces are included (except for after last entry).
          </div>
          <form onSubmit={this.handleSubmit}>          
              <h4>Data Set:</h4> 
              <textarea type="text" style={{height:100, width: 300}} className="box" name="input" value={this.state.data} onChange={this.handleChange} placeholder={[1,2,3]}></textarea>
            <div className="error">{this.state.error}</div>
            <input type="submit" className="submit" value="Submit" />
            
          </form>
          
        </div>
        <div className="display">
          
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

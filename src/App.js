import React from 'react';
import './App.css';
import * as math from 'mathjs';
import { permutations } from 'mathjs';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      display: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  permutations(arr) {
    
}

  compPerms(n) {
    let arr = n.split(',')
    // add all permutations to array
    let perms = permutations(arr);
    // update state
    this.setState({display: perms})
  }

  handleChange(event) {
    this.setState({data: event.target.value});
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
        <h3>Permutations</h3>
        <div>{ this.state.display }</div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';

interface Props {
  passStr:string;
  country: Country;
  rivers: Array<string>
}

interface State {
  users: Array<User>; 
}

interface User {
  id: number;
  name: string;  
}

interface Country {
  name: string;
}

class App extends Component <Props, State>{
 state:State = {
  users: []
 }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <div>{this.props.passStr}</div> 
        <hr />
        <div>{this.props.rivers.map(river => <div key={river}>{river}</div>)}</div>
        <hr />
        <div>{this.props.country.name}</div>
        <hr />
        <div>{this.state.users.map(user => <div key={user.id}>{user.name}</div>)}</div>
      </div>
    );
  }
}

export default App;

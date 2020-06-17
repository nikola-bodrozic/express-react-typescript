import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import axios from 'axios';
import About from "./About";
import List from "./List";
import Detail from './Detail'

interface AppProps {
  passStr: string;
  country: Country;
  rivers: Array<string>
}

interface AppState {
  users: Array<User>;
}

interface User {
  id: number;
  name: string;
}

interface Country {
  name: string;
}

class App extends Component<AppProps, AppState>{
  state: AppState = {
    users: []
  }

  getUsers = async () => {
    try {
      const response = await axios.get('/users');
      const users = response.data
      this.setState({ users })
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  render(): React.ReactNode {
    return (
      <div className="App">
        <div>{this.props.rivers.map(river => <div key={river}>{river}</div>)}</div>
        <hr />
        <div>{this.props.country.name}</div>
        <hr />
        <div>{this.state.users.map(user => <div key={user.id}>{user.name}</div>)}</div>
        <div className="App-border">
          <Router>
            <Switch>
              <Route exact path="/" component={List} />
              <Route
                path="/product/:name"
                render={props => <Detail history={props.history} location={props.location} match={props.match} />}
              />
              <Route path="/about" component={About} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;



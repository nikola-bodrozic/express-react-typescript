import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import axios from "axios";
import About from "./components/About";
import List from "./components/List";
import Detail from './components/Detail'

interface AppProps {}

interface AppState {
  users: Array<User>;
  task: string;
}

interface User {
  id: number;
  name: string;
}

interface Task {
  title: string;
}

class App extends Component<AppProps, AppState>{
  state: AppState = {
    users: [],
    task: ""
  }
  
  baseUrl = 'http://localhost:3008'

  validateName = (users: User[]) => {
    const filtered: User[] = users.filter(user => user.name.length > 1)
    return filtered;
  }

  getUsers = async () => {
    try {
      // debugger;
      if (process.env.NODE_ENV === "production") {
        baseUrl = 'http://158.101.175.223:3008'
      }
      let response = await axios.get(this.baseUrl + '/users');
      let users = response.data
      users = this.validateName(users);
      this.setState({ users })
      response = await axios.get(this.baseUrl + '/task');
      let task = response.data.task
      this.setState({task})     
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
        <div>{this.state.task}</div>
        <hr />
        <div>{this.state.users.map(user => <div key={user.id}>{user.name}</div>)}</div>
        <hr />
        <div>
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



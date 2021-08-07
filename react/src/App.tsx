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
import ApiCalls from './components/ApiCalls'
import AxiosTimeout from './components/AxiosTimeout'

interface AppState {
  users: Array<User>;
  task: string;
  loader: boolean;
}

interface User {
  id: number;
  name: string;
}

interface Task {
  title: string;
}

class App extends Component<{}, AppState> {
  state: AppState = {
    users: [],
    task: "",
    loader: true
  }
  
  baseUrl = 'http://' + process.env.REACT_APP_NODE_IP

  validateName = (users: User[]) => {
    const filtered: User[] = users.filter(user => user.name.length > 1)
    return filtered;
  }

  getUsers = async () => {
    try {
      const response1 = await axios.get(this.baseUrl + '/task');
      let task = response1.data.task
      this.setState({
        task: task
      })
      
      const response2 = await axios.get(this.baseUrl + '/users');
      let users = response2.data
      users = this.validateName(users);
      this.setState({ 
        users:users, 
        loader: false 
      })   
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
        <div>{this.state.loader ? 'loading...' : this.state.users.map(user => <div key={user.id}>{user.name}</div>)}</div>
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
        <hr />
        <AxiosTimeout />
        <hr />
        <ApiCalls />
        <hr />

      </div>
    );
  }
}

export default App;



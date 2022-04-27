import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import ErrorPage from "./Pages/ErrorPage";
import axios from "axios";
import { SpinnerCircular } from 'spinners-react';
import AxiosRetry from './Pages/AxiosRetry'
import AxiosTimeout from './Pages/AxiosTimeout'

function App() {
  interface IUser {
    id: number;
    name: string;
  }
  let baseUrl = process.env.REACT_APP_NODE_IP || 'localhost:3008';
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const validateName = (users: IUser[]) => {
    const filtered: IUser[] = users.filter(user => user.name.length > 1)
    return filtered;
  }

  const getData = async () => {
    try {
      let res = await axios.get('http://' + baseUrl + '/users');
      let users = res.data
      users = validateName(users);
      setUsers(users)

      res = await axios.get('http://' + baseUrl + '/task');
      let task = res.data.task
      setTask(task);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="App">
      <div className='App-border'>
        {loading ? <SpinnerCircular thickness={200} /> : task}
      </div>
      <div className='App-border'>
        {users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
      <div className='App-border'>
        <Router>
          <nav>
            <Link to="/"> Home | </Link>
            <Link to="/about"> About | </Link>
            <Link to="/profile/TestUser"> Profile </Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </div>
      <div className='App-border'>
        <AxiosRetry />
      </div>
      <div className='App-border'>
        <AxiosTimeout />
      </div>
    </div>
  );
}

export default App;

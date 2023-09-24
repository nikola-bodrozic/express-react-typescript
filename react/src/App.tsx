import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Profile from "./Components/Profile";
import ErrorPage from "./Components/ErrorPage";
import axios from "axios";
import { SpinnerCircular } from 'spinners-react';
import AxiosRetry from './Components/AxiosRetry'
import AxiosTimeout from './Components/AxiosTimeout'
import { axiosClient } from './axiosClient';

function App() {
  interface IUser {
    id: number;
    name: string;
  }
  
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const validateName = (users: IUser[]) => {
    const filtered: IUser[] = users.filter(user => user.name.length > 1)
    return filtered;
  }

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      try {
        let res = await axiosClient.get('/users');
        let users = res.data;
        users = validateName(users);
        setUsers(users);

        res = await axiosClient.get('/task');
        let task = res.data.task
        setTask(task);

        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    }
    getData();
    return () => {
      mounted = false
    }
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

import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { SpinnerCircular } from 'spinners-react';
import { axiosClient } from './axiosClient';

function App() {
  interface IUser {
    id: number;
    name: string;
  }

  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      try {
        // Making concurrent requests
        const [resUsers, resTask] = await axios.all([
          axiosClient.get('/users'),
          axiosClient.get('/task/1')
        ]);

        // Handling responses
        const users = resUsers.data;
        const task = resTask.data[0].title;

        // Updating state if component is still mounted
        if (mounted) {
          setUsers(users);
          setTask(task);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
    return () => {
      mounted = false;
    }
  }, []);


  return (
    <div className="App">
      <div className='App-border'>
        {loading ? <SpinnerCircular thickness={200} /> : <p>{task}</p>}
      </div>
      <div className='App-border'>
        {loading ? <SpinnerCircular thickness={200} /> : users.map(user => <div key={user.id}>{user.name}</div>)}
      </div>
    </div>
  );
}

export default App;

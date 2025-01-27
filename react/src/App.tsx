import React, { useState, useEffect } from 'react';
import './App.css';
import { SpinnerCircular } from 'spinners-react';
import AxiosRetry from './Components/AxiosRetry'
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
        // from database
        const resTask = await axiosClient.get('/task');
        console.log(resTask.data.title)
        setTask(resTask.data.title);

        // from array in Express
        const resUsers = await axiosClient.get('/users');
        const users = resUsers.data;
        setUsers(users);

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
        <AxiosRetry />
      </div>
    </div>
  );
}

export default App;

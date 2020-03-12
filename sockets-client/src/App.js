import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';

let socket;

function App() {

  const [ serverTime, setServerTime ] = useState('');

  useEffect(() => {
    socket = io('http://localhost:3000');
    socket.on('connect', function(){
      console.log('Connected socket');
    });
    socket.on('message', (msg) => {
      console.log(msg);
    });
    socket.on('time-update', ({ time }) => {
      console.log(time);
      setServerTime(time);
    })
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        { serverTime }
      </header>
    </div>
  );
}

export default App;

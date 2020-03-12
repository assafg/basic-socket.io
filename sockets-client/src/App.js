import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';

let socket;

function App() {

  const [ text, setText ] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io('http://localhost:3000');
    
    socket.on('connect', function(){
      console.log('Connected socket');
    });

    socket.on('message', ({ msg }) => {
      console.log('msg', msg);
      
      setMessage(msg);
    });

    socket.on('updateText', ({ text }) => {
      setText(text);
    });
  }, []);
  
  const handleOnChange = (e) => {
    const _text = e.target.value; 
    setText(_text);
    socket.emit('updateText', { text: _text });
  }

  return (
    <div className="App">
      {message && <h2>{ message } </h2>}
      <TextField 
        multiline 
        rowsMax="20"
        onChange={handleOnChange} 
        value={text}
      />
    </div>
  );
}

export default App;

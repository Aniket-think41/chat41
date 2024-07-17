import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleMessageSubmit = async () => {
    if (!inputText.trim()) return;

    const newMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputText('');

    try {
      const response = await axios.post('http://localhost:5000/ask', {
        question: inputText,
      });

      const botMessage = { text: response.data.answer, sender: 'bot' };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error('Error:', error.message);
      const errorMessage = { text: 'Error fetching response', sender: 'bot' };
      setMessages([...messages, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit();
    }
  };

  return (
    <div className="App">
      <div className="chat-window">
        <div className="chat-header">
          <img src={logo} alt="Logo" className="logo" />
          <h2>Chat with Chat41</h2>
        </div>
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress} // Use the refactored function here
          />
          <button onClick={handleMessageSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;

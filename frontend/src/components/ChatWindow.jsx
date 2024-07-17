import React, { useState } from 'react';
import Message from './Message';
import '../App.css'; // Import styles
import logo from '../logo.png';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = async (messageText) => {
    // Handle sending message to backend or AI model (for demo, echo message)
    const newMessage = { text: messageText, sender: 'user' };
    setMessages([...messages, newMessage]);

    // Example response from backend or AI model
    const botMessage = { text: `Response to "${messageText}"`, sender: 'bot' };
    setMessages([...messages, botMessage]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Chat with Think41</h2>
      </div>
      <div className="message-list">
        {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))}
      </div>
      <div className="message-input">
        <input type="text" placeholder="Type your message..." />
        <button onClick={() => handleMessageSubmit("User message")}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

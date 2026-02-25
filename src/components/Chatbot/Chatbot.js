import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
const apiUrl = 'https://bhagavad-gita-api-rbihcaaz5a-uc.a.run.app';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { 
      text: 'Hello! I\'m your Bhagavad Gita assistant. How can I help you today?', 
      sender: 'bot', 
      feedback: null,
      question: null,
      answer: null,
      sources: [],
      message_id: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Generate or retrieve unique user ID
  const getUserId = () => {
    let userId = localStorage.getItem('bhagavad_gita_user_id');
    if (!userId) {
      // Generate a unique ID using timestamp and random string
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('bhagavad_gita_user_id', userId);
    }
    return userId;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeedback = async (index, feedbackType) => {
    const message = messages[index];
    const newFeedback = message.feedback === feedbackType ? null : feedbackType;
    
    // Update UI immediately
    setMessages(prev => prev.map((msg, i) => {
      if (i === index) {
        return { ...msg, feedback: newFeedback };
      }
      return msg;
    }));

    // Send feedback to API only if we have the necessary data and feedback is being set (not removed)
    if (newFeedback && message.question && message.answer) {
      try {
        const feedbackUrl = `${apiUrl}/feedback`;
        
        await fetch(feedbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: message.question,
            answer: message.answer,
            liked: newFeedback === 'like',
            user_id: getUserId(),
            conversation_id: "1IGGr8YUBo8ZxduTRqeX",
            message_id: message.message_id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sources: message.sources || [],
            feedback_text: newFeedback === 'like' ? 'User liked this answer' : 'User disliked this answer'
          })
        });
      } catch (error) {
        console.error('Error sending feedback:', error);
        // Don't show error to user, feedback UI is already updated
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { 
      text: input, 
      sender: 'user', 
      feedback: null,
      question: input,
      answer: null,
      sources: [],
      message_id: null
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
 
      
      const response = await fetch(`${apiUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: input,
          user_id: getUserId(),
          save_to_history: true,
          conversation_id: "1IGGr8YUBo8ZxduTRqeX"
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const botMessage = { 
        text: data.answer || 'I\'m sorry, I couldn\'t find an answer to that question.', 
        sender: 'bot', 
        feedback: null,
        question: input,
        answer: data.answer || 'I\'m sorry, I couldn\'t find an answer to that question.',
        sources: data.sources || [],
        message_id: data.message_id || `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        text: 'Sorry, I encountered an error. Please try again later.', 
        sender: 'bot', 
        feedback: null,
        question: input,
        answer: 'Sorry, I encountered an error. Please try again later.',
        sources: [],
        message_id: null
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Bhagavad Gita Assistant</h3>
        <button className="close-button" onClick={onClose} aria-label="Close chat" title="Close chat">
          ✕
        </button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.text}
            </div>
            {message.sender === 'bot' && (
              <div className="feedback-buttons">
                <button 
                  className={`feedback-btn ${message.feedback === 'like' ? 'active' : ''}`}
                  onClick={() => handleFeedback(index, 'like')}
                  aria-label="Like this answer"
                  title="Like this answer"
                >
                  👍
                </button>
                <button 
                  className={`feedback-btn ${message.feedback === 'dislike' ? 'active' : ''}`}
                  onClick={() => handleFeedback(index, 'dislike')}
                  aria-label="Dislike this answer"
                  title="Dislike this answer"
                >
                  👎
                </button>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message bot">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about Bhagavad Gita..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

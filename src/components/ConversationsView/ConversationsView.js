import React, { useState, useEffect } from 'react';
import './ConversationsView.css';

const apiUrl = 'https://bhagavad-gita-api-669294246288.us-central1.run.app';
const adminKey = '0ln1iykvncocr1bKrdkwu0jtEOucnddf-ZZMEChaJyA';

const ConversationsView = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedUsers, setExpandedUsers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // PIN code - same as feedback stats
  const ADMIN_PIN = '1234';

  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
    }
  }, [isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid PIN code. Please try again.');
      setPinInput('');
    }
  };

  const fetchConversations = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${apiUrl}/api/admin/users-qa?limit=100&offset=0`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-admin-key': adminKey,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch conversations');

      const data = await response.json();
      setUsersData(data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleUserExpansion = (userId) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const filteredUsers = usersData?.users?.filter(user => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      user.user_id.toLowerCase().includes(searchLower) ||
      user.conversations.some(conv => 
        conv.title.toLowerCase().includes(searchLower) ||
        conv.topics.some(topic => topic.toLowerCase().includes(searchLower))
      )
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="conversations-overlay" onClick={onClose}>
        <div className="conversations-container pin-entry" onClick={(e) => e.stopPropagation()}>
          <div className="conversations-header">
            <h2>🔒 Admin Access Required</h2>
            <button className="close-button" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
          <div className="pin-entry-content">
            <p>Please enter the PIN code to access conversations</p>
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN"
                className="pin-input"
                maxLength="6"
                autoFocus
              />
              {pinError && <p className="pin-error">{pinError}</p>}
              <button type="submit" className="pin-submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="conversations-overlay" onClick={onClose}>
      <div className="conversations-container" onClick={(e) => e.stopPropagation()}>
        <div className="conversations-header">
          <h2>💬 User Conversations</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading conversations...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={fetchConversations} className="retry-button">
              Retry
            </button>
          </div>
        ) : usersData ? (
          <div className="conversations-content">
            {/* Summary Stats */}
            <div className="summary-stats">
              <div className="stat-box">
                <h3>{usersData.total_users}</h3>
                <p>Total Users</p>
              </div>
              <div className="stat-box">
                <h3>{usersData.users?.reduce((sum, user) => sum + user.conversation_count, 0)}</h3>
                <p>Total Conversations</p>
              </div>
              <div className="stat-box">
                <h3>{usersData.users?.reduce((sum, user) => sum + user.user_profile.total_messages, 0)}</h3>
                <p>Total Messages</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search by user ID, conversation title, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Users List */}
            <div className="users-list">
              {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.user_id} className="user-card">
                    <div className="user-header" onClick={() => toggleUserExpansion(user.user_id)}>
                      <div className="user-info">
                        <h3>👤 {user.user_id}</h3>
                        <div className="user-meta">
                          <span>📅 Last Active: {formatDate(user.user_profile.last_active)}</span>
                          <span>💬 {user.conversation_count} conversations</span>
                          <span>📝 {user.user_profile.total_messages} messages</span>
                        </div>
                      </div>
                      <button className="expand-button">
                        {expandedUsers.has(user.user_id) ? '▼' : '▶'}
                      </button>
                    </div>

                    {expandedUsers.has(user.user_id) && (
                      <div className="conversations-table-wrapper">
                        <table className="conversations-table">
                          <thead>
                            <tr>
                              <th>Conversation ID</th>
                              <th>Title</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Messages</th>
                              <th>Topics</th>
                              <th>Chapters</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.conversations.map((conv) => (
                              <tr key={conv.conversation_id}>
                                <td className="conv-id">{conv.conversation_id}</td>
                                <td className="conv-title">{conv.title}</td>
                                <td>{formatDate(conv.created_at)}</td>
                                <td>{formatDate(conv.updated_at)}</td>
                                <td className="text-center">{conv.message_count}</td>
                                <td>
                                  <div className="tags-container">
                                    {conv.topics.length > 0 ? (
                                      conv.topics.map((topic, idx) => (
                                        <span key={idx} className="tag topic-tag">{topic}</span>
                                      ))
                                    ) : (
                                      <span className="no-data">-</span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="tags-container">
                                    {conv.chapters_referenced.length > 0 ? (
                                      conv.chapters_referenced.map((chapter, idx) => (
                                        <span key={idx} className="tag chapter-tag">{chapter}</span>
                                      ))
                                    ) : (
                                      <span className="no-data">-</span>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-data-message">No conversations found matching your search.</p>
              )}
            </div>

            {/* Refresh Button */}
            <div className="refresh-section">
              <button onClick={fetchConversations} className="refresh-button">
                🔄 Refresh Data
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ConversationsView;

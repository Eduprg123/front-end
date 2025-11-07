/**
 * Spring Boot Connection Demo Component
 * 
 * This component demonstrates how to connect to and interact with
 * a Spring Boot backend API.
 */

import React, { useState, useEffect } from 'react';
import apiService from '../services/api.service';
import userService from '../services/user.service';
import config from '../config/api.config';
import './SpringBootDemo.css';

function SpringBootDemo() {
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  const checkBackendConnection = async () => {
    setConnectionStatus('checking');
    const isConnected = await apiService.checkConnection();
    setConnectionStatus(isConnected ? 'connected' : 'disconnected');
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users from Spring Boot backend. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
    
    setLoading(true);
    setError(null);
    try {
      await userService.createUser(newUser);
      await fetchUsers(); // Refresh the list
    } catch (err) {
      setError('Failed to create user. Make sure the backend is running and the endpoint is correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="spring-boot-demo">
      <h1>Spring Boot Connection Demo</h1>
      
      <div className="connection-status">
        <h2>Backend Connection Status</h2>
        <div className={`status-indicator ${connectionStatus}`}>
          {connectionStatus === 'checking' && '⏳ Checking connection...'}
          {connectionStatus === 'connected' && '✅ Connected to Spring Boot Backend'}
          {connectionStatus === 'disconnected' && '❌ Not connected to Spring Boot Backend'}
        </div>
        <button onClick={checkBackendConnection} disabled={connectionStatus === 'checking'}>
          Recheck Connection
        </button>
      </div>

      <div className="api-config">
        <h2>API Configuration</h2>
        <p><strong>Backend URL:</strong> {config.API_BASE_URL}</p>
        <p><strong>Timeout:</strong> {config.TIMEOUT}ms</p>
      </div>

      <div className="api-demo">
        <h2>API Demo - User Management</h2>
        
        <div className="actions">
          <button onClick={fetchUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Users'}
          </button>
          <button onClick={handleCreateUser} disabled={loading}>
            Create Sample User
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p className="hint">
              💡 Make sure your Spring Boot backend is running on {config.API_BASE_URL.replace('/api', '')}
            </p>
          </div>
        )}

        {users.length > 0 && (
          <div className="users-list">
            <h3>Users from Backend:</h3>
            <ul>
              {users.map((user, index) => (
                <li key={index}>
                  {user.name || 'N/A'} - {user.email || 'N/A'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="instructions">
        <h2>How to Use</h2>
        <ol>
          <li>Make sure your Spring Boot backend is running on port 8080</li>
          <li>Ensure CORS is configured in your Spring Boot application</li>
          <li>Click "Fetch Users" to retrieve data from the backend</li>
          <li>Click "Create Sample User" to send data to the backend</li>
        </ol>
      </div>
    </div>
  );
}

export default SpringBootDemo;

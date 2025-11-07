/**
 * API Configuration for Spring Boot Backend Connection
 * 
 * This file contains the configuration for connecting to the Spring Boot backend.
 * The backend URL can be configured via environment variables.
 */

const config = {
  // Backend API base URL - defaults to localhost:8080 (standard Spring Boot port)
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  
  // Health check endpoint - defaults to Spring Boot Actuator health endpoint
  HEALTH_CHECK_URL: process.env.REACT_APP_HEALTH_URL || 'http://localhost:8080/actuator/health',
  
  // Request timeout in milliseconds
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT) || 10000,
  
  // API endpoints
  endpoints: {
    users: '/users',
    auth: '/auth',
    data: '/data',
  }
};

export default config;

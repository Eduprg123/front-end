/**
 * User Service
 * 
 * Example service demonstrating how to use the API service
 * to communicate with Spring Boot backend endpoints.
 */

import apiService from './api.service';
import config from '../config/api.config';

class UserService {
  /**
   * Get all users from the backend
   * @returns {Promise<Array>} List of users
   */
  async getAllUsers() {
    try {
      const users = await apiService.get(config.endpoints.users);
      return users;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  /**
   * Get a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object>} User object
   */
  async getUserById(id) {
    try {
      const user = await apiService.get(`${config.endpoints.users}/${id}`);
      return user;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async createUser(userData) {
    try {
      const user = await apiService.post(config.endpoints.users, userData);
      return user;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(id, userData) {
    try {
      const user = await apiService.put(`${config.endpoints.users}/${id}`, userData);
      return user;
    } catch (error) {
      console.error(`Failed to update user ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    try {
      await apiService.delete(`${config.endpoints.users}/${id}`);
    } catch (error) {
      console.error(`Failed to delete user ${id}:`, error);
      throw error;
    }
  }
}

// Create and export singleton instance
const userService = new UserService();
export default userService;

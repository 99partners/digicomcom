/**
 * Calculator Service
 * Handles API calls to the calculator endpoints
 */

import axiosInstance from '../config/api.config';

const calculatorService = {
  /**
   * Calculate Amazon profit margins
   * @param {Object} data - Product data
   * @returns {Promise} - API response
   */
  calculateAmazon: async (data) => {
    try {
      const response = await axiosInstance.post('/api/calculator/amazon', data);
      return response.data;
    } catch (error) {
      console.error('Error calculating Amazon profit:', error);
      throw error;
    }
  },

  /**
   * Calculate Flipkart profit margins
   * @param {Object} data - Product data
   * @returns {Promise} - API response
   */
  calculateFlipkart: async (data) => {
    try {
      const response = await axiosInstance.post('/api/calculator/flipkart', data);
      return response.data;
    } catch (error) {
      console.error('Error calculating Flipkart profit:', error);
      throw error;
    }
  },

  /**
   * Calculate Meesho profit margins
   * @param {Object} data - Product data
   * @returns {Promise} - API response
   */
  calculateMeesho: async (data) => {
    try {
      const response = await axiosInstance.post('/api/calculator/meesho', data);
      return response.data;
    } catch (error) {
      console.error('Error calculating Meesho profit:', error);
      throw error;
    }
  },

  /**
   * Calculate Swiggy profit margins
   * @param {Object} data - Product data
   * @returns {Promise} - API response
   */
  calculateSwiggy: async (data) => {
    try {
      const response = await axiosInstance.post('/api/calculator/swiggy', data);
      return response.data;
    } catch (error) {
      console.error('Error calculating Swiggy profit:', error);
      throw error;
    }
  }
};

export default calculatorService;
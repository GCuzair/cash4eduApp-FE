import AsyncStorage from '@react-native-async-storage/async-storage';

export const Storage = {
  // Save token
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem('@auth_token', token);
      console.log('Token saved successfully');
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  // Get token
  getToken: async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Save user data
  setUser: async (userData) => {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  },

  // Get user data
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem('@user_data');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  // Clear all auth data (logout)
  clearAuth: async () => {
    try {
      await AsyncStorage.multiRemove(['@auth_token', '@user_data']);
    } catch (error) {
      console.error('Error clearing auth:', error);
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      return token !== null;
    } catch (error) {
      console.error('Error checking login:', error);
      return false;
    }
  },

  // Additional methods for React Native
  // ======================================
  
  // Save user visited dashboard flag
  setUserVisitedDashboard: async (value) => {
    try {
      await AsyncStorage.setItem('@user_visited_dashboard', value.toString());
    } catch (error) {
      console.error('Error saving visited dashboard:', error);
    }
  },

  // Check if user visited dashboard
  hasUserVisitedDashboard: async () => {
    try {
      const value = await AsyncStorage.getItem('@user_visited_dashboard');
      return value === 'true';
    } catch (error) {
      console.error('Error checking visited dashboard:', error);
      return false;
    }
  },

  // Get all stored items for debugging
  getAllItems: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      return items.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    } catch (error) {
      console.error('Error getting all items:', error);
      return {};
    }
  },

  // Clear all storage (for testing/logout)
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage cleared successfully');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
};
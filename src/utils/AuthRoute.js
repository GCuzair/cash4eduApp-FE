import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for token in AsyncStorage
      const token = await AsyncStorage.getItem('@auth_token');
      const userData = await AsyncStorage.getItem('@user_data');
      
      if (token && userData) {
        setIsAuthenticated(true);
      } else {
        // If no token, navigate to login
        navigation.replace('SignIn');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      navigation.replace('SignIn');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading indicator
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
      </View>
    );
  }

  // Render children if authenticated
  return isAuthenticated ? children : null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default AuthRoute;
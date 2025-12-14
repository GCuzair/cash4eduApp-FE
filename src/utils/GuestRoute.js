import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GuestRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldNavigateAway, setShouldNavigateAway] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      // Check if user is already logged in
      const token = await AsyncStorage.getItem('@auth_token');
      const userData = await AsyncStorage.getItem('@user_data');
      
      if (token && userData) {
        // User is logged in, redirect to main app
        setShouldNavigateAway(true);
        navigation.replace('MainTabs');
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
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

  // Don't render anything if redirecting
  if (shouldNavigateAway) {
    return null;
  }

  // Render children for guest users
  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default GuestRoute;
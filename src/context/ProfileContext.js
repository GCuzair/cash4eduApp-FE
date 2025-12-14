import React, { createContext, useState, useEffect } from 'react';
import { Storage } from '../utils/Storage';
import { FireApi } from '../utils/FireApi';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // **Auto-check for token changes**
  useEffect(() => {
    const checkAndFetchProfile = async () => {
      try {
        const token = await Storage.getToken();
        const user = await Storage.getUser();
        
        if (token && user && !userProfile) {
          console.log(' Auto-fetching profile on app start...');
          await getUserProfile();
        }
      } catch (error) {
        console.log('Auto-fetch check error:', error);
      }
    };
    
    checkAndFetchProfile();
    
    // Check every 5 seconds if profile is not loaded
    if (!userProfile) {
      const interval = setInterval(checkAndFetchProfile, 5000);
      return () => clearInterval(interval);
    }
  }, [userProfile]);

  // Get user profile
  const getUserProfile = async () => {
    try {
      setLoading(true);
      const storedUser = await Storage.getUser();

      //  **Skip if no user or no id**
      if (!storedUser || !storedUser.id) {
        console.log('No user ID found for profile fetch');
        return null;
      }

      
      const response = await FireApi(`profile/${storedUser.id}`, 'GET');
      
      if (response && (response.data || response.success)) {
        const profileData = response.data || response;
        console.log('Profile data received:', profileData);
        
        setUserProfile(profileData);
        await Storage.setUser({ ...storedUser, ...profileData });
        
        setLastFetchTime(Date.now());
        return profileData;
      }
      
      console.log('No profile data in response');
      return null;
      
    } catch (error) {
      console.log('❌ Profile fetch error:', error);
      Toast.show({
        type: 'error',
        text1: 'Profile Error',
        text2: 'Could not load profile data',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async (force = false) => {
    try {
      const storedUser = await Storage.getUser();
      
      if (!storedUser || !storedUser.id) {
        console.log('Cannot refresh: No user ID');
        return null;
      }

      // If not forced and we have recent data, return cached
      if (!force && userProfile && lastFetchTime && 
          (Date.now() - lastFetchTime < 30000)) { // 30 seconds cache
        return userProfile;
      }

      return await getUserProfile();
      
    } catch (error) {
      console.error('Refresh profile error:', error);
      return null;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        userInfo,
        userProfile,
        setUserProfile,
        refreshUserProfile,
        profileLoading: loading,
        forceRefreshProfile: () => refreshUserProfile(true),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
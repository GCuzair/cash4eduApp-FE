import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileAndSetting from '../screens/profile/ProfileAndSetting';
import UpdateProfile from '../screens/profile/UpdateProfile';
import BadgesnAchievements from '../screens/profile/Badges&Achievments';
import ProfileVerifications from '../screens/profile/ProfileVerfications';
import ProfileAnalytics from '../screens/profile/ViewAnalytics';

const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileAndSetting" component={ProfileAndSetting} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="BadgesnAchievements" component={BadgesnAchievements} />
      <Stack.Screen name="ManageDocument" component={ProfileVerifications} />
      <Stack.Screen name="ProfileAnalytics" component={ProfileAnalytics} />
    </Stack.Navigator>
  );
}

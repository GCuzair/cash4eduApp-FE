import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scholarships from '../screens/scholarships/ScholarshipScreen';
import ScholarshipDetails from '../screens/scholarships/ScholarshipDetails';
import ScholarshipListing from '../screens/vendor/ScholarshipListing'
import PerkListing from '../screens/vendor/PerkListing';
import ManageListingScreen from '../screens/vendor/ManageListingScreen';
import CocaCola from '../screens/vendor/CocaCola';

const Stack = createNativeStackNavigator();

export default function ScholarshipStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScholarshipList" component={Scholarships} />
      <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />
      <Stack.Screen name="ScholarshipListing" component={ScholarshipListing} />
      <Stack.Screen name="PerkListing" component={PerkListing} />
      <Stack.Screen name="ManageListingScreen" component={ManageListingScreen} />
      <Stack.Screen name="CocaCola" component={CocaCola} />

    </Stack.Navigator>
  );
}

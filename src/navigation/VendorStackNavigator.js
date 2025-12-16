import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VendorBottomTabs from './VendorBottomTabs';
import ScholarshipListing from '../screens/vendor/ScholarshipListing';
import ManageListingScreen from '../screens/vendor/ManageListingScreen';
import Setting from '../screens/vendor/Setting';
import EducationalVideo from '../screens/vendor/EducationalVideo'
import TuitionAssistanceVendor from '../screens/vendor/TuitionAssistanceVendor'
import PerkListing from '../screens/vendor/PerkListing';
import CocaCola from '../screens/vendor/CocaCola';

const Stack = createNativeStackNavigator();

export default function VendorStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Tabs */}
      <Stack.Screen name="VendorTabs" component={VendorBottomTabs} />
      
      {/* Screens navigated from buttons */}
      <Stack.Screen name="ScholarshipListing" component={ScholarshipListing} />
      <Stack.Screen name="ManageListingScreen" component={ManageListingScreen} />
      <Stack.Screen name="EducationalVideo" component={EducationalVideo} />
      <Stack.Screen name="PerkListing" component={PerkListing} />
      <Stack.Screen name="TuitionAssistanceVendor" component={TuitionAssistanceVendor} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="CocaCola" component={CocaCola} />
    </Stack.Navigator>
  );
}

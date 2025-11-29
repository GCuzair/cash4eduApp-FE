import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateListing from '../screens/vendor/CreateListingScreen';
import ManageListing from '../screens/vendor/ManageListingScreen';
import ScholarshipListing from '../screens/vendor/ScholarshipListing';
import TuitionAssistanceVendor from '../screens/vendor/TuitionAssistanceVendor';
import EducationalVideo from '../screens/vendor/EducationalVideo';
import CocaCola from '../screens/vendor/CocaCola';

const Stack = createNativeStackNavigator();

export default function VendorStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateListing" component={CreateListing} />
      <Stack.Screen name="ManageListing" component={ManageListing} />
      <Stack.Screen name="ScholarshipListing" component={ScholarshipListing} />
      <Stack.Screen name="TuitionAssistanceVendor" component={TuitionAssistanceVendor} />
      <Stack.Screen name="EducationalVideo" component={EducationalVideo} />
      <Stack.Screen name="CocaCola" component={CocaCola} />
    </Stack.Navigator>
  );
}

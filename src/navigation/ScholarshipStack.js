import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Scholarships from '../screens/scholarships/ScholarshipScreen';
import ScholarshipDetails from '../screens/scholarships/ScholarshipDetails';

const Stack = createNativeStackNavigator();

export default function ScholarshipStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScholarshipList" component={Scholarships} />
      <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />
      {/* <Stack.Screen name="ApplyScholarship" component={ApplyScholarship} /> */}
    </Stack.Navigator>
  );
}

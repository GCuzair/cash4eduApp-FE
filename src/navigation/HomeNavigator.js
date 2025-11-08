import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StdDashboardFinal from '../screens/student/StdDashboardFinal';
import StdDashboard from '../screens/student/StdDashboardEmpty';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StdDashboard" component={StdDashboard} />
      <Stack.Screen name="stdDashboardFinal" component={StdDashboardFinal} />
    </Stack.Navigator>
  );
}

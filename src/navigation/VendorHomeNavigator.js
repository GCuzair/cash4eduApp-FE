import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import VendorDashboardScreen from '../screens/vendor/VendorDashboardScreen';
import CreateListing from '../screens/vendor/CreateListingScreen';
import ManageListingScreen from '../screens/vendor/ManageListingScreen';
import VendorProfile from '../screens/vendor/VendorProfile';
import Setting from '../screens/vendor/Setting';
import PerkListing from '../screens/vendor/PerkListing';
import ScholarshipListing from '../screens/vendor/ScholarshipListing';
import TuitionAssistanceVendor from '../screens/vendor/TuitionAssistanceVendor';
import EducationalVideo from '../screens/vendor/EducationalVideo';
import CocaCola from '../screens/vendor/CocaCola';

import BottomTabs from '../navigation/BottomTabs';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <BottomTabs {...props} />}
    >
      <Tab.Screen name="VendorDashboard" component={VendorDashboardScreen} />
      <Tab.Screen name="CreateListing" component={CreateListing} />
      <Tab.Screen name="ManageListingScreen" component={ManageListingScreen} />
      <Tab.Screen name="VendorProfile" component={VendorProfile} />
      <Tab.Screen name="PerkListing" component={PerkListing} />
      <Tab.Screen name="ScholarshipListing" component={ScholarshipListing} />
      <Tab.Screen name="TuitionAssistanceVendor" component={TuitionAssistanceVendor} />
      <Tab.Screen name="CocaCola" component={CocaCola} />

    </Tab.Navigator>
  );
};

export default TabNavigator;

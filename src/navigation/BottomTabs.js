import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import VideoNavigator from './VideoNavigator';
import PerkNavigator from './PerksNavigator';
import ProfileNavigator from "./ProfileNavigator"
import ScholarshipStack from './ScholarshipStack';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let icon;
          let label;

          switch (route.name) {
            case 'Home':
              icon = (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={26}
                  color={focused ? '#03A2D5' : '#fff'}
                />
              );
              label = 'Home';
              break;

            case 'Scholarships':
              icon = (
                <MaterialCommunityIcons
                  name="school-outline"
                  size={26}
                  color={focused ? '#03A2D5' : '#fff'}
                />
              );
              label = 'Scholarships';
              break;

            case 'Videos':
              icon = (
                <Ionicons
                  name={focused ? 'play-circle' : 'play-circle-outline'}
                  size={26}
                  color={focused ? '#03A2D5' : '#fff'}
                />
              );
              label = 'Videos';
              break;

            case 'Perks':
              icon = (
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={26}
                  color={focused ? '#03A2D5' : '#fff'}
                />
              );
              label = 'Perks';
              break;

            case 'Profile':
              icon = (
                <Ionicons
                  name={focused ? 'person' : 'person-outline'}
                  size={26}
                  color={focused ? '#03A2D5' : '#fff'}
                />
              );
              label = 'Profile';
              break;
          }

          return (
            <View style={styles.iconContainer}>
              {icon}
              <Text style={[styles.label, focused && styles.activeLabel]}>
                
                {label}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Scholarships" component={ScholarshipStack} />
      <Tab.Screen name="Videos" component={VideoNavigator} />
      <Tab.Screen name="Perks" component={PerkNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    height: 70,
    paddingTop: 10,
    position: 'absolute',
    elevation: 20,
    borderColor: '#03A2D5',
    borderTopWidth: 1.5,
    bottom: 0,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  label: {
    fontSize: 5,
    color: '#fff',
    marginTop: 2,
  },
  activeLabel: {
    color: '#03A2D5',
    fontWeight: '600',
  },
});

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VendorDashboardScreen from '../screens/vendor/VendorDashboardScreen';
import VendorProfile from '../screens/vendor/VendorProfile';
import Setting from '../screens/vendor/Setting';
import ManageListingScreen from '../screens/vendor/ManageListingScreen';
import VendorStack from './VendorStack'; // Stack with nested screens like ScholarshipListing

const Tab = createBottomTabNavigator();

// Custom Tab Bar
const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const iconName = {
                    VendorDashboard: 'home-outline',
                    CreateListing: 'add-circle-outline',
                    ManageListing: 'list-outline',
                    VendorProfile: 'person-outline',
                    Setting: 'settings-outline',
                }[route.name];

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={styles.tabItem}
                        activeOpacity={0.7}
                    >
                        <Ionicons name={iconName} size={25} color={isFocused ? '#00AEEF' : 'white'} />
                        <Text style={[styles.tabLabel, { color: isFocused ? '#00AEEF' : 'white' }]}>
                            {label === 'VendorDashboard' ? 'Home' : label.replace(/([A-Z])/g, ' $1').trim()}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default function VendorBottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen name="VendorDashboard" component={VendorDashboardScreen} />
            <Tab.Screen name="CreateListing" component={VendorStack} />
            <Tab.Screen name="ManageListing" component={ManageListingScreen} />
            <Tab.Screen name="VendorProfile" component={VendorProfile} />
            <Tab.Screen name="Setting" component={Setting} />
            
        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: 'black',
        height: Platform.OS === 'ios' ? 90 : 70,
        borderWidth: 1,
        borderTopColor: '#00AEEF',
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        paddingTop: 10,
        justifyContent: 'space-around',
        gap:1,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 12,
        marginTop: 2,
        fontWeight: '600',
    },
});

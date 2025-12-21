import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import VendorHeader from '../../components/VendorHeader';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const Setting = () => {
    const navigation = useNavigation();
    const { logout } = useContext(AuthContext); // Get logout function from context
    
    const [notify, setNotify] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    // Handle logout function
    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // If using AuthContext
                            if (logout) {
                                const result = await logout();
                                if (result.success) {
                                    navigateToLogin();
                                } else {
                                    Alert.alert("Error", result.error || "Failed to logout");
                                }
                            } else {
                                // Manual logout
                                await manualLogout();
                            }
                        } catch (error) {
                            console.error("Logout error:", error);
                            Alert.alert("Error", "Failed to logout");
                        }
                    },
                },
            ]
        );
    };

    // Manual logout function
    const manualLogout = async () => {
        try {
            // Clear all stored data
            await AsyncStorage.multiRemove([
                '@auth_token',
                '@user_data',
                '@user_type',
                '@remember_me'
            ]);
            
            navigateToLogin();
        } catch (error) {
            console.error("Manual logout error:", error);
            Alert.alert("Error", "Failed to clear session data");
        }
    };

    // Navigate to login screen
    const navigateToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        });
    };

    // Handle row item press
    const handleRowPress = (title) => {
        switch (title) {
            case "Account":
                navigation.navigate('VendorProfile');
                break;
            case "Language":
                navigation.navigate('LanguageSettings');
                break;
            case "Security":
                navigation.navigate('SecuritySettings');
                break;
            case "Terms & Conditions":
                navigation.navigate('TermsAndConditions');
                break;
            case "Privacy Policy":
                navigation.navigate('PrivacyPolicy');
                break;
            case "Help":
                navigation.navigate('HelpCenter');
                break;
            case "Invite a friend":
                Alert.alert("Invite", "Invite feature coming soon!");
                break;
            case "Logout":
                handleLogout();
                break;
            default:
                console.log(`Pressed: ${title}`);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <VendorHeader
                title="Settings"
                subtitle="Manage your app preferences"
                onBackPress={() => navigation.goBack()}
            />

            {/* BODY */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >

                {/* ---------- SECTION 1 ---------- */}
                <View style={styles.card}>
                    <Row
                        icon={<Ionicons name="person-outline" size={20} color="#fff" />}
                        title="Account"
                        arrow
                        onPress={() => handleRowPress("Account")}
                    />

                    <Divider />

                    <Row
                        icon={<MaterialIcons name="notifications-none" size={20} color="#fff" />}
                        title="Notifications"
                        toggle
                        value={notify}
                        onValueChange={() => setNotify(!notify)}
                    />

                    <Divider />

                    <Row
                        icon={<Feather name="moon" size={20} color="#fff" />}
                        title="Dark Mode"
                        toggle
                        value={darkMode}
                        onValueChange={() => setDarkMode(!darkMode)}
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="globe-outline" size={20} color="#fff" />}
                        title="Language"
                        arrow
                        onPress={() => handleRowPress("Language")}
                    />
                </View>

                {/* ---------- SECTION 2 ---------- */}
                <View style={styles.card}>
                    <Row
                        icon={<Ionicons name="shield-checkmark-outline" size={20} color="#fff" />}
                        title="Security"
                        arrow
                        onPress={() => handleRowPress("Security")}
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="document-text-outline" size={20} color="#fff" />}
                        title="Terms & Conditions"
                        arrow
                        onPress={() => handleRowPress("Terms & Conditions")}
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="lock-closed-outline" size={20} color="#fff" />}
                        title="Privacy Policy"
                        arrow
                        onPress={() => handleRowPress("Privacy Policy")}
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="help-circle-outline" size={20} color="#fff" />}
                        title="Help"
                        arrow
                        onPress={() => handleRowPress("Help")}
                    />
                </View>

                {/* ---------- SECTION 3 ---------- */}
                <View style={styles.card}>
                    <Row
                        icon={<Ionicons name="share-social-outline" size={20} color="#fff" />}
                        title="Invite a friend"
                        arrow
                        onPress={() => handleRowPress("Invite a friend")}
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
                        title="Logout"
                        onPress={() => handleRowPress("Logout")}
                        isLogout={true} // Add this prop
                    />
                </View>

            </ScrollView>
        </View>
    );
};

/* ------------ Row Component ------------ */
const Row = ({ icon, title, arrow, toggle, value, onValueChange, onPress, isLogout = false }) => {
    return (
        <TouchableOpacity 
            style={styles.row} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.rowLeft}>
                {icon}
                <Text style={[styles.rowText, isLogout && styles.logoutText]}>{title}</Text>
            </View>

            {toggle ? (
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    ios_backgroundColor="#1e2f3f"
                    trackColor={{ true: "#4dc7ff", false: "#1e2f3f" }}
                    thumbColor="#fff"
                />
            ) : arrow ? (
                <Ionicons name="chevron-forward" size={20} color="#fff" />
            ) : null}
        </TouchableOpacity>
    );
};

/* ------------ Divider ------------ */
const Divider = () => <View style={styles.divider} />;

/* ------------ Styles ------------ */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        paddingTop: 10,
    },
    card: {
        backgroundColor: "#02223b",
        borderRadius: 15,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    rowLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    },
    rowText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#ffffffff",
        opacity: 0.6,
    },
});

export default Setting;
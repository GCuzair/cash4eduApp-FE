import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import VendorHeader from '../../components/VendorHeader';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const Setting = () => {
    const navigation = useNavigation();

    const [notify, setNotify] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

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
                    />
                </View>

                {/* ---------- SECTION 2 ---------- */}
                <View style={styles.card}>
                    <Row
                        icon={<Ionicons name="shield-checkmark-outline" size={20} color="#fff" />}
                        title="Security"
                        arrow
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="document-text-outline" size={20} color="#fff" />}
                        title="Terms & Conditions"
                        arrow
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="lock-closed-outline" size={20} color="#fff" />}
                        title="Privacy Policy"
                        arrow
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="help-circle-outline" size={20} color="#fff" />}
                        title="Help"
                        arrow
                    />
                </View>

                {/* ---------- SECTION 3 ---------- */}
                <View style={styles.card}>
                    <Row
                        icon={<Ionicons name="share-social-outline" size={20} color="#fff" />}
                        title="Invite a friend"
                        arrow
                    />

                    <Divider />

                    <Row
                        icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
                        title="Logout"
                    />
                </View>

            </ScrollView>
        </View>
    );
};

/* ------------ Row Component ------------ */
const Row = ({ icon, title, arrow, toggle, value, onValueChange }) => {
    return (
        <View style={styles.row}>
            <View style={styles.rowLeft}>
                {icon}
                <Text style={styles.rowText}>{title}</Text>
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
        </View>
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

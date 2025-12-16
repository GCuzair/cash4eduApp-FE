import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VendorHeader = ({ title, subtitle, onBackPress, onSettingsPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={onBackPress}>
                    <Ionicons name="arrow-back-circle-outline" size={38} color="#fff" />
                </TouchableOpacity>

                <Image
                    source={require('../assets/images/Logo.png')} // Adjust path as needed
                    style={styles.logo}
                />

                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <Icon name="bell-outline" size={24} color="#FFF" />
                    <TouchableOpacity onPress={onSettingsPress}>
                        <Ionicons name="settings" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.dashboardTitleContainer}>
                <Text style={styles.dashboardTitle}>{title}</Text>
                {subtitle && (
                    <Text style={styles.dashboardSubtitle}>{subtitle}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingTop: 10,
        // Removed flex: 1 so it doesn't take full screen
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    backIcon: {
        zIndex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    dashboardTitleContainer: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft:5,
    },
    dashboardTitle: {
        color: '#FFF',
        fontSize: 26,
        fontWeight: 'bold',
        
    },
    dashboardSubtitle: {
        color: '#ffffffff',
        fontSize: 15,
        marginTop: 5,
    },
});

export default VendorHeader;
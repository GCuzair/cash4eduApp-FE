import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign'


const VendorManagement = () => {
    // 1. Vendor Data
    const vendors = [
        { id: 1, name: 'Meta Future Skills', email: 'education@gmail.com' },
        { id: 2, name: 'Meta Future Skills', email: 'education@gmail.com' },
        { id: 3, name: 'Meta Future Skills', email: 'education@gmail.com' },
        { id: 4, name: 'Meta Future Skills', email: 'education@gmail.com' },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image
                        source={require('../../assets/images/burger.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchPlaceholder}>Search</Text>
                        <Ionicons name="search" size={18} color="#aaa" style={{ marginLeft: 150 }} />
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.welcomeText}>Vendor Management</Text>
                <Text style={styles.subtitle}>
                    Monitor, approve, and manage educational partners
                    and vendors
                </Text>
            </View>

            {/* Action Buttons */}
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity style={styles.expBtn}>
                        <AntDesign name='download' size={18} color='white' />
                        <Text style={styles.btnTxt}>Export CSV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.venBtn}>
                        <AntDesign name='plus' size={20} color='white' />
                        <Text style={styles.btnTxt}>Add vendor</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Horizontal Cards ScrollView */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Active Users Card */}
                    <View style={styles.card}>
                        <View style={styles.users}>
                            <FontAwesome5 name="user" size={18} color="#51e3fc" />
                            <Text style={styles.cardTitle}>Active Vendors</Text>
                        </View>
                        <Text style={styles.cardValue}>310</Text>
                        <Text style={styles.cardSubText}>+8 from last week</Text>
                    </View>


                    {/* Scholarship Card */}
                    <View style={styles.card}>
                        <View style={styles.users}>
                            <FontAwesome5 name="clock" size={18} color="#7B61FF" />
                            <Text style={styles.cardTitle}>Pending Approvals</Text>
                        </View>
                        <Text style={styles.cardValue}>15</Text>
                        <Text style={styles.scholarshipText}>-2 from yesterday</Text>
                    </View>
                </ScrollView>
                <View>
                    {/* DROPDOWNS */}
                </View>

                <View style={styles.dropdownsRow}>
                    {['All Status', 'All Regions'].map((label, index) => (
                        <TouchableOpacity key={index} style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>{label}</Text>
                            <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    ))}
                    <Text style={{ color: '#51e3fc', marginTop: 10, }}>Table View</Text>

                </View>
                <TouchableOpacity style={styles.thirdButton}>
                    <Text style={styles.dropdownText}>All Categories</Text>
                    <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                </TouchableOpacity>

                {/* 2. NEW VENDOR LIST CARD */}
                <View style={styles.vendorListCard}>
                    <Text style={styles.listHeaderTitle}>Vendor Name</Text>
                    {vendors.map(vendor => (
                        <TouchableOpacity key={vendor.id} style={styles.vendorItem}>
                            {/* The Blue 'MT' Icon Block */}
                            <View style={styles.iconBlock}>
                                <Text style={styles.iconText}>MT</Text>
                            </View>
                            {/* Vendor Details */}
                            <View style={styles.vendorDetails}>
                                <Text style={styles.vendorName}>{vendor.name}</Text>
                                <Text style={styles.vendorEmail}>{vendor.email}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>


            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    
    dropdownsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 15,
        marginTop: 12,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    thirdButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        width: '48%'
    },
    dropdownText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    expBtn: {
        flexDirection: 'row',
        gap: 3,
        backgroundColor: '#021e38',
        padding: 10,
        borderRadius: 10,
        width: '45%', // Adjusted for better responsiveness
        alignItems: 'center',
        justifyContent: 'center',
    },

    venBtn: {
        flexDirection: 'row',
        gap: 3,
        backgroundColor: '#51e3fc',
        padding: 10,
        borderRadius: 10,
        width: '45%', // Adjusted for better responsiveness
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 5,
        fontSize: 16,
    },
    users: {
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#0B0F1A',
        paddingHorizontal: 15,
        paddingTop: 50,
    },
    header: {
        marginBottom: 10, // Reduced space to make room for buttons
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'space-between', // Align search icon to the right
    },
    searchPlaceholder: {
        color: '#aaa',
        marginLeft: 8,
    },
    welcomeText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#ffffffaa', // Slightly transparent white
        marginTop: 5,
        fontSize: 14,
    },

    scrollContainer: {
        paddingVertical: 4,
    },
    card: {
        backgroundColor: '#021e38',
        borderRadius: 16,
        padding: 20,
        marginRight: 15,
        width: 180,
        justifyContent: 'center',
        marginTop: 15,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 4,
        fontWeight: 'bold',
        marginTop: 2,
    },
    cardValue: {
        color: '#fff',
        fontSize: 29,
        fontWeight: 'bold',
    },
    cardSubText: {
        color: '#52e3fc',
        fontSize: 12,
        marginTop: 4,
    },

    scholarshipText: {
        color: '#7B61FF',
        fontSize: 12,
        marginTop: 4,
    },

    // --- NEW VENDOR LIST STYLES ---
    vendorListCard: {
        backgroundColor: '#021e38',
        borderRadius: 16,
        padding: 15,
        marginTop: 20,
        marginBottom: 50, // Enough space for scroll bounce
    },
    listHeaderTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    vendorItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        // Optional: uncomment if you want a subtle separator line
        // borderBottomWidth: 1,
        // borderBottomColor: '#2B2B2B', 
    },
    iconBlock: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#51e3fc', // Bright blue
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    iconText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    vendorDetails: {
        justifyContent: 'center',
    },
    vendorName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    vendorEmail: {
        color: '#AAAAAA', // Light grey for the email
        fontSize: 12,
    },

});

export default VendorManagement;
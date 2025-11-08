import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ManageListingScreen = ({ navigation }) => {
    
    const [activeTab, setActiveTab] = useState('Active');

    const listings = [
        {
            id: 1,
            title: 'Tech Innovators Grant',
            status: 'Active',
            views: 2450,
            applicants: 170,
        },
        {
            id: 2,
            title: 'Tech Innovators Grant',
            status: 'Draft',
            views: 2450,
            applicants: 128,
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Manage Listing</Text>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {['All', 'Active', 'Draft', 'Closed'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            activeTab === tab && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(tab)}
                        onPressOut={()=>{navigation.navigate('VendorProfile')}}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Listings */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {listings.length > 0 ? (
                    listings.map((item) => (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.badge,
                                { backgroundColor: item.status === 'Active' ? '#2ECC71' : '#F39C12' }
                                ]}>
                                    <Text style={styles.badgeText}>{item.status}</Text>
                                </View>

                                <View
                                    style={[
                                        styles.badge,
                                        { backgroundColor: item.status === 'Active' ? '#3498DB' : '#7F8C8D' },
                                    ]}
                                >
                                    <Text style={styles.badgeText}>
                                        {item.status === 'Active' ? 'Active' : 'Closed'}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.cardTitle}>{item.title}</Text>

                            <View style={styles.cardStats}>
                                <View style={styles.statItem}>
                                    <Icon name="eye-outline" size={18} color="#E2E8F0" />
                                    <Text style={styles.statText}>{item.views}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Icon name="file-document-outline" size={18} color="#E2E8F0" />
                                    <Text style={styles.statText}>{item.applicants}</Text>
                                </View>
                            </View>

                            <View style={styles.cardActions}>
                                <TouchableOpacity>
                                    <Icon name="clock-outline" size={20} color="#E2E8F0" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="pencil-outline" size={20} color="#E2E8F0" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="delete-outline" size={20} color="#E2E8F0" />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <Text>aslkhdsa</Text>
                            </View>
                        </View>
                        
                        
                    ))
                    
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No listing yet</Text>
                        <Text style={styles.emptySubText}>Create your first one!</Text>
                    </View>
                )}
            </ScrollView>

            {/* Create Button */}
            <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateListing')}
            >
                <Text style={styles.createButtonText}>Create New Listing</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ManageListingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#020617',
        paddingHorizontal: 16,
        paddingTop: 55,

    },
    header: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    tab: {
        borderWidth: 1,
        borderColor: '#2D3748',
        borderRadius: 20,
        paddingHorizontal: 22,
        paddingVertical: 6,
    },
    activeTab: {
        backgroundColor: '#03a2d5',
        borderColor: '#2563EB',
    },
    tabText: {
        color: '#CBD5E0',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#FFF',
    },
    scrollContainer: {
        paddingBottom: 120,
    },
    card: {
        backgroundColor: '#0F172A',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#1E293B',
        shadowColor: '#00FFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    badge: {
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 35,
        fontWeight: '600',
        marginBottom: 10,
    },
    cardStats: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    statText: {
        color: '#E2E8F0',
        marginLeft: 4,
        fontSize: 14,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15,
    },
    emptyState: {
        
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    emptySubText: {
        color: '#A0AEC0',
        fontSize: 14,
        marginTop: 6,
    },
    createButton: {
    
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#03a2d5',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 8,
          
    },
    createButtonText: {
        color: '#03a2d5',
        fontSize: 16,
        fontWeight: '700',
    },
});
    
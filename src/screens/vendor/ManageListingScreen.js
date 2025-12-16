import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// Assuming VendorHeader is defined in the components folder
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native';
// Adding necessary icons for the new UI elements
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


// --- Sample Data for the Listing Table ---
const LISTING_DATA = [
    {
        id: '1',
        type: 'Scholarship',
        title: 'Coca-Cola Founders',
        subtitle: '$20,000 scholarship',
        icon: 'book', // Feather icon
        iconColor: '#E74C3C', // Red accent
        initial: 'K',
        initialBg: '#1ABC9C', // Teal for the K badge
    },
    {
        id: '2',
        type: 'Perk',
        title: "McDonald's Employee",
        subtitle: "McDonald's Corp.",
        icon: 'hamburger', // MaterialCommunityIcons
        iconColor: '#F1C40F', // Yellow accent
        initial: null,
    },
    {
        id: '3',
        type: 'Videos',
        title: 'Budgeting for Books',
        subtitle: 'Amazon Company',
        icon: 'play-circle', // Feather icon
        iconColor: '#9B59B6', // Purple accent
        initial: null,
    },
    {
        id: '4',
        type: 'Tuition',
        title: 'Walmart Inc.',
        subtitle: 'Walmart Inc.',
        icon: 'bank', // MaterialCommunityIcons
        iconColor: '#3498DB', // Blue accent
        initial: null,
    },
];

// --- Reusable Component for a single row ---
const ListingRow = ({ item, navigation }) => {
    const IconComponent = item.icon === 'bank' || item.icon === 'hamburger'
        ? MaterialCommunityIcons
        : Feather;

    return (
        <TouchableOpacity
            style={styles.rowContainer}
            onPress={() => {
                if (item.id === '1') {
                    navigation.navigate("CocaCola");
                }
            }}
        >
            <View style={styles.columnType}>
                <Text style={styles.typeText}>{item.type}</Text>
            </View>

            <View style={styles.columnTitle}>
                <View style={[styles.iconCircle, { backgroundColor: item.iconColor }]}>
                    <IconComponent name={item.icon} size={20} color="#FFFFFF" />
                </View>

                <View style={styles.textContent}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.subtitleText}>{item.subtitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


// --- Main Screen Component ---
const ManageListingScreen = () => {

    const navigation = useNavigation();

    // Placeholder state for the filter/sort values
    const [status, setStatus] = useState('All Status');
    const [type, setType] = useState('All Types');
    const [sortBy, setSortBy] = useState('Most Recent %');

    // Dummy data for the metric cards
    const scholarshipLiveCount = 56;
    const totalListingsCount = 86;

    // Header Row Component for the Listing Table
    const renderListHeader = () => (
        // This header must also be stretched to the full content width
        <View style={styles.headerContainer}>
            <Text style={[styles.headerText, styles.columnType]}>Type</Text>
            <Text style={[styles.headerText, styles.columnTitleHeader]}>Title</Text>
            {/* You can add more columns here that would stretch the content */}
        </View>
    );



    return (
        <View style={styles.container}>
            <VendorHeader
                title="Manage All Listing"
                subtitle="Centralized control center for scholarships, perks, tuition assistance, and educational videos"
                onBackPress={() => navigation.goBack()}
                onSettingsPress={()=> navigation.navigate('Setting')}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: 16 }}
            >
                {/* Create New Listing Button */}
                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                    <TouchableOpacity style={styles.submitBtn}>
                        <Ionicons name='send' size={16} color='white' />
                        <Text style={styles.saveBtnTxt}>Create New Listing</Text>
                    </TouchableOpacity>
                </View>

                {/* Search, Filters, and Sort (Wrapped in searchMainCont) */}
                <View style={styles.searchMainCont}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by title, partner, or keyword..."
                            placeholderTextColor="#8899AA"
                        />
                        <Feather name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
                        <Feather name="mic" size={20} color="#FFFFFF" style={styles.micIcon} />
                    </View>

                    <View style={styles.filterSortRow}>
                        <TouchableOpacity style={styles.advancedFilterButton}>
                            <Feather name="sliders" size={16} color="#51e3fc" />
                            <Text style={styles.advancedFilterText}>Advanced Filters</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sortButton}>
                            <Text style={styles.sortText}>Sort by: <Text style={{ fontWeight: '400' }}>{sortBy}</Text></Text>
                            <Feather name="chevron-down" size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Status and Type Selectors */}
                <View style={styles.selectorRow}>
                    <TouchableOpacity style={styles.selectorButton}>
                        <Text style={styles.selectorText}>{status}</Text>
                        <Feather name="chevron-down" size={16} color="#FFFFFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.selectorButton}>
                        <Text style={styles.selectorText}>{type}</Text>
                        <Feather name="chevron-down" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Horizontal Metric Cards (Existing) */}
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.horizontalCardScroll}
                >
                    {/* Card 1: Scholarship Live */}
                    <View style={[styles.card, styles.cardSpacing]}>
                        <View style={styles.cardHeader}>
                            <FontAwesome5 name="graduation-cap" size={18} color="#51e3fc" />
                            <Text style={styles.cardTitle}>Scholarship Live</Text>
                        </View>
                        <Text style={styles.cardValue}>{scholarshipLiveCount}</Text>
                    </View>

                    {/* Card 2: Total Listings */}
                    <View style={[styles.card, styles.cardSpacing, { position: 'relative' }]}>
                        <View style={styles.cardHeader}>
                            <FontAwesome5 name="list" size={18} color="#aa55f7" />
                            <Text style={styles.cardTitle}>Total Listings</Text>
                        </View>
                        <Text style={styles.cardValue}>{totalListingsCount}</Text>

                    </View>

                    {/* Dummy Card 3: Example Metric */}
                    <View style={[styles.card, styles.cardSpacing]}>
                        <View style={styles.cardHeader}>
                            <Feather name="trending-up" size={24} color="#51e3fc" />
                            <Text style={styles.cardTitle}>Pending Review</Text>
                        </View>
                        <Text style={styles.cardValue}>12</Text>
                    </View>

                    {/* Dummy Card 4: Another Metric */}
                    <View style={[styles.card, styles.cardSpacing]}>
                        <View style={styles.cardHeader}>
                            <Feather name="user-check" size={24} color="#51e3fc" />
                            <Text style={styles.cardTitle}>Applicants</Text>
                        </View>
                        <Text style={styles.cardValue}>1.8K</Text>
                    </View>
                </ScrollView>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.tableHorizontalScrollWrapper}
                >
                    <View style={styles.tableContentContainer}>
                        {renderListHeader()}
                        <FlatList
                            data={LISTING_DATA}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <ListingRow item={item} navigation={navigation} />}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={[styles.blueBtn, { marginLeft: 0, width: '100%', marginTop: 30 }]}>
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.borderBtn, { marginLeft: 0, width: '100%' }]}>
                    <Text style={styles.borderBtnTxt}>Publish</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    searchMainCont: {
        backgroundColor: '#021e38',
        padding: 10,
        borderRadius: 10,

    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    submitBtn: {
        width: "50%",
        backgroundColor: '#51e3fc',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        gap: 5,
        justifyContent: 'center',
    },
    saveBtnTxt: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,
    },
    blueBtn: {
        backgroundColor: '#51e3fc',
        padding: 15,
        marginTop: 20,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blueBtnTxt: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
    },
    borderBtn: {
        padding: 15,
        marginTop: 20,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#51e3fc',
    },
    borderBtnTxt: {
        color: '#51e3fc',
        fontSize: 22,
        fontWeight: '600',
    },
    // --- Search/Filter/Selector Styles (omitted for brevity) ---
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a3956ff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 3,
        marginTop: 15,
        borderRadius: 20,
    },
    searchInput: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 13,
        paddingRight: 70,
        paddingVertical: 10,
    },
    searchIcon: {
        position: 'absolute',
        right: 45,
    },
    micIcon: {
        position: 'absolute',
        right: 15,
    },
    filterSortRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    advancedFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    advancedFilterText: {
        color: '#51e3fc',
        marginLeft: 5,
        fontSize: 14,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#51e3fc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    sortText: {
        color: '#FFFFFF',
        marginRight: 5,
        fontSize: 12,
        fontWeight: '500',
    },
    selectorRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
    },
    selectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginRight: 10,
    },
    selectorText: {
        color: '#FFFFFF',
        marginRight: 5,
        fontSize: 14,
        fontWeight: '500',
    },

    horizontalCardScroll: {
        width: 340,
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    card: {
        width: 190,
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 15,
        minHeight: 100,
    },
    cardSpacing: {
        marginRight: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    },
    cardValue: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
    },

    tableHorizontalScrollWrapper: {


        backgroundColor: '#000',
        width: '100%',
    },
    tableContentContainer: {
        width: 500, // Explicitly set a wide width to enable horizontal scrolling
        backgroundColor: '#021e38',
        borderRadius: 10,
        paddingVertical: 5,
        padding: 40,
        marginTop: 20,
        gap: 9,
    },

    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 5,
        marginTop: 30,
    },
    headerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        gap: 50
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    columnType: {
        width: '40%',
    },
    columnTitleHeader: {
        width: '60%',
    },
    columnTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    typeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    textContent: {
        flex: 1,
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 18,
    },
    subtitleText: {
        color: '#8899AA',
        fontSize: 12,
    },
    finalHorizontalScroll: {
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: -16,
        paddingHorizontal: 16,
    },
    smallActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginRight: 10,
        borderWidth: 1,
    },
    smallActionButtonText: {
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 5,
    }
});

export default ManageListingScreen;
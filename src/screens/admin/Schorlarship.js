import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For laptop-light icon

// Mocking the image imports for the header avatar and vendor logos
const UserAvatar = { uri: 'https://placehold.co/40x40/51e3fc/0B0F1A?text=U' };
const VendorLogoK = { uri: 'https://placehold.co/30x30/22C55E/000?text=K' };
const VendorLogoE = { uri: 'https://placehold.co/30x30/F59E0B/000?text=E' };


// --- Listing Data for Scholarship Screen ---
const scholarshipListings = [
    {
        id: 1,
        name: 'Coca-Cola Scholars Foundation',
        subtitle: '$20,000 scholarship program',
        icon: 'graduation-cap', // FontAwesome5
        bgColor: '#D93E49', // Red
        logos: [VendorLogoK, VendorLogoE],
    },
    {
        id: 2,
        name: 'Dell Future Leaders',
        subtitle: 'Technology leadership progra,',
        icon: 'laptop', // FontAwesome5
        bgColor: '#387D43', // Green
        logos: [],
    },
    {
        id: 3,
        name: 'Cash 4 Edu Merit Award',
        subtitle: 'Internal excellence recognition',
        icon: 'star', // FontAwesome5
        bgColor: '#8A2BE2', // Purple
        logos: [],
    },
    {
        id: 4,
        name: 'STEM Women Excellence',
        subtitle: 'Supporting women in STEM',
        icon: 'graduation-cap', // FontAwesome5
        bgColor: '#5BA4DE', // Blue
        logos: [],
    },
];


// --- Component for a single Listing Item in the main list ---
const ScholarshipListingItem = ({ name, subtitle, icon, bgColor, logos }) => (
    <TouchableOpacity style={styles.listingItemContainer}>
        {/* Icon Block */}
        <View style={[styles.iconBlock, { backgroundColor: bgColor }]}>
            {icon === 'laptop' ?
                <MaterialCommunityIcons name="laptop-chromebook" size={24} color="#FFFFFF" /> : // Using MaterialCommunityIcons for similar laptop icon
                <FontAwesome5 name={icon} size={24} color="#FFFFFF" />}
        </View>

        {/* Listing Details */}
        <View style={styles.listingDetails}>
            <Text style={styles.listingName} numberOfLines={2}>{name}</Text>
            <Text style={styles.listingSubtitle} numberOfLines={1}>{subtitle}</Text>
        </View>

        {/* Vendor Logos */}
        <View style={styles.vendorLogoGroup}>
            {logos.map((logo, index) => (
                <Image key={index} source={logo} style={[styles.vendorLogo, { marginLeft: index > 0 ? -10 : 0 }]} />
            ))}
        </View>
    </TouchableOpacity>
);


// --- Component for the horizontal Status Cards ---
const ScholarshipStatusCard = ({ title, value, subText, subTextColor, iconName, iconColor }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
            <Ionicons name={iconName} size={24} color={iconColor} style={styles.cardIcon} />
            <Text style={[styles.cardTitle, { color: iconColor }]}>{title}</Text>
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={[styles.cardSubText, { color: subTextColor }]}>{subText}</Text>
    </View>
);


const ScholarshipScreen = () => {
    return (
        <View style={styles.container}>

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image source={require('../../assets/images/burger.png')} style={styles.avatar} />
                    <TouchableOpacity style={styles.bellButton}>
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.mainTitle}>Scholarship</Text>
                <Text style={styles.subtitle}>
                    Monitor active scholarships, applicant engagement, and funding performance
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.exportButton}>
                        <Ionicons name="download-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.exportText}>Export CSV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton}>
                        <Ionicons name="add-circle-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.createText}>Create Scholarship</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {/* --- SEARCH/FILTER SECTION --- */}
                <View >
                    <View style={styles.searchFilterSection}>
                        {/* Search Bar */}
                        <View style={styles.searchBar}>
                            <Text style={styles.searchText}>Search by listing name, vendor type...</Text>
                            <Ionicons name="search" size={20} color="#777" />

                        </View>

                        {/* Advanced Filters & Sort Row */}
                        <View style={styles.filtersRow}>
                            <TouchableOpacity style={styles.advancedFiltersButton}>
                                <Ionicons name="options-outline" size={20} color="#51e3fc" />
                                <Text style={styles.advancedFiltersText}>Advanced Filters</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sortButton}>
                                <Text style={styles.sortButtonText}>Sort by: Applications % </Text>
                                <Ionicons name="chevron-down" size={16} color="#ffffffff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Dropdowns Row (All Status, All Funding Sources) */}
                    <View style={styles.dropdownsRow}>
                        <TouchableOpacity style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>All Status</Text>
                            <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>All Funding Sources</Text>
                            <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    </View>

                    {/* Date Range Filters */}
                    <View style={styles.dateRangeRow}>
                        <TouchableOpacity style={styles.datePickerButton}>
                            <Text style={styles.datePickerText}>mm/dd/yy</Text>
                            <Ionicons name="calendar-outline" size={16} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                        <Text style={styles.dateRangeSeparator}>To</Text>
                        <TouchableOpacity style={styles.datePickerButton}>
                            <Text style={styles.datePickerText}>mm/dd/yy</Text>
                            <Ionicons name="calendar-outline" size={16} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>



                    {/* Horizontal Status Cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
                        <ScholarshipStatusCard
                            title="Active Scholarship"
                            value="56"
                            subText="+6 this month"
                            subTextColor="#51e3fc"
                            iconName="school"
                            iconColor="#51e3fc" // Light Blue
                        />
                        <ScholarshipStatusCard
                            title="Total Applicants"
                            value="2,431"
                            subText="+12% this week"
                            subTextColor="#7B61FF"
                            iconName="people"
                            iconColor="#7B61FF" // Purple
                        />
                        {/* Add more cards if needed */}
                    </ScrollView>

                </View>
                {/* --- END SEARCH/FILTER SECTION --- */}

                {/* Listing List Card (Remaining Content in a ScrollView) */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.listScrollView}>
                    <View style={styles.listingListCard}>
                        <Text style={styles.listTitle}>Title</Text>
                        {scholarshipListings.map(item => (
                            <ScholarshipListingItem
                                key={item.id}
                                name={item.name}
                                subtitle={item.subtitle}
                                icon={item.icon}
                                bgColor={item.bgColor}
                                logos={item.logos}
                            />
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0B0F1A',
    },
    // --- Header Styles ---
    header: {
        marginBottom: 10,
        paddingTop: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    bellButton: {
        padding: 5,
    },
    mainTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 5,
    },
    subtitle: {
        color: '#ffffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#51e3fc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    actionIcon: {
        marginRight: 8,
        color: '#FFFFFF',
    },
    exportText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    createText: {
        color: '#ffffffff',
        fontWeight: '700',
        fontSize: 14,
    },
    // --- Search/Filter Section Styles ---
    searchFilterSection: {
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 10,
    },
    searchText: {
        flex: 1,
        color: '#718096',
        fontSize: 13,
        marginHorizontal: 12,
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:10,
    },
    advancedFiltersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    advancedFiltersText: {
        color: '#51e3fc',
        fontSize: 14,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#51e3fc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    sortButtonText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 12,
    },
    // --- Date Range Filters ---
    dateRangeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        marginHorizontal: 4,
        justifyContent: 'center',
    },
    datePickerText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    dateRangeSeparator: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        marginHorizontal: 8,
    },
    // --- Dropdowns Row (Status, Funding Sources) ---
    dropdownsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginTop:15,
        marginBottom: 15, // This was pillsScroll.marginBottom previously
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
    dropdownText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight:'600'
    },
    // --- Cards Scroll ---
    cardScrollContainer: {
        paddingVertical: 5,
        marginBottom: 10, // Added margin to separate cards from the list title
    },
    cardContainer: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 15,
        marginRight: 15,
        width: 200,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardIcon: {
        marginRight: 8,
    },
    cardTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    cardValue: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '700',
        paddingVertical: 5,
    },
    cardSubText: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    // --- Listing List Styles ---
    listScrollView: {
        flex: 1,
    },
    listingListCard: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 16,
        marginBottom: 50,
    },
    listTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    listingItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#1F2937',
    },
    iconBlock: {
        width: 48,
        height: 48,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    listingDetails: {
        flex: 1,
        minWidth: 0,
    },
    listingName: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
    listingSubtitle: {
        color: '#A0AEC0',
        fontSize: 13,
    },


});

export default ScholarshipScreen;
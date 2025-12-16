import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

// Mocking the image imports for the header avatar and vendor logos
// NOTE: In a real RN app, you would use require('../../assets/images/...')
const UserAvatar = { uri: 'https://placehold.co/40x40/51e3fc/0B0F1A?text=U' };
const VendorLogoK = { uri: 'https://placehold.co/30x30/22C55E/000?text=K' };
const VendorLogoE = { uri: 'https://placehold.co/30x30/F59E0B/000?text=E' };


// --- Listing Data ---
const listings = [
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
        name: 'Starbucks Study Perk',
        subtitle: 'Free coffee for students',
        icon: 'coffee', // FontAwesome5
        bgColor: '#387D43', // Green
        logos: [],
    },
    {
        id: 3,
        name: 'FASFA 101: Video Series',
        subtitle: 'Complete guide to FAFSA',
        icon: 'play-circle', // FontAwesome5
        bgColor: '#8A2BE2', // Purple
        logos: [],
    },
    {
        id: 4,
        name: 'STEM Women Grant',
        subtitle: 'Supporting women in STEM',
        icon: 'graduation-cap', // FontAwesome5
        bgColor: '#5BA4DE', // Blue
        logos: [VendorLogoK],
    },
];


// --- Component for a single Listing Item in the main list ---
const ListingItem = ({ name, subtitle, icon, bgColor, logos }) => (
    <TouchableOpacity style={styles.listingItemContainer}>
        {/* Icon Block */}
        <View style={[styles.iconBlock, { backgroundColor: bgColor }]}>
            <FontAwesome5 name={icon} size={24} color="#FFFFFF" />
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
const StatusCard = ({ title, value, subText, subTextColor, iconName, iconColor }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
            <Ionicons name={iconName} size={24} color={iconColor} style={styles.cardIcon} />
            <Text style={[styles.cardTitle, { color: iconColor }]}>{title}</Text>
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={[styles.cardSubText, { color: subTextColor }]}>{subText}</Text>
    </View>
);


const ManageListing = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image source={require('../../assets/images/burger.png')} style={styles.avatar} />
                    <TouchableOpacity style={styles.bellButton}>
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.mainTitle}>Manage Listing</Text>
                <Text style={styles.subtitle}>
                    View, filter, and manage all active, pending, and archived listings across scholarships, perks, and educational content
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.exportButton}>
                        <Ionicons name="download-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.exportText}>Export CSV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton}>
                        <Ionicons name="add-circle-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.createText}>Create New Listing</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {/* --- SEARCH/FILTER SECTION --- */}
                <View >
                    {/* Search Bar */}
                    <View style={styles.searchFilterSection}>
                        <View style={styles.searchBar}>

                            <Text style={styles.searchText}>Search by listing name, vendor type...</Text>
                            <Ionicons name="search" size={22} color="#777" />
                        </View>


                        {/* Advanced Filters & Sort Row */}
                        <View style={styles.filtersRow}>
                            <TouchableOpacity style={styles.advancedFiltersButton}>
                                <Ionicons name="options-outline" size={20} color="#51e3fc" />
                                <Text style={styles.advancedFiltersText}>Advanced Filters</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sortButton}>
                                <Text style={styles.sortButtonText}>Sort by: Newest % </Text>
                                <Ionicons name="chevron-down" size={16} color="#ffffffff" />
                            </TouchableOpacity>
                        </View>


                        {/* Category Pills Row (Horizontal Scroll) */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll}>
                            <LinearGradient
                                colors={['#00C9FF', '#0077FF']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.activePillGradient}
                            >
                                <TouchableOpacity style={styles.pillTouch}>
                                    <FontAwesome5
                                        name="trophy"
                                        size={16}
                                        color="#fff"
                                        style={styles.pillIcon}
                                    />
                                    <Text style={styles.pillText}>Perks</Text>
                                </TouchableOpacity>
                            </LinearGradient>

                            <TouchableOpacity style={styles.pill}>
                                <FontAwesome5 name="graduation-cap" size={16} color="#fff" style={styles.pillIcon} />
                                <Text style={styles.pillText}>Scholarship</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pill}>
                                <FontAwesome5 name="play-circle" size={16} color="#fff" style={styles.pillIcon} />
                                <Text style={styles.pillText}>Videos</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    {/* Dropdowns Row (Top) */}
                    <View style={styles.dropdownsRow}>
                        {['All Status', 'All Types', 'All Vendors'].map((label, index) => (
                            <TouchableOpacity key={index} style={styles.dropdownButton}>
                                <Text style={styles.dropdownText}>{label}</Text>
                                <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Horizontal Status Cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
                        <StatusCard
                            title="Active Listing"
                            value="234"
                            subText="+12 from last week"
                            subTextColor="#51e3fc"
                            iconName="checkmark-circle"
                            iconColor="#51e3fc" // Light Blue
                        />
                        <StatusCard
                            title="Pending App"
                            value="9"
                            subText="-3 from yesterday"
                            subTextColor="#7B61FF"
                            iconName="time"
                            iconColor="#7B61FF" // Purple
                        />
                        {/* Placeholder for the third card visible in the image crop */}
                        <StatusCard
                            title="Archived"
                            value="45"
                            subText="+5 this month"
                            subTextColor="#D93E49"
                            iconName="archive"
                            iconColor="#D93E49"
                        />
                    </ScrollView>

                </View>
                {/* --- END SEARCH/FILTER SECTION --- */}

                {/* Listing List Card (Remaining Content in a ScrollView) */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.listScrollView}>
                    <View style={styles.listingListCard}>
                        <Text style={styles.listTitle}>Title</Text>
                        {listings.map(item => (
                            <ListingItem
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
    pillTouch: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    pillIcon: {
        marginRight: 6,
    },

    pillText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    activePillGradient: {
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 5,
        marginRight: 10,
    },
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
        color: '#A0AEC0',
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
        backgroundColor: '#1A1F2E', // Dark background for Export
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#51e3fc', // Bright blue for Create
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    actionIcon: {
        marginRight: 8,
    },
    exportText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    createText: {
        color: '#ffffffff', // Dark text on bright button
        fontWeight: '600',
        fontSize: 14,
    },
    // --- Search/Filter Styles ---
    searchFilterSection: {
        backgroundColor: '#021e38',
        padding: 15,
        borderRadius: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 15,
        paddingVertical: 12,
        marginBottom: 10,
    },
    searchText: {
        flex: 1,
        color: '#718096',
        fontSize: 14,
        marginHorizontal: 12,
    },
    filtersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:10,
        gap: 5,
    },
    advancedFiltersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    advancedFiltersText: {
        color: '#51e3fc',
        fontWeight: '600',
        fontSize: 13,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#51e3fc',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    sortButtonText: {
        color: '#ffffffff',
        fontWeight: '400',
        fontSize: 13,
    },
    // --- Pills Scroll ---
    pillsScroll: {
        marginTop: 12,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 14,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'white'
    },
    activePill: {
        backgroundColor: '#51e3fc',
    },
    pillIcon: {
        marginRight: 6,
    },
    pillText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 13,
    },
    // --- Dropdowns Row (Status, Types, Vendors) ---
    dropdownsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 15,
        marginTop:12,
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
        fontSize: 14,
        fontWeight: '500',
    },
    // --- Cards Scroll ---
    cardScrollContainer: {
        paddingVertical: 5,
    },
    cardContainer: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 15,
        marginRight: 15,
        width: 170,
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
        marginTop:12,
    },
    listingListCard: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 16,
        marginBottom: 50, // Final margin for scroll clearance
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
        fontWeight: '700',
        
    },
    listingSubtitle: {
        color: '#A0AEC0',
        fontSize: 13,
    },
    vendorLogoGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    
});

export default ManageListing;
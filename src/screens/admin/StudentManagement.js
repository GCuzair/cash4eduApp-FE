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
        name: 'Aroma Tariq',
        subtitle: 'Computer Science',
        photo: require('../../assets/images/std.jpg'),
        logos: [VendorLogoK, VendorLogoE],
    },
    {
        id: 2,
        name: 'Marcus Hill',
        subtitle: 'Business Admistration',
        photo: require('../../assets/images/std.jpg'),
        logos: [],
    },
    {
        id: 3,
        name: 'Sophia Lopez',
        subtitle: 'Psychology',
        photo: require('../../assets/images/std.jpg'),
        logos: [],
    },
    {
        id: 4,
        name: 'David Chen',
        subtitle: 'Engineering',
        photo: require('../../assets/images/std.jpg'),
        logos: [VendorLogoK],
    },
];



// --- Component for a single Listing Item in the main list ---
const ListingItem = ({ name, subtitle, photo, logos }) => (
    <TouchableOpacity style={styles.listingItemContainer}>

        {/* Image Block */}
        <Image source={photo} style={styles.profileImage} />

        {/* Listing Details */}
        <View style={styles.listingDetails}>
            <Text style={styles.listingName} numberOfLines={1}>{name}</Text>
            <Text style={styles.listingSubtitle} numberOfLines={1}>{subtitle}</Text>
        </View>

        {/* Vendor Logos */}
        <View style={styles.vendorLogoGroup}>
            {logos.map((logo, index) => (
                <Image
                    key={index}
                    source={logo}
                    style={[styles.vendorLogo, { marginLeft: index > 0 ? -10 : 0 }]}
                />
            ))}
        </View>

    </TouchableOpacity>
);



// --- Component for the horizontal Status Cards ---
const StatusCard = ({ title, value, subText, subTextColor, iconName, iconColor, titlecolor }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
            <FontAwesome5 name={iconName} size={24} color={iconColor} style={styles.cardIcon} />
            <Text style={[styles.cardTitle, { color: titlecolor }]}>{title}</Text>
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

                <Text style={styles.mainTitle}>Student Management</Text>
                <Text style={styles.subtitle}>
                    Manage user profiles, monitor engagement, and ensure student success across Cash 4 Edu
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.exportButton}>
                        <Ionicons name="download-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.exportText}>Export CSV</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton}>
                        <Ionicons name="add-circle-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.createText}>Add Student</Text>
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
                                <Ionicons name="options-outline" size={20} color="#03a2d5" />
                                <Text style={styles.advancedFiltersText}>Advanced Filters</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sortButton}>
                                <Text style={styles.sortButtonText}>Sort by: Join Date % </Text>
                                <Ionicons name="chevron-down" size={16} color="#ffffffff" />
                            </TouchableOpacity>
                        </View>



                    </View>

                    {/* Dropdowns Row (Top) */}
                    <View style={styles.dropdownsRow}>
                        {['All Status', 'All Engagement', 'All Schools'].map((label, index) => (
                            <TouchableOpacity key={index} style={styles.dropdownButton}>
                                <Text style={styles.dropdownText}>{label}</Text>
                                <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Horizontal Status Cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
                        <StatusCard
                            title="Total Students"
                            value="4,345"
                            titlecolor="white"
                            subText="+12 from last week"
                            subTextColor="#51e3fc"
                            iconName="users"
                            iconColor="#51e3fc" // Light Blue
                        />
                        <StatusCard
                            title="Active this match"
                            value="3,290"
                            subText="%+8 vs last month"
                            subTextColor="#a855f7"
                            titlecolor="white"
                            iconName="user-circle"
                            iconColor="#a855f7" // Purple
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
                        <Text style={styles.listTitle}>Student Name</Text>
                        {listings.map(item => (
                            <ListingItem
                                key={item.id}
                                name={item.name}
                                subtitle={item.subtitle}
                                photo={item.photo}
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
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 12,
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
        fontWeight: '700',
        fontSize: 16,
    },
    createText: {
        color: '#ffffffff', // Dark text on bright button
        fontWeight: '700',
        fontSize: 16,
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
        marginTop: 10,
        gap: 5,
    },
    advancedFiltersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    advancedFiltersText: {
        color: '#03a2d5',
        fontWeight: '600',
        fontSize: 13,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#51e3fc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
    },
    sortButtonText: {
        color: '#ffffffff',
        fontWeight: '400',
        fontSize: 13,
    },
 
    // --- Dropdowns Row (Status, Types, Vendors) ---
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
        borderRadius: 10,
        paddingHorizontal: 8,
        padding:9,
    
    },
    dropdownText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '400',
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
        width: 195,
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
        fontSize: 16,
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
        marginTop: 12,
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
        fontSize: 20,
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
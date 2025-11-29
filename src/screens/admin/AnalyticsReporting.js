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
        name: 'Cash 4 Edu Originals',
        subtitle: '3m 42s. Educational video',
        icon: 'star', // FontAwesome5
        bgColor: '#D93E49', // Red
        logos: [VendorLogoK, VendorLogoE],
    },
    {
        id: 2,
        name: 'Smart Bank',
        subtitle: '2m 15s. Educational video',
        icon: 'tv', // FontAwesome5
        bgColor: '#387D43', // Green
        logos: [],
    },
    {
        id: 3,
        name: 'EduLatinx',
        subtitle: '4m 15s. Educational video',
        icon: 'graduation-cap', // FontAwesome5
        bgColor: '#03A2D5', // Purple
        logos: [],
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
            <Text style={styles.listingName} numberOfLines={1}>{name}</Text>
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
const StatusCard = ({ title, value, subText, subTextColor, iconName, iconColor, titlecolor }) => (
    <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
            <Ionicons name={iconName} size={24} color={iconColor} style={styles.cardIcon} />
            <Text style={[styles.cardTitle, { color: titlecolor }]}>{title}</Text>
        </View>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={[styles.cardSubText, { color: subTextColor }]}>{subText}</Text>
    </View>
);


const AnalyticsReporting = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    {/* NOTE: You will need to ensure the path '../../assets/images/burger.png' is correct in your project */}
                    <Image
                        source={require('../../assets/images/burger.png')}
                        style={styles.avatar}
                    />
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchPlaceholder}>Search</Text>
                        <Ionicons name="search" size={18} color="#ffffffff" style={{ marginLeft: 150 }} />
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>



                <Text style={styles.mainTitle}>Analytics & Reporting</Text>
                <Text style={styles.subtitle}>
                    Track key metrics, performance trends, and generate actionable reports across all modules
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.exportButton}>
                        <Ionicons name="download-outline" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.exportText}>Export Report</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton}>
                        <FontAwesome5 name="magic" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.createText}>Generate Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                {/* Horizontal Status Cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollContainer}>
                    <StatusCard
                        title="Active Students"
                        value="12,456"
                        titlecolor='white'
                        subText="+3.5% from last week"
                        subTextColor="#51e3fc"
                        iconName="checkmark-circle"
                        iconColor="#51e3fc" // Light Blue
                    />
                    <StatusCard
                        title="Videos Watched"
                        value="1,354"
                        titlecolor='white'
                        subText="+5.2% Engagement"
                        subTextColor="#7B61FF"
                        iconName="videocam"
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

                {/* Dropdowns Row (Top) */}
                <View style={styles.dropdownsRow}>
                    {['All Report Type', 'Last 30 days', 'All Categories'].map((label, index) => (
                        <TouchableOpacity key={index} style={styles.dropdownButton}>
                            <Text style={styles.dropdownText}>{label}</Text>
                            <Ionicons name="chevron-down" size={14} color="#fff" style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- END SEARCH/FILTER SECTION --- */}

                {/* Listing List Card (Remaining Content in a ScrollView) */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.listScrollView}>
                    <View style={styles.listingListCard}>
                        <Text style={styles.listTitle}>Top Performing Vendors</Text>
                        <Text style={styles.innertitle}>Vendors</Text>
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

                <View style={styles.listingListCard}>
                    <View style={{ flexDirection: "row", gap: 15 }}>
                        <FontAwesome5 name='robot' size={20} color='#03A2D5' />
                        <Text style={styles.innertitle}>AI Insights</Text>

                    </View>
                    <View>
                        <Text style={{color:'white',fontWeight:'600',fontSize:12}}>Engagement rose 14% this month, driven primarlly by new vendor uploads. However, scholarship completions rates declined by 8%. Consider running a “Complete Your Profile” campaign to boost match accuracy.</Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        <TouchableOpacity style={[styles.btn2, { backgroundColor: '#A855F7' }]}>
                            <FontAwesome5 name='lightbulb' size={16} color="white" style={{ marginLeft: 4 }} />
                            <Text style={styles.btntxt}>Generate Campaign Recommendation</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn1, { backgroundColor: '#03A2D5' }]}>
                            <FontAwesome5 name='coins' size={16} color="white" />
                            <Text style={styles.btntxt}>Export Insight Summary</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    btn1: {
        flexDirection: 'row',
        backgroundColor: '#A855F7',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical:10,
        marginTop: 20,
    },
    btn2: {
        flexDirection: 'row',
        backgroundColor: '#A855F7',
        gap: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:6,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 10,
    },
    btntxt: {
        color: 'white',
        marginTop: 2,
    },
    listTitle: {
        color: 'white',
        fontSize: 20,
        paddingBottom: 10,
        fontWeight: '600'
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
        fontSize: 15,
    },
    createText: {
        color: '#ffffffff', // Dark text on bright button
        fontWeight: '700',
        fontSize: 15,
    },
    // --- Search/Filter Styles ---
    searchFilterSection: {
        backgroundColor: '#021e38',
        padding: 15,
        borderRadius: 10,
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
        paddingHorizontal: 9,
        paddingVertical: 2,
    },
    sortButtonText: {
        color: '#ffffffff',
        fontWeight: '400',
        fontSize: 12,
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
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
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
        fontSize: 15,
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
        marginBottom: 15, // Final margin for scroll clearance
    },

    innertitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 2,
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
        fontSize: 18,
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

export default AnalyticsReporting;
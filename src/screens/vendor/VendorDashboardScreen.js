import React from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// 1. IMPORT THE ICON COMPONENT
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Get screen width for responsive layout
const { width } = Dimensions.get('window');

// --- Component for the Dashboard Cards ---
const DashboardCard = ({ title, value, iconType, backgroundColor, }) => (
    
    
    <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{title}</Text>
            {/* 2. REPLACING EMOJIS WITH ICON COMPONENTS */}
            {iconType === 'clipboard' && <Icon name="clipboard-text-outline" size={24} color="#FFF" />}
            {iconType === 'emoticon' && <Icon name="emoticon-happy-outline" size={24} color="#FFF" />}
            {iconType === 'application' && <Text style={styles.cardIconText}>A</Text>}
            {iconType === 'click' && <Icon name="cursor-default-click-outline" size={24} color="#FFF" />}
        </View>
        <Text style={styles.cardValue}>{value}</Text>
    </View>
);

// --- Placeholder for the Chart (No change needed here) ---
const EngagementChart = () => (
    <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Engagement Trends</Text>
        <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>Chart Placeholder</Text>
            <View style={styles.chartLine} />
            <View style={styles.chartTooltip}>
                <Text style={styles.tooltipText}>Views: 7,890</Text>
                <Text style={styles.tooltipText}>Clicks: 1,320</Text>
            </View>
        </View>
        <View style={styles.chartXAxis}>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                <Text key={index} style={styles.chartXAxisLabel}>{month}</Text>
            ))}
        </View>
    </View>
);

// --- Component for Recent Activity Items ---
const ActivityItem = ({ iconName, title, subtitle }) => ( // Use iconName instead of icon
    <View style={styles.activityItem}>
        <View style={styles.activityIconBackground}>
            {/* 3. USING ICON IN ACTIVITY LIST */}
            <Icon name={iconName} size={20} color="#FFF" />
        </View>
        <View style={styles.activityTextContent}>
            <Text style={styles.activityTitle}>{title}</Text>
            <Text style={styles.activitySubtitle}>{subtitle}</Text>
        </View>
    </View>
);

// --- Main Screen Component ---
const VendorDashboardScreen = () => {
    const navigation=useNavigation();
    // Data for the cards (no change)
    const dashboardData = [
        { title: 'Total Listings', value: '124', iconType: 'clipboard', backgroundColor: '#1A3350' },
        { title: 'Total Views', value: '28,500', iconType: 'emoticon', backgroundColor: '#1A3350' },
        { title: 'Total Applications', value: '4,120', iconType: 'application', backgroundColor: '#1A3350' },
        { title: 'Total Clicks', value: '4,120', iconType: 'click', backgroundColor: '#1A3350' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header Section */}
                <View style={styles.header}>
                    {/* 'V' Icon Placeholder */}
                    <View style={styles.headerIconPlaceholder}>
                        <Text style={styles.headerIconText}>V</Text>
                    </View>

                    <Image
                        source={require('../../assets/images/Logo.png')} // path to your logo file
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    {/* 4. REPLACING BELL EMOJI */}
                    <Icon name="bell-outline" size={28} color="#FFF" />
                </View>

                {/* Search Bar Placeholder */}
                <View style={styles.searchBar}>
                    <TextInput style={styles.searchText}>Search scholarships</TextInput>

                    {/* 5. REPLACING SEARCH AND MIC EMOJIS */}
                    <Icon name="magnify" size={24} color="#FFF" style={styles.searchBarIcon} />
                    <Icon name="microphone-outline" size={24} color="#FFF" />
                </View>

                {/* Dashboard Title (no change) */}
                <View style={styles.dashboardTitleContainer}>
                    <Text style={styles.dashboardTitle}>Vendor Dashboard</Text>
                    <Text style={styles.dashboardSubtitle}>
                        Overview of your listing and engagement performance
                    </Text>
                </View>

                {/* Dashboard Cards Grid (no change) */}
                <View style={styles.cardGrid}>
                    {dashboardData.map((data, index) => (
                        <DashboardCard
                            key={index}
                            title={data.title}
                            value={data.value}
                            backgroundColor={data.backgroundColor}
                            iconType={data.iconType}
                        />
                    ))}
                </View>

                {/* Engagement Trends Chart (no change) */}
                <EngagementChart />

                {/* Quick Actions (no change) */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActionsContainer}>
                    <TouchableOpacity style={styles.actionButtonPrimary} onPress={()=>{navigation.navigate('CreateListing')}}>
                        <Text style={styles.actionButtonPrimaryText}>Create New Listing</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButtonSecondary}>
                        <Text style={styles.actionButtonSecondaryText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButtonSecondary}>
                        <Text style={styles.actionButtonSecondaryText}>Upgrade Plan</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Recent Activity (New prop: iconName) */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <View style={styles.activityList}>
                    <ActivityItem
                        iconName="file-multiple-outline" // Replaced 🗂️
                        title="Your Listing 'Tech Scholarship' got 15 new views this week"
                        subtitle="3 Hours ago"
                    />
                    <ActivityItem
                        iconName="thumb-up-outline" // Replaced 👆
                        title="New Applicant for 'Design Fellowship'"
                        subtitle="3 Days ago"
                    />
                    <ActivityItem
                        iconName="star-outline" // Replaced ⭐️
                        title="Your profile rating increased to 4.5 stars"
                        subtitle="1 Day ago"
                    />
                </View>

            </ScrollView>
        </View>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingTop: 10,
    },

    // Header Styles
    header: {
        flexDirection: 'row',
        // Adjusted to use space-between since we have the V-icon and the bell icon now
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        // marginTop: 20,
    },
    headerIconPlaceholder: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIconText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 30,
    },
    searchText: {
        flex: 1,
        color: '#AAA',
        fontSize: 16,
    },
    logo: {
        // marginTop: 10,
        width: 110,
        height: 80,
    },
    kIconPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#6B8E23',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    kIconText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // The following style is still useful for spacing the icons:
    searchBarIcon: {
        marginHorizontal: 5,
    },

    // Dashboard Title Styles (no change)
    dashboardTitleContainer: {
        marginBottom: 20,
    },
    dashboardTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dashboardSubtitle: {
        color: '#BBB',
        fontSize: 14,
    },

    // Card Grid Styles (no change)
    cardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    // Individual Card Styles (no change to card, but old emoji styles are removed)
    card: {
        width: (width / 2) - 25,
        height: 110,
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        justifyContent: 'space-between',
        backgroundColor: '#1A3350',
        borderWidth:1,
        borderColor: '#03a2d5',

        // 💡 Outer shadow around the border
        shadowColor: '#03a2d5',
        shadowOffset: { width:0 , height: 0},
        shadowOpacity: 0.9,
        shadowRadius: 15,
        elevation:10,

        
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '900',
        maxWidth: '80%',
    },
    cardValue: {
        color: '#FFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    cardIconText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'transparent',

    },

    // Engagement Chart Styles (Placeholder) (no change)
    chartContainer: {
        backgroundColor: '#1A3350',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,
    },
    chartTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    chartPlaceholder: {
        height: 200,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#444',
    },
    chartPlaceholderText: {
        color: '#777',
        fontSize: 16,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    chartLine: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#1E90FF',
        transform: [{ translateY: -100 }],
        opacity: 0.7,
    },
    chartTooltip: {
        position: 'absolute',
        top: '40%',
        left: '30%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 5,
        padding: 8,
    },
    tooltipText: {
        color: '#FFF',
        fontSize: 12,
    },
    chartXAxis: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 5,
    },
    chartXAxisLabel: {
        color: '#999',
        fontSize: 10,
    },

    // Section Titles (no change)
    sectionTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15,
    },

    // Quick Actions Styles (no change)
    quickActionsContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    actionButtonPrimary: {
        backgroundColor: '#03a2d5',
        borderRadius: 22,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 10,
    },
    actionButtonPrimaryText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    actionButtonSecondary: {
        backgroundColor: '#333',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginRight: 10,
        borderColor: '#555',
    },
    actionButtonSecondaryText: {
        color: '#FFF',
        fontSize: 16,
    },

    // Recent Activity Styles (activityIcon is now applied to the Icon component)
    activityList: {
        backgroundColor: '#1A3350',
        borderRadius: 15,
        padding: 10,
        marginBottom: 40,
        
    },
    activityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    activityIconBackground: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    // Removed the fontSize from activityIcon style since it's now set directly on the <Icon> component.
    // We can delete this or keep it empty if we want to retain the name.

    activityTextContent: {
        flex: 1,
    },
    activityTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    activitySubtitle: {
        color: '#BBB',
        fontSize: 12,
    },
});

export default VendorDashboardScreen;
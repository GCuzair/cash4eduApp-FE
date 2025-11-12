import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- Reusable Component: Redemption History Item ---
const RedemptionItem = ({ status, title, daysAgo, expirationDays }) => {
    // Determine status badge styles based on the image provided
    let statusColor;
    let statusText;
    let badgeStyle;
    let isExpired = false;

    if (status === 'Active') {
        statusColor = '#12db00'; // Green
        statusText = 'Active';
        badgeStyle = styles.statusActive;
    } else if (status === 'Used') {
        statusColor = '#ffffffff'; // Gray
        statusText = 'Used';
        badgeStyle = styles.statusUsed;
    } else if (status === 'Expired') {
        statusColor = '#ef4444'; // Red
        statusText = 'Expired';
        badgeStyle = styles.statusExpired;
        isExpired = true;
    }

    return (
        <View style={styles.redemptionItem}>
            {/* Left Placeholder Block (Looks like a rounded square icon background) */}
            <View style={styles.itemImagePlaceholder} />

            {/* Middle Text Content */}
            <View style={styles.itemTextContent}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSubtitle}>
                    Redeem {daysAgo} ago
                </Text>
            </View>

            {/* Right Status Badge and Expiration Text */}
            <View style={styles.statusWrapper}>
                <View style={[styles.statusBadge, { backgroundColor: statusColor }, badgeStyle]}>
                    <Text style={[styles.statusText, isExpired && { color: '#fff' }]}>
                        {statusText}
                    </Text>
                </View>
                {status === 'Active' && expirationDays && (
                    <Text style={styles.expiresText}>
                        Expires in {expirationDays} days
                    </Text>
                )}
            </View>
        </View>
    );
};

// --- Main Screen Component ---
const RedemptionHistoryScreen = ({ navigation }) => {
    // Dummy Data for the list
    const redemptionData = [
        { id: 1, title: '15% Off Tuition Credit', daysAgo: '2 days', status: 'Active', expirationDays: 13 },
        { id: 2, title: '15% Off Tuition Credit', daysAgo: '2 days', status: 'Used' },
        { id: 3, title: '15% Off Tuition Credit', daysAgo: '2 days', status: 'Expired' },
    ];

    return (
        <View style={styles.container}>
            {/* Header (Outside ScrollView to keep it fixed) */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation && navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Redemption History</Text>
                <Ionicons name="bookmark-outline" size={24} color="#fff" />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Statistics Card */}
                <View style={styles.statsCard}>
                    <View style={styles.statsHeader}>
                        <View style={styles.cupIconBackground}>
                            <MaterialCommunityIcons name="trophy" size={26} color="#000814" />
                        </View>
                        <View style={styles.statsTextWrapper}>
                            <Text style={styles.rewardsCount}>16 Rewards Redeemed</Text>
                            <View style={styles.statsTokenRow}>
                                <Text style={styles.tokenUsed}>4,850 Token Used</Text>
                                <View style={styles.tokenUsedSpacer} />
                                <Text style={styles.mostRedeemedLabel}>Most Redeemed</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.mostRedeemedValue}>Food & Dining</Text>

                    {/* Earn More Tokens Button */}
                    <TouchableOpacity style={styles.earnMoreButton} activeOpacity={0.8}>
                        <LinearGradient
                            colors={['#0A132B', '#000814']} // Subtle dark gradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={styles.earnMoreGradient}
                        >
                            <MaterialCommunityIcons name="bag-personal" size={18} color="#FFD700" style={styles.bagIcon} />
                            <Text style={styles.earnMoreText}>Earn More Tokens</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search redemptions by name or date..."
                        placeholderTextColor="#777"
                    />
                    <Ionicons name="search" size={22} color="#ffffffff" />
                </View>

                {/* Redemption History List */}
                {redemptionData.map(item => (
                    <RedemptionItem
                        key={item.id}
                        status={item.status}
                        title={item.title}
                        daysAgo={item.daysAgo}
                        expirationDays={item.expirationDays}
                    />
                ))}

                {/* Your Reward Insight Section */}
                <View style={styles.    insightSection}>
                    <View style={styles.insightHeader}>
                        <Text style={styles.insightTitle}>Your Reward Insight</Text>
                        <TouchableOpacity><Text style={styles.viewFull}>View Full</Text></TouchableOpacity>
                    </View>

                    {/* Insight Bar Chart Area (Mostly Token Spending) */}
                    <View style={styles.insightBarContainer}>
                        <View style={styles.insightBarContent}>
                            <Text style={styles.insightBarLabel}>Mostly Token Spending</Text>
                            <Text style={styles.insightBarValue}>25%</Text>
                        </View>

                        {/* Gradient bar visible below */}
                        <LinearGradient
                            colors={['#07abe1ff', '#12647fff']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.tokenBanner}
                        />
                    </View>

                    {/* Category Breakdown */}
                    <View style={styles.categoryRow}>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryPercentage}>42%</Text>
                            <Text style={styles.categoryLabel}>Food</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryPercentage}>28%</Text>
                            <Text style={styles.categoryLabel}>Tech</Text>
                        </View>
                        <View style={styles.categoryItem}>
                            <Text style={styles.categoryPercentage}>30%</Text>
                            <Text style={styles.categoryLabel}>Education</Text>
                        </View>
                    </View>
                </View>

                {/* Milestone Banner (Bottom) */}

                <LinearGradient
                    // Define your colors (e.g., a dark blue transition)
                    colors={['#51e3fc', '#006b8fff']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.milestoneBanner}
                >
                    <View style={styles.milestoneTextContent}>
                        <Text style={styles.milestoneText}>
                            {/* The icon is wrapped in a Text component to align with the text block */}
                            <MaterialCommunityIcons name="fire" size={16} color="#ffffff" />
                            <Text style={styles.milestoneBoldText}> Almost There!</Text>
                        </Text>
                        <Text style={styles.txt}>150 tokens until your next milestone</Text>
                    </View>
                    <TouchableOpacity style={styles.milestoneButton}>
                        <Text style={styles.milestoneButtonText}>Earn Token</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ScrollView>
        </View>
    );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
    txt: {
        color: 'white',
        fontSize: 11,
    },
    container: {
        flex: 1,
        backgroundColor: '#000814', // Main dark background
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    // --- Header Styles ---
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 45, // Account for notch/status bar
        paddingBottom: 15,
        backgroundColor: '#000814',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 100,
    },

    // --- Stats Card Styles ---
    statsCard: {
        backgroundColor: '#021e38', // Dark card background
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    statsHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    cupIconBackground: {
        backgroundColor: '#00CFFF', // Bright blue for the cup icon circle
        borderRadius: 10, // Slightly more rounded square
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    statsTextWrapper: {
        flex: 1,
    },
    rewardsCount: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statsTokenRow: {
        flexDirection: 'row',
        marginTop: 20,
        right: 60,
        gap: 35,
    },
    tokenUsed: {
        color: '#ffffffff', // Light gray/blue
        fontSize: 14,
        fontWeight: '500', // Matches the image's font weight
    },
    tokenUsedSpacer: {
        flex: 1, // Pushes elements apart
        marginTop: 20,
    },
    mostRedeemedLabel: {
        fontSize: 14,
        color: '#ffffffff',
        fontWeight: '500', // Matches the image's font weight
        textAlign: 'right',
    },
    mostRedeemedValue: {
        color: '#ffffffff', // Bright blue text
        fontSize: 17,
        fontWeight: 'bold',
        bottom: 2,
        textAlign: 'right', // Aligns to the right edge

        marginBottom: 15,
    },

    // Earn More Button
    earnMoreButton: {
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#51e3fc', // Dark border matching gradient start/end
    },
    earnMoreGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    bagIcon: {
        marginRight: 8,
        color: '#e2e2e2ff', // Gold icon color
    },
    earnMoreText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },

    // --- Search Bar Styles ---
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e2e2eff', // Darker input background
        borderRadius: 20,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 14,
        paddingVertical: 12,
    },

    // --- Redemption Item Styles ---
    redemptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#021e38',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    itemImagePlaceholder: {
        width: 55,
        height: 55,
        borderRadius: 10,
        backgroundColor: '#03a2d5', // Dark blue placeholder block
        marginRight: 15,
    },
    itemTextContent: {
        flex: 1,
    },
    itemTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 3,
    },
    itemSubtitle: {
        color: '#ffffffff',
        fontSize: 12,
    },
    statusWrapper: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    statusBadge: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        minWidth: 70,
        marginBottom: 2,
    },
    statusActive: {
        backgroundColor: '#60D44A',
        borderRadius: 20,
    },
    statusUsed: {
        backgroundColor: '#5C6777', // A medium dark gray
        borderRadius: 20
    },
    statusExpired: {
        backgroundColor: '#D44A4A',
        borderRadius: 20
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000', // Default text color for Active/Used
        textAlign: 'center',

    },
    expiresText: {
        fontSize: 10,
        color: '#51e3fc', // Green text for expiration date
        marginTop: 5,
    },

    // --- Insight Section Styles ---
    insightSection: {
        paddingTop: 20,
        marginBottom: 20,
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 15,
    },
    insightHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    insightTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewFull: {
        color: '#00CFFF',
        fontSize: 14,
    },

    // Insight Bar
    insightBarContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        alignContent:'center',
        height: 60,
        marginBottom: 15,
        width: '100%',
        height:140,
        padding: 10,
        backgroundColor: '#02698bff', // Darker background for the bar track
    },
    insightBarContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
        position: 'absolute',
        marginBottom: 6,
        marginTop:8,
        top: 0,
        bottom: 0,
        left: 10,
        right: 10,
    },
    insightBarLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    insightBarValue: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Category Breakdown
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 15, // Match padding of the bar above it
    },
    categoryItem: {
        alignItems: 'center',
        flex: 1,
    },
    categoryPercentage: {
        color: '#00CFFF',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    categoryLabel: {
        color: '#B0C4DE',
        fontSize: 14,
        fontWeight: '500',
    },

    // --- Milestone Banner ---
    milestoneBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        width: '100%'
    },

    tokenBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent:'center',
        padding: 15,
        marginVertical: 10,
        marginTop:50,
        height:70,
        flex:1,
        position:'absolute',
        left:10,
        width:'100%'
    },
    milestoneTextContent: {
        flex: 1,
        marginRight: 10,
    },
    milestoneText: {
        color: '#000',
        fontSize: 10,
        color: 'white',
    },
    milestoneBoldText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 14,
    },
    milestoneButton: {
        backgroundColor: '#51e3fc', // Very dark blue/black button
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    milestoneButtonText: {
        color: '#ffffffff', // Bright blue text
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default RedemptionHistoryScreen;
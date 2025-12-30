import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  ActivityIndicator 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FireApi } from '../../utils/FireApi';
import Toast from 'react-native-toast-message';
import VendorBottomTabs from '../../navigation/VendorBottomTabs';

// Get screen width for responsive layout
const { width } = Dimensions.get('window');

// Helper function to bold the listing title (text within quotes)
const getFormattedTitle = (text) => {
    const match = text.match(/('([^']+)'|"([^"]+)")/);
    if (!match) return <Text style={styles.cardText}>{text}</Text>;

    const listingName = match[0];
    const parts = text.split(listingName);

    return (
        <Text style={styles.cardText}>
            {parts[0]}
            <Text style={styles.boldText}>{listingName}</Text>
            {parts[1]}
        </Text>
    );
};

// --- Component for Recent Activity Cards ---
const ActivityCard = ({ title, time, iconName }) => {
    return (
        <LinearGradient
            colors={['#03a2d5', '#000000ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardContainer}
        >
            <View style={styles.iconWrapper}>
                <Icon name={iconName} size={30} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
                {getFormattedTitle(title)}
                <Text style={styles.timeText}>{time}</Text>
            </View>
        </LinearGradient>
    );
};

// --- ProgressBar Component ---
const ProgressBar = ({ progress = 80 }) => {
    const fillWidth = `${progress}%`;
    return (
        <View style={styles.containerLine}>
            <Text style={styles.label}>{progress}%</Text>
            <View style={styles.track}>
                <LinearGradient
                    colors={['#51e3fc', '#03a2d5']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={[styles.fill, { width: fillWidth }]}
                />
            </View>
        </View>
    );
};

// --- Stat Card Component ---
const StatCard = ({ icon, iconColor, title, value, subText, subTextColor }) => {
    return (
        <View style={styles.card}>
            <View style={styles.users}>
                {icon}
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={[styles.cardSubText, { color: subTextColor }]}>{subText}</Text>
        </View>
    );
};

// --- Main Screen Component ---
const VendorDashboardScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        scholarships: { total: 0, live: 0, pending_review: 0 },
        perks: { total: 0, live: 0 },
        tuition: { total: 0, live: 0 },
        videos: { total: 0, live: 0 },
        applications: { total: 0, pending: 0, approved: 0 }
    });
    const [recentListings, setRecentListings] = useState([]);
    const [profileProgress, setProfileProgress] = useState(80);

    // Fetch dashboard data
    const fetchVendorDashboard = async () => {
        try {
            setLoading(true);
            const response = await FireApi('vendor/listings','GET');
            
            if (response && response.success && response.data) {
                const data = response.data;
                
                // Update statistics
                setStats({
                    scholarships: data.statistics?.scholarships || { total: 0, live: 0, pending_review: 0 },
                    perks: data.statistics?.perks || { total: 0, live: 0 },
                    tuition: data.statistics?.tuition || { total: 0, live: 0 },
                    videos: data.statistics?.videos || { total: 0, live: 0 },
                    applications: data.statistics?.applications || { total: 0, pending: 0, approved: 0 }
                });

                // Update recent listings
                if (data.scholarships && Array.isArray(data.scholarships)) {
                    const formattedListings = data.scholarships.slice(0, 3).map((scholarship, index) => ({
                        id: scholarship.id,
                        iconName: getIconForStatus(scholarship.status),
                        title: `Your listing "${scholarship.listing_title}" is ${getStatusText(scholarship.status)}`,
                        time: getTimeText(scholarship.deadline)
                    }));
                    setRecentListings(formattedListings);
                }

                const totalListings = data.total_listings || 0;
                const progress = Math.min(100, 20 + (totalListings * 10));
                setProfileProgress(progress);

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response?.message || 'Failed to load dashboard data'
                });
            }
        } catch (error) {
            console.error('Dashboard fetch error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load dashboard data'
            });
        } finally {
            setLoading(false);
        }
    };

    // Helper functions
    const getIconForStatus = (status) => {
        switch (status) {
            case 'pending_review':
                return 'clock-time-four-outline';
            case 'published':
            case 'live':
                return 'check-circle-outline';
            case 'draft':
                return 'file-document-edit-outline';
            default:
                return 'layers-triple-outline';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'pending_review':
                return 'pending review';
            case 'published':
            case 'live':
                return 'live';
            case 'draft':
                return 'saved as draft';
            default:
                return status;
        }
    };

    const getTimeText = (deadline) => {
        if (!deadline) return 'Recently';
        
        const deadlineDate = new Date(deadline);
        const now = new Date();
        const diffTime = Math.abs(deadlineDate - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays < 7) return `${diffDays} days remaining`;
        if (diffDays < 30) return `${Math.floor(diffDays/7)} weeks remaining`;
        return 'Over a month remaining';
    };

    // Load data when screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchVendorDashboard();
            return () => {};
        }, [])
    );

    // Load data on initial mount
    useEffect(() => {
        fetchVendorDashboard();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#03A2D5" />
            </View>
        );
    }

    // Prepare recent activities from API data
    const recentActivities = recentListings.length > 0 
        ? recentListings 
        : [
            {
                id: 1,
                iconName: 'layers-triple-outline',
                title: 'Create your first listing to get started',
                time: 'Get started now',
            },
            {
                id: 2,
                iconName: 'hand-pointing-up',
                title: 'Complete your profile to boost visibility',
                time: 'Increase your reach',
            },
            {
                id: 3,
                iconName: 'clock-time-four-outline',
                title: 'No active listings yet',
                time: 'Create one now',
            },
        ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('VendorProfile')}>
                    <View style={styles.headerIconPlaceholder}>
                        <Text style={styles.headerIconText}>V</Text>
                    </View>
                </TouchableOpacity>
                <Image source={require('../../assets/images/Logo.png')} style={styles.logo} />
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Icon name="bell-outline" size={22} color="#FFF" />
                    <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                        <Ionicons name="settings" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Dashboard Title */}
            <View style={styles.dashboardTitleContainer}>
                <Text style={styles.dashboardTitle}>Vendor Dashboard</Text>
                <Text style={styles.dashboardSubtitle}>
                    Your profile is {profileProgress}% complete
                </Text>
                <Text style={styles.dashboardSubtitle}>
                    Complete your profile to boost visibility
                </Text>
            </View>

            {/* Progress Bar */}
            <ProgressBar progress={profileProgress} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity 
                            style={styles.btn1} 
                            onPress={() => navigation.navigate('CreateListing')}
                        >
                            <AntDesign name='plus' size={18} color='white' style={{ marginTop: 1 }} />
                            <Text style={styles.btnTxt}>Create New Listing</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.btn2}
                            onPress={() => navigation.navigate('VendorProfile')}
                        >
                            <FontAwesome5 name='pen' size={18} color='white' style={{ marginTop: 1 }} />
                            <Text style={styles.btnTxt}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Snapshot Cards Section */}
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.sectionTitle}>Snapshot Cards</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Active Scholarships Card */}
                    <StatCard
                        icon={<FontAwesome5 name="graduation-cap" size={18} color="#51e3fc" />}
                        iconColor="#51e3fc"
                        title="Total Scholarships"
                        value={stats.scholarships.total}
                        subText={`${stats.scholarships.live} live, ${stats.scholarships.pending_review} pending`}
                        subTextColor="#52e3fc"
                    />

                    {/* Pending Applications Card */}
                    <StatCard
                        icon={<MaterialIcons name="pending-actions" size={20} color="#7B61FF" />}
                        iconColor="#7B61FF"
                        title="Applications"
                        value={stats.applications.total}
                        subText={`${stats.applications.pending} pending, ${stats.applications.approved} approved`}
                        subTextColor="#7B61FF"
                    />

                    {/* Perks Card */}
                    <StatCard
                        icon={<FontAwesome5 name="gift" size={18} color="#FF6B6B" />}
                        iconColor="#FF6B6B"
                        title="Active Perks"
                        value={stats.perks.total}
                        subText={`${stats.perks.live} live perks`}
                        subTextColor="#FF6B6B"
                    />

                    {/* Tuition Assistance Card */}
                    <StatCard
                        icon={<FontAwesome5 name="university" size={18} color="#4ECDC4" />}
                        iconColor="#4ECDC4"
                        title="Tuition Offers"
                        value={stats.tuition.total}
                        subText={`${stats.tuition.live} live offers`}
                        subTextColor="#4ECDC4"
                    />
                </ScrollView>

                {/* Recent Activity Section */}
                <View style={styles.recentActivityContainer}>
                    <View style={styles.recentActivityHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ManageListingScreen')}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.activityList}>
                        {recentActivities.map((activity) => (
                            <ActivityCard
                                key={activity.id}
                                iconName={activity.iconName}
                                title={activity.title}
                                time={activity.time}
                            />
                        ))}
                    </View>
                </View>

                {/* Help Section */}
                <View style={styles.recentActivityContainer}>
                    <View style={styles.innerNeedCont}>
                        <View style={styles.iconBg}>
                            <FontAwesome5
                                name='question-circle'
                                color='white'
                                size={40}
                                style={{ top: 15, left: 15 }}
                            />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.needTitle}>Need Help?</Text>
                            <Text style={styles.needsubTitle}>
                                Get assistance managing your listing and applications.
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.innerBtn}>
                            <Text style={styles.innerBtntxt}>View FAQs</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.innerBtn}>
                            <Text style={styles.innerBtntxt}>Contact Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Create New Listing Button */}
                <TouchableOpacity 
                    style={styles.lastBtn}
                    onPress={() => navigation.navigate('CreateListing')}
                >
                    <AntDesign name='plus' size={18} color='white' style={{ marginTop: 1 }} />
                    <Text style={styles.lastBtnTxt}>Create New Listing</Text>
                </TouchableOpacity>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16,
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 10
    },
    lastBtn: {
        backgroundColor: '#51e3fc',
        padding: 15,
        flexDirection: 'row',
        marginTop: 25,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    lastBtnTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    innerBtn: {
        borderWidth: 1,
        borderColor: '#51e3fc',
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        padding: 10,
    },
    innerBtntxt: {
        color: '#51e3fc',
        fontSize: 16,
    },
    innerNeedCont: {
        alignItems: 'center'
    },
    iconBg: {
        backgroundColor: '#03a2d5',
        opacity: 0.3,
        width: 70,
        height: 70,
        borderRadius: 80,
        marginTop: 40
    },
    btn1: {
        backgroundColor: '#0257a7',
        width: '48%',
        flexDirection: 'row',
        gap: 3,
        padding: 8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn2: {
        width: '48%',
        flexDirection: 'row',
        gap: 10,
        padding: 8,
        paddingHorizontal: 25,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTxt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 3
    },
    boldText: {
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    headerIconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1E90FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIconText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dashboardTitleContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    dashboardTitle: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    dashboardSubtitle: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    containerLine: {
        width: '100%',
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    label: {
        color: '#51e3fc',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 5,
    },
    track: {
        height: 15,
        borderRadius: 8,
        backgroundColor: '#3A3A58',
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: '#03a2d5',
        borderRadius: 8,
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    needTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
        marginBottom: 10,
    },
    needsubTitle: {
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        paddingVertical: 4,
    },
    card: {
        backgroundColor: '#021e38',
        borderRadius: 16,
        padding: 20,
        marginRight: 15,
        width: 200,
        justifyContent: 'center',
    },
    users: {
        flexDirection: 'row',
        gap: 8,
        paddingBottom: 10,
        width: '100%',
        alignItems: 'center',
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
        fontSize: 12,
        marginTop: 4,
    },
    scholarshipText: {
        color: '#7B61FF',
        fontSize: 12,
        marginTop: 4,
    },
    recentActivityContainer: {
        marginTop: 25,
        backgroundColor: '#021e38',
        borderRadius: 20,
        padding: 10,
    },
    recentActivityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewAllText: {
        color: '#55aaff',
        fontSize: 16,
        fontWeight: '500',
    },
    activityList: {
        gap: 12,
        paddingVertical: 5,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ffffffff',
    },
    iconWrapper: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    cardText: {
        color: '#FFFFFF',
        fontSize: 15,
        lineHeight: 20,
    },
    timeText: {
        color: '#B0B0B0',
        fontSize: 13,
        marginTop: 2,
    },
});

export default VendorDashboardScreen;
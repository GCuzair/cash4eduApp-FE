import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');

// --- Reusable Component for Info Sections (KEPT FOR OTHER SECTIONS) ---
const InfoSection = ({ title, children, showEdit = true }) => (
    <View style={styles.infoSection}>
        <View style={styles.infoHeader}>
            <Text style={styles.infoTitle}>{title}</Text>
            {showEdit && (
                <TouchableOpacity>
                    <MatIcon name="pencil-outline" size={20} color="#00BFFF" />
                </TouchableOpacity>
            )}
        </View>
        <View style={styles.infoContent}>
            {children}
        </View>
    </View>
);

const StatBox = ({ label, value }) => (
    <View style={styles.statBox}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const VendorProfileScreen = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            {/* 1. Header (Navigation Back Button) */}
            <View style={styles.screenHeader}>
                <Icon name="arrow-back" size={28} color="#fff" />
            </View>

            {/* 2. Profile Header (Avatar and Title) */}
            <View style={styles.profileHeader}>
                {/* Profile Avatar */}
                <View style={styles.avatarPlaceholder}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
                        style={styles.avatarImage}
                    />
                </View>

                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileName}>Tech Innovators Inc.</Text>

                    <View style={styles.verifiedBadge}>
                        <Icon name="checkmark-circle" size={16} color="#48BB78" />
                        <Text style={styles.verifiedText}>Verified Vendor</Text>
                    </View>

                    <Text style={styles.profileMotto}>Empowering students through tech support</Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoHeader}>
                    <Text style={styles.infoTitle}>Business Information</Text>
                    <TouchableOpacity>
                        <MatIcon name="pencil-outline" size={20} color="#00BFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.infoDetail}>Business Name</Text>
                </View>
            </View>

            {/* 4. Contact Info */}
            <InfoSection title="Contact Info">
                <Text style={styles.infoDetail}>
                    <Icon name="call-outline" size={14} color="#A0AEC0" /> Phone: +(555 123-667)
                </Text>
                <Text style={styles.infoDetail}>
                    <Icon name="mail-outline" size={14} color="#A0AEC0" /> Email: john@gmail.com
                </Text>
                <Text style={styles.infoDetail}>
                    <Icon name="globe-outline" size={14} color="#A0AEC0" /> Website: techinnovators.com
                </Text>
            </InfoSection>

            {/* 5. Description / About Us */}
            <InfoSection title="Description / About Us">
                <Text style={styles.descriptionText}>
                    We are a leading technology company dedicated to providing students with essential resources and opportunities to excel in their academics and professional journeys
                </Text>
            </InfoSection>

            {/* 6. Social Links */}
            <InfoSection title="Social Links">
                <View style={styles.socialIcons}>
                    <FAIcon name="facebook" size={24} color="#007BFF" style={styles.socialIcon} />
                    <FAIcon name="instagram" size={24} color="#FF007B" style={styles.socialIcon} />
                    <FAIcon name="linkedin-square" size={24} color="#0077B5" style={styles.socialIcon} />
                </View>
            </InfoSection>

            {/* 8. Subscription / Plan Info */}
            <View style={styles.subscriptionSection}>
                <Text style={styles.subscriptionTitle}>Subscription / Plan Info</Text>
                <View style={styles.subscriptionDetails}>
                    <Text style={styles.planInfo}>
                        Current Plan: <Text style={styles.planValue}>Premium</Text>
                    </Text>
                    <Text style={styles.planInfo}>
                        Renewal Date: <Text style={styles.planValue}>Oct 26, 2027</Text>
                    </Text>
                </View>
                <View style={styles.upgradeRow}>
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeText}>Upgrade Plan</Text>
                    </TouchableOpacity>
                    <View style={styles.upgradeHint}>
                        <Icon name="information-circle-outline" size={18} color="#00BFFF" />
                        <Text style={styles.upgradeHintText}>Premium users get featured listing</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000ff', // Dark background
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 40,
    },

    // --- Profile Header ---
    screenHeader: {
        marginBottom: 20,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 30,
        borderRadius: 12,
        padding: 15,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#fff',
        overflow: 'hidden',
        marginRight: 15,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    profileTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    profileName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0E3E66',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    verifiedText: {
        color: '#48BB78',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 5,
    },
    profileMotto: {
        color: '#A0AEC0',
        fontSize: 14,
        textAlign: 'left',
    },

    // --- Info Sections ---
    infoSection: {
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#2D3748',
        marginBottom: 10,
    },
    infoTitle: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    infoContent: {
    },
    infoDetail: {
        color: '#A0AEC0',
        fontSize: 14,
        lineHeight: 24,
    },
    descriptionText: {
        color: '#A0AEC0',
        fontSize: 14,
        lineHeight: 20,
    },
    socialIcons: {
        flexDirection: 'row',
    },
    socialIcon: {
        marginRight: 15,
        borderRadius:10,
    },

    // --- Subscription Info ---
    subscriptionSection: {
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 15,
    },
    subscriptionTitle: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    subscriptionDetails: {
        marginBottom: 15,
    },
    planInfo: {
        color: '#ffffffff',
        fontSize: 14,
        marginBottom: 4,
    },
    planValue: {
        color: '#A0AEC0',
        fontSize:14
    },
    upgradeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    upgradeButton: {
        backgroundColor: '#03a2d5',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
    upgradeText: {
        color: '#000000ff',
        fontWeight: '600',
        fontSize: 16,
        padding:4
    },
    upgradeHint: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    upgradeHintText: {
        color: '#A0AEC0',
        fontSize: 12,
        marginLeft: 5,
        flexShrink: 1,
    },
});

export default VendorProfileScreen;
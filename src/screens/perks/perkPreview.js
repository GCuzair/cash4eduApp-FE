import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ProgressBar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'

const PerkPreviewScreen = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Perk Preview</Text>
                <Ionicons name="bookmark-outline" size={22} color="#fff" />
            </View>

            {/* Perk Card */}
            <View style={styles.perkCard}>
                <View style={styles.validBadge}>
                    <Text style={styles.validText}>Valid until Nov 30, 2025</Text>
                </View>

                <View style={styles.perkHeader}>
                    <Image
                        source={require('../../assets/images/burger.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={styles.perkInfo}>
                        <Text style={styles.perkTitle}>McDonald’s</Text>
                        <Text style={styles.perkSubtext}>10% Off Meals for Students</Text>
                        <Text style={styles.perkTokens}>300 tokens or free with student ID</Text>
                    </View>
                </View>


            </View>
            <View style={styles.perkCard}>
                <View style={styles.detailsGrid}>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="map-marker" size={25} color="#00CFFF" />
                        <View>
                            <Text style={styles.boldText}>Location</Text>
                            <Text style={styles.detailText}>123 Main St, LA</Text>
                        </View>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="map-marker-distance" size={25} color="#00CFFF" />
                        <View>
                            <Text style={styles.boldText}>Distance</Text>
                            <Text style={styles.detailText}>0.7 miles away</Text>
                        </View>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={25} color="#00CFFF" />
                        <View>
                            <Text style={styles.boldText}>Category</Text>
                            <Text style={styles.detailText}>Food & Dining</Text>
                        </View>
                    </View>
                    <View style={styles.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={25} color="#00CFFF" />
                        <View>
                            <Text style={styles.boldText}>Hours</Text>
                            <Text style={styles.detailText}>8 AM - & PM</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.actionRow}>

                    <TouchableOpacity style={styles.btnPrimary}>
                        <MaterialIcon name="alt-route" size={20} color="#ffffffff" style={styles.icon} />
                        <Text style={styles.btnPrimaryText}>Get Directions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnSecondary}>
                        <FontAwesome name="phone" size={20} color="#51e3fc  " style={styles.icon1} />
                        <Text style={styles.btnSecondaryText}>Contact</Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* Offer Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Offer Details</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Offer:</Text>
                    <Text style={styles.value}>25% Off Any Drink</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Redemption:</Text>
                    <Text style={styles.value}>Student ID or 300 Tokens</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Limit:</Text>
                    <Text style={styles.value}>1 per day</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Expires:</Text>
                    <Text style={styles.value}>Nov 30, 2025</Text>
                </View>

                <View style={styles.badgeRow}>
                    <Text style={styles.badge}>Token Redemption</Text>
                    <Text style={styles.badge}>Student Verified</Text>
                </View>
            </View>

            {/* How to Redeem */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>How to Redeem</Text>

                <View style={styles.step}>
                    <View style={styles.stepCircle}><Text style={styles.stepNum}>1</Text></View>
                    <View style={styles.stepTextBox}>
                        <Text style={styles.stepTitle}>Check Perk Details</Text>
                        <Text style={styles.stepText}>
                            View the perk information to see how to claim your offer (in-store or online)
                        </Text>
                    </View>
                </View>

                <View style={styles.step}>
                    <View style={styles.stepCircle}><Text style={styles.stepNum}>2</Text></View>
                    <View style={styles.stepTextBox}>
                        <Text style={styles.stepTitle}>Show Proof of Student Status</Text>
                        <Text style={styles.stepText}>
                            Present your Student ID or follow the instructions provided for verification
                        </Text>
                    </View>
                </View>

                <View style={styles.step}>
                    <View style={styles.stepCircle}><Text style={styles.stepNum}>3</Text></View>
                    <View style={styles.stepTextBox}>
                        <Text style={styles.stepTitle}>Redeem & Enjoy</Text>
                        <Text style={styles.stepText}>
                            Once verified, enjoy your perk and any rewards associated with it!
                        </Text>
                    </View>
                </View>

            </View>

            {/* Reviews Section */}
            <View style={styles.reviewsContainer}>
                <View style={styles.reviewsHeader}>
                    <Text style={styles.sectionTitle}>Reviews</Text>
                    <TouchableOpacity>
                        <Text style={styles.leaveReview}>Leave Review</Text>
                    </TouchableOpacity>
                </View>

                {/* Rating Summary */}
                <View style={styles.reviewsSummary}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingNumber}>4.9</Text>
                        <View style={styles.starRow}>
                            {[...Array(5)].map((_, i) => (
                                <AntDesign key={i} name="star" size={15} color="#FFD700" />
                            ))}
                        </View>
                        <Text style={styles.ratingCount}>212 ratings</Text>
                    </View>

                    <View style={styles.ratingBars}>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingLabel}>5</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBackground}>
                                    <LinearGradient
                                        colors={['#00CFFF', '#0257a7']} // Gradient colors
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[styles.progressFill, { width: `${0.9 * 100}%` }]} // dynamic width based on progress
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={styles.ratingRow}>
                            <Text style={styles.ratingLabel}>4</Text>
                            <View style={styles.progressContainer}>
                                <View style={styles.progressBackground}>
                                    <LinearGradient
                                        colors={['#00CFFF', '#0257a7']} // Gradient colors
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={[styles.progressFill, { width: `${0.3 * 100}%` }]} // dynamic width based on progress
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* User Reviews */}
                {[1, 2].map((_, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                                style={styles.avatar}
                            />
                            <View>
                                <Text style={styles.reviewerName}>John David</Text>
                                <View style={styles.starRow}>
                                    {[...Array(5)].map((_, i) => (
                                        <AntDesign key={i} name="star" size={14} color="#FFD700" />
                                    ))}
                                    <Text style={styles.reviewTime}> a month ago</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.reviewText}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </Text>
                    </View>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Other Perks New You</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
            >
                {[1, 2].map((item) => (
                    <View key={item} style={styles.featureCard}>
                        <View style={styles.logoContainer}>
                            <Image
                                source={require('../../assets/images/pizza.png')}
                                style={styles.logoSmall}
                            />

                        </View>
                        <View style={styles.partnerTag}>
                            <Text style={styles.partnerText}>Verified Partner</Text>
                        </View>

                        <Text style={styles.featureTitle}>Pizza Hut College Plan</Text>
                        <Text style={styles.featureSubtitle}>
                            100% tuition coverage for ASU Online Degrees
                        </Text>

                        <TouchableOpacity style={styles.learnButton}>
                            <Text style={styles.learnButtonText}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    progressBackground: {
        height: 8,
        backgroundColor: '#2A2A2A', // track color
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 5,
    },
    reviewsContainer: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        width: '100%',
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    leaveReview: {
        color: '#00CFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    reviewsSummary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginRight: 100,
    },
    ratingBox: {
        alignItems: 'center',
        flex: 1,
    },
    ratingNumber: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
    },
    starRow: {
        flexDirection: 'row',
        marginVertical: 5,
        gap: 1,
    },
    ratingCount: {
        color: '#ffffffff',
        fontSize: 13,
    },
    ratingBars: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    ratingLabel: {
        color: '#fff',
        width: 15,
        fontWeight: 'bold',
    },
    progressBar: {
        height: 8,               // controls thickness
        borderRadius: 5,         // rounded edges
        overflow: 'hidden',
    },
    progressContainer: {
        width: 200,         // ensures full width of the parent
        paddingHorizontal: 20,   // adds space on left and right
        marginTop: 10,
        marginBottom: 10,
    },
    reviewCard: {
        backgroundColor: '#012945',
        borderRadius: 12,
        padding: 12,
        marginTop: 10,
        width:'100%',
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    reviewerName: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },
    reviewTime: {
        color: '#A7C7E7',
        fontSize: 12,
        marginLeft: 5,
    },
    reviewText: {
        color: '#D1D5DB',
        fontSize: 14,
        lineHeight: 20,
    },
    icon: {
        marginLeft: 10,
    },
    icon1: {
        marginLeft: 20,
    },
    horizontalScroll: {
        paddingBottom: 10,
    },
    featureCard: {
        backgroundColor: '#001d3d',
        borderRadius: 16,
        width: 250,
        marginRight: 12,
        padding: 16,
    },
    logoContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        alignSelf: 'flex-start',
    },
    logoSmall: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    partnerTag: {
        backgroundColor: '#FFC107',
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 8,
        left: 125,
        bottom: 60
    },
    partnerText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 11,
    },
    featureTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',

    },
    featureSubtitle: {
        color: '#A7C7E7',
        fontSize: 12,
        marginTop: 2,
    },
    learnButton: {
        backgroundColor: '#00BFFF',
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    learnButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    perkCard: {
        backgroundColor: '#031E35',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        position: 'relative',
    },
    validBadge: {
        position:'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ffc947',
        borderRadius: 10,
        paddingHorizontal: 4,
        paddingVertical: 3,
        zIndex: 2,
    },
    validText: {
        color: '#000',
        fontSize: 10,
        fontWeight: 'bold',
    },
    perkHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15,
    },
    logo: {
        width: 65,
        height: 65,
        borderRadius: 8,
        marginRight: 12,
    },
    perkInfo: { flex: 1 },
    perkTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    perkSubtext: {
        color: '#B0D8F1',
        fontSize: 14,
    },
    perkTokens: {
        color: '#A0A0A0',
        fontSize: 12,
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: 10,
    },
    detailText: {
        color: '#ffffffff',
        fontSize: 13,
        marginLeft: 5,
    },
    boldText: {
        color: '#ffffffff',
        fontSize: 13,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnPrimary: {
        flex: 1,
        backgroundColor: '#00CFFF',
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    btnPrimaryText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnSecondary: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#00CFFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15,
    },
    btnSecondaryText: {
        color: '#00CFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    section: {
        backgroundColor: '#031E35',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    label: {
        color: '#03a2d5',
        fontSize: 13,
    },
    value: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '500',
    },
    badgeRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    badge: {
        borderWidth: 1,
        color: '#ffffffff',
        backgroundColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 3,
        marginRight: 8,
        fontSize: 12,
    },
    step: {
        flexDirection: 'row',
        marginBottom: 12,
        marginTop: 12,
    },
    stepCircle: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: '#00CFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepNum: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
    },
    stepTextBox: {
        flex: 1,
        marginLeft: 10,
    },
    stepTitle: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    stepText: {
        color: '#03a2d5',
        fontSize: 10,
        lineHeight: 18,
    },
});

export default PerkPreviewScreen;
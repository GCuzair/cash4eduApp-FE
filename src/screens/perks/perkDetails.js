import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StudentPerk1 = () => {
    const navigation = useNavigation()
    const [activeCategory, setActiveCategory] = useState('Tuition Assistance');

    const categories = [
        { id: 1, name: 'Tuition Assistance', icon: 'graduation-cap' },
        { id: 2, name: 'Food & Dining', icon: 'hamburger' },
        { id: 3, name: 'Tech Discounts', icon: 'laptop' },
    ];

    return (
        <ScrollView style={styles.container}>
            <View>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Student Perks</Text>
                    <Text style={styles.subtitle}>
                        Explore exclusive student offers and rewards.
                    </Text>
                </View>

                {/* Search Section */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search offers or categories..."
                            placeholderTextColor="#ffffffff"
                        />
                        <FontAwesome5 name="search" size={16} color="#fff" />
                        <FontAwesome5
                            name="microphone"
                            size={16}
                            color="#fff"
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    <View style={styles.settings}>
                        <Text style={styles.txt}>Advance Filters</Text>
                        <TouchableOpacity style={styles.sortBox}>
                            <Text style={styles.sortText}>Sort by: Highest Discount</Text>
                            <MaterialIcons name="arrow-drop-down" size={22} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- Category Buttons (with Gradient on Active) --- */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoryScroll}
                >
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.name;

                        return (
                            <TouchableOpacity
                                key={cat.id}
                                onPress={() => setActiveCategory(cat.name)}
                            >
                                {isActive ? (
                                    <LinearGradient
                                        colors={['#69E8FF', '#03A2D5']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.categoryButtonGradient}
                                    >
                                        <FontAwesome5
                                            name={cat.icon}
                                            size={14}
                                            color="#fff"
                                        />
                                        <Text style={styles.categoryTextActive}>
                                            {cat.name}
                                        </Text>
                                    </LinearGradient>
                                ) : (
                                    <View style={styles.categoryButton}>
                                        <FontAwesome5
                                            name={cat.icon}
                                            size={14}
                                            color="#00b4d8"
                                        />
                                        <Text style={styles.categoryText}>{cat.name}</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Example Offer Card */}
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Image
                            source={require('../../assets/images/burger.png')}
                            style={styles.logo}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>McDonald's</Text>
                            <Text style={styles.subtitle}>10% Off Meals for Students</Text>
                        </View>
                    </View>

                    <View style={styles.tagRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Food & Dining</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Student Verified</Text>
                        </View>
                    </View>

                    <View style={styles.validityBox}>
                        <Text style={styles.validityText}>Valid until Nov 30, 2025</Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.viewButton}>
                            <Text style={styles.viewButtonText}>View Details</Text>
                            <MaterialCommunityIcons
                                name="arrow-right"
                                color="#fff"
                                size={18}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.directionButton} >
                            <Text style={styles.directionButtonText}>Get Directions</Text>
                            <FontAwesome5 name="directions" color="#00b4d8" size={16} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewAllBtnCont}>
                    <TouchableOpacity style={styles.viewAllBtn}>
                        <Text style={{ color: '#03A2D5', fontSize: 20, fontWeight: '600' }}>View All</Text>
                        <FontAwesome5 name="arrow-right" size={15} color="#fff" />
                    </TouchableOpacity>
                </View>
                <LinearGradient
                    colors={['#51e3fc', '#006f94ff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.keepLearningMain}
                >
                    <View style={styles.keepLearningContent}>
                        <FontAwesome5 name="book-reader" size={25} color="#fff" style={styles.keepLearningIcon} />
                        <View style={styles.keepLearningTextContainer}>
                            <Text style={styles.keepLearningText}>Keep learning to earn tokens faster!</Text>
                            <Text style={styles.keepLearningSubtitle}>Watch videos, apply to scholarships, or invite a friend</Text>
                        </View>
                        <FontAwesome5 name="arrow-right" size={25} color="#fff" style={styles.arrowIcon} />
                    </View>
                </LinearGradient>

                <View style={styles.openWithMain}>
                    <Text style={styles.openWithTxt}>Open with</Text>

                    <View style={styles.logoCont}>
                        <View style={styles.LogoCont}>
                            <TouchableOpacity onPress={() => navigation.navigate('ExpandedMap')}>
                                <Image source={require('../../assets/images/google-maps.png')}
                                    style={styles.logoSmall} />
                            </TouchableOpacity>
                            <Text style={styles.imgText}>Google Map</Text>
                        </View>

                        <View style={styles.LogoCont}>
                            <Image source={require('../../assets/images/app-maps.jpg')}
                                style={styles.logoSmall} />
                            <Text style={styles.imgText}>App Map</Text>
                        </View>
                    </View>

                    <View style={styles.txtCont}>
                        <Text style={styles.justOnceTxt}>Just Once</Text>
                        <Text style={styles.alwaysTxt}>Always</Text>
                    </View>
                </View>


            </View>


        </ScrollView>

    );
};

const styles = StyleSheet.create({
    settings: {
        flexDirection: 'row',
        gap: 45,
    },
    txt: {
        color: '#51e3fc',
        marginTop: 14,
    },
    txtCont: {
        flexDirection: 'row',

    },
    justOnceTxt: {
        color: 'gray',
        marginTop: 25,
    },
    alwaysTxt: {
        color: '#12db00',
        marginTop: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        left: 190,
    },
    LogoCont: {
        alignItems: 'center'
    },
    logoCont: {
        flexDirection: 'row',
        gap: 10,
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    openWithTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    openWithMain: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: 170,
        zIndex: 10,
        backgroundColor: '#2e2e2eff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        borderColor: 'white',
        marginBottom: 40,
        borderTopWidth: 1,
        borderEndWidth: 1,
        borderStartWidth: 1,

    },



    keepLearningText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    keepLearningSubtitle: {
        color: 'white',
        fontSize: 12,

    },
    keepLearningMain: {
        width: '98%',
        backgroundColor: '#03A2D5',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        marginBottom: 50,

    },


    keepLearningContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    keepLearningIcon: {
        marginRight: 12,
    },
    keepLearningTextContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    arrowIcon: {
        marginLeft: 12,
    },

    viewAllBtnCont: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 24,
    },

    viewAllBtn: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: '60%',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        marginTop: -7,
        paddingHorizontal: 10,
        gap: 10,
        borderWidth: 1,
        borderColor: '#03A2D5',
        borderRadius: 10,
        elevation: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000814',
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 40,
    },
    header: {
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#b0bec5',
        marginTop: 8,
        marginBottom: 16,
        fontSize: 14,
    },
    searchContainer: {
        backgroundColor: '#021e38',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#284867ff',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    searchInput: {
        color: '#fff',
        marginLeft: 8,
        flex: 1,
    },
    sortBox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: '#0077b6',
        borderRadius: 5,
    },
    sortText: {
        color: '#fff',
        fontSize: 12,
        padding: 4,
    },
    categoryScroll: {
        marginBottom: 20,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00b4d8',
        borderRadius: 30,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 10,
    },
    categoryButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 30,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginRight: 10,
    },
    categoryText: {
        color: '#00b4d8',
        fontSize: 13,
        marginLeft: 6,
        fontWeight: '600',
    },
    categoryTextActive: {
        color: '#fff',
        fontSize: 13,
        marginLeft: 6,
        fontWeight: '600',
    },
    card: {
        backgroundColor: '#001d3d',
        borderRadius: 16,
        padding: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    tagRow: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 8,
    },
    tag: {
        backgroundColor: '#002a4a',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: {
        color: '#fff',
        fontSize: 12,
    },
    imgText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 8,
        alignSelf: 'center',

    },
    validityBox: {
        backgroundColor: '#ffb703',
        alignSelf: 'flex-start',
        borderRadius: 6,
        marginTop: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    validityText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '500',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    viewButton: {
        backgroundColor: '#00b4d8',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    viewButtonText: {
        color: '#fff',
        fontWeight: '600',
        marginRight: 6,
    },
    directionButton: {
        borderColor: '#00b4d8',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    directionButtonText: {
        color: '#00b4d8',
        fontWeight: '600',
        marginRight: 6,
    },

    inviteSubtitle: {
        color: 'white',
        fontSize: 14,
        alignSelf: 'center',
        marginLeft: 5,
        textAlign: 'center'
    },
    inviteBtn: {
        borderRadius: 10,
        borderColor: '#51e3fc',
        borderWidth: 2,
        padding: 10,
        marginTop: 20,
        marginBottom: 50,
    },
    inviteBtnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        marginHorizontal: 30,

    },
    horizontalScroll: {
        paddingBottom: 10,
    },
    featureCard: {
        backgroundColor: '#001d3d',
        borderRadius: 16,
        width: 220,
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 10,
        marginTop: 15,
    },
    partnerTag: {
        backgroundColor: '#FFC107',
        alignSelf: 'flex-start',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 8,
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
        marginTop: 10,
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
    nearbyCard: {
        backgroundColor: '#082032',
        borderRadius: 16,
        marginHorizontal: 4,
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 20,
    },
    nearbyIcon: {
        marginBottom: 8,
    },
    nearbyTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    nearbySubtitle: {
        color: '#A7C7E7',
        fontSize: 13,
        marginTop: 2,
    },
    // Card Container
    tuitionCard: {
        backgroundColor: '#0A132B', // Dark blue/black background
        borderRadius: 12,
        padding: 20,
        width: '98%', // Adjust width as needed
        alignSelf: 'center',
        // Optional: Add a subtle shadow for elevation
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        marginTop: 10,
    },

    // Header Section
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoAndTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1, // Allows text to wrap or badge to push
        gap: 10,
    },

    // Logo Icon Styling
    logoBox: {
        backgroundColor: '#0078D4', // Microsoft Blue
        width: 40,
        height: 40,
        borderRadius: 6,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 24, // Sizing for the placeholder
    },
    programTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    // Tokens Badge
    tokensBadge: {
        backgroundColor: '#FFC107', // Yellow/Gold
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        left: 15,
        marginBottom: 30,
    },
    tokensText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 12,
    },

    // Detail Text
    assistanceDetail: {
        color: '#00A8E8', // Bright Blue text
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 20,
    },

    // Tags Section
    tagsSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10, // Use gap for spacing between items
        marginBottom: 25,
    },
    tag: {
        borderWidth: 1,
        borderColor: '#144967', // Darker blue border
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    tagText: {
        color: '#FFFFFF',
        fontSize: 12,
    },

    // Action Buttons
    actionsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15, // Spacing between the two buttons
    },
    btn: {
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1, // Ensures both buttons take equal space
        alignItems: 'center',
    },

    // 'Learn More' Button (Filled)
    btnLearnMore: {
        backgroundColor: '#00A8E8', // Bright Blue fill
        borderWidth: 0,
    },
    btnTextWhite: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    btnApplyNow: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#00A8E8', // Blue border
    },
    btnTextBlue: {
        color: '#00A8E8',
        fontWeight: 'bold',
        fontSize: 16,
    },

    mainListContainer: {
        backgroundColor: '#000814',
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionMainTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    viewAllLink: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#001a33', // Dark blue for the card background
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
        borderColor: '#00264d',
    },
    iconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#00264d', // Dark blue placeholder
        borderRadius: 8,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    itemSubtitle: {
        color: '#00a8e8', // Light blue accent color
        fontSize: 12,
        marginTop: 2,
    },
    statusWrapper: {
        alignItems: 'flex-end',
        marginLeft: 10,
    },
    activeBadge: {
        backgroundColor: '#4CAF50', // Bright green for Active
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    inactiveBadge: {
        backgroundColor: '#6c757d', // Grey for Used/Inactive
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    expiryText: {
        color: '#b0bec5',
        fontSize: 12,
        marginTop: 4,
    },
});

// 2. New Styles for Invite Friends Card (image_60a3c6.png)
const inviteCardStyles = StyleSheet.create({
    cardWrap: {
        backgroundColor: '#001a33', // Dark background to match the sample image
        borderRadius: 16,
        padding: 30,
        marginVertical: 10,
        alignItems: 'center', // Center everything horizontally
        width: '90%',
        alignSelf: 'center',
    },
    iconHolder: {
        backgroundColor: '#00264d', // Slightly lighter dark blue for the icon background
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    cardSubtitle: {
        color: '#b0bec5',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    buttonMargin: {
        marginTop: 10, // Adjust button position
    },
    gradientButton: {
        borderRadius: 10,
        padding: 3, // This creates the effect of a glowing/gradient border
    },
    buttonInner: {
        backgroundColor: '#001a33', // Dark background color inside the gradient border
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});


export default StudentPerk1;
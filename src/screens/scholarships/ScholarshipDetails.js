import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'; // Added for specific benefits icons
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

// --- COLORS ---
const DARK_BACKGROUND = '#121212';
const CARD_BACKGROUND = '#0D2B4B'; // Dark blue background for sections/cards
const PRIMARY_BLUE = '#69E8FF'; // Light blue for amount/tags
const LIGHT_TEXT = '#FFFFFF';
const GRAY_TEXT = '#AAAAAA';
const MATCHED_GREEN = '#12db00';
const FEATURED_YELLOW = '#FFC947';
const BLUE_HIGHLIGHT = '#03A2D5'; // Used for links and bold criteria titles
const ICON_CIRCLE_BACKGROUND = '#4A81BB'; // Background for the benefit icons
const NUMBER_CIRCLE_COLOR = '#007AFF'; // Bright blue for the number circles in How to Apply

const { width } = Dimensions.get('window');
const CARD_MARGIN = 20;
const BENEFIT_CARD_WIDTH = (width - (CARD_MARGIN * 2) - 10) / 2; // Calculation for 2 cards per row


const benefitsData = [
    {
        icon: 'graduation-cap',
        title: 'Financial Award',
        description: 'Monetary assistance for tuition or expenses',
    },
    {
        icon: 'globe',
        title: 'Networking',
        description: 'Connect with global peers and mentors',
    },
    {
        icon: 'briefcase',
        title: 'Professional Development',
        description: 'Access workshops & training',
    },
    {
        icon: 'chalkboard-teacher',
        title: 'Mentorship',
        description: 'Guidance from Google experts',
    },
];

const criteriaData = [
    { title: 'Gender', description: 'Open to women only.' },
    { title: 'Academic Excellence', description: 'Strong GPA required.' },
    { title: 'Field of Study', description: 'Computer Science or related field.' },
    { title: 'Enrollment', description: 'Must be at an accredited institution.' },
];

// --- NEW DATA: How to Apply Steps ---
const howToApplySteps = [
    { number: 1, text: 'Complete the online form with background and education info.' },
    { number: 2, text: 'Upload required documents.' },
    { number: 3, text: 'Submit essays and recommendations.' },
    { number: 4, text: 'Review your submission and apply before the deadline.' },
];


const ScholarshipDetails = ({ navigation }) => {
    const nav = navigation || useNavigation();

    // Data to display
    const scholarship = {
        title: 'First Generation College Student Grant',
        amount: '$2,500',
        deadline: 'Oct 20, 2025',
        match: '89%',
        isFeatured: true,
        tags: ['Any level', 'First-Gen', 'Need Based'],
    };

    // Reusable Benefit Card Component
    const renderBenefitCard = (item, index) => (
        <TouchableOpacity key={index} style={styles.benefitCard}>
            <View style={styles.iconCircle}>
                <FontAwesome5Icon name={item.icon} size={30} color={LIGHT_TEXT} />
            </View>
            <Text style={styles.benefitTitle}>{item.title}</Text>
            <Text style={styles.benefitText}>{item.description}</Text>
        </TouchableOpacity>
    );


    const renderCriterion = (item, index) => (
        <View key={index} style={styles.criterionItem}>
            <Text style={styles.criterionText}>
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.criterionTitle}>{item.title}: </Text>
                {item.description}
            </Text>
        </View>
    );


    const renderApplyStep = (step, index) => (
        <View key={index} style={styles.applyStepContainer}>
            <View style={styles.numberCircle}>
                <Text style={styles.numberText}>{step.number}</Text>
            </View>
            <Text style={styles.applyStepText}>{step.text}</Text>
        </View>
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: DARK_BACKGROUND }}>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#000" />

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => nav.goBack()}>
                        <Icon name="arrow-back" size={28} color={LIGHT_TEXT} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Scholarship Details</Text>
                    <TouchableOpacity>
                        <Icon name="bookmark-outline" size={28} color={LIGHT_TEXT} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerSubtitle}>Get all the info you need before applying</Text>

                {/* Scholarship Card (Main Info) */}
                <View style={styles.scholarshipCard}>
                    <View style={styles.cardHeader}>
                        <Icon name="heart" size={24} color={'#ef4444'} />

                        <View style={styles.badgeGroup}>
                            <View style={styles.matchedBadge}>
                                <Text style={styles.matchedText}>{scholarship.match} Matched</Text>
                            </View>
                            {scholarship.isFeatured && (
                                <View style={styles.featuredBadge}>
                                    <Text style={styles.featuredText}>Featured</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <Text style={styles.title}>{scholarship.title}</Text>

                    <View style={styles.infoRow}>
                        <View style={styles.infoColumn}>
                            <Text style={styles.amount}>{scholarship.amount}</Text>
                            <Text style={styles.label}>Amount</Text>
                        </View>
                        <View style={styles.infoColumn}>
                            <Text style={styles.deadline}>{scholarship.deadline}</Text>
                            <Text style={styles.label}>Deadline</Text>
                        </View>
                    </View>

                    <View style={styles.tagList}>
                        {scholarship.tags.map((tag, index) => (
                            <View key={index} style={styles.infoTag}>
                                {/* Icons adjusted to look like the image */}
                                {index === 0 && <Icon name="school-outline" size={14} color='white' style={{ marginRight: 5 }} />}
                                {index === 1 && <Icon name="people-outline" size={14} color='white' style={{ marginRight: 5 }} />}
                                {index === 2 && <Icon name="cash-outline" size={14} color='white' style={{ marginRight: 5 }} />}
                                <Text style={styles.infoTagText}>{tag}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* About this Scholarship Section */}
                <View style={styles.aboutStyles}>
                    <Text style={styles.title}>About this scholarship</Text>
                    <Text style={styles.aboutSubtitle}>First-generation scholarship are awards designed specifically for students who are the first in their family to complete a 4-year college degree. These scholarship aim to expand opportunities for students who may not have as much family guidance or financial backing as those whose parents have college degrees.</Text>
                    <TouchableOpacity >
                        <Text style={styles.readMoreText}>Read More</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionHeaderTitle}>Key Benefits</Text>

                <View style={styles.benefitsGrid}>
                    {benefitsData.map(renderBenefitCard)}
                </View>

                <View style={styles.eligibilityCard}>
                    <Text style={styles.sectionHeaderTitle}>Eligibility Criteria</Text>

                    <View style={styles.criteriaList}>
                        {criteriaData.map(renderCriterion)}
                    </View>
                </View>

                <Text style={styles.ApplicationTitle}>Application Requirements</Text>
                <View>
                    <View style={styles.appCont}>
                        <View>
                            <TouchableOpacity style={styles.iconCont}>
                                <FontAwesome name="file-text-o" size={20} color='#51e3fc' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.ApplicationTitle}>Essay</Text>
                            <Text style={{ color: 'white' }}>1 short essay (max 500 words)</Text>
                        </View>
                    </View>

                    <View style={styles.appCont}>
                        <View>
                            <TouchableOpacity style={styles.iconCont}>
                                <Icon name="document-lock-sharp" size={20} color='#51e3fc' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.ApplicationTitle}>Transcript</Text>
                            <Text style={{ color: 'white' }}>most recent transcript (PDF)</Text>

                        </View>
                    </View>

                    <View style={styles.appCont}>
                        <View>
                            <TouchableOpacity style={styles.iconCont}>
                                <FontAwesome name="file" size={20} color='#51e3fc' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.ApplicationTitle}>Resume</Text>
                            <Text style={{ color: 'white' }}>Optional but recommended</Text>

                        </View>
                    </View>

                    <View style={styles.appCont}>
                        <View>
                            <TouchableOpacity style={styles.iconCont}>
                                <Icon name="people" size={20} color='#51e3fc' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.ApplicationTitle}>Letters for Rec</Text>
                            <Text style={{ color: 'white' }}>2 letters from mentors or professors</Text>

                        </View>
                    </View>
                </View>

                <View style={styles.howToApplyCard}>
                    <Text style={styles.sectionHeaderTitle}>How to Apply</Text>
                    {howToApplySteps.map(renderApplyStep)}
                </View>



                <LinearGradient
                    colors={['#51e3fc', '#064b63ff']} // You can change gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.subscriptionSection}
                >
                    <Text style={styles.subscriptionTitle}>Tech Innovators Inc.</Text>

                    <View style={styles.verifiedBadge}>
                        <Icon name="checkmark-circle" size={16} color="#12db00" />
                        <Text style={styles.verifiedText}>Verified Vendor</Text>
                    </View>

                    <Text style={{ fontSize: 17, color: 'white' }}>
                        Empowering students through tech support
                    </Text>

                    <View style={styles.upgradeRow}>
                        <TouchableOpacity>
                            <View style={styles.vendorButton}>
                                <Text style={styles.upgradeText}>View Vendor Profile</Text>
                                <FontAwesome6 name='arrow-right-long' size={15} color='white' />
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>


                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.lastBtn} onPress={() => nav.navigate('VideoHub')}>
                        <Text style={{ color: 'white', fontSize: 22, fontWeight: '600' }}>Apply Now</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.SaveBtn}>
                        <Text style={{ color: '#51e3fc', fontSize: 22, fontWeight: '600' }}>Save for Later</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    iconCont: {
        marginTop: 10,
        backgroundColor: '#03a2d5', // change to your preferred color
        width: 50,                  // adjust size
        height: 50,
        borderRadius: 30,           // half of width/height for a perfect circle
        justifyContent: 'center',   // center the icon vertically
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: DARK_BACKGROUND,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 0 : 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 40 : 10,
    },
    headerTitle: {
        color: LIGHT_TEXT,
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: GRAY_TEXT,
        fontSize: 14,
        marginBottom: 20,
        marginTop: 5,
        alignSelf: 'flex-start',
    },

    // --- Shared Section Title/Card Styles ---
    sectionHeaderTitle: {
        color: LIGHT_TEXT,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 12,
        marginLeft: 0,
    },

    // NOTE: ApplicationTitle will conflict with sectionHeaderTitle if used as a general title.
    ApplicationTitle: {
        color: LIGHT_TEXT,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    scholarshipCard: {
        backgroundColor: "#021e38",
        borderRadius: 20,
        padding: 20,
        marginBottom: 10,
    },
    title: {
        color: LIGHT_TEXT,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    // --- Main Scholarship Card (top) Styles ---
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    badgeGroup: {
        flexDirection: 'row',
    },
    matchedBadge: {
        backgroundColor: MATCHED_GREEN,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 8,
    },
    matchedText: {
        color: LIGHT_TEXT,
        fontSize: 12,
        fontWeight: 'bold',
    },
    featuredBadge: {
        backgroundColor: FEATURED_YELLOW,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    featuredText: {
        color: DARK_BACKGROUND,
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 20,
        marginBottom: 20,
    },
    infoColumn: {
        width: '48%',
    },
    amount: {
        color: PRIMARY_BLUE,
        fontSize: 30,
        fontWeight: 'bold',

    },
    deadline: {
        color: LIGHT_TEXT,
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        color: BLUE_HIGHLIGHT,
        fontSize: 14,
        marginTop: 5,
    },
    tagList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    infoTag: {
        flexDirection: 'row',
        backgroundColor: DARK_BACKGROUND,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: PRIMARY_BLUE,
        alignItems: 'center',
    },
    infoTagText: {
        color: 'white',
        fontSize: 14,
    },

    aboutStyles: {
        backgroundColor: '#021e38',
        borderRadius: 20,
        padding: 20,
        marginTop: 12,
    },
    aboutSubtitle: {
        color: LIGHT_TEXT,
        fontSize: 15,
        marginBottom: 20,
    },
    readMoreText: {
        color: BLUE_HIGHLIGHT,
        fontSize: 17,
        fontWeight: '600'
    },


    benefitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    benefitCard: {
        backgroundColor: '#021e38',
        borderRadius: 16,
        width: BENEFIT_CARD_WIDTH,
        padding: 15,
        marginBottom: 10,
        alignItems: 'center',
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: ICON_CIRCLE_BACKGROUND,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    benefitTitle: {
        color: LIGHT_TEXT,
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    benefitText: {
        color: GRAY_TEXT,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },

    eligibilityCard: {
        backgroundColor: '#021e38',
        borderRadius: 20,
        padding: 20,
        marginTop: 10,
        marginBottom: 23,
    },
    criteriaList: {
    },
    criterionItem: {
        marginBottom: 15,
    },
    criterionText: {
        color: LIGHT_TEXT,
        fontSize: 16,
        lineHeight: 24,
    },
    bulletPoint: {
        color: BLUE_HIGHLIGHT,
        fontSize: 18,
        marginRight: 5,
    },
    criterionTitle: {
        color: BLUE_HIGHLIGHT,
        fontWeight: 'bold',
    },

    // --- NEW STYLES: How to Apply ---
    howToApplyCard: {
        backgroundColor: '#021e38',
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
    },
    applyStepContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    numberCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#03a2d5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        flexShrink: 0,
        marginTop: 2,
    },
    numberText: {
        color: LIGHT_TEXT,
        fontSize: 20,
        fontWeight: 'bold',
    },
    applyStepText: {
        color: LIGHT_TEXT,
        fontSize: 16,
        lineHeight: 24,
        flex: 1,
    },

    appCont: {
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
        gap: 20,
    },

    subscriptionSection: {
        backgroundColor: '#69E8FF',
        borderRadius: 12,
        padding: 15,
        marginTop: 18,
    },
    subscriptionTitle: {
        color: '#000000ff',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },
    subscriptionDetails: {
        marginBottom: 15,
    },
    planInfo: {
        color: '#000000ff',
        fontSize: 14,
        marginBottom: 4,
    },
    planValue: {
        color: '#000000ff',
        fontWeight: 'bold',
    },
    upgradeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    vendorButton: {
        backgroundColor: '#61a9c1ff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',
        gap: 10,
    },
    upgradeText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 14,
    },
    upgradeHint: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    upgradeHintText: {
        color: '#000000ff',
        fontSize: 12,
        marginLeft: 5,
        flexShrink: 1,
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
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    },

    savetxt: {
        color: '#999999ff',
        textAlign: 'center',
        marginTop: 10,
        paddingBottom: 20,
    },
    lastBtn: {
        backgroundColor: '#51e3fc',
        alignItems: 'center',
        width: '97%',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    SaveBtn: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: '97%',
        justifyContent: 'center',
        paddingVertical: 12,
        marginTop: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#03A2D5',
        borderRadius: 10,
    },
});

export default ScholarshipDetails;
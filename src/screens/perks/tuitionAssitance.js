import React from 'react';
import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

const TuitionAssistanceScreen = () => {
    const [selectedFilter, setSelectedFilter] = useState('All Programs');
        const navigation = useNavigation(); 

    return (
        <View style={{ backgroundColor: "#000814", flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tuition Assistance</Text>
                <Ionicons name="bookmark-outline" size={22} color="#fff" />
            </View>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            

            {/* Discover Section */}
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <LinearGradient
                        colors={['#51e3fc', '#0257a7']} // gradient colors
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradientCircle}
                    >
                        <Ionicons name="school-outline" size={40} color="#fff" />
                    </LinearGradient>

                    <Text style={styles.cardTitle}>Discover Tuition Assistance Programs</Text>
                </View>

                <Text style={styles.cardText}>
                    Discover tuition assistance, employer reimbursement, and education
                    benefit programs that help cover your college costs. Earn tokens when
                    you apply through Cash 4 Edu.
                </Text>

                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>📍 Find Near You</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>❓ How It Works</Text>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Search perks by location or category..."
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                />
                <Ionicons name="search-outline" size={22} color="#ffffffff" style={{ marginRight: 8 }} />
                <Ionicons name="location-sharp" size={22} color="#fff" />
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterRow}>
                {['Employer','All Programs', 'Full Tuition', 'Public Aid'].map((label, index) => {
                    const isSelected = selectedFilter === label;
                    return (
                        <TouchableOpacity key={index} onPress={() => setSelectedFilter(label)}>
                            {isSelected ? (
                                <LinearGradient
                                    colors={['#00CFFF', '#0078D4']} // gradient colors
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={[styles.filterButton, styles.filterButtonSelected]}
                                >
                                    <Text style={[styles.filterText, styles.filterTextSelected]}>
                                        {label}
                                    </Text>
                                </LinearGradient>
                            ) : (
                                <View style={styles.filterButton}>
                                    <Text style={styles.filterText}>{label}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>


            {/* Featured Employers */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Employers</Text>
                <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
                {Array(4).fill(null).map((_, index) => (
                    <View key={index} style={styles.employerCard}>
                        <View style={styles.employerLogoContainer}>
                            <Image
                                source={require('../../assets/images/amazon-logo.png')}
                                style={styles.employerLogo}
                            />
                        </View>
                        <Text style={styles.employerTitle}>Amazon Career Choice</Text>
                        <Text style={styles.employerDesc}>
                            Covers 93% Tuition for ASU Online Degrees
                        </Text>

                        <View style={styles.tagRow}>
                            <Text style={styles.tag}>Part-Time</Text>
                            <Text style={styles.tag}>+20 Tokens</Text>
                        </View>

                        <TouchableOpacity style={styles.viewProgramBtn} onPress={()=>navigation.navigate('Redemption')}>
                            <Text style={styles.viewProgramText}>View Program</Text>
                        </TouchableOpacity>
                    </View>
                ))}

            </ScrollView>

            {/* Earn Tokens Section */}
            <View style={styles.earnTokensCard}>
                <LinearGradient
                    colors={['#0a3156ff', '#03a2d5']}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={styles.earnGradient}
                >
                    <View style={styles.earnContent}>
                        <View style={styles.iconWrapper}>
                            <FontAwesome5 name="coins" color="#fff" size={30} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.earnTitle}>Earn Tokens While You Learn</Text>
                            <Text style={styles.earnSubtitle}>
                                Apply for tuition programs through Cash 4 Edu and earn bonus tokens!
                            </Text>
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarBackground}>
                        <View style={styles.progressBarFill} />
                    </View>

                    <Text style={styles.progressText}>80/100 token goal for the month</Text>

                    {/* Button */}
                    <TouchableOpacity style={styles.earnButton}>
                        <Text style={styles.earnButtonText}>Explore More Opportunities</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            {/* Tuition Assistance Card */}
            <View style={styles.pgmMain}>
                <Text style={styles.allPgmTxt}>All Programs</Text>
                <TouchableOpacity style={styles.sortBox}>
                    <Text style={styles.sortText}>Sort by: Match % </Text>
                    <Ionicons name="chevron-down-outline" size={17} color="#fff" />
                </TouchableOpacity>
            </View>


            <View style={styles.tuitionCard}>
                {/* Header: Logo, Title, and Tokens Badge */}
                <View style={styles.cardHeader}>
                    <View style={styles.logoAndTitle}>
                        <Image
                            source={require('../../assets/images/microsoft-logo.png')}
                            style={styles.logoSmall}
                        />
                        <Text style={styles.programTitle}>Microsoft Tuition Assistance</Text>
                    </View>
                    <View style={styles.tokensBadge}>
                        <Text style={styles.tokensText}>+30 Tokens</Text>
                    </View>
                </View>

                {/* Detail Text */}
                <Text style={styles.assistanceDetail}>
                    Up to $5,250 per year for job-relevant education and skill development.
                </Text>

                {/* Tags Section */}
                <View style={styles.tagsSection}>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Full-Time</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>US Only</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Open Year-Round</Text></View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={[styles.btn, styles.btnLearnMore]} activeOpacity={0.7}>
                        <Text style={styles.btnTextWhite}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnApplyNow]} activeOpacity={0.7}>
                        <Text style={styles.btnTextBlue}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tuition Assistance Card */}
            <View style={styles.tuitionCard}>
                {/* Header: Logo, Title, and Tokens Badge */}
                <View style={styles.cardHeader}>
                    <View style={styles.logoAndTitle}>
                        <Image
                            source={require('../../assets/images/microsoft-logo.png')}
                            style={styles.logoSmall}
                        />
                        <Text style={styles.programTitle}>Microsoft Tuition Assistance</Text>
                    </View>
                    <View style={styles.tokensBadge}>
                        <Text style={styles.tokensText}>+30 Tokens</Text>
                    </View>
                </View>

                {/* Detail Text */}
                <Text style={styles.assistanceDetail}>
                    Up to $5,250 per year for job-relevant education and skill development.
                </Text>

                {/* Tags Section */}
                <View style={styles.tagsSection}>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Full-Time</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>US Only</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Open Year-Round</Text></View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={[styles.btn, styles.btnLearnMore]} activeOpacity={0.7}>
                        <Text style={styles.btnTextWhite}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnApplyNow]} activeOpacity={0.7}>
                        <Text style={styles.btnTextBlue}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tuition Assistance Card */}
            <View style={styles.tuitionCard}>
                {/* Header: Logo, Title, and Tokens Badge */}
                <View style={styles.cardHeader}>
                    <View style={styles.logoAndTitle}>
                        <Image
                            source={require('../../assets/images/microsoft-logo.png')}
                            style={styles.logoSmall}
                        />
                        <Text style={styles.programTitle}>Microsoft Tuition Assistance</Text>
                    </View>
                    <View style={styles.tokensBadge}>
                        <Text style={styles.tokensText}>+30 Tokens</Text>
                    </View>
                </View>

                {/* Detail Text */}
                <Text style={styles.assistanceDetail}>
                    Up to $5,250 per yearfor job-relevant education and skill development.
                </Text>

                {/* Tags Section */}
                <View style={styles.tagsSection}>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Full-Time</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>US Only</Text></View>
                    <View style={styles.tagbox}><Text style={styles.tagText}>Open Year-Round</Text></View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={[styles.btn, styles.btnLearnMore]} activeOpacity={0.7}>
                        <Text style={styles.btnTextWhite}>Learn More</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn, styles.btnApplyNow]} activeOpacity={0.7}>
                        <Text style={styles.btnTextBlue}>Apply Now</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Related Opportunities</Text>
                <Text style={styles.viewAll}>View All</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.slider}>
                {Array(4).fill(null).map((_, index) => (
                    <View key={index} style={styles.oppCard}>
                        <View style={styles.oppIcon}>
                            <FontAwesome5 name='file-alt' size={30} color='white'style={{marginTop:1}}/>
                        </View>
                        <Text style={styles.employerTitle}>Pell Grant Info</Text>
                        <Text style={styles.employerDesc}>
                            Financial aid up to $7,383
                        </Text>

                        <TouchableOpacity style={styles.viewProgramBtn}>
                            <Text style={styles.learnMoreText}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                ))}

            </ScrollView>

        </ScrollView >
        </View>
    );
};

const styles = StyleSheet.create({
    tagbox:{
        borderColor:'#51e3fc',
        borderWidth:1,
        padding:2,
        paddingHorizontal:25,
        paddingVertical:4,
        borderRadius:4,
    },
    earnTokensCard: {
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },

    earnGradient: {
        borderRadius: 20,
        padding: 20,
    },

    earnContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },

    iconWrapper: {
        backgroundColor: '#006b8fff',
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    earnTitle: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },

    earnSubtitle: {
        color: '#cce3ff',
        fontSize: 13,
        marginTop: 5,
    },

    progressBarBackground: {
        height: 10,
        backgroundColor: '#1E3A5F',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 10,
    },

    progressBarFill: {
        height: '100%',
        width: '80%', // Example progress
        backgroundColor: '#00CFFF',
        borderRadius: 5,
    },

    progressText: {
        color: 'white',
        fontSize: 12,
        marginBottom: 15,
        fontWeight: '600',
    },

    earnButton: {
        borderWidth: 2,
        borderColor: '#51e3fc',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },

    earnButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    pgmMain: {
        flexDirection: 'row',

    },
    allPgmTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    sortBox: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#0077b6",
        borderRadius: 5,
        left: 80,
        bottom: 8,
    },
    sortText: {
        color: "#fff",
        fontSize: 12,
        padding: 4,
    },
    filterButtonSelected: {
        backgroundColor: '#00CFFF',

    },
    filterTextSelected: {
        color: '#ffffffff',
        fontWeight: '600',
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 8, 20, 1)',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
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
    logoSmall: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 10,
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
        left: 4,
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
        fontSize: 13,
    },
    actionsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15, // Spacing between the two buttons
    },
    tuitionCard: {
        backgroundColor: '#021e38', // Dark blue/black background
        borderRadius: 12,
        padding: 13,
        width: '98%', // Adjust width as needed
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        marginTop: 10,
    },
    btn: {
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1, // Ensures both buttons take equal space
        alignItems: 'center',
    },
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


    iconContainer: {
        alignItems: 'center',
        marginBottom: 16,
        flexDirection: 'row',
    },
    gradientCircle: {
        width: 70,
        height: 70,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginBottom: 15,
        marginTop:10,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 130,
    },

    card: {
        backgroundColor: '#04283C',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    iconCircle: {
        padding: 10,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginBottom: 10,
        flexDirection: 'row',
    },
    cardTitle: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '600',
        marginLeft: 10,
        marginTop: -5,
    },
    cardText: {
        color: '#b0b0b0',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 16,
    },
    primaryButton: {
        backgroundColor: '#00CFFF',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 10,
    },
    primaryButtonText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 18,
    },
    secondaryButton: {
        borderColor: '#00CFFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 18,
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#1E1E1E',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    searchInput: {
        color: '#fff',
        flex: 1,
        fontSize: 12,
    },
    filterRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 20,
    },
    filterButton: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'white',
    },
    filterText: {
        color: '#ffffffff',
        fontSize: 11,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop:10,
        width:'98%'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    viewAll: {
        color: '#00CFFF',
        fontSize: 14,
    },
    slider: {
        marginBottom: 40,
    },
    employerCard: {
        backgroundColor: '#04283C',
        borderRadius: 12,
        width: 180,
        padding: 15,
        marginRight: 12,
        
    },
    oppCard:{
        backgroundColor: '#04283C',
        borderRadius: 12,
        width: 150,
        padding: 15,
        marginRight: 12,
        paddingBottom:50
    },
    oppIcon:{
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical:10,
        width: 60,
        height: 60,
        backgroundColor:'#03a2d5'
    },
    employerLogoContainer: {
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
        width: 60,
        height: 60,
    },
    employerLogo: {
        width: 60,
        height: 60,
        borderRadius: 10,
        bottom:10,
    },
    employerTitle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    employerDesc: {
        color: '#b0b0b0',
        fontSize: 12,
        marginVertical: 5,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 10,
    },
    tag: {
        backgroundColor: '#03a2d5',
        color: '#ffffffff',
        fontSize: 10,

        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7,
    },
    viewProgramBtn: {
        backgroundColor: '#00CFFF',
        borderRadius: 8,
        alignItems: 'center',
        paddingVertical: 8,
    },
    viewProgramText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 12,
    },
    learnMoreText: {
        color: '#ffffffff',
        fontWeight: '600',
        fontSize: 14,
    },
});


export default TuitionAssistanceScreen;
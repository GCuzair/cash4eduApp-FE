import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { use } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

// Define the component structure, receiving onBackPress from props if needed
// Assuming you are using React Navigation, we'll use a hardcoded back function for simplicity.
const CocaCola = ({ onBackPress }) => {
    const navigation=useNavigation()
    // Dummy function for navigation back
    const handleBackPress = onBackPress || (() => console.log("Back Pressed"));
    

    // Hardcoded data for the listing details (based on screenshot)
    const listingDetails = {
        title: "Coca-Cola Scholars Foundation",
        subtitle: "Supporting exceptional students with academic achievement.",
        status: "Active",
        icon: "graduation-cap", // FontAwesome5 for the red icon
        iconColor: '#E74C3C', // Red color for the icon background
        tags: [
            { text: "GPA 3.0+", color: '#0257a7' }, // Blue
            { text: "Fist-Gen", color: '#12db00' }, // Green
            { text: "U.S. Students", color: '#a855f7' }, // Purple
            { text: "No Essay", color: '#ffc947' }, // Dark Khaki/Brown
        ],
        lastUpdated: "3 days ago by Admin K. Rutledge"
    };

    const Tag = ({ text, color }) => (
        <View style={[styles.tag, { backgroundColor: color }]}>
            <Text style={styles.tagText}>{text}</Text>
        </View>
    );

    return (
        <View style={styles.fullScreenContainer}>
            {/* --- Header (Existing Code) --- */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backIcon} onPress={handleBackPress}>
                        <Ionicons name="arrow-back-circle-outline" size={38} color="#fff" />
                    </TouchableOpacity>

                    <Image
                        source={require('../../assets/images/Logo.png')} // Adjust path as needed
                        style={styles.logo}
                    />

                    <View style={{ flexDirection: 'row', gap: 15 }}>
                        <Icon name="bell-outline" size={24} color="#FFF" />
                        <TouchableOpacity onPress={()=> navigation.navigate('Setting')}>
                        <Ionicons name="settings" size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* --- END Header --- */}

            <ScrollView contentContainerStyle={styles.contentScroll}>
                <View style={styles.detailCard}>
                    <View style={styles.cardMainRow}>
                        {/* Icon Circle */}
                        <View style={[styles.cardIconCircle, { backgroundColor: listingDetails.iconColor }]}>
                            <FontAwesome5 name={listingDetails.icon} size={30} color="#FFFFFF" />
                        </View>


                        <View style={styles.cardTextContent}>
                            <Text style={styles.cardTitle}>{listingDetails.title}</Text>
                            <Text numberOfLines={2} style={styles.cardSubtitle}>{listingDetails.subtitle}</Text>
                        </View>

                        {/* Status Badge */}
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{listingDetails.status}</Text>
                        </View>
                    </View>

                    {/* Tags Row */}
                    <View style={styles.tagRow}>
                        {listingDetails.tags.map((tag, index) => (
                            <Tag key={index} text={tag.text} color={tag.color} />
                        ))}
                    </View>

                    {/* Footer / Last Updated */}
                    <Text style={styles.lastUpdatedText}>
                        Last updated {listingDetails.lastUpdated}
                    </Text>
                </View>

                {/* --- Stats Section After Coca-Cola Card --- */}
                <Text style={styles.sectionHeading}>Application & Award Management</Text>

                <View style={styles.statsRow}>
                    <View style={styles.statsCard}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <FontAwesome5 name="users" size={22} color="#65B4FF" />
                            <Text style={styles.statsTitle}>Total Applicants</Text>
                        </View>
                        <Text style={styles.statsValue}>4,832</Text>
                    </View>

                    <View style={styles.statsCard}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Icon name="clock-time-four-outline" size={24} color="#FF4BC0" />
                            <Text style={styles.statsTitle}>Pending Review</Text>
                        </View>
                        <Text style={styles.statsValue}>228</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statsCard}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Icon name="check-decagram" size={22} color="#51FF6C" />
                            <Text style={styles.statsTitle}>Approved</Text>
                        </View>
                        <Text style={styles.statsValue}>36</Text>
                    </View>

                    <View style={styles.statsCard}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Icon name="close-octagon" size={22} color="#FF4B4B" />
                            <Text style={styles.statsTitle}>Declined</Text>
                        </View>
                        <Text style={styles.statsValue}>30</Text>
                    </View>
                </View>

                {/* --- Applicants Section --- */}
                <View style={styles.applicantCard}>
                    <Text style={styles.sectionTitle}>Applicant</Text>

                    {/* Applicant Item */}
                    <View style={styles.applicantRow}>
                        <Image source={{ uri: "https://i.pravatar.cc/300?img=1" }} style={styles.avatar} />
                        <View style={styles.applicantTextBox}>
                            <Text style={styles.applicantName}>Aroma Tariq</Text>
                            <Text style={styles.applicantEmail}>aroma@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.applicantRow}>
                        <Image source={{ uri: "https://i.pravatar.cc/300?img=12" }} style={styles.avatar} />
                        <View style={styles.applicantTextBox}>
                            <Text style={styles.applicantName}>Marcus Hill</Text>
                            <Text style={styles.applicantEmail}>marcus@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.applicantRow}>
                        <Image source={{ uri: "https://i.pravatar.cc/300?img=15" }} style={styles.avatar} />
                        <View style={styles.applicantTextBox}>
                            <Text style={styles.applicantName}>David Chen</Text>
                            <Text style={styles.applicantEmail}>david@gmail.com</Text>
                        </View>
                    </View>

                    <View style={styles.applicantRow}>
                        <Image source={{ uri: "https://i.pravatar.cc/300?img=20" }} style={styles.avatar} />
                        <View style={styles.applicantTextBox}>
                            <Text style={styles.applicantName}>Sofia Lopez</Text>
                            <Text style={styles.applicantEmail}>sofia@gmail.com</Text>
                        </View>
                    </View>
                </View>

                {/* --- Listing Information Section --- */}
                <View style={styles.listingInfoCard}>
                    <Text style={styles.sectionTitle}>Listing Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Award Amount</Text>
                        <Text style={styles.infoValue}>$20,000</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Application Method</Text>
                        <Text style={styles.infoValue}>In-App (Quick Apply)</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Renewable</Text>
                        <Text style={styles.infoValue}>Yes, up to 4 years</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Essay Requirement</Text>
                        <Text style={styles.infoValue}>None</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Partner Contact</Text>
                        <Text style={[styles.infoValue, { color: "#51e3fc" }]}>
                            scholarship@coca-cola.org
                        </Text>
                    </View>
                </View>

                <View style={styles.listingInfoCard}>
                    <Text style={styles.sectionTitle}>Analytics Snapshot</Text>
                    <View style={styles.analyticsInnerCont}>
                        <Text style={{color:'gray'}}>$20,000</Text>
                        <Text style={{color:'white',fontSize:15,fontWeight:'bold'}}>5.2k</Text>
                    </View>

                    <View style={styles.analyticsInnerCont}>
                        <Text style={{color:'gray'}}>Click-through Rate</Text>
                        <Text style={{color:'#12db00',fontSize:15,fontWeight:'bold'}}>12%</Text>
                    </View>

                    <View style={styles.analyticsInnerCont}>
                        <Text style={{color:'gray'}}>Completion Rate</Text>
                        <Text style={{color:'#12db00',fontSize:15,fontWeight:'bold'}}>87%</Text>
                    </View>

                    <View style={styles.analyticsInnerCont}>
                        <Text style={{color:'gray'}}>Avg GPA</Text>
                        <Text style={{color:'#ffffffff',fontSize:15}}>3.6</Text>
                    </View>

                    <View style={styles.analyticsInnerCont}>
                        <Text style={{color:'gray'}}>Top Major</Text>
                        <Text style={{color:'#ffffffff',fontSize:15}}>Engineering</Text>
                    </View>
                </View>


            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    analyticsInnerCont:{
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:10,
    },
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#000', // Overall background
    },
    // --- Header Styles (Existing) ---
    headerContainer: {
        backgroundColor: '#000',
        paddingHorizontal: 15,
        paddingTop: 10, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    backIcon: {
        zIndex: 1,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    // --- Scrollable Content Style ---
    contentScroll: {
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 50,
    },
    // --- Detail Card Styles (New) ---
    detailCard: {
        backgroundColor: '#021e38', // Dark blue background
        borderRadius: 15,
        padding: 20,
        marginTop: 20,
    },
    cardMainRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    cardIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginTop: 15,
    },
    cardTextContent: {
        flex: 1,
        marginRight: -30,
    },
    cardTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',

    },
    cardSubtitle: {
        color: '#f3f3f3ff',
        fontSize: 12,
        flexWrap: 'wrap',
        width: '90%',       // so it wraps correctly
        lineHeight: 20,     // nicer spacing
    },
    statusBadge: {
        backgroundColor: '#2ECC71', // Bright Green
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 1,
    },
    statusText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12,
    },
    // --- Tag Styles ---
    tagRow: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
        gap: 5, // Use gap for spacing between tags
    },
    tag: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    tagText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 11,
    },
    // --- Footer Text ---
    lastUpdatedText: {
        color: '#8899AA',
        fontSize: 12,
        marginTop: 5,
    },
    sectionHeading: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "700",
        marginTop: 20,
        marginBottom: 15,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },

    statsCard: {
        backgroundColor: "#042E54",
        width: "48%",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 100
    },

    statsTitle: {
        color: "#ffffffff",
        fontSize: 13,
        marginTop: 3,
    },

    statsValue: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
        marginTop: 20,
    },
    /* --- Applicants Card --- */
    applicantCard: {
        backgroundColor: "#021e38",
        borderRadius: 15,
        padding: 18,
        marginTop: 20,
    },
    sectionTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 15,
    },
    applicantRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    avatar: {
        width: 45,
        height: 45,
        borderRadius: 10,
        marginRight: 12,
    },

    applicantTextBox: {
        flex: 1,
    },

    applicantName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    applicantEmail: {
        color: "#cbd5e1",
        fontSize: 13,
    },

    /* --- Listing Information Card --- */
    listingInfoCard: {
        backgroundColor: "#021e38",
        borderRadius: 15,
        padding: 18,
        marginTop: 20,
    },

    infoRow: {
        marginBottom: 15,
    },

    infoLabel: {
        color: "#96A5B8",
        fontSize: 12,
        marginBottom: 3,
    },

    infoValue: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
    }

})
export default CocaCola
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native'; // Import Switch for the toggle

const PerkListing = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState("Student Perk");
    const [shortDescCount, setShortDescCount] = useState(0);

    // --- State for Perk Details form fields ---
    const [perkType, setPerkType] = useState('');
    const [redemptionMethod, setRedemptionMethod] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [partnerLink, setPartnerLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [usageLimitations, setUsageLimitations] = useState('');
    // ------------------------------------

    // --- State for Eligibility & Audience form fields ---
    const [eligibility, setEligibility] = useState({
        verifiedStudent: false,
        schoolEmailRequired: false,
        allUsers: false
    });
    const [location, setLocation] = useState('Nationwide');
    const [requireVerification, setRequireVerification] = useState(true);
    // ------------------------------------


    const categoriesList = [
        "Food",
        "Tech",
        "Wellness",
        "Educational Tool",
        "Portfolio",
        "Entertainment"
    ];

    const [categories, setCategories] = useState({
        Food: false,
        Tech: false,
        Wellness: false,
        "Educational Tool": false,
        Portfolio: false,
        Entertainment: false
    });

    const toggleCategory = (item) => {
        setCategories({ ...categories, [item]: !categories[item] });
    };

    const toggleEligibility = (key) => {
        setEligibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const types = [
        { label: "Scholarship", icon: "school-outline" },
        { label: "Student Perk", icon: "gift-outline" },
        { label: "Tuition Assistance", icon: "cash-outline" },
        { label: "Educational Video", icon: "videocam-outline" },
    ];

    // 💡 UPDATED NAVIGATION LOGIC
    const handleTypeSelection = (label) => {
        setSelected(label);
        if (label === "Scholarship") {
            navigation.navigate('ScholarshipListing');
        }
        else if (label === "Tuition Assistance") {
            navigation.navigate('TuitionAssistanceVendor');
        }
        else if (label === "Educational Video") {
            navigation.navigate('EducationalVideo');
        }
    };


    // Helper components for the merged form inputs
    const InputField = ({ label, value, onChangeText, placeholder, optional = false, multiline = false, maxLength, keyboardType = 'default', isDropdown = false, isDate = false }) => (
        <View>
            <Text style={styles.label}>
                {label}
                {!optional && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#7c92a6"
                style={[styles.input, multiline && { height: 90, textAlignVertical: "top" }]}
                multiline={multiline}
                maxLength={maxLength}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
            />
            {label === "Short Description" && (
                <Text style={styles.charCount}>{shortDescCount} / 220 characters</Text>
            )}
            {isDropdown && (
                <AntDesign name='caretdown' size={12} color='#ffffff' style={styles.dropdownIcon} />
            )}
            {isDate && (
                <Ionicons name='calendar-outline' size={20} color='#ffffff' style={styles.dateIcon} />
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <VendorHeader
                title="Create Student Perk Listing"
                subtitle="Offer verified students discounts, benefits, or opportunities, to support their education and lifestyle"
                onBackPress={() => navigation.goBack()}
                onSettingsPress={() => navigation.navigate("Setting")}
            />
            {/* TOP BUTTONS */}
            <View style={{ flexDirection: 'row',marginBottom:10}}>
                <TouchableOpacity style={styles.saveBtn}>
                    <AntDesign name='download' size={18} color='white' />
                    <Text style={styles.saveBtnTxt}>Save Draft</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitBtn}>
                    <Ionicons name='send' size={16} color='white' />
                    <Text style={styles.saveBtnTxt}>Submit for Review</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>



                {/* SECTION TITLE */}
                <Text style={styles.sectionTitle}>Select Listing Type</Text>

                {/* SELECTOR */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.selectorRow}>
                        {types.map((item, index) => {
                            const active = selected === item.label;

                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.typeBtn,
                                        active ? styles.activeTypeBtn : styles.inactiveTypeBtn
                                    ]}
                                    // 💡 USING THE UPDATED HANDLER
                                    onPress={() => handleTypeSelection(item.label)}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={16}
                                        color={"white"}
                                        style={{ marginRight: 8 }}
                                    />

                                    <Text
                                        style={[
                                            styles.typeText,
                                            active ? styles.activeTypeText : styles.inactiveTypeText
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </ScrollView>


                <View style={styles.basicInfoCont}>
                    {/* Basic Information Section */}
                    <Text style={styles.basicTitle}>Basic Information</Text>
                    <InputField label="Perk Title" placeholder="e.g. 25% Off Tech Accessories" value={''} onChangeText={() => { }} />
                    <InputField label="Partner Organization" placeholder="TechZone Electronics" value={''} onChangeText={() => { }} optional={true} />
                    <InputField
                        label="Short Description"
                        placeholder="One - line students see on app cards (220 characters)"
                        multiline
                        maxLength={220}
                        onChangeText={t => {
                            // Update both the count state and potentially a form state if needed
                            setShortDescCount(t.length);
                        }}
                        value={''}
                    />
                    <InputField label="Full Description" placeholder="Full Description" multiline style={[styles.input, { height: 140, textAlignVertical: "top" }]} value={''} onChangeText={() => { }} />

                    {/* Category Type Checkboxes */}
                    <Text style={[styles.label, { marginTop: 25 }]}>Category Type*</Text>
                    <View style={styles.checkboxContainer}>
                        {categoriesList.map((item, index) => (
                            <View key={index} style={styles.checkboxBox}>
                                <Checkbox
                                    status={categories[item] ? "checked" : "unchecked"}
                                    onPress={() => toggleCategory(item)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Featured Perk Checkbox */}
                    <LinearGradient
                        colors={['#03a2d5', '#000000ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.featureGradient}
                    >
                        <Checkbox
                            status={false ? "checked" : "unchecked"}
                            color="#51e3fc"
                            uncheckedColor="#e0e0e0"
                        />
                        <Text style={styles.featureText}>Mark as Featured Perk</Text>
                    </LinearGradient>
                </View>

                <View style={styles.basicInfoCont}>
                    <Text style={[styles.basicTitle, { marginTop: 15 }]}>Perk Details</Text>
                    <InputField label="Perk Type" placeholder="Select Type" value={perkType} onChangeText={setPerkType} isDropdown={true} />
                    <InputField label="Redemption Method" placeholder="Select Method" value={redemptionMethod} onChangeText={setRedemptionMethod} isDropdown={true} />
                    <InputField label="Discount or Benefit Value" placeholder="e.g. 20% Off" value={discountValue} onChangeText={setDiscountValue} />
                    <InputField label="Partner Link or Code" placeholder="CAH4EDU25 or https://shdcsiivh" value={partnerLink} onChangeText={setPartnerLink} optional={true} />
                    <InputField label="Start Date" placeholder="mm/dd/yyyy" value={startDate} onChangeText={setStartDate} isDate={true} />
                    <InputField label="End Date" placeholder="mm/dd/yyyy" value={endDate} onChangeText={setEndDate} isDate={true} />
                    <InputField label="Usage Limitations" placeholder="List exclusions or caps" multiline value={usageLimitations} onChangeText={setUsageLimitations} optional={true} />
                </View>

                <View style={styles.basicInfoCont}>
                    <Text style={[styles.basicTitle, { marginTop: 15 }]}>Eligibility & Audience</Text>

                    {/* Eligibility Criteria */}
                    <Text style={[styles.label, { color: 'white', marginTop: 10, marginBottom: 5 }]}>Eligibility Criteria*</Text>
                    <View style={styles.eligibilityCriteriaContainer}>
                        <View style={styles.eligibilityBox}>
                            <Checkbox
                                status={eligibility.verifiedStudent ? "checked" : "unchecked"}
                                onPress={() => toggleEligibility('verifiedStudent')}
                                color="#4ac3ff"
                                uncheckedColor="#51e3fc"
                            />
                            <Text style={styles.checkboxLabel}>Verified Student</Text>
                        </View>
                        <View style={styles.eligibilityBox}>
                            <Checkbox
                                status={eligibility.schoolEmailRequired ? "checked" : "unchecked"}
                                onPress={() => toggleEligibility('schoolEmailRequired')}
                                color="#4ac3ff"
                                uncheckedColor="#51e3fc"
                            />
                            <Text style={styles.checkboxLabel}>School Email Required</Text>
                        </View>
                        <View style={styles.eligibilityBox}>
                            <Checkbox
                                status={eligibility.allUsers ? "checked" : "unchecked"}
                                onPress={() => toggleEligibility('allUsers')}
                                color="#4ac3ff"
                                uncheckedColor="#51e3fc"
                            />
                            <Text style={styles.checkboxLabel}>All users</Text>
                        </View>
                    </View>


                    <Text style={[styles.label, { color: 'white' }]}>Location Availability*</Text>
                    <View style={styles.locationDropdown}>
                        <TextInput
                            value={location}
                            editable={false} // Make it look like a static dropdown display
                            style={styles.inputDropdown}
                            placeholderTextColor="#7c92a6"
                        />
                        <AntDesign name='caretdown' size={12} color='#ffffff' style={styles.dropdownIconLocation} />
                    </View>

                    {/* Require Student Verification Toggle */}
                    <View style={styles.verificationToggleRow}>
                        <Text style={styles.verificationToggleText}>Require Student Verification</Text>
                        <Switch
                            trackColor={{ false: "#0d2f48", true: "#4ac3ff" }}
                            thumbColor={requireVerification ? "#ffffff" : "#d9e6f2"}
                            ios_backgroundColor="#0d2f48"
                            onValueChange={setRequireVerification}
                            value={requireVerification}
                        />
                    </View>
                </View>


                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                {/* Continue or Publish BUTTON */}
                <TouchableOpacity style={styles.borderBtn}>
                    <Text style={styles.borderBtnTxt}>Publish</Text>
                </TouchableOpacity>

                {/* Add margin to bottom for scrolling */}
                <View style={{ height: 50 }} />

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    eligibilityCriteriaContainer: {
        marginHorizontal: 10,
    },
    eligibilityBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginBottom: 5,
    },
    locationDropdown: {
        marginHorizontal: 10,
        borderRadius: 10,
        position: 'relative',
    },
    inputDropdown: {
        backgroundColor: '#0d2f48',
        padding: 10,
        fontSize: 14,
        color: 'white',
        borderRadius: 10,
        minHeight: 40,
        paddingRight: 40,
    },
    dropdownIconLocation: {
        position: 'absolute',
        right: 15,
        top: 14,
        color: 'white',
    },
    verificationToggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 25,
        marginBottom: 10,
    },
    verificationToggleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    // --- End New/Updated Styles ---

    featureGradient: {
        marginTop: 25,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 18,
        width: '92%'
    },
    gradientTextBox: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5, // spacing from checkbox
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 10,

    },
    checkboxBox: {
        width: '48%', // 2 columns
        flexDirection: 'row',
        alignItems: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    content: { flex: 1 },
    basicInfoCont: {
        backgroundColor: "#021e38",
        marginTop: 20,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        paddingBottom: 15,
    },

    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
    },

    basicTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10,
    },

    label: {
        color: '#ffffffff',
        fontSize: 14,
        marginLeft: 15,
        marginBottom: 5,
        marginTop: 15,
        fontWeight: '600'
    },
    required: {
        color: '#51e3fc', // Color for the asterisk
    },

    input: {
        backgroundColor: '#0d2f48',
        marginHorizontal: 10,
        padding: 10,
        fontSize: 14,
        color: 'white',
        borderRadius: 10,
        minHeight: 40,
        paddingRight: 40, // Ensure space for icons
    },

    charCount: {
        color: '#7c92a6',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 5,
    },

    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },

    checkboxLabel: {
        color: "#d9e6f2",
        fontSize: 14,
    },

    featureBox: {
        marginTop: 25,
        borderRadius: 10,
        padding: 8,
        flexDirection: "row",
        alignItems: "center",
    },

    featureText: {
        color: "white",
        fontSize: 16,
        marginLeft: 5,
    },

    selectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 15,
    },

    typeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
    },

    activeTypeBtn: { backgroundColor: "#0257a7", borderColor: "#0257a7" },
    inactiveTypeBtn: { borderColor: "#fff" },

    typeText: { fontSize: 14, fontWeight: "600" },
    activeTypeText: { color: "white" },
    inactiveTypeText: { color: "white" },

    saveBtn: {
        width: "40%",
        backgroundColor: '#021e38',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 12,
        gap: 8,
        marginLeft: 15,
        justifyContent: 'center',
        
    },
    saveBtnTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    submitBtn: {
        width: "45%",
        backgroundColor: '#51e3fc',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 12,
        gap: 8,
        marginLeft: 10,
        justifyContent: 'center',
    },

    blueBtn: {
        backgroundColor: '#51e3fc',
        padding: 15,
        marginTop: 20,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    blueBtnTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },

    borderBtn: {
        padding: 15,
        marginTop: 20,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#51e3fc',
    },

    borderBtnTxt: {
        color: '#51e3fc',
        fontSize: 20,
        fontWeight: '600',
    },
    // Styles for merged form icons
    dropdownIcon: {
        position: 'absolute',
        right: 25,
        top: 45,
    },
    dateIcon: {
        position: 'absolute',
        right: 18,
        top: 45,
    }
});

export default PerkListing;
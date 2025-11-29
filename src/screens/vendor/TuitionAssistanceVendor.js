import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native';

const TuitionAssistanceVendor = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState("Tuition Assistance");

    // --- State for Basic Information form fields ---
    const [shortDescCount, setShortDescCount] = useState(0);
    const [perkTitle, setPerkTitle] = useState('');
    const [partnerOrg, setPartnerOrg] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [fullDesc, setFullDesc] = useState('');
    const categoriesList = [
        "STEM", "Trade", "Tech", "Morning"
    ];
    const [categories, setCategories] = useState({
        STEM: false, Trade: false, Tech: false, Morning: false
    });
    // ----------------------------------------------

    // --- State for Assistance Details form fields (Original) ---
    const [assistanceType, setAssistanceType] = useState('');
    const [fundingAmount, setFundingAmount] = useState('');
    const [programRequirements, setProgramRequirements] = useState('');
    // ----------------------------------------------

    // --- NEW STATE: Program Details from image ---
    const [benefitSummary, setBenefitSummary] = useState('');
    const [cap, setCap] = useState('');
    const [reimbursementFrequency, setReimbursementFrequency] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [programContactEmail, setProgramContactEmail] = useState('');

    const [educationTypes, setEducationTypes] = useState({
        University: false,
        'Online Certification': false,
        'Trade School': false,
        'Community College': false,
    });
    const [requiredDocuments, setRequiredDocuments] = useState({
        'Pay Stub': false,
        Transcript: false,
    });
    const [eligibleParticipants, setEligibleParticipants] = useState({
        'Full Time Employee': false,
        'Part Time': false,
        Students: false,
    });
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


    const types = [
        { label: "Scholarship", icon: "school-outline" },
        { label: "Student Perk", icon: "gift-outline" },
        { label: "Tuition Assistance", icon: "cash-outline" },
        { label: "Educational Video", icon: "videocam-outline" },
    ];

    const handleTypeSelection = (label) => {
        setSelected(label);
        if (label === "Student Perk") {
            navigation.navigate('PerkListing');
        }
        else if (label === "Educational Video") {
            navigation.navigate('EducationalVideo');
        }
        else if (label === "Scholarship") {
            navigation.navigate('ScholarshipListing');
        }
    };

    const toggleCategory = (item) => {
        setCategories({ ...categories, [item]: !categories[item] });
    };

    const toggleEligibility = (key) => {
        setEligibility(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // NEW HELPER: Toggle function for the new checkboxes
    const toggleCheckbox = (state, setState, key) => {
        setState({ ...state, [key]: !state[key] });
    };

    // Helper component for form inputs
    const InputField = ({ label, value, onChangeText, placeholder, optional = false, multiline = false, maxLength, keyboardType = 'default', isDropdown = false, isDate = false, shortDescCount = 0 }) => (
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
                <AntDesign name='caretdown' size={12} color='white' style={styles.dropdownIcon} />
            )}
            {isDate && (
                <Ionicons name='calendar-outline' size={20} color='white' style={styles.dateIcon} />
            )}
        </View>
    );


    return (
        <View style={styles.container}>
            <VendorHeader
                title="Create Student Assistance Program Listing"
                subtitle="Provide details for your tuition assistance program to help students access financial support"
                onBackPress={() => navigation.goBack()}
                onSettingsPress={() => navigation.navigate("Setting")}
            />
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TouchableOpacity style={styles.saveBtn}>
                    <AntDesign name='download' size={18} color='white' />
                    <Text style={styles.saveBtnTxt}>Save Draft</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitBtn}>
                    <Ionicons name='send' size={16} color='white' />
                    <Text style={styles.saveBtnTxt}>Submit for Review</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>



                {/* SECTION TITLE */}
                <Text style={styles.sectionTitle}>Select Listing Type</Text>
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

                {/* BASIC INFORMATION SECTION */}
                <View style={styles.basicInfoCont}>
                    <Text style={styles.basicTitle}>Basic Information</Text>

                    <InputField
                        label="Program Title" // Adjusted label for Tuition Assistance context
                        placeholder="e.g. career choice"
                        value={perkTitle}
                        onChangeText={setPerkTitle}
                    />

                    <InputField
                        label="Organization Name"
                        placeholder="TechZone Electronics"
                        value={partnerOrg}
                        onChangeText={setPartnerOrg}
                        optional={true}
                    />

                    <InputField
                        label="Short Description"
                        placeholder="One - line students see on app cards (220 characters)"
                        multiline
                        maxLength={220}
                        onChangeText={t => {
                            setShortDesc(t);
                            setShortDescCount(t.length);
                        }}
                        value={shortDesc}
                        shortDescCount={shortDescCount}
                    />

                    <InputField
                        label="Full Description"
                        placeholder="Brief Description"
                        multiline
                        value={fullDesc}
                        onChangeText={setFullDesc}
                    />

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

                    {/* Program Type (Assistance Type) field */}
                    <InputField
                        label="Program Type"
                        placeholder="Select program type"
                        value={assistanceType}
                        onChangeText={setAssistanceType}
                        isDropdown={true}
                    />

                </View>

                {/* --- NEW SECTION: PROGRAM DETAILS --- */}
                <View style={styles.basicInfoCont}>
                    <Text style={styles.basicTitle}>Program Details</Text>

                    {/* 1. Benefit Summary */}
                    <InputField
                        label="Benefit Summary"
                        placeholder="e.g. Convert 100%..."
                        value={benefitSummary}
                        onChangeText={setBenefitSummary}
                    />

                    {/* 2. Cap */}
                    <InputField
                        label="Cap"
                        placeholder="e.g. Up to $5,250 annually"
                        value={cap}
                        onChangeText={setCap}
                        optional={true}
                    />

                    {/* 3. Reimbursement Frequency (Dropdown) */}
                    <InputField
                        label="Reimbursement Frequency"
                        placeholder="Select Frequency"
                        value={reimbursementFrequency}
                        onChangeText={setReimbursementFrequency}
                        isDropdown={true}
                    />

                    {/* 4. Eligible Education Types Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Eligible Education Types*</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(educationTypes).map((key) => (
                            <View key={key} style={styles.checkboxItem}>
                                <Checkbox
                                    status={educationTypes[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleCheckbox(educationTypes, setEducationTypes, key)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>

                    {/* 5. Payment Type (Dropdown) */}
                    <InputField
                        label="Payment Type"
                        placeholder="Select Payment Type"
                        value={paymentType}
                        onChangeText={setPaymentType}
                        isDropdown={true}
                    />

                    {/* 6. Application Link */}
                    <InputField
                        label="Application Link"
                        placeholder="Application form"
                        value={applicationLink}
                        onChangeText={setApplicationLink}
                    />

                    {/* 7. Required Documents Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Required Documents*</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(requiredDocuments).map((key) => (
                            <View key={key} style={styles.checkboxItemShort}>
                                <Checkbox
                                    status={requiredDocuments[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleCheckbox(requiredDocuments, setRequiredDocuments, key)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>

                    {/* 8. Start Date */}
                    <InputField
                        label="Start Date"
                        placeholder="mm/dd/yyyy"
                        value={startDate}
                        onChangeText={setStartDate}
                        isDate={true}
                    />

                    {/* 9. End Date */}
                    <InputField
                        label="End Date"
                        placeholder="mm/dd/yyyy"
                        value={endDate}
                        onChangeText={setEndDate}
                        isDate={true}
                    />

                    {/* 10. Program Contact Email */}
                    <InputField
                        label="Program Contact Email"
                        placeholder="example@gmail.com"
                        value={programContactEmail}
                        onChangeText={setProgramContactEmail}
                        keyboardType='email-address'
                    />

                    {/* 11. Eligible Participant Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Eligible Participant *</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(eligibleParticipants).map((key) => (
                            <View key={key} style={styles.checkboxItem}>
                                <Checkbox
                                    status={eligibleParticipants[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleCheckbox(eligibleParticipants, setEligibleParticipants, key)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>

                </View>
                {/* --- END NEW SECTION --- */}


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

    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 10,
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
    // Container style reused for both Basic Info and Program Details
    basicInfoCont: {
        backgroundColor: "#021e38",
        marginTop: 20,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        paddingBottom: 15,
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
        color: '#51e3fc',
    },
    input: {
        backgroundColor: '#0d2f48',
        marginHorizontal: 10,
        padding: 10,
        fontSize: 14,
        color: 'white',
        borderRadius: 10,
        minHeight: 40,
        paddingRight: 40,
    },
    charCount: {
        color: '#7c92a6',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    checkboxBox: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        color: "#d9e6f2",
        fontSize: 14,
    },
    checkboxGroup: {
        flexWrap: 'wrap',
        flexDirection:'row',
        marginHorizontal: 10,
        paddingRight: 10,
    },
    checkboxItem: {
        width: '50%', // Two items per row
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkboxItemShort: {
        width: '40%', // Smaller width for fewer items
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
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
    // Icon styles (needed to position icons inside the InputField)
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

export default TuitionAssistanceVendor;
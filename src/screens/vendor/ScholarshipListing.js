import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// Assuming this is the path to your reusable header component structure
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
// LinearGradient and Checkbox from react-native-paper/external are imported 
// but not strictly used in the current implementation to keep it dependency-minimal.

// ===========================================
// HELPER COMPONENTS (FOR FORM STRUCTURE)
// ===========================================

// Helper Component for the Eligibility Chips (e.g., GPA, Major)
const EligibilityChip = ({ label, onRemove }) => (
    <View style={styles.chip}>
        <Text style={styles.chipText}>{label}</Text>
        <TouchableOpacity onPress={onRemove} style={styles.chipRemove}>
            <Ionicons name="close-circle" size={16} color="#fff" />
        </TouchableOpacity>
    </View>
);

const CheckboxItem = ({ label, value, onPress }) => (
    <TouchableOpacity style={styles.checkboxItem} onPress={onPress}>
        <View style={[styles.checkbox, value && styles.checkedCheckbox]}>
            {value && <Ionicons name="checkmark-sharp" size={18} color="#000" />}
        </View>
        <Text style={styles.checkboxText}>{label}</Text>
    </TouchableOpacity>
);

const ScholarshipListing = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState("Scholarship");

    // --- FORM STATE ---
    const [awardAmount, setAwardAmount] = useState('');
    const [awardCount, setAwardCount] = useState('');
    const [applicationLink, setApplicationLink] = useState('');
    const [rewardProcess, setRewardProcess] = useState('Direct to School'); // Simulated dropdown value
    const [renewalEnabled, setRenewalEnabled] = useState(false); 
    const [documents, setDocuments] = useState({
        essay: true, recommendation: false, resume: true, portfolio: false,
        transcript: true, idVerification: false,
    });
    const eligibilityCriteria = ['GPA', 'School Year', 'Major'];


    // --- HANDLERS ---
    const types = [
        { label: "Scholarship", icon: "school-outline" },
        { label: "Student Perk", icon: "gift-outline" },
        { label: "Tuition Assistance", icon: "cash-outline" },
        { label: "Educational Video", icon: "videocam-outline" },
    ];

    const handleTypeSelection = (label) => {
        setSelected(label);

        // Logic to navigate to other screens
        if (label === "Student Perk") {
            navigation.navigate('PerkListing');
        } else if (label === "Tuition Assistance") {
            navigation.navigate('TuitionAssistanceVendor'); // Hypothetical screen
        } else if (label === "Educational Video") {
            navigation.navigate('EducationalVideo'); // Hypothetical screen
        }
            };

    const toggleDocument = (key) => {
        setDocuments(prev => ({ ...prev, [key]: !prev[key] }));
    };
    return (
        <View style={styles.container}>
            {/* VENDOR HEADER */}
            <VendorHeader
                title="Scholarship Listing"
                subtitle="Provide details for your scholarship so students can apply easily"
                onBackPress={() => navigation.goBack()}
                onSettingsPress={() => navigation.navigate("Setting")}
            />
            <View style={styles.buttonRow}>
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


                <Text style={styles.sectionTitle}>Select Listing Type</Text>

                {/* SELECTOR TABS */}
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

                <View style={styles.basicInfoCont}>

                    {/* Basic Information Header */}
                    <Text style={styles.formHeader}>Basic Information</Text>

                    {/* 1. Award Amount Input */}
                    <Text style={styles.label}>Award Amount*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter award amount (in PKR or USD)"
                        placeholderTextColor="#777"
                        value={awardAmount}
                        onChangeText={setAwardAmount}
                        keyboardType="numeric"
                    />

                    {/* 2. Number of Awards Available Input */}
                    <Text style={styles.label}>Number of Awards Available*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="How many students will receive this award?"
                        placeholderTextColor="#777"
                        value={awardCount}
                        onChangeText={setAwardCount}
                        keyboardType="numeric"
                    />

                    {/* 3. Eligibility Criteria Section */}
                    <Text style={styles.label}>Eligibility Criteria*</Text>
                    <View style={styles.chipsContainer}>
                        {eligibilityCriteria.map((criterion, index) => (
                            <EligibilityChip
                                key={index}
                                label={criterion}
                                
                            />
                        ))}
                    </View>

                    {/* 4. Required Documents Checkboxes */}
                    <Text style={styles.label}>Required Documents*</Text>
                    <View style={styles.documentsGrid}>
                        <CheckboxItem label="Essay" value={documents.essay} onPress={() => toggleDocument('essay')} />
                        <CheckboxItem label="Recommendation Letter" value={documents.recommendation} onPress={() => toggleDocument('recommendation')} />
                        <CheckboxItem label="Resume" value={documents.resume} onPress={() => toggleDocument('resume')} />
                        <CheckboxItem label="Portfolio" value={documents.portfolio} onPress={() => toggleDocument('portfolio')} />
                        <CheckboxItem label="Transcript" value={documents.transcript} onPress={() => toggleDocument('transcript')} />
                        <CheckboxItem label="ID Verification" value={documents.idVerification} onPress={() => toggleDocument('idVerification')} />
                    </View>

                    {/* 5. Application Process Input */}
                    <Text style={styles.label}>Application Process</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="www.foundation.org/scholarship/apply"
                        placeholderTextColor="#777"
                        value={applicationLink}
                        onChangeText={setApplicationLink}
                    />

                    {/* 6. Reward Process Dropdown (Simulated) */}
                    <Text style={styles.label}>Reward Process</Text>
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{rewardProcess}</Text>
                        <Ionicons name="chevron-down" size={20} color="white" />
                    </TouchableOpacity>

                    {/* 7. Renewal Status Switch */}
                    <View style={styles.renewalRow}>
                        <Text style={styles.label}>Renewal Status</Text>
                        <Switch
                            onValueChange={setRenewalEnabled}
                            value={renewalEnabled}
                            trackColor={{ false: '#767577', true: '#51e3fc' }}
                            thumbColor={renewalEnabled ? '#fff' : '#f4f3f4'}
                        />
                    </View>
                </View>


                {/* CANCEL BUTTON */}
                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                {/* PUBLISH BUTTON */}
                <TouchableOpacity style={styles.borderBtn}>
                    <Text style={styles.borderBtnTxt}>Publish</Text>
                </TouchableOpacity>

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
    // --- Header & Selector Styles (from original code) ---
    buttonRow: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom:15
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
        marginBottom: 15,
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
    
    formHeader: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#0d2f48',
        color: '#ffffffff',
        padding: 8,
        borderRadius: 8,
        fontSize: 16,
        fontSize: 13,
    },
    // Chips
    chipsContainer: {
        flexDirection: 'row',
        gap: 8,
        padding: 5,
        backgroundColor: '#0d2f48',
        borderRadius: 8,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#51e3fc',
        borderRadius: 20,
        paddingLeft: 16,
        paddingRight: 8,
        height: 30,
    },
    chipText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '400',
    },
    addCriterion: {
        justifyContent: 'center',
        height: 35,
    },
    // Checkboxes
    documentsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 8,
    },
    checkboxItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        marginVertical: 8,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#51e3fc',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedCheckbox: {
        backgroundColor: '#51e3fc',
        borderColor: '#51e3fc',
    },
    checkboxText: {
        color: 'white',
        fontSize: 13,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0d2f48',
        padding: 8,
        borderRadius: 10,
    },
    dropdownText: {
        color: 'white',
        fontSize: 13,
    },
    renewalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },

    // --- Footer Button Styles (from original code) ---
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
    basicInfoCont: {
        backgroundColor: "#021e38",
        marginTop: 10,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        paddingBottom: 20,
        padding:15, // Added padding to bottom of the content box
    },
});

export default ScholarshipListing;
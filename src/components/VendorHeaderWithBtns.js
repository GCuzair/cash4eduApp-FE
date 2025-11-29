import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { Switch } from 'react-native'; // Import Switch for the toggle

const ScholarshipListing = () => {

    const navigation = useNavigation();
    const [selected, setSelected] = useState("Scholarship");

    const types = [
        { label: "Scholarship", icon: "school-outline" },
        { label: "Student Perk", icon: "gift-outline" },
        { label: "Tuition Assistance", icon: "cash-outline" },
        { label: "Educational Video", icon: "videocam-outline" },
    ];

    // ** New function to handle selection and navigation **
    const handleTypeSelection = (label) => {
        setSelected(label);

        // ** Check if the selected label is "Student Perk" and navigate **
        if (label === "Student Perk") {
            // NOTE: Replace 'StudentPerkPage' with the actual name of your target screen
            navigation.navigate('PerkListing');
        }
    };

    return (
        <View style={styles.container}>
            <VendorHeader
                title="Scholarship Listing"
                subtitle="Provide details for your scholarship so students can apply easily"
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* TOP BUTTONS */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.saveBtn}>
                        <AntDesign name='download' size={18} color='white' />
                        <Text style={styles.saveBtnTxt}>Save Draft</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.submitBtn}>
                        <Ionicons name='send' size={16} color='white' />
                        <Text style={styles.saveBtnTxt}>Submit for Review</Text>
                    </TouchableOpacity>
                </View>

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
                                    // ** Update the onPress to use the new handler function **
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
                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                {/* Continue or Publish BUTTON */}
                <TouchableOpacity style={styles.borderBtn}>
                    <Text style={styles.borderBtnTxt}>Publish</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 20,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
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
        fontSize: 22,
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
        fontSize: 22,
        fontWeight: '600',
    },

});

export default ScholarshipListing;
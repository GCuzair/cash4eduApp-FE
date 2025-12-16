import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CreateListingScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Your reusable header */}
            <VendorHeader
                title="Create New Listing"
                subtitle="Allow vendors to publish scholarships, perks, employment opportunities, etc."
                onBackPress={() => navigation.goBack()}
                onSettingsPress={() => navigation.navigate("Setting")}
                
            />

            {/* Rest of your screen content goes here */}
            <ScrollView style={styles.content}>

                <View style={styles.basicInfoCont}>
                    <Text style={styles.heading}>Basic Information</Text>

                    {/* Listing Title */}
                    <Text style={styles.label}>Listing Title*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g STEM Women Techmaker's"
                        placeholderTextColor="#ffffffff"
                    />

                    {/* Organization */}
                    <Text style={styles.label}>Organization Name</Text>
                    <TextInput
                        style={styles.input}
                        value="TechCorp Foundation (autofilled)"
                        placeholderTextColor="#ffffffff"
                    />

                    {/* Full Description */}
                    <Text style={styles.label}>Full Description*</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Brief Description"
                        placeholderTextColor="#ffffffff"
                        multiline
                    />

                    {/* Category */}
                    <Text style={styles.label}>Category*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Select category"
                        placeholderTextColor="#ffffffff"
                    />

                    {/* Tags */}
                    <Text style={styles.label}>Tags</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., STEM, Undergrad"
                        placeholderTextColor="#ffffffff"
                    />

                    {/* Upload Box */}
                    <Text style={styles.label}>Upload Banner Image</Text>
                    <View style={styles.uploadBox}>
                        <Ionicons name='cloud-upload-outline' size={40} color="#9bb3c8" />
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Text style={styles.uploadText}>Drag and drop your logo here, or</Text>
                            <TouchableOpacity>
                                <Text style={styles.browseText}>browse</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.uploadSubText}>PNG, JPG up to 2MB</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.borderBtn} onPress={()=>navigation.navigate('ScholarshipListing')}>
                    <Text style={styles.borderBtnTxt}>
                        Continue or Publish
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.lastBtn} >
                    <Text style={styles.lastBtnTxt}>Save as Draft</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
    },
    basicInfoCont: {
        backgroundColor: "#021e38",
        padding: 20,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
    },

    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: "white",
        marginBottom: 20,
    },

    label: {
        color: "#ffffffff",
        fontSize: 15,
        fontWeight: "600",
        marginTop: 15,
    },
    input: {
        backgroundColor: "#1c384e",
        borderRadius: 10,
        padding: 10,
        color: "white",
        marginTop: 6,
    },

    textArea: {
        height: 100,
        textAlignVertical: "top",
    },

    uploadBox: {
        borderWidth: 1,
        borderColor: "#51e3fc",
        borderStyle: "dashed",
        backgroundColor: "#0a2b42",
        borderRadius: 12,
        paddingVertical: 25,
        alignItems: "center",
        marginTop: 10,
    },
    uploadText: {
        color: "#9bb3c8",
        fontSize: 12,
        marginTop: 10,
    },
    browseText: {
        color: "#4ba3ff",
        fontSize: 12,
        marginTop: 10,
    },

    uploadSubText: {
        color: "#6d8599",
        fontSize: 12,
        marginTop: 5,
    },
    lastBtn: {
        backgroundColor: '#51e3fc',
        padding: 15,
        flexDirection: 'row',
        marginTop: 20,
        width: '90%',
        marginLeft: 15,
        borderRadius: 10,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    lastBtnTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
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
        borderColor: '#51e3fc'
    },
    borderBtnTxt:{
        color:'#51e3fc',
        fontSize: 20,
        fontWeight: '600'
    },
});

export default CreateListingScreen;
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CreateListingScreen = () => {
    const navigation = useNavigation();
    const [isActive, setIsActive] = useState(true);
    const [isDefault, setIsDefault] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* 🔹 Header */}
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="#fff" />
                <Text style={styles.headerTitle}>Create Listing</Text>
            </View>

            {/* 🔹 Section Title */}
            <Text style={styles.sectionTitle}>Listing Details</Text>

            {/* 🔹 Form Fields */}
            <View style={styles.formContainer}>

                {/* Listing Type (ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Listing Type</Text>
                    <View style={styles.inputBoxRow}>
                        <TextInput
                            placeholder="Scholarship"
                            placeholderTextColor="#A0AEC0"
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Title (ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Title</Text>
                    <View style={styles.inputBoxRow}>
                        <TextInput placeholder="Enter title" placeholderTextColor="#A0AEC0" style={styles.input} />
                    </View>
                </View>

                {/* Description (ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Description</Text>
                    <View style={styles.textAreaRow}>
                        <TextInput
                            placeholder="Enter description"
                            placeholderTextColor="#A0AEC0"
                            multiline
                            style={styles.input}
                            numberOfLines={6}
                        />
                    </View>
                </View>

                {/* Eligibility Criteria (ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Eligibility Criteria</Text>
                    <View style={styles.inputBoxRow}>
                        <TextInput
                            placeholder="Enter eligibility"
                            placeholderTextColor="#A0AEC0"
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* Contact Info (ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Contact Info</Text>
                    <View style={styles.inputBoxRow}>
                        <TextInput
                            placeholder="Enter contact info"
                            placeholderTextColor="#A0AEC0"
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* 🔹 Dates (MODIFIED TO ROW) */}
                <View style={styles.rowFormGroup}>
                    <Text style={styles.labelRow}>Dates</Text>
                    <View style={styles.dateInputContainer}>
                        <TouchableOpacity style={styles.dateBox}>
                            <Text style={styles.dateLabel}>Start Date</Text>
                            <Text style={styles.dateValue}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dateBox}>
                            <Text style={styles.dateLabel}>End Date</Text>
                            <Text style={styles.dateValue}>0</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 🔹 Tags */}
                <Text style={styles.labelVertical}>Tags / Category</Text>
                <View style={styles.tagRow}>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>STEM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Text style={styles.tagText}>Undergraduate</Text>
                    </TouchableOpacity>
                </View>

                {/* 🔹 Status */}
                <Text style={styles.labelVertical}>Status</Text>
                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Default</Text>
                    <Switch
                        value={isDefault}
                        onValueChange={setIsDefault}
                        trackColor={{ false: '#555', true: '#03a2d5' }}
                        thumbColor={isDefault ? '#fff' : '#aaa'}
                    />
                </View>
                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Active</Text>
                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                        trackColor={{ false: '#555', true: '#03a2d5' }}
                        thumbColor={isActive ? '#fff' : '#aaa'}
                    />
                </View>
                <View style={styles.statusRow}>
                    <Text style={styles.statusLabel}>Closed</Text>
                    <Switch
                        value={isClosed}
                        onValueChange={setIsClosed}
                        trackColor={{ false: '#555', true: '#03a2d5' }}
                        thumbColor={isClosed ? '#fff' : '#aaa'}
                    />
                </View>
            </View>

            {/* 🔹 Buttons */}
            <TouchableOpacity activeOpacity={0.9} style={styles.previewBtn}>
                <LinearGradient colors={['#0A2A45', '#0E3E66']} style={styles.gradientBtn}>
                    <Text style={styles.previewText}>Preview Listing</Text>
                </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} style={styles.saveBtn} onPress={()=>{navigation.navigate('ManageListing')}}>
                <LinearGradient colors={['#03a2d5', '#00BFFF']} style={styles.gradientBtn}>
                    <Text style={styles.saveText}>Save as Draft</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#00162A',
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 15,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 30,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10
    },
    formContainer: {
        marginBottom: 30,
    },

    // *** ROW STYLES (Used for Title, Listing Type, Description, Eligibility, Contact Info, and Dates) ***
    rowFormGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    labelRow: {
        color: '#A0AEC0',
        fontSize: 14,
        fontWeight: 'bold',
        width: 110,               // Fixed width for alignment
        marginRight: 10,
    },
    inputBoxRow: {
        flex: 1,                  // Takes up remaining width
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#0A1E33',
        paddingHorizontal: 10,
    },

    // *** STYLE FOR ROW TEXTAREA (Specific for Description) ***
    textAreaRow: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        backgroundColor: '#0A1E33',
        paddingHorizontal: 10,
        height: 80,               // Taller input height
    },

    // *** DATES ROW STYLES ***
    dateInputContainer: {
        flex: 1,                          // Takes up remaining width
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateBox: {
        backgroundColor: '#0A1E33',
        borderRadius: 8,
        padding: 10,
        width: '48%',                     // Ensures two boxes fit with a gap
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,                       // Match height of other input boxes for visual consistency
        borderWidth: 1,
        borderColor: '#ffffffff',
    },
    dateLabel: {
        color: '#A0AEC0',
        fontSize: 12,
        position: 'absolute',             // Position the label above the value
        top: 2,
        fontWeight:'900',
        alignContent:'center',
    },
    dateValue: {
        color: '#fff',
        fontSize: 45,
        fontWeight: '600',
        marginTop: 8,                     
    },
    // *** VERTICAL LABEL (Used for Tags and Status section titles) ***
    labelVertical: {
        color: '#ffffffff',
        marginBottom: 5,
        marginTop: 10,
        fontSize:18,
    },

    input: {
        color: '#fff',
        fontSize: 14,
        paddingVertical: 8,
    },

    // *** Other Styles ***
    tagRow: {
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 15,
    },
    tag: {
        backgroundColor: '#03a2d5',
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 10,
    },
    tagText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    statusLabel: {
        color: '#fff',
        fontSize: 15,
    },
    previewBtn: {
        marginBottom: 15,
    },
    saveBtn: {},
    gradientBtn: {
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    previewText: {
        color: '#03a2d5',
        fontSize: 16,
        fontWeight: '700',
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default CreateListingScreen;
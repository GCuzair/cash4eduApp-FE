import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
    PermissionsAndroid,
    Alert,
    Switch
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// NOTE: Assuming these are custom components/modules that exist in your project
import VendorHeader from '../../components/VendorHeader';
import { launchImageLibrary } from 'react-native-image-picker';

// Icon Imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// UI Imports
import { Checkbox } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient'; // Not used in the displayed code

// --- Reusable InputField Component (Must be defined first) ---
const InputField = ({ label, value, onChangeText, placeholder, optional = false, multiline = false, maxLength, keyboardType = 'default', isDropdown = false, isDate = false, shortDescCount = 0, style = {}, editable = true }) => (
    <View style={styles.inputFieldContainer}>
        <Text style={styles.label}>
            {label}
            {!optional && <Text style={styles.required}>*</Text>}
        </Text>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#7c92a6"
            style={[
                styles.input,
                multiline && { height: 90, textAlignVertical: "top" },
                style,
                !editable && { backgroundColor: '#0d2f4890' } // Slightly darker background for read-only
            ]}
            multiline={multiline}
            maxLength={maxLength}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            editable={editable}
        />
        {label === "Short Description" && (
            <Text style={styles.charCount}>{shortDescCount} / 200 characters</Text>
        )}
        {isDropdown && (
            <AntDesign name='caretdown' size={12} color='white' style={styles.dropdownIcon} />
        )}
        {isDate && (
            <Ionicons name='calendar-outline' size={20} color='white' style={styles.dateIcon} />
        )}
    </View>
);
// -------------------------------------


// --- File Upload Logic ---
const handleFileUpload = async () => {
    // Request permission on Android
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Gallery Permission",
                    message: "App needs access to your gallery to select videos",
                    buttonPositive: "OK",
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Permission Denied', 'Cannot access gallery without permission');
                return;
            }
        } catch (err) {
            console.warn(err);
            return;
        }
    }

    // Open gallery for video selection
    try {
        const result = await launchImageLibrary({
            mediaType: 'video',
            selectionLimit: 1,
        });

        if (result.assets && result.assets.length > 0) {
            const video = result.assets[0];
            console.log('Selected video:', video);
            Alert.alert('Video Selected', video.fileName || 'Video selected successfully!');
            // You would typically update state here in the parent component
        } else {
            console.log('No video selected');
        }
    } catch (err) {
        console.log('Error picking video:', err);
        Alert.alert('Error', 'Failed to pick video');
    }
};
// -------------------------------------


// --- Content Option Component (Helper for VideoContentSection) ---
const ContentOption = ({ iconName, title, subtitle, onPress, active }) => (
    <TouchableOpacity
        style={[styles.contentOption, active && styles.activeContentOption]}
        onPress={onPress}
    >
        <Ionicons name={iconName} size={24} color={active ? '#51e3fc' : '#51e3fc'} />
        <View style={styles.contentOptionText}>
            <Text style={[styles.contentOptionTitle, active && styles.activeContentOptionTitle]}>{title}</Text>
            <Text style={styles.contentOptionSubtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);
// -------------------------------------


// --- VideoContentSection Component ---
const VideoContentSection = ({
    contentSource, setContentSource,
    videoLink, setVideoLink,
    duration,
    hasPublishRights, setHasPublishRights
}) => {
    // NOTE: Simulated file state for UI demo
    const [uploadedFile, setUploadedFile] = useState(null);

    const isUploadActive = contentSource === 'upload';
    const isLinkActive = contentSource === 'link';

    const handleSimulatedFileUpload = () => {
        handleFileUpload(); // Run the actual picker
        // Simulate file selection for UI only
        if (uploadedFile) {
            setUploadedFile(null);
        } else {
            setUploadedFile({ name: 'Selected_Budget_Video.mp4' });
        }
    }

    return (
        <View style={styles.videoContentContainer}>
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>Content</Text>
                <Text style={styles.contentRequiredLabel}>Choose Video Sources*</Text>

                {/* Content Option Buttons */}
                <View style={styles.contentOptionsGroup}>
                    <ContentOption
                        iconName="cloud-upload-outline"
                        title="Upload File"
                        subtitle="MP4 or MOV, max 500MB"
                        active={isUploadActive}
                        onPress={() => setContentSource('upload')}
                    />
                    <ContentOption
                        iconName="link-outline"
                        title="Paste Link"
                        subtitle="YouTube or Video"
                        active={isLinkActive}
                        onPress={() => setContentSource('link')}
                    />
                </View>

                {/* Conditional Content Input Area */}
                {isUploadActive && (
                    <TouchableOpacity style={styles.dragDropArea} onPress={handleSimulatedFileUpload}>
                        {uploadedFile ? (
                            <View style={styles.uploadSuccess}>
                                <Ionicons name="checkmark-circle" size={30} color="#51e3fc" />
                                <Text style={[styles.dragDropText, { fontWeight: 'bold' }]}>
                                    {uploadedFile.name}
                                </Text>
                                <Text style={styles.dragDropSubtitle}>
                                    Tap to choose a different file.
                                </Text>
                            </View>
                        ) : (
                            <>
                                <MaterialCommunityIcons name="folder-upload-outline" size={30} color="#7c92a6" />
                                <Text style={styles.dragDropText}>
                                    Drag and drop file here, or <Text style={styles.browseLink}>browse</Text>
                                </Text>
                                <Text style={styles.dragDropSubtitle}>
                                    MP4 or MOV file type up to 500MB
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}

                {isLinkActive && (
                    <InputField
                        label="Video Link"
                        placeholder="Paste YouTube or video link here"
                        value={videoLink}
                        onChangeText={setVideoLink}
                    />
                )}

                {/* Duration (Always visible) */}
                <InputField
                    label="Duration"
                    placeholder="Auto Detected"
                    value={duration}
                    editable={false}
                    optional={true}
                />

                {/* Thumbnail Image Section */}
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.label}>Thumbnail Image*</Text>
                    <TouchableOpacity style={styles.thumbnailBtn}>
                        <Ionicons name="image-outline" size={20} color="white" />
                        <Text style={styles.thumbnailBtnText}>Upload Custom</Text>
                    </TouchableOpacity>
                </View>

                {/* Publish Rights Checkbox */}
                <View style={styles.publishRightsCheckboxRow}> 
                    <Checkbox
                        status={hasPublishRights ? "checked" : "unchecked"}
                        onPress={() => setHasPublishRights(prev => !prev)}
                        color="#4ac3ff"
                        uncheckedColor="#51e3fc"
                    />
                    <Text style={styles.checkboxLabel}>I have right to publish this content*</Text>
                </View>

            </View>
        </View>
    );
};

const EducationalVideo = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState("Educational Video");

    // --- State for 1. Basic Information ---
    const [videoTitle, setVideoTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [shortDescCount, setShortDescCount] = useState(0);
    const [audienceLevel, setAudienceLevel] = useState('');
    const [language, setLanguage] = useState('');
    const [captionsProvided, setCaptionsProvided] = useState(false);
    const [categories, setCategories] = useState({
        FAFSA: false,
        "Financial Literacy": false,
        Credit: false,
        Budgeting: false,
        Scholarship: false,
    });
    const toggleCategory = (key) => {
        setCategories(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // --- State for 2. Content ---
    const [contentSource, setContentSource] = useState('upload');
    const [videoLink, setVideoLink] = useState('');
    const [duration] = useState('Auto Detected');
    const [hasPublishRights, setHasPublishRights] = useState(false);

    // --- State for 3. Learning & Reward (New) ---
    const [learningObjectives, setLearningObjectives] = useState('');
    const [keywords, setKeywords] = useState('');
    const [tokenReward, setTokenReward] = useState('');
    const [completionThreshold, setCompletionThreshold] = useState('');
    const [badgeCredits, setBadgeCredits] = useState({
        "Budget Basics": false,
        "Scholar Star": false,
        "Money Master": false,
        "FASFA Pro": false,
    });
    const toggleBadgeCredit = (key) => {
        setBadgeCredits(prev => ({ ...prev, [key]: !prev[key] }));
    };

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
        else if (label === "Tuition Assistance") {
            navigation.navigate('EducationalVideo');
        }
        else if (label === "Scholarship") {
            navigation.navigate('TuitionAssistanceVendor');
        }
    };

    return (
        <View style={styles.container}>
            <VendorHeader
                title="Educational Video Listing"
                subtitle="Provide details for your educational video to help students learn relevant skills"
                onBackPress={() => navigation.goBack()}
                onSettingsPress={() => navigation.navigate("Setting")}
            />
            {/* TOP BUTTONS */}
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

                {/* SELECT LISTING TYPE SECTION */}
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

                {/* ----------------------------------------------------- */}
                {/* 1. Basic Information SECTION */}
                {/* ----------------------------------------------------- */}
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Basic Information </Text>

                    {/* 1. Video Title */}
                    <InputField
                        label="Video Title"
                        placeholder="e.g. Budget Basics Saving for books"
                        value={videoTitle}
                        onChangeText={setVideoTitle}
                    />

                    {/* 2. Short Description */}
                    <InputField
                        label="Short Description"
                        placeholder="One - line students see on app cards (220 characters)"
                        multiline
                        maxLength={200}
                        onChangeText={t => {
                            setShortDesc(t);
                            setShortDescCount(t.length);
                        }}
                        value={shortDesc}
                        shortDescCount={shortDescCount}
                    />

                    {/* 3. Category / Subject Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Category / Subject*</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(categories).map((key) => (
                            <View key={key} style={styles.checkboxItem}>
                                <Checkbox
                                    status={categories[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleCategory(key)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>

                    {/* 4. Audience Level (Dropdown) */}
                    <InputField
                        label="Audience Level"
                        placeholder="Beginner"
                        value={audienceLevel}
                        onChangeText={setAudienceLevel}
                        isDropdown={true}
                    />

                    {/* 5. Language (Dropdown) */}
                    <InputField
                        label="Language"
                        placeholder="English"
                        value={language}
                        onChangeText={setLanguage}
                        isDropdown={true}
                    />

                    {/* 6. Captions Provided Checkbox */}
                    <View style={styles.captionCheckboxRow}>
                        <Checkbox
                            status={captionsProvided ? "checked" : "unchecked"}
                            onPress={() => setCaptionsProvided(prev => !prev)}
                            color="#4ac3ff"
                            uncheckedColor="#51e3fc"
                        />
                        <Text style={styles.checkboxLabel}>Captions Provided</Text>
                    </View>

                </View>

                {/* ----------------------------------------------------- */}
                {/* 2. VIDEO CONTENT SECTION */}
                {/* ----------------------------------------------------- */}
                <VideoContentSection
                    {...{ contentSource, setContentSource, videoLink, setVideoLink, duration, hasPublishRights, setHasPublishRights }}
                />

                {/* ----------------------------------------------------- */}
                {/* 3. LEARNING & REWARD SECTION */}
                {/* ----------------------------------------------------- */}
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Learning & Reward</Text>

                    {/* Learning Objectives */}
                    <InputField
                        label="Learning Objectives"
                        placeholder="Build a weekly budget. Track expenses, Avoid..."
                        value={learningObjectives}
                        onChangeText={setLearningObjectives}

                        style={{}}
                    />

                    {/* Keywords / Tags */}
                    <InputField
                        label="Keywords / Tags"
                        placeholder="budget, textbooks, college money"
                        value={keywords}
                        onChangeText={setKeywords}
                    />

                    {/* Token Reward */}
                    <InputField
                        label="Token Reward"
                        placeholder="115"
                        value={tokenReward}
                        onChangeText={setTokenReward}
                        keyboardType='numeric'
                    />

                    {/* Completion Threshold (Dropdown) */}
                    <InputField
                        label="Completion Threshold"
                        placeholder="80% watched"
                        value={completionThreshold}
                        onChangeText={setCompletionThreshold}
                        isDropdown={true}
                    />

                    {/* Badge Credit Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Badge Credit (Optional)</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(badgeCredits).map((key) => (
                            <View key={key} style={styles.checkboxItem}>
                                <Checkbox
                                    status={badgeCredits[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleBadgeCredit(key)}
                                    color="#4ac3ff"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>
                </View>


                {/* --- Action Buttons --- */}
                <TouchableOpacity style={styles.blueBtn}>
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.borderBtn}>
                    <Text style={styles.borderBtnTxt}>Publish</Text>
                </TouchableOpacity>

                <View style={{ height: 50 }} /> {/* Spacer for scrolling */}

            </ScrollView>
        </View>
    );
};


// --- STYLESHEET (Combined) ---
const styles = StyleSheet.create({
    // --- General Styles (Combined) ---
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

    // Top Buttons
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

    // Bottom Buttons
    blueBtn: {
        backgroundColor: '#51e3fc',
        padding: 15,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
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
        alignSelf: 'center',
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

    // --- Input/Form Card Styles ---
    formContainer: {
        backgroundColor: "#021e38",
        marginTop: 20,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        paddingBottom: 15,
    },
    formTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 10,
    },
    // Input/Label styles reused by InputField component
    inputFieldContainer: { marginBottom: 0 },
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
    dropdownIcon: {
        position: 'absolute',
        right: 25,
        top: 45,
    },
    dateIcon: {
        position: 'absolute',
        right: 25,
        top: 45
    },
    // Checkbox Styles
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 10,
    },
    checkboxItem: {
        width: '50%', // Two items per row
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionCheckboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 10,
    },
    checkboxLabel: {
        color: "#d9e6f2",
        fontSize: 14,
    },
    publishRightsCheckboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginTop: 10,
        paddingHorizontal: 5,
    },

    // --- Video Content Section Styles ---
    videoContentContainer: {
        width: "100%",
    },
    contentRequiredLabel: {
        color: '#ffffffff',
        fontSize: 14,
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 5,
        fontWeight: '600'
    },
    // Content Option Buttons
    contentOptionsGroup: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    contentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3c5567ed',
        borderRadius: 10,
        padding: 10,
        flex: 1,
    },
    activeContentOption: {
        borderColor: '#51e3fc',
        borderWidth: 1,
    },
    contentOptionText: {
        marginLeft: 10,
        flexShrink: 1,
    },
    contentOptionTitle: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    activeContentOptionTitle: {
        color: '#51e3fc',
    },
    contentOptionSubtitle: {
        color: '#7c92a6',
        fontSize: 12,
    },
    // Drag and Drop Area
    dragDropArea: {
        borderWidth: 1,
        borderColor: '#0257a7',
        borderStyle: 'dashed',
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0d2f48',
        marginBottom: 15,
    },
    dragDropText: {
        color: 'white',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    browseLink: {
        color: '#51e3fc',
        fontWeight: '600',
    },
    dragDropSubtitle: {
        color: '#7c92a6',
        fontSize: 12,
        marginTop: 5,
    },
    // Thumbnail Image Button
    thumbnailBtn: {
        backgroundColor: '#0d2f48',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    thumbnailBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    uploadSuccess: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default EducationalVideo;
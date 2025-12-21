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
    ActivityIndicator,
    Image,
    Linking
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

// Custom components/modules
import VendorHeader from '../../components/VendorHeader';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

// Icon Imports
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// UI Imports
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';

// API Import
import { FireApi } from '../../utils/FireApi';

// --- Reusable InputField Component ---
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
                !editable && { backgroundColor: '#0d2f4890' }
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

// API Service Functions
const uploadVideoFile = async (videoUri, videoFileName) => {
    try {
        console.log('📤 Uploading video file:', videoUri);
        
        const formData = new FormData();
        
        // Video file append karein
        formData.append('video_file', {
            uri: videoUri,
            type: 'video/mp4',
            name: videoFileName || 'video.mp4'
        });

        console.log('📁 FormData prepared for video upload');
        
        // API call karein
        const response = await FireApi(
            'vendor/videos/upload-file',
            'POST',
            {}, // headers nahi dena, FireApi khud set karega
            formData,
            false
        );

        console.log('📥 Video upload response:', response);
        
        if (response && response.success && response.data) {
            return response.data; // {video_url, public_id, duration, etc.}
        } else {
            throw new Error(response?.message || 'Video upload failed');
        }

    } catch (error) {
        console.error('❌ Error uploading video file:', error);
        Toast.show({
            type: 'error',
            text1: 'Upload Failed',
            text2: error.message || 'Failed to upload video file',
        });
        return null;
    }
};

// Thumbnail ka URL directly create API mein dena hai
// Image pick karo, bas local URI save karo
const pickThumbnail = async (source) => {
    const options = {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        selectionLimit: 1,
        includeBase64: false
    };

    try {
        let response;
        if (source === 'camera') {
            response = await launchCamera(options);
        } else {
            response = await launchImageLibrary(options);
        }

        if (response.didCancel) {
            console.log('User cancelled image picker');
            return null;
        } else if (response.errorCode) {
            console.error('ImagePicker Error: ', response.errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.errorMessage || 'Failed to pick image'
            });
            return null;
        } else if (response.assets && response.assets[0]) {
            const image = response.assets[0];
            console.log('✅ Selected thumbnail:', image);
            return image;
        }
    } catch (error) {
        console.error('Error picking image:', error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to select image'
        });
        return null;
    }
};

const createVideoListing = async (videoData) => {
    try {
        console.log('📤 Creating video listing:', videoData);
        
        const response = await FireApi(
            'vendor/videos/create',
            'POST',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
            videoData,
            false
        );

        console.log('📥 Create listing response:', response);
        
        if (response && response.success) {
            return response;
        } else {
            throw new Error(response?.message || 'Video creation failed');
        }

    } catch (error) {
        console.error('❌ Error creating video listing:', error);
        Toast.show({
            type: 'error',
            text1: 'Creation Failed',
            text2: error.message || 'Failed to create video listing',
        });
        return null;
    }
};

// --- Media Picker Functions ---
const pickVideo = async () => {
    const options = {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 600,
        selectionLimit: 1,
        includeBase64: false
    };

    try {
        const response = await launchImageLibrary(options);

        if (response.didCancel) {
            console.log('User cancelled video picker');
            return null;
        } else if (response.errorCode) {
            console.log('Video picker error:', response.errorMessage);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: response.errorMessage || 'Failed to pick video'
            });
            return null;
        } else if (response.assets && response.assets[0]) {
            const video = response.assets[0];
            console.log('✅ Selected video:', video);
            return video;
        }
    } catch (error) {
        console.error('Error picking video:', error);
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to pick video'
        });
        return null;
    }
};

// --- Content Option Component ---
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

// --- Thumbnail Preview Component ---
const ThumbnailPreview = ({ thumbnail, onRemove }) => {
    if (!thumbnail) return null;

    return (
        <View style={styles.thumbnailPreview}>
            <Image source={{ uri: thumbnail.uri }} style={styles.thumbnailImage} />
            <View style={styles.thumbnailInfo}>
                <Text style={styles.thumbnailName} numberOfLines={1}>
                    {thumbnail.name}
                </Text>
                <Text style={styles.thumbnailSelectedText}>✓ Selected</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
                <Ionicons name="close-circle" size={24} color="#ff4444" />
            </TouchableOpacity>
        </View>
    );
};

// --- VideoContentSection Component ---
const VideoContentSection = ({
    contentSource, setContentSource,
    videoLink, setVideoLink,
    duration,
    hasPublishRights, setHasPublishRights,
    uploadedFile, setUploadedFile,
    uploading, setUploading,
    thumbnail, setThumbnail
}) => {

    const handleVideoFileUpload = async () => {
        if (uploadedFile) {
            // Clear existing file
            setUploadedFile(null);
            return;
        }

        const video = await pickVideo();
        if (!video) return;

        setUploading(true);
        
        // Upload video to server
        const uploadResponse = await uploadVideoFile(video.uri, video.fileName);
        
        setUploading(false);
        
        if (uploadResponse) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Video uploaded successfully!',
            });
            
            setUploadedFile({
                name: video.fileName || 'Selected_Video.mp4',
                uri: video.uri,
                size: video.fileSize,
                duration: video.duration,
                type: video.type,
                serverResponse: uploadResponse // {video_url, public_id, duration, etc.}
            });
        }
    };

    const handleThumbnailSelect = async () => {
        Alert.alert(
            'Select Thumbnail',
            'Choose thumbnail source',
            [
                { text: 'Cancel', style: 'cancel' },
                { 
                    text: 'Gallery', 
                    onPress: async () => {
                        const image = await pickThumbnail('gallery');
                        if (image) {
                            setThumbnail({
                                uri: image.uri,
                                name: image.fileName || 'thumbnail.jpg',
                                type: image.type
                            });
                        }
                    }
                },
                { 
                    text: 'Camera', 
                    onPress: async () => {
                        const image = await pickThumbnail('camera');
                        if (image) {
                            setThumbnail({
                                uri: image.uri,
                                name: image.fileName || 'thumbnail.jpg',
                                type: image.type
                            });
                        }
                    }
                }
            ]
        );
    };

    const removeThumbnail = () => {
        setThumbnail(null);
    };

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
                        active={contentSource === 'upload'}
                        onPress={() => setContentSource('upload')}
                    />
                    <ContentOption
                        iconName="link-outline"
                        title="Paste Link"
                        subtitle="YouTube or Video"
                        active={contentSource === 'link'}
                        onPress={() => setContentSource('link')}
                    />
                </View>

                {/* Conditional Content Input Area */}
                {contentSource === 'upload' && (
                    <TouchableOpacity 
                        style={styles.dragDropArea} 
                        onPress={handleVideoFileUpload}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <View style={styles.uploadProgress}>
                                <ActivityIndicator size="large" color="#51e3fc" />
                                <Text style={[styles.dragDropText, { marginTop: 10 }]}>
                                    Uploading video...
                                </Text>
                            </View>
                        ) : uploadedFile ? (
                            <View style={styles.uploadSuccess}>
                                <Ionicons name="checkmark-circle" size={30} color="#51e3fc" />
                                <Text style={[styles.dragDropText, { fontWeight: 'bold' }]}>
                                    {uploadedFile.name}
                                </Text>
                                {uploadedFile.size && (
                                    <Text style={styles.dragDropSubtitle}>
                                        Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </Text>
                                )}
                                {uploadedFile.duration && (
                                    <Text style={styles.dragDropSubtitle}>
                                        Duration: {Math.floor(uploadedFile.duration / 60)}:{(uploadedFile.duration % 60).toString().padStart(2, '0')}
                                    </Text>
                                )}
                                <Text style={styles.dragDropSubtitle}>
                                    Tap to remove and choose a different file.
                                </Text>
                                {uploadedFile.serverResponse && (
                                    <Text style={[styles.dragDropSubtitle, { color: '#51e3fc' }]}>
                                        ✓ Uploaded to server
                                    </Text>
                                )}
                            </View>
                        ) : (
                            <>
                                <MaterialCommunityIcons name="folder-upload-outline" size={30} color="#7c92a6" />
                                <Text style={styles.dragDropText}>
                                    Tap to select video
                                </Text>
                                <Text style={styles.dragDropSubtitle}>
                                    MP4 or MOV file type up to 500MB
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}

                {contentSource === 'link' && (
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
                    placeholder="Auto detected from video"
                    value={duration}
                    editable={false}
                    optional={true}
                />

                {/* Thumbnail Image Section */}
                <View style={styles.inputFieldContainer}>
                    <Text style={styles.label}>Thumbnail Image*</Text>
                    
                    {/* Thumbnail Preview */}
                    <ThumbnailPreview 
                        thumbnail={thumbnail}
                        onRemove={removeThumbnail}
                    />
                    
                    {/* Upload Thumbnail Button */}
                    {!thumbnail && (
                        <TouchableOpacity 
                            style={styles.thumbnailBtn} 
                            onPress={handleThumbnailSelect}
                        >
                            <Ionicons name="image-outline" size={20} color="white" />
                            <Text style={styles.thumbnailBtnText}>
                                Select Thumbnail Image
                            </Text>
                        </TouchableOpacity>
                    )}
                    
                    <Text style={styles.thumbnailNote}>
                        Recommended: 1280x720px, JPG or PNG, max 5MB
                    </Text>
                    <Text style={styles.thumbnailInfoNote}>
                        Note: Thumbnail URL will be provided in the video creation form
                    </Text>
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
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // --- State for 1. Basic Information ---
    const [videoTitle, setVideoTitle] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [shortDescCount, setShortDescCount] = useState(0);
    const [description, setDescription] = useState('');
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

    // --- State for 2. Content ---
    const [contentSource, setContentSource] = useState('upload');
    const [videoLink, setVideoLink] = useState('');
    const [duration, setDuration] = useState('');
    const [hasPublishRights, setHasPublishRights] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(''); // For user to enter URL

    // --- State for 3. Learning & Reward ---
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

    const toggleCategory = (key) => {
        setCategories(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleBadgeCredit = (key) => {
        setBadgeCredits(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Update duration when video is uploaded
    React.useEffect(() => {
        if (uploadedFile && uploadedFile.duration) {
            setDuration(`${Math.floor(uploadedFile.duration / 60)}:${(uploadedFile.duration % 60).toString().padStart(2, '0')}`);
        }
    }, [uploadedFile]);

    // Prepare data for API submission
    const prepareVideoData = () => {
        const videoData = {
            title: videoTitle,
            short_description: shortDesc,
            description: description || shortDesc,
            // Video URL - agar link hai to use karein, nahi to uploaded file se
            video_url: contentSource === 'link' ? videoLink : (uploadedFile?.serverResponse?.video_url || ''),
            // Thumbnail URL - user se input lena hai
            thumbnail_url: thumbnailUrl.trim() || 'https://example.com/default-thumbnail.jpg', // Default ya user input
            // Public ID - video upload se
            public_id: uploadedFile?.serverResponse?.public_id || '',
            category_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            listing_type: "educational_video",
            tags: keywords.split(',').map(tag => tag.trim()).filter(tag => tag),
            target_audience: audienceLevel,
            learning_objectives: learningObjectives,
            reward_points: parseInt(tokenReward) || 0,
            completion_tracking: completionThreshold ? true : false,
            duration: uploadedFile?.duration ? parseInt(uploadedFile.duration) : 0,
            file_size: uploadedFile?.size || 0,
            format: uploadedFile?.type?.split('/')[1] || 'mp4',
            status: "draft"
        };

        console.log('📋 Prepared video data:', videoData);
        return videoData;
    };

    // Handle Save Draft
    const handleSaveDraft = async () => {
        setLoading(true);
        
        const videoData = prepareVideoData();
        videoData.status = "draft";
        
        const response = await createVideoListing(videoData);
        
        setLoading(false);
        
        if (response) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Video draft saved successfully!',
            });
        }
    };

    // Handle Submit for Review
    const handleSubmitForReview = async () => {
        // Validate required fields
        if (!videoTitle.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Video title is required',
            });
            return;
        }

        if (!shortDesc.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Short description is required',
            });
            return;
        }

        if (contentSource === 'upload' && !uploadedFile) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please upload a video file',
            });
            return;
        }

        if (contentSource === 'link' && !videoLink.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Video link is required',
            });
            return;
        }

        if (!thumbnailUrl.trim() && !thumbnail) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please provide a thumbnail URL or select an image',
            });
            return;
        }

        if (!hasPublishRights) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'You must confirm publishing rights',
            });
            return;
        }

        setLoading(true);
        
        const videoData = prepareVideoData();
        videoData.status = "pending_review";
        
        console.log('🚀 Submitting for review:', videoData);
        
        const response = await createVideoListing(videoData);
        
        setLoading(false);
        
        if (response) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Video submitted for review successfully!',
            });
            
            // Clear form after successful submission
            setVideoTitle('');
            setShortDesc('');
            setDescription('');
            setUploadedFile(null);
            setThumbnail(null);
            setThumbnailUrl('');
            setVideoLink('');
            setHasPublishRights(false);
            
            // Navigate back after delay
            setTimeout(() => {
                navigation.goBack();
            }, 1500);
        }
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
        } else if (label === "Tuition Assistance") {
            navigation.navigate('EducationalVideo');
        } else if (label === "Scholarship") {
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
                <TouchableOpacity 
                    style={styles.saveBtn}
                    onPress={handleSaveDraft}
                    disabled={loading || uploading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <>
                            <AntDesign name='download' size={18} color='white' />
                            <Text style={styles.saveBtnTxt}>Save Draft</Text>
                        </>
                    )}
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress={handleSubmitForReview}
                    disabled={loading || uploading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <>
                            <Ionicons name='send' size={16} color='white' />
                            <Text style={styles.saveBtnTxt}>Submit for Review</Text>
                        </>
                    )}
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

                    {/* 3. Full Description (for API) */}
                    <InputField
                        label="Full Description"
                        placeholder="Detailed description of the video"
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        optional={true}
                    />

                    {/* 4. Category / Subject Checkboxes */}
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

                    {/* 5. Audience Level */}
                    <InputField
                        label="Audience Level"
                        placeholder="Beginner, Intermediate, Advanced"
                        value={audienceLevel}
                        onChangeText={setAudienceLevel}
                    />

                    {/* 6. Language */}
                    <InputField
                        label="Language"
                        placeholder="English"
                        value={language}
                        onChangeText={setLanguage}
                    />

                    {/* 8. Captions Provided Checkbox */}
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
                    contentSource={contentSource}
                    setContentSource={setContentSource}
                    videoLink={videoLink}
                    setVideoLink={setVideoLink}
                    duration={duration || 'Auto detected from video'}
                    hasPublishRights={hasPublishRights}
                    setHasPublishRights={setHasPublishRights}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    uploading={uploading}
                    setUploading={setUploading}
                    thumbnail={thumbnail}
                    setThumbnail={setThumbnail}
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
                        multiline
                    />

                    {/* Keywords / Tags */}
                    <InputField
                        label="Keywords / Tags (comma separated)"
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

                    {/* Completion Threshold */}
                    <InputField
                        label="Completion Threshold (%)"
                        placeholder="80"
                        value={completionThreshold}
                        onChangeText={setCompletionThreshold}
                        keyboardType='numeric'
                    />

                    {/* Thumbnail URL Input */}
                    <InputField
                        label="Thumbnail URL*"
                        placeholder="https://example.com/thumbnail.jpg"
                        value={thumbnailUrl}
                        onChangeText={setThumbnailUrl}
                        optional={false}
                    />

                    <Text style={styles.urlNote}>
                        Provide a direct URL to your thumbnail image (JPG, PNG)
                    </Text>

                    {/* Badge Credit Checkboxes */}
                    <Text style={[styles.label, { marginTop: 15 }]}>Badge Credit (Optional)</Text>
                    <View style={styles.checkboxGroup}>
                        {Object.keys(badgeCredits).map((key) => (
                            <View key={key} style={styles.checkboxItem}>
                                <Checkbox
                                    status={badgeCredits[key] ? "checked" : "unchecked"}
                                    onPress={() => toggleBadgeCredit(key)}
                                    color="#4ac3fc"
                                    uncheckedColor="#51e3fc"
                                />
                                <Text style={styles.checkboxLabel}>{key}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- Action Buttons --- */}
                <TouchableOpacity 
                    style={styles.blueBtn}
                    onPress={() => navigation.goBack()}
                    disabled={loading || uploading}
                >
                    <Text style={styles.blueBtnTxt}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.borderBtn}
                    onPress={handleSubmitForReview}
                    disabled={loading || uploading}
                >
                    {loading ? (
                        <ActivityIndicator color="#51e3fc" />
                    ) : (
                        <Text style={styles.borderBtnTxt}>Publish</Text>
                    )}
                </TouchableOpacity>

                <View style={{ height: 50 }} /> {/* Spacer for scrolling */}

            </ScrollView>
        </View>
    );
};


// --- STYLESHEET ---
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
        marginTop: 20,
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
        alignItems: 'center',
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
        alignItems: 'center',
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

    // --- Form Styles ---
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
    urlNote: {
        color: '#7c92a6',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 5,
        fontStyle: 'italic',
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
        width: '50%',
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

    // --- Video Content Section ---
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
    uploadProgress: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadSuccess: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    // Thumbnail Styles
    thumbnailBtn: {
        backgroundColor: '#0d2f48',
        marginHorizontal: 10,
        padding: 12,
        borderRadius: 10,
        minHeight: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 10,
    },
    thumbnailBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    thumbnailNote: {
        color: '#7c92a6',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 5,
        fontStyle: 'italic',
    },
    thumbnailInfoNote: {
        color: '#51e3fc',
        fontSize: 12,
        marginLeft: 15,
        marginTop: 5,
    },
    thumbnailPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0d2f48',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    thumbnailImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    thumbnailInfo: {
        flex: 1,
    },
    thumbnailName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    thumbnailSelectedText: {
        color: '#51e3fc',
        fontSize: 12,
        marginTop: 4,
    },
    removeButton: {
        padding: 5,
    },
    uploadingText: {
        color: '#51e3fc',
        fontSize: 12,
        marginTop: 10,
    },
});

export default EducationalVideo;
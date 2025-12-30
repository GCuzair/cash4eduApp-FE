import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FireApi } from '../../utils/FireApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateListingScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [draftLoading, setDraftLoading] = useState(false);
    const [vendorInfo, setVendorInfo] = useState(null);
    
    // Form States
    const [formData, setFormData] = useState({
        listing_title: '',
        organization_name: '',
        full_description: '',
        category: '',
        tags: '',
        banner_image_url: '',
        banner_public_id: '',
        award_amount: '',
        number_of_awards: '',
        eligibility_criteria: {},
        required_documents: '',
        deadline: '',
        renewal_status: '',
        application_process: '',
        reward_process: '',
        is_draft: false
    });

    // Eligibility criteria states
    const [eligibility, setEligibility] = useState({
        min_gpa: '',
        education_level: '',
        nationality: '',
        gender: '',
        field_of_study: '',
        age_limit: '',
        income_limit: '',
        disabilities: false,
        first_generation: false,
        minority_groups: false
    });

    // Modal States
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);
    const [showRenewalModal, setShowRenewalModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    
    // Categories Options
    const categories = [
        'STEM Scholarships',
        'Merit-Based Scholarships',
        'Need-Based Scholarships',
        'Minority Scholarships',
        'Women Scholarships',
        'International Scholarships',
        'Graduate Scholarships',
        'Undergraduate Scholarships',
        'Sports Scholarships',
        'Arts Scholarships'
    ];

    // Document Options
    const documentOptions = [
        'Academic Transcripts',
        'Letter of Recommendation',
        'Personal Statement',
        'Proof of Income',
        'Resume/CV',
        'Portfolio',
        'Proof of Identity',
        'Proof of Enrollment',
        'Essay',
        'Proof of Community Service'
    ];

    // Renewal Options
    const renewalOptions = ['Annual', 'One-Time', 'Renewable', 'Non-Renewable'];

    // Load vendor data
    useEffect(() => {
        loadVendorData();
    }, []);

    const loadVendorData = async () => {
        try {
            const userData = await AsyncStorage.getItem('@user_data');
            if (userData) {
                const parsedData = JSON.parse(userData);
                setVendorInfo(parsedData);
                // Set initial organization name from vendor info
                setFormData(prev => ({
                    ...prev,
                    organization_name: parsedData.organization_name || parsedData.full_name || ''
                }));
            }
        } catch (error) {
            console.error('Error loading vendor data:', error);
        }
    };

    // Handle Input Changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle Eligibility Criteria Changes
    const handleEligibilityChange = (field, value) => {
        setEligibility(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle Document Selection
    const handleDocumentSelect = (doc) => {
        if (selectedDocuments.includes(doc)) {
            setSelectedDocuments(prev => prev.filter(d => d !== doc));
        } else {
            setSelectedDocuments(prev => [...prev, doc]);
        }
    };

    // Image Picker
    const handleImagePick = () => {
        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Camera', onPress: () => pickImage('camera') },
                { text: 'Gallery', onPress: () => pickImage('gallery') }
            ]
        );
    };

    const pickImage = async (source) => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 1024,
            maxHeight: 1024,
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
            } else if (response.error) {
                console.error('ImagePicker Error: ', response.error);
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to pick image'
                });
            } else if (response.assets && response.assets[0]) {
                const image = response.assets[0];
                console.log('image',image.uri)
                setFormData(prev => ({
                    ...prev,
                    banner_image_url: image.uri,
                    banner_public_id: `scholarship_${Date.now()}`
                }));
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Image selected successfully'
                });
            }
        } catch (error) {
            console.error('Error picking image:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to select image'
            });
        }
    };

    // Date Picker
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setSelectedDate(selectedDate);
            setFormData(prev => ({
                ...prev,
                deadline: selectedDate.toISOString()
            }));
        }
    };

    // Validation
    const validateForm = (isDraft = false) => {
        if (!isDraft) {
            const requiredFields = [
                'listing_title',
                'full_description',
                'category',
                'award_amount',
                'deadline'
            ];

            for (const field of requiredFields) {
                if (!formData[field] || formData[field].toString().trim() === '') {
                    Toast.show({
                        type: 'error',
                        text1: 'Validation Error',
                        text2: `Please fill in ${field.replace('_', ' ')}`
                    });
                    return false;
                }
            }
        }
        
        // For draft, at least title should be there
        if (isDraft && !formData.listing_title.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'At least listing title is required for draft'
            });
            return false;
        }
        
        return true;
    };

    // Prepare Payload - FIXED VERSION
    const preparePayload = (isDraft) => {
        // Prepare eligibility criteria object (only non-empty fields)
        const eligibilityCriteria = {};
        
        // Add only non-empty eligibility fields
        Object.keys(eligibility).forEach(key => {
            const value = eligibility[key];
            if (value !== '' && value !== false && value !== null && value !== undefined) {
                // Convert string numbers to actual numbers
                if (key === 'min_gpa' || key === 'income_limit') {
                    eligibilityCriteria[key] = parseFloat(value) || value;
                } else if (key === 'age_limit') {
                    eligibilityCriteria[key] = parseInt(value) || value;
                } else {
                    eligibilityCriteria[key] = value;
                }
            }
        });

        // Prepare tags array
        const tagsArray = formData.tags 
            ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            : [];

        // Prepare payload - DON'T DELETE EMPTY FIELDS FOR DRAFT
        const payload = {
            listing_title: formData.listing_title.trim(),
            organization_name: formData.organization_name.trim(),
            full_description: formData.full_description.trim(),
            category: formData.category.trim(),
            tags: tagsArray,
            banner_image_url: formData.banner_image_url || '',
            banner_public_id: formData.banner_public_id || '',
            award_amount: formData.award_amount.toString(),
            number_of_awards: parseInt(formData.number_of_awards) || (isDraft ? 0 : 1),
            eligibility_criteria: Object.keys(eligibilityCriteria).length > 0 ? eligibilityCriteria : {},
            required_documents: selectedDocuments,
            deadline: formData.deadline || (isDraft ? null : new Date().toISOString()),
            renewal_status: formData.renewal_status || '',
            application_process: formData.application_process?.trim() || '',
            reward_process: formData.reward_process?.trim() || '',
            is_draft: isDraft
        };

        // For non-draft submissions, ensure required fields are present
        if (!isDraft) {
            // Ensure all required fields are present
            if (!payload.listing_title) payload.listing_title = '';
            if (!payload.full_description) payload.full_description = '';
            if (!payload.category) payload.category = '';
            if (!payload.award_amount) payload.award_amount = '0';
            if (!payload.deadline) payload.deadline = new Date().toISOString();
        }

        return payload;
    };

    // Submit Form
    const handleSubmit = async (isDraft = false) => {
        console.log('handleSubmit run start')
        Keyboard.dismiss();
        
        if (!validateForm(isDraft)) {
            return;
        }

        if (isDraft) {
            setDraftLoading(true);
        } else {
            setLoading(true);
        }

        try {
            const payload = preparePayload(isDraft);
            
            console.log('Submitting payload:', JSON.stringify(payload, null, 2));
            
            const response = await FireApi('vendor/scholarships', 'POST', {}, payload);
            
            console.log('API Response:', response);
            
            if (response && response.success) {
                Toast.show({
                    type: 'success',
                    text1: isDraft ? 'Draft Saved' : 'Success',
                    text2: response.message || (isDraft ? 'Scholarship saved as draft' : 'Scholarship created successfully')
                });
                
                // Reset form
                setFormData({
                    listing_title: '',
                    organization_name: vendorInfo?.organization_name || vendorInfo?.full_name || '',
                    full_description: '',
                    category: '',
                    tags: '',
                    banner_image_url: '',
                    banner_public_id: '',
                    award_amount: '',
                    number_of_awards: '',
                    eligibility_criteria: {},
                    required_documents: '',
                    deadline: '',
                    renewal_status: '',
                    application_process: '',
                    reward_process: '',
                    is_draft: false
                });
                setEligibility({
                    min_gpa: '',
                    education_level: '',
                    nationality: '',
                    gender: '',
                    field_of_study: '',
                    age_limit: '',
                    income_limit: '',
                    disabilities: false,
                    first_generation: false,
                    minority_groups: false
                });
                setSelectedDocuments([]);
                setSelectedDate(new Date());
                
                if (!isDraft) {
                    navigation.navigate('ScholarshipListing');
                } else {
                    navigation.goBack();
                }
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: response?.message || 'Failed to create scholarship'
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'Network error. Please try again.'
            });
        } finally {
            setLoading(false);
            setDraftLoading(false);
        }
    };

    // Render Modals
    const renderCategoryModal = () => (
        <Modal
            transparent
            visible={showCategoryModal}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={() => setShowCategoryModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Category</Text>
                        <ScrollView style={styles.modalScroll}>
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalOption}
                                    onPress={() => {
                                        handleInputChange('category', category);
                                        setShowCategoryModal(false);
                                    }}
                                >
                                    <Text style={styles.modalOptionText}>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderDocumentsModal = () => (
        <Modal
            transparent
            visible={showDocumentsModal}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={() => setShowDocumentsModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Required Documents</Text>
                        <ScrollView style={styles.modalScroll}>
                            {documentOptions.map((doc, index) => {
                                const isSelected = selectedDocuments.includes(doc);
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.modalOption,
                                            isSelected && styles.selectedOption
                                        ]}
                                        onPress={() => handleDocumentSelect(doc)}
                                    >
                                        <Text style={[
                                            styles.modalOptionText,
                                            isSelected && styles.selectedOptionText
                                        ]}>
                                            {doc}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={20} color="#51e3fc" />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.modalDoneButton}
                            onPress={() => setShowDocumentsModal(false)}
                        >
                            <Text style={styles.modalDoneButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    const renderRenewalModal = () => (
        <Modal
            transparent
            visible={showRenewalModal}
            animationType="slide"
        >
            <TouchableWithoutFeedback onPress={() => setShowRenewalModal(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Renewal Status</Text>
                        <ScrollView style={styles.modalScroll}>
                            {renewalOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.modalOption}
                                    onPress={() => {
                                        handleInputChange('renewal_status', option);
                                        setShowRenewalModal(false);
                                    }}
                                >
                                    <Text style={styles.modalOptionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Header */}
                <VendorHeader
                    title="Create Scholarship"
                    subtitle="Create and publish scholarship opportunities"
                    onBackPress={() => navigation.goBack()}
                    onSettingsPress={() => navigation.navigate("Setting")}
                />

                <ScrollView 
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    <View style={styles.formContainer}>
                        <Text style={styles.heading}>Basic Information</Text>

                        {/* Listing Title */}
                        <Text style={styles.label}>Listing Title*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. STEM Women Techmaker's"
                            placeholderTextColor="#8A8A8A"
                            value={formData.listing_title}
                            onChangeText={(text) => handleInputChange('listing_title', text)}
                        />

                        {/* Organization - NOW EDITABLE */}
                        <Text style={styles.label}>Organization Name*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your organization name"
                            placeholderTextColor="#8A8A8A"
                            value={formData.organization_name}
                            onChangeText={(text) => handleInputChange('organization_name', text)}
                        />

                        {/* Full Description */}
                        <Text style={styles.label}>Full Description*</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Provide detailed description of the scholarship..."
                            placeholderTextColor="#8A8A8A"
                            value={formData.full_description}
                            onChangeText={(text) => handleInputChange('full_description', text)}
                            multiline
                            numberOfLines={4}
                        />

                        {/* Category */}
                        <Text style={styles.label}>Category*</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowCategoryModal(true)}
                        >
                            <Text style={formData.category ? styles.inputText : styles.placeholderText}>
                                {formData.category || 'Select category'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#51e3fc" style={styles.dropdownIcon} />
                        </TouchableOpacity>

                        {/* Tags */}
                        <Text style={styles.label}>Tags (comma separated)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., STEM, Women, Technology"
                            placeholderTextColor="#8A8A8A"
                            value={formData.tags}
                            onChangeText={(text) => handleInputChange('tags', text)}
                        />

                        {/* Upload Banner Image */}
                        <Text style={styles.label}>Upload Banner Image</Text>
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={handleImagePick}
                        >
                            {formData.banner_image_url ? (
                                <Image
                                    source={{ uri: formData.banner_image_url }}
                                    style={styles.previewImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <>
                                    <Ionicons name='cloud-upload-outline' size={40} color="#51e3fc" />
                                    <View style={styles.uploadTextContainer}>
                                        <Text style={styles.uploadText}>Tap to upload image</Text>
                                        <Text style={styles.uploadSubText}>PNG, JPG up to 5MB</Text>
                                    </View>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Scholarship Details */}
                        <Text style={[styles.heading, { marginTop: 30 }]}>Scholarship Details</Text>

                        {/* Award Amount */}
                        <Text style={styles.label}>Award Amount*</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. $5,000"
                            placeholderTextColor="#8A8A8A"
                            value={formData.award_amount}
                            onChangeText={(text) => handleInputChange('award_amount', text)}
                            keyboardType="numeric"
                        />

                        {/* Number of Awards */}
                        <Text style={styles.label}>Number of Awards</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 10"
                            placeholderTextColor="#8A8A8A"
                            value={formData.number_of_awards}
                            onChangeText={(text) => handleInputChange('number_of_awards', text)}
                            keyboardType="numeric"
                        />

                        {/* Eligibility Criteria */}
                        <Text style={[styles.label, { marginTop: 15 }]}>Eligibility Criteria (Optional)</Text>
                        
                        <View style={styles.gridContainer}>
                            <View style={styles.gridColumn}>
                                <Text style={styles.subLabel}>Min GPA</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="3.0"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.min_gpa}
                                    onChangeText={(text) => handleEligibilityChange('min_gpa', text)}
                                    keyboardType="decimal-pad"
                                />

                                <Text style={styles.subLabel}>Education Level</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Undergraduate"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.education_level}
                                    onChangeText={(text) => handleEligibilityChange('education_level', text)}
                                />
                            </View>

                            <View style={styles.gridColumn}>
                                <Text style={styles.subLabel}>Nationality</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Any"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.nationality}
                                    onChangeText={(text) => handleEligibilityChange('nationality', text)}
                                />

                                <Text style={styles.subLabel}>Field of Study</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Computer Science"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.field_of_study}
                                    onChangeText={(text) => handleEligibilityChange('field_of_study', text)}
                                />
                            </View>
                        </View>

                        {/* More Eligibility Fields */}
                        <View style={styles.gridContainer}>
                            <View style={styles.gridColumn}>
                                <Text style={styles.subLabel}>Age Limit</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="25"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.age_limit}
                                    onChangeText={(text) => handleEligibilityChange('age_limit', text)}
                                    keyboardType="numeric"
                                />

                                <Text style={styles.subLabel}>Gender</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="Any"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.gender}
                                    onChangeText={(text) => handleEligibilityChange('gender', text)}
                                />
                            </View>

                            <View style={styles.gridColumn}>
                                <Text style={styles.subLabel}>Income Limit</Text>
                                <TextInput
                                    style={styles.smallInput}
                                    placeholder="$50,000"
                                    placeholderTextColor="#8A8A8A"
                                    value={eligibility.income_limit}
                                    onChangeText={(text) => handleEligibilityChange('income_limit', text)}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>

                        {/* Required Documents */}
                        <Text style={styles.label}>Required Documents</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDocumentsModal(true)}
                        >
                            <Text style={selectedDocuments.length > 0 ? styles.inputText : styles.placeholderText}>
                                {selectedDocuments.length > 0 ? selectedDocuments.join(', ') : 'Select documents'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#51e3fc" style={styles.dropdownIcon} />
                        </TouchableOpacity>

                        {/* Deadline */}
                        <Text style={styles.label}>Deadline*</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={formData.deadline ? styles.inputText : styles.placeholderText}>
                                {formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'Select deadline'}
                            </Text>
                            <Ionicons name="calendar-outline" size={20} color="#51e3fc" />
                        </TouchableOpacity>

                        {/* Renewal Status */}
                        <Text style={styles.label}>Renewal Status</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => setShowRenewalModal(true)}
                        >
                            <Text style={formData.renewal_status ? styles.inputText : styles.placeholderText}>
                                {formData.renewal_status || 'Select renewal status'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#51e3fc" style={styles.dropdownIcon} />
                        </TouchableOpacity>

                        {/* Application Process */}
                        <Text style={styles.label}>Application Process</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe the application process..."
                            placeholderTextColor="#8A8A8A"
                            value={formData.application_process}
                            onChangeText={(text) => handleInputChange('application_process', text)}
                            multiline
                            numberOfLines={3}
                        />

                        {/* Reward Process */}
                        <Text style={styles.label}>Reward Process</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe how the award will be distributed..."
                            placeholderTextColor="#8A8A8A"
                            value={formData.reward_process}
                            onChangeText={(text) => handleInputChange('reward_process', text)}
                            multiline
                            numberOfLines={3}
                        />

                        {/* Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.publishButton}
                                onPress={() => handleSubmit(false)}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.publishButtonText}>
                                        Publish Scholarship
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.draftButton}
                                onPress={() => handleSubmit(true)}
                                disabled={draftLoading}
                            >
                                {draftLoading ? (
                                    <ActivityIndicator color="#51e3fc" />
                                ) : (
                                    <Text style={styles.draftButtonText}>
                                        Save as Draft
                                    </Text>
                                )}
                            </TouchableOpacity>
                             <TouchableOpacity
                                style={styles.new}
                                onPress={() => navigation.navigate('ScholarshipListing')}
                                disabled={draftLoading}
                            >
                                {draftLoading ? (
                                    <ActivityIndicator color="#51e3fc" />
                                ) : (
                                    <Text style={styles.draftButtonText}>
                                        Don't want to publish
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Modals */}
                {renderCategoryModal()}
                {renderDocumentsModal()}
                {renderRenewalModal()}

                {/* Date Picker */}
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onDateChange}
                        minimumDate={new Date()}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
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
    formContainer: {
        backgroundColor: "#021e38",
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    heading: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 20,
    },
    label: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 5,
    },
    subLabel: {
        color: "#8A8A8A",
        fontSize: 12,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#1c384e",
        borderRadius: 8,
        padding: 12,
        color: "#fff",
        fontSize: 14,
    },
    inputText: {
        color: '#fff',
        fontSize: 14,
    },
    placeholderText: {
        color: '#8A8A8A',
        fontSize: 14,
    },
    disabledInput: {
        opacity: 0.7,
        backgroundColor: '#0a2b42',
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
    uploadBox: {
        borderWidth: 2,
        borderColor: "#51e3fc",
        borderStyle: "dashed",
        backgroundColor: "#0a2b42",
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        height: 150,
    },
    uploadTextContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    uploadText: {
        color: "#51e3fc",
        fontSize: 14,
        fontWeight: '600',
    },
    uploadSubText: {
        color: "#8A8A8A",
        fontSize: 12,
        marginTop: 5,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    dropdownIcon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    gridContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    gridColumn: {
        width: '48%',
    },
    smallInput: {
        backgroundColor: "#1c384e",
        borderRadius: 8,
        padding: 10,
        color: "#fff",
        fontSize: 12,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 30,
        marginBottom: 20,
    },
    publishButton: {
        backgroundColor: '#51e3fc',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    publishButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    draftButton: {
        borderWidth: 2,
        borderColor: '#51e3fc',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    new: {
        borderWidth: 2,
        borderColor: '#51e3fc',
        marginTop: 15,
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    draftButtonText: {
        color: '#51e3fc',
        fontSize: 16,
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#021e38',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '60%',
        paddingBottom: Platform.OS === 'ios' ? 30 : 20,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        padding: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1c384e',
    },
    modalScroll: {
        maxHeight: 300,
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#1c384e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalOptionText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedOption: {
        backgroundColor: '#0a2b42',
    },
    selectedOptionText: {
        color: '#51e3fc',
        fontWeight: '600',
    },
    modalDoneButton: {
        backgroundColor: '#51e3fc',
        margin: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalDoneButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CreateListingScreen;
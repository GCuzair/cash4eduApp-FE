import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Switch, 
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Platform 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import VendorHeader from '../../components/VendorHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Checkbox } from 'react-native-paper';
import { FireApi } from '../../utils/FireApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const PerkListing = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { perkId } = route.params || {}; // For editing existing perk
  
  const [selected, setSelected] = useState("Student Perk");
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPerkTypeModal, setShowPerkTypeModal] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [vendorInfo, setVendorInfo] = useState(null);

  // Perk Type Options
  const perkTypes = [
    'Discount',
    'Cashback',
    'Free Trial',
    'Exclusive Access',
    'Early Bird Offer',
    'Bundle Deal',
    'Referral Bonus'
  ];

  // Redemption Method Options
  const redemptionMethods = [
    'Online Code',
    'In-Store',
    'Mobile App',
    'Partner Website',
    'Student ID Required',
    'Email Verification',
    'Phone Verification'
  ];

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    perk_title: '',
    partner_organization: '',
    short_description: '',
    full_description: '',
    category_type: [],
    is_featured: false,
    banner_image_url: '',
    banner_public_id: '',
    perk_type: '',
    redemption_method: '',
    discount_or_benefit_value: '',
    partner_link_or_code: '',
    start_date: '',
    end_date: '',
    usage_limitations: '',
    eligibility_criteria: [],
    location_availability: '',
    latitude: 0,
    longitude: 0,
    require_student_verification: true,
    is_draft: false
  });

  const [shortDescCount, setShortDescCount] = useState(0);

  // Categories
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

  // Eligibility Criteria
  const [eligibility, setEligibility] = useState({
    verifiedStudent: false,
    schoolEmailRequired: false,
    allUsers: false
  });

  // Navigation types
  const types = [
    { label: "Scholarship", icon: "school-outline" },
    { label: "Student Perk", icon: "gift-outline" },
    { label: "Tuition Assistance", icon: "cash-outline" },
    { label: "Educational Video", icon: "videocam-outline" },
  ];

  // Load initial data
  useEffect(() => {
    loadInitialData();
    if (perkId) {
      fetchPerkData();
    }
  }, [perkId]);

  const loadInitialData = async () => {
    try {
      // Load vendor info
      const userData = await AsyncStorage.getItem('@user_data');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setVendorInfo(parsedData);
        setFormData(prev => ({
          ...prev,
          partner_organization: parsedData.organization_name || parsedData.full_name || ''
        }));
      }

      // Load location options
      const locationRes = await FireApi('vendor/perks/location-options', 'GET');
      if (locationRes && locationRes.success) {
        setLocationOptions(locationRes.data.location_options || []);
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const fetchPerkData = async () => {
    try {
      setLoading(true);
      const response = await FireApi(`vendor/perks/${perkId}`, 'GET');
      
      if (response && response.success && response.data) {
        const data = response.data;
        
        // Update form data
        setFormData(prev => ({
          ...prev,
          perk_title: data.perk_title || '',
          partner_organization: data.partner_organization || '',
          short_description: data.short_description || '',
          full_description: data.full_description || '',
          category_type: data.category_type || [],
          is_featured: data.is_featured || false,
          banner_image_url: data.banner_image_url || '',
          banner_public_id: data.banner_public_id || '',
          perk_type: data.perk_type || '',
          redemption_method: data.redemption_method || '',
          discount_or_benefit_value: data.discount_or_benefit_value || '',
          partner_link_or_code: data.partner_link_or_code || '',
          start_date: data.start_date || '',
          end_date: data.end_date || '',
          usage_limitations: data.usage_limitations || '',
          eligibility_criteria: data.eligibility_criteria || [],
          location_availability: data.location_availability || '',
          require_student_verification: data.require_student_verification ?? true,
          is_draft: data.is_draft || false
        }));

        // Update categories
        if (data.category_type && Array.isArray(data.category_type)) {
          const newCategories = { ...categories };
          data.category_type.forEach(cat => {
            if (categoriesList.includes(cat)) {
              newCategories[cat] = true;
            }
          });
          setCategories(newCategories);
        }

        // Update eligibility
        if (data.eligibility_criteria && Array.isArray(data.eligibility_criteria)) {
          const newEligibility = { ...eligibility };
          data.eligibility_criteria.forEach(crit => {
            if (crit.includes('Verified Student')) newEligibility.verifiedStudent = true;
            if (crit.includes('School Email')) newEligibility.schoolEmailRequired = true;
            if (crit.includes('All Users')) newEligibility.allUsers = true;
          });
          setEligibility(newEligibility);
        }

        // Set dates
        if (data.start_date) {
          setStartDate(new Date(data.start_date));
        }
        if (data.end_date) {
          setEndDate(new Date(data.end_date));
        }

        setShortDescCount(data.short_description?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching perk:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load perk data'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update character count for short description
    if (field === 'short_description') {
      setShortDescCount(value.length);
    }
  };

  // Toggle categories
  const toggleCategory = (item) => {
    const newCategories = { ...categories, [item]: !categories[item] };
    setCategories(newCategories);
    
    // Update formData category_type
    const selectedCategories = Object.keys(newCategories).filter(key => newCategories[key]);
    setFormData(prev => ({
      ...prev,
      category_type: selectedCategories
    }));
  };

  // Toggle eligibility
  const toggleEligibility = (key) => {
    const newEligibility = { ...eligibility, [key]: !eligibility[key] };
    setEligibility(newEligibility);
    
    // Update formData eligibility_criteria
    const selectedEligibility = [];
    if (newEligibility.verifiedStudent) selectedEligibility.push('Verified Student');
    if (newEligibility.schoolEmailRequired) selectedEligibility.push('School Email Required');
    if (newEligibility.allUsers) selectedEligibility.push('All Users');
    
    setFormData(prev => ({
      ...prev,
      eligibility_criteria: selectedEligibility
    }));
  };

  // Handle type selection
  const handleTypeSelection = (label) => {
    setSelected(label);
    if (label === "Scholarship") {
      navigation.navigate('ScholarshipListing');
    } else if (label === "Tuition Assistance") {
      navigation.navigate('TuitionAssistanceVendor');
    } else if (label === "Educational Video") {
      navigation.navigate('EducationalVideo');
    }
  };

  // Image Picker
  const handleImagePick = () => {
    Alert.alert(
      'Select Banner Image',
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
        setFormData(prev => ({
          ...prev,
          banner_image_url: image.uri,
          banner_public_id: `perk_${Date.now()}`
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

  // Date Pickers
  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
      setFormData(prev => ({
        ...prev,
        start_date: selectedDate.toISOString()
      }));
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
      setFormData(prev => ({
        ...prev,
        end_date: selectedDate.toISOString()
      }));
    }
  };

  // Validation
  const validateForm = (isDraft = false) => {
    if (!isDraft) {
      const requiredFields = [
        'perk_title',
        'short_description',
        'perk_type',
        'redemption_method',
        'discount_or_benefit_value',
        'start_date',
        'end_date',
        'location_availability'
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

      // Check if at least one category is selected
      if (formData.category_type.length === 0) {
        Toast.show({
          type: 'error',
          text1: 'Validation Error',
          text2: 'Please select at least one category'
        });
        return false;
      }
    }

    // For draft, at least title should be there
    if (isDraft && !formData.perk_title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'At least perk title is required for draft'
      });
      return false;
    }

    return true;
  };

  // Prepare Payload
  const preparePayload = (isDraft) => {
    const payload = {
      ...formData,
      is_draft: isDraft,
      // Ensure arrays are properly formatted
      category_type: formData.category_type,
      eligibility_criteria: formData.eligibility_criteria,
      // Convert dates to ISO string
      start_date: formData.start_date || startDate.toISOString(),
      end_date: formData.end_date || endDate.toISOString()
    };

    // Remove empty strings
    Object.keys(payload).forEach(key => {
      if (payload[key] === '' || payload[key] === null || payload[key] === undefined) {
        delete payload[key];
      }
    });

    return payload;
  };

  // Submit Form
  const handleSubmit = async (isDraft = false) => {
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
      
      let response;
      if (perkId) {
        // Update existing perk
        response = await FireApi(`vendor/perks/${perkId}`, 'PUT', {}, payload);
      } else {
        // Create new perk
        response = await FireApi('vendor/perks', 'POST', {}, payload);
      }
      
      if (response && response.success) {
        Toast.show({
          type: 'success',
          text1: isDraft ? 'Draft Saved' : perkId ? 'Perk Updated' : 'Success',
          text2: response.message || (isDraft ? 'Perk saved as draft' : 'Perk created successfully')
        });
        
        // Reset form if not editing
        if (!perkId) {
          resetForm();
        }
        
        if (!isDraft && !perkId) {
          navigation.goBack();
        } else if (perkId) {
          navigation.goBack();
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to save perk'
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

  // Reset form
  const resetForm = () => {
    setFormData({
      perk_title: '',
      partner_organization: vendorInfo?.organization_name || '',
      short_description: '',
      full_description: '',
      category_type: [],
      is_featured: false,
      banner_image_url: '',
      banner_public_id: '',
      perk_type: '',
      redemption_method: '',
      discount_or_benefit_value: '',
      partner_link_or_code: '',
      start_date: '',
      end_date: '',
      usage_limitations: '',
      eligibility_criteria: [],
      location_availability: '',
      latitude: 0,
      longitude: 0,
      require_student_verification: true,
      is_draft: false
    });
    setCategories({
      Food: false,
      Tech: false,
      Wellness: false,
      "Educational Tool": false,
      Portfolio: false,
      Entertainment: false
    });
    setEligibility({
      verifiedStudent: false,
      schoolEmailRequired: false,
      allUsers: false
    });
    setShortDescCount(0);
    setStartDate(new Date());
    setEndDate(new Date());
  };

  // Modal Components
  const renderLocationModal = () => (
    <Modal
      transparent
      visible={showLocationModal}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setShowLocationModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <ScrollView style={styles.modalScroll}>
              {locationOptions.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    handleInputChange('location_availability', location);
                    setShowLocationModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{location}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const renderPerkTypeModal = () => (
    <Modal
      transparent
      visible={showPerkTypeModal}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setShowPerkTypeModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Perk Type</Text>
            <ScrollView style={styles.modalScroll}>
              {perkTypes.map((type, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    handleInputChange('perk_type', type);
                    setShowPerkTypeModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  const renderRedemptionModal = () => (
    <Modal
      transparent
      visible={showRedemptionModal}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={() => setShowRedemptionModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Redemption Method</Text>
            <ScrollView style={styles.modalScroll}>
              {redemptionMethods.map((method, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => {
                    handleInputChange('redemption_method', method);
                    setShowRedemptionModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{method}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  // Loading State
  if (loading && perkId) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading perk data...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <VendorHeader
          title={perkId ? "Edit Perk Listing" : "Create Student Perk Listing"}
          subtitle="Offer verified students discounts, benefits, or opportunities"
          onBackPress={() => navigation.goBack()}
          onSettingsPress={() => navigation.navigate("Setting")}
        />

        {/* TOP BUTTONS */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.saveBtn}
            onPress={() => handleSubmit(true)}
            disabled={draftLoading}
          >
            {draftLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <AntDesign name='download' size={18} color='white' />
                <Text style={styles.saveBtnTxt}>Save Draft</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.submitBtn}
            onPress={() => handleSubmit(false)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name='send' size={16} color='white' />
                <Text style={styles.saveBtnTxt}>
                  {perkId ? 'Update Perk' : 'Submit for Review'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {/* SELECT LISTING TYPE */}
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
                    <Text style={[
                      styles.typeText,
                      active ? styles.activeTypeText : styles.inactiveTypeText
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* BASIC INFORMATION */}
          <View style={styles.basicInfoCont}>
            <Text style={styles.basicTitle}>Basic Information</Text>
            
            {/* Perk Title */}
            <Text style={styles.label}>
              Perk Title*
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 25% Off Tech Accessories"
              placeholderTextColor="#7c92a6"
              value={formData.perk_title}
              onChangeText={(text) => handleInputChange('perk_title', text)}
            />

            {/* Partner Organization */}
            <Text style={styles.label}>
              Partner Organization
            </Text>
            <TextInput
              style={styles.input}
              placeholder="TechZone Electronics"
              placeholderTextColor="#7c92a6"
              value={formData.partner_organization}
              onChangeText={(text) => handleInputChange('partner_organization', text)}
            />

            {/* Short Description */}
            <Text style={styles.label}>
              Short Description*
            </Text>
            <TextInput
              style={[styles.input, { height: 90, textAlignVertical: "top" }]}
              placeholder="One-line description students see on app cards (220 characters)"
              placeholderTextColor="#7c92a6"
              multiline
              maxLength={220}
              value={formData.short_description}
              onChangeText={(text) => handleInputChange('short_description', text)}
            />
            <Text style={styles.charCount}>{shortDescCount} / 220 characters</Text>

            {/* Full Description */}
            <Text style={styles.label}>
              Full Description
            </Text>
            <TextInput
              style={[styles.input, { height: 140, textAlignVertical: "top" }]}
              placeholder="Full description of the perk..."
              placeholderTextColor="#7c92a6"
              multiline
              value={formData.full_description}
              onChangeText={(text) => handleInputChange('full_description', text)}
            />

            {/* Category Type */}
            <Text style={[styles.label, { marginTop: 25 }]}>
              Category Type*
            </Text>
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

            {/* Featured Perk */}
            <LinearGradient
              colors={['#03a2d5', '#000000ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.featureGradient}
            >
              <Checkbox
                status={formData.is_featured ? "checked" : "unchecked"}
                onPress={() => handleInputChange('is_featured', !formData.is_featured)}
                color="#51e3fc"
                uncheckedColor="#e0e0e0"
              />
              <Text style={styles.featureText}>Mark as Featured Perk</Text>
            </LinearGradient>

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
          </View>

          {/* PERK DETAILS */}
          <View style={styles.basicInfoCont}>
            <Text style={styles.basicTitle}>Perk Details</Text>
            
            {/* Perk Type */}
            <Text style={styles.label}>Perk Type*</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowPerkTypeModal(true)}
            >
              <Text style={formData.perk_type ? styles.dropdownText : styles.placeholderText}>
                {formData.perk_type || 'Select Type'}
              </Text>
              <AntDesign name='caretdown' size={12} color='#ffffff' />
            </TouchableOpacity>

            {/* Redemption Method */}
            <Text style={styles.label}>Redemption Method*</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowRedemptionModal(true)}
            >
              <Text style={formData.redemption_method ? styles.dropdownText : styles.placeholderText}>
                {formData.redemption_method || 'Select Method'}
              </Text>
              <AntDesign name='caretdown' size={12} color='#ffffff' />
            </TouchableOpacity>

            {/* Discount Value */}
            <Text style={styles.label}>Discount or Benefit Value*</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 20% Off or $50 Cashback"
              placeholderTextColor="#7c92a6"
              value={formData.discount_or_benefit_value}
              onChangeText={(text) => handleInputChange('discount_or_benefit_value', text)}
            />

            {/* Partner Link or Code */}
            <Text style={styles.label}>Partner Link or Code</Text>
            <TextInput
              style={styles.input}
              placeholder="CAH4EDU25 or https://example.com"
              placeholderTextColor="#7c92a6"
              value={formData.partner_link_or_code}
              onChangeText={(text) => handleInputChange('partner_link_or_code', text)}
            />

            {/* Start Date */}
            <Text style={styles.label}>Start Date*</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={formData.start_date ? styles.dropdownText : styles.placeholderText}>
                {formData.start_date ? new Date(formData.start_date).toLocaleDateString() : 'Select Start Date'}
              </Text>
              <Ionicons name='calendar-outline' size={20} color='#ffffff' />
            </TouchableOpacity>

            {/* End Date */}
            <Text style={styles.label}>End Date*</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={formData.end_date ? styles.dropdownText : styles.placeholderText}>
                {formData.end_date ? new Date(formData.end_date).toLocaleDateString() : 'Select End Date'}
              </Text>
              <Ionicons name='calendar-outline' size={20} color='#ffffff' />
            </TouchableOpacity>

            {/* Usage Limitations */}
            <Text style={styles.label}>Usage Limitations</Text>
            <TextInput
              style={[styles.input, { height: 90, textAlignVertical: "top" }]}
              placeholder="List exclusions or caps"
              placeholderTextColor="#7c92a6"
              multiline
              value={formData.usage_limitations}
              onChangeText={(text) => handleInputChange('usage_limitations', text)}
            />
          </View>

          {/* ELIGIBILITY & AUDIENCE */}
          <View style={styles.basicInfoCont}>
            <Text style={styles.basicTitle}>Eligibility & Audience</Text>

            {/* Eligibility Criteria */}
            <Text style={[styles.label, { marginTop: 10, marginBottom: 5 }]}>
              Eligibility Criteria
            </Text>
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
                <Text style={styles.checkboxLabel}>All Users</Text>
              </View>
            </View>

            {/* Location Availability */}
            <Text style={styles.label}>Location Availability*</Text>
            <TouchableOpacity
              style={styles.dropdownInput}
              onPress={() => setShowLocationModal(true)}
            >
              <Text style={formData.location_availability ? styles.dropdownText : styles.placeholderText}>
                {formData.location_availability || 'Select Location'}
              </Text>
              <AntDesign name='caretdown' size={12} color='#ffffff' />
            </TouchableOpacity>

            {/* Require Student Verification */}
            <View style={styles.verificationToggleRow}>
              <Text style={styles.verificationToggleText}>Require Student Verification</Text>
              <Switch
                trackColor={{ false: "#0d2f48", true: "#4ac3ff" }}
                thumbColor={formData.require_student_verification ? "#ffffff" : "#d9e6f2"}
                ios_backgroundColor="#0d2f48"
                onValueChange={(value) => handleInputChange('require_student_verification', value)}
                value={formData.require_student_verification}
              />
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <TouchableOpacity 
            style={styles.blueBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.blueBtnTxt}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.borderBtn}
            onPress={() => handleSubmit(false)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#51e3fc" />
            ) : (
              <Text style={styles.borderBtnTxt}>
                {perkId ? 'Update Perk' : 'Publish Perk'}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* MODALS */}
        {renderLocationModal()}
        {renderPerkTypeModal()}
        {renderRedemptionModal()}

        {/* DATE PICKERS */}
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onStartDateChange}
            minimumDate={new Date()}
          />
        )}
        
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onEndDateChange}
            minimumDate={startDate}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  content: { 
    flex: 1 
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#021e38',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    flex: 1,
    backgroundColor: '#51e3fc',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  basicInfoCont: {
    backgroundColor: "#021e38",
    marginTop: 20,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    paddingBottom: 20,
    paddingHorizontal: 15,
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
    marginTop: 15,
    marginBottom: 10,
  },
  label: {
    color: '#ffffffff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 15,
    fontWeight: '600'
  },
  input: {
    backgroundColor: '#0d2f48',
    padding: 10,
    fontSize: 14,
    color: 'white',
    borderRadius: 10,
    minHeight: 40,
  },
  charCount: {
    color: '#7c92a6',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'right',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxBox: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    color: "#d9e6f2",
    fontSize: 14,
  },
  featureGradient: {
    marginTop: 25,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
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
  activeTypeBtn: { 
    backgroundColor: "#0257a7", 
    borderColor: "#0257a7" 
  },
  inactiveTypeBtn: { 
    borderColor: "#fff" 
  },
  typeText: { 
    fontSize: 14, 
    fontWeight: "600" 
  },
  activeTypeText: { 
    color: "white" 
  },
  inactiveTypeText: { 
    color: "white" 
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
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d2f48',
    padding: 10,
    borderRadius: 10,
    minHeight: 40,
  },
  dropdownText: {
    color: 'white',
    fontSize: 14,
  },
  placeholderText: {
    color: '#7c92a6',
    fontSize: 14,
  },
  eligibilityCriteriaContainer: {
    marginBottom: 10,
  },
  eligibilityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  verificationToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  verificationToggleText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
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
    marginBottom: 30,
  },
  borderBtnTxt: {
    color: '#51e3fc',
    fontSize: 20,
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
  },
  modalOptionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PerkListing;
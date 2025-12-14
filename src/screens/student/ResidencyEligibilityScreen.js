import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../context/ProfileContext';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';
import { Storage } from '../../utils/Storage';

const { width } = Dimensions.get('window');

// US States Array
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
  'West Virginia', 'Wisconsin', 'Wyoming', 'Washington DC'
];

// ✅ FIXED: Dynamic Tag Component with auto width
const Tag = ({ 
  label, 
  isSelected = false, 
  onPress, 
  showCross = false,
  onRemove 
}) => (
  <TouchableOpacity
    style={[styles.tag, isSelected && styles.selectedTag]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text 
      style={[styles.tagText, isSelected && styles.selectedTagText]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {label}
    </Text>
    {showCross && isSelected && (
      <TouchableOpacity onPress={onRemove} style={styles.closeIconWrapper}>
        <Icon name="close" size={14} color="#000" />
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

// ✅ FIXED: State Badge with dynamic width
const StateBadge = ({ 
  label, 
  onPress,
  onRemove 
}) => {
  // Calculate text width to adjust badge width
  const textWidth = Math.min(label.length * 10, width - 100); // Max width constraint
  
  return (
    <TouchableOpacity
      style={[styles.stateBadge, { width: textWidth + 60 }]} // Dynamic width
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text 
        style={styles.stateBadgeText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
      <TouchableOpacity 
        onPress={onRemove} 
        style={styles.stateCloseIcon}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="close-circle" size={18} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const Section = ({ title, children, subtitle }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

const ResidencyEligibilityScreen = ({ 
  navigation,
  showHeader = true,
  startFrom,
  showContinueButton = true,
  onSave,
  customButtonLabel = 'Custom Action',
}) => {
  const { userProfile, refreshUserProfile } = useContext(ProfileContext);
  
  // State Management
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form Fields
  const [zipCode, setZipCode] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [openToOutOfState, setOpenToOutOfState] = useState(null);
  const [willingToRelocate, setWillingToRelocate] = useState(null);
  const [visaRestrictions, setVisaRestrictions] = useState('');
  
  // States Dropdown
  const [showStatesModal, setShowStatesModal] = useState(false);
  const [statesSearch, setStatesSearch] = useState('');
  const [filteredStates, setFilteredStates] = useState(US_STATES);
  
  // Yes/No Options
  const yesNoOptions = ['Yes', 'No'];
  
  // Load existing data
  useEffect(() => {
    loadExistingData();
  }, [userProfile]);

  const loadExistingData = () => {
    if (userProfile) {
      setZipCode(userProfile.zip_code || '');
      setStateOfResidence(userProfile.state_of_residence || '');
      setOpenToOutOfState(userProfile.open_to_out_of_state_opportunities);
      setWillingToRelocate(userProfile.willing_to_relocate);
      setVisaRestrictions(userProfile.visa_restrictions || '');
    }
    setLoading(false);
  };

  // Filter states based on search
  useEffect(() => {
    if (statesSearch.trim() === '') {
      setFilteredStates(US_STATES);
    } else {
      const filtered = US_STATES.filter(state =>
        state.toLowerCase().includes(statesSearch.toLowerCase())
      );
      setFilteredStates(filtered);
    }
  }, [statesSearch]);

  // Handle state selection
  const handleStateSelect = (state) => {
    setStateOfResidence(state);
    setShowStatesModal(false);
    setStatesSearch('');
  };

  // Add custom state
  const handleAddCustomState = () => {
    if (statesSearch.trim() && !US_STATES.includes(statesSearch.trim())) {
      setStateOfResidence(statesSearch.trim());
      setShowStatesModal(false);
      setStatesSearch('');
      
      Toast.show({
        type: 'success',
        text1: 'Custom State Added',
        text2: 'You entered a custom state/territory',
      });
    }
  };

  // Clear state selection
  const handleClearState = () => {
    setStateOfResidence('');
  };

  // Validate ZIP code
  const validateZipCode = (code) => {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(code);
  };

  // Validate form
  const validateForm = () => {
    if (!zipCode.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please enter your ZIP code',
      });
      return false;
    }

    if (!validateZipCode(zipCode)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid ZIP',
        text2: 'Please enter a valid 5-digit ZIP code',
      });
      return false;
    }

    if (!stateOfResidence.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select your state of residence',
      });
      return false;
    }

    if (openToOutOfState === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select if open to out-of-state opportunities',
      });
      return false;
    }

    if (willingToRelocate === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select if willing to relocate',
      });
      return false;
    }

    return true;
  };

  // Submit residency profile
  const submitResidencyProfile = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);

      const userData = await Storage.getUser();
      if (!userData?.id) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'User not found. Please login again.',
        });
        setSaving(false);
        return;
      }

      const payload = {
        user_id: userData.id,
        zip_code: zipCode.trim(),
        state_of_residence: stateOfResidence.trim(),
        open_to_out_of_state_opportunities: openToOutOfState,
        willing_to_relocate: willingToRelocate,
        ...(visaRestrictions.trim() && { visa_restrictions: visaRestrictions.trim() })
      };

      console.log('Residency Payload:', JSON.stringify(payload, null, 2));

      const response = await FireApi('residence-profile', 'POST', {}, payload);

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Residency information saved successfully!',
        });

        await refreshUserProfile();

        if (onSave) {
          onSave();
        } else if (showContinueButton) {
          setTimeout(() => {
            navigation.navigate('QuickApply');
          }, 1500);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to save residency information',
        });
      }
    } catch (error) {
      console.error('Error saving residency profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to save residency information',
      });
    } finally {
      setSaving(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading residency data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <LinearGradient colors={['#01D7FB', '#0257A7']} style={styles.headerGradient}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Residency and Eligibility</Text>
            <Text style={styles.headerProgress}>
              {userProfile?.profile_completion_percentage || 0}% Completed
            </Text>
          </View>
        </LinearGradient>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'residency' && (
          <>
            <Text style={styles.headerDescription}>
              Your location data is private and used only for matching regional opportunities!
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}

        {/* ZIP Code */}
        <Section title="ZIP Code">
          <TextInput
            placeholder="Enter 5-digit ZIP code"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
            maxLength={5}
          />
          {zipCode && !validateZipCode(zipCode) && (
            <Text style={styles.errorText}>Please enter a valid 5-digit ZIP code</Text>
          )}
        </Section>

        {/* State of Residence - ✅ FIXED LAYOUT */}
        <Section title="State of Residence">
          <TouchableOpacity 
            style={styles.inputWrapper}
            onPress={() => setShowStatesModal(true)}
          >
            <TextInput
              placeholder="Select or type your state"
              placeholderTextColor={stateOfResidence ? '#fff' : '#aaa'}
              style={styles.inputWithIcon}
              value={stateOfResidence}
              onChangeText={setStateOfResidence}
              editable={false}
              pointerEvents="none"
            />
            <Icon 
              name={showStatesModal ? "chevron-up-circle-outline" : "chevron-down-circle-outline"} 
              size={20} 
              color="#fff" 
              style={styles.rightIcon} 
            />
          </TouchableOpacity>
          
          {/* ✅ FIXED: State badge with auto width */}
          {stateOfResidence ? (
            <View style={styles.stateBadgeContainer}>
              <StateBadge
                label={stateOfResidence}
                onPress={() => setShowStatesModal(true)}
                onRemove={handleClearState}
              />
            </View>
          ) : (
            <Text style={styles.hintText}>Tap above to select your state</Text>
          )}
          
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Out-of-state Opportunities - ✅ FIXED TAGS */}
        <Section title="Are you open to out-of-state opportunities?">
          <View style={styles.tagGroup}>
            {yesNoOptions.map((option, index) => (
              <Tag
                key={`outofstate_${index}`}
                label={option}
                isSelected={
                  (option === 'Yes' && openToOutOfState === true) ||
                  (option === 'No' && openToOutOfState === false)
                }
                onPress={() => setOpenToOutOfState(option === 'Yes')}
              />
            ))}
          </View>
          {openToOutOfState !== null && (
            <Text style={styles.selectedText}>
              Selected: {openToOutOfState ? 'Yes' : 'No'}
            </Text>
          )}
        </Section>

        {/* Relocation - ✅ FIXED TAGS */}
        <Section title="Are you willing to relocate for scholarships or academic programs?">
          <View style={styles.tagGroup}>
            {yesNoOptions.map((option, index) => (
              <Tag
                key={`relocate_${index}`}
                label={option}
                isSelected={
                  (option === 'Yes' && willingToRelocate === true) ||
                  (option === 'No' && willingToRelocate === false)
                }
                onPress={() => setWillingToRelocate(option === 'Yes')}
              />
            ))}
          </View>
          {willingToRelocate !== null && (
            <Text style={styles.selectedText}>
              Selected: {willingToRelocate ? 'Yes' : 'No'}
            </Text>
          )}
        </Section>

        {/* Visa / Residency Restrictions */}
        <Section 
          title="Visa / Residency Restrictions" 
          subtitle="Optional"
        >
          <TextInput
            placeholder="Enter details if any (e.g., F-1 Visa, Green Card, International Student)"
            placeholderTextColor="#aaa"
            style={[styles.input, styles.textArea]}
            value={visaRestrictions}
            onChangeText={setVisaRestrictions}
            multiline
            numberOfLines={4}
          />
          <Text style={styles.hintText}>
            This information helps match you with appropriate opportunities
          </Text>
        </Section>

        {/* Action Buttons */}
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={[styles.continueBtn, saving && styles.disabledBtn]}
              onPress={submitResidencyProfile}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#03A2D5" />
              ) : (
                <Text style={styles.continueText}>Continue</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.saveLaterText}>Save and continue Later</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {onSave && (
              <TouchableOpacity 
                style={[styles.continueBtn, saving && styles.disabledBtn]} 
                onPress={submitResidencyProfile}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#03A2D5" />
                ) : (
                  <Text style={styles.continueText}>
                    {customButtonLabel || 'Update & Save'}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            {customButtonLabel === 'Update & Save' && (
              <TouchableOpacity
                style={styles.primaryBtnFull}
                onPress={() => navigation.navigate('ManageDocument')}
              >
                <Text style={styles.primaryBtnText}>
                  Manage Document
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>

      {/* States Selection Modal */}
      <Modal
        visible={showStatesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowStatesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStatesModal(false)}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            
            {/* Search Input */}
            <View style={styles.searchContainer}>
              <Icon name="search-outline" size={20} color="#aaa" style={styles.searchIcon} />
              <TextInput
                placeholder="Search states or type custom"
                placeholderTextColor="#aaa"
                style={styles.searchInput}
                value={statesSearch}
                onChangeText={setStatesSearch}
                autoFocus={true}
              />
              {statesSearch.trim() && (
                <TouchableOpacity onPress={() => setStatesSearch('')}>
                  <Icon name="close-circle" size={20} color="#aaa" />
                </TouchableOpacity>
              )}
            </View>

            {/* States List */}
            <ScrollView style={styles.statesList}>
              {filteredStates.map((state, index) => (
                <TouchableOpacity
                  key={`state_${index}`}
                  style={[
                    styles.stateItem,
                    stateOfResidence === state && styles.selectedStateItem
                  ]}
                  onPress={() => handleStateSelect(state)}
                >
                  <Text style={[
                    styles.stateText,
                    stateOfResidence === state && styles.selectedStateText
                  ]}>
                    {state}
                  </Text>
                  {stateOfResidence === state && (
                    <Icon name="checkmark" size={20} color="#03A2D5" />
                  )}
                </TouchableOpacity>
              ))}
              
              {/* Add Custom State Option */}
              {statesSearch.trim() && !US_STATES.includes(statesSearch.trim()) && (
                <TouchableOpacity
                  style={styles.customStateItem}
                  onPress={handleAddCustomState}
                >
                  <Icon name="add-circle-outline" size={20} color="#03A2D5" />
                  <Text style={styles.customStateText}>
                    Add "{statesSearch.trim()}" as custom location
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalDoneButton}
              onPress={() => setShowStatesModal(false)}
            >
              <Text style={styles.modalDoneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResidencyEligibilityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  headerGradient: { width: width, marginTop: 10 },
  header: {
    width: width,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 30,
  },
  headerProgress: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'right',
  },
  scrollContainer: { paddingBottom: 30, paddingHorizontal: 10 },
  headerDescription: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  headerLabel: { color: '#8E8E8E', fontSize: 13, marginBottom: 15 },
  
  section: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    position: 'relative',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  sectionSubtitle: {
    color: '#03A2D5',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  exclamationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
  // ✅ FIXED: Tag Group with better spacing
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Changed from space-between
    marginBottom: 8,
  },
  
  // ✅ FIXED: Dynamic Tag styling
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 4, // Reduced margin
    minHeight: 40,
    justifyContent: 'center',
  },
  selectedTag: {
    backgroundColor: '#03A2D5',
    borderColor: '#fff',
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedTagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  
  // ✅ NEW: State Badge Component
  stateBadgeContainer: {
    marginTop: 10,
    alignItems: 'flex-start', // Align to left
  },
  stateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03A2D5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxWidth: width - 60, // Maximum width
    minWidth: 60, // Minimum width
  },
  stateBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  stateCloseIcon: {
    marginLeft: 'auto',
  },
  
  input: {
    backgroundColor: '#021E38',
    color: '#fff',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 14,
    marginVertical: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021E38',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  rightIcon: { position: 'absolute', right: 15 },
  
  selectedText: {
    color: '#03A2D5',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 5,
  },
  hintText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  
  continueBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
    marginHorizontal: 25,
    elevation: 8,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  continueText: {
    color: '#03A2D5',
    fontSize: 24,
    fontWeight: '600',
  },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  primaryBtnFull: {
    backgroundColor: "#00C6FB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 13,
    borderRadius: 10,
    width: '85%',
    marginTop: 10,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: '600',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#021E38',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#03365B',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03365B',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#03A2D5',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    paddingVertical: 12,
  },
  statesList: {
    maxHeight: 400,
    paddingHorizontal: 15,
  },
  stateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#03365B',
  },
  selectedStateItem: {
    backgroundColor: '#03365B',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  stateText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedStateText: {
    color: '#03A2D5',
    fontWeight: 'bold',
  },
  customStateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#03365B',
    marginTop: 10,
  },
  customStateText: {
    color: '#03A2D5',
    fontSize: 16,
    marginLeft: 10,
    fontStyle: 'italic',
  },
  modalDoneButton: {
    backgroundColor: '#03A2D5',
    margin: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalDoneText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
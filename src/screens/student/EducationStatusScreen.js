import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../context/ProfileContext';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';
import { Storage } from '../../utils/Storage';

const { width } = Dimensions.get('window');

//  Tag Component
const Tag = ({ label, isSelected = false, onPress }) => (
  <TouchableOpacity
    style={[styles.tag, isSelected && styles.selectedTag]}
    onPress={onPress}
  >
    <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

//  Section Component
const Section = ({ title, children, subtitle }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

const EducationStatusScreen = ({
  navigation,
  showHeader = true,
  showContinueButton = true,
}) => {
  const { userProfile, refreshUserProfile } = useContext(ProfileContext);
  
  // States for data
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // API Data States
  const [educationLevels, setEducationLevels] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
  const [enrollmentStatuses, setEnrollmentStatuses] = useState([]);
  const [academicStandings, setAcademicStandings] = useState([]);
  const [collegeTypes, setCollegeTypes] = useState([]);
  
  // Selection States
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [institutionSearch, setInstitutionSearch] = useState('');
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [showInstitutionModal, setShowInstitutionModal] = useState(false);
  const [selectedInstitutionName, setSelectedInstitutionName] = useState('');
  
  const [expectedGraduationDate, setExpectedGraduationDate] = useState('');
  const [cumulativeGPA, setCumulativeGPA] = useState('');
  const [selectedFieldOfStudyId, setSelectedFieldOfStudyId] = useState(null);
  const [fieldSearch, setFieldSearch] = useState('');
  const [filteredFields, setFilteredFields] = useState([]);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [selectedFieldName, setSelectedFieldName] = useState('');
  
  const [selectedEnrollmentStatus, setSelectedEnrollmentStatus] = useState(null);
  const [selectedAcademicStandings, setSelectedAcademicStandings] = useState([]);
  const [selectedCollegeType, setSelectedCollegeType] = useState(null);

  // Fetch all education data
  const fetchEducationData = async () => {
    try {
      setLoading(true);
      
      const [
        levelsRes,
        institutionsRes,
        fieldsRes,
        enrollmentRes,
        standingsRes,
        typesRes
      ] = await Promise.all([
        FireApi('education-profile/levels', 'GET'),
        FireApi('education-profile/institutions', 'GET'),
        FireApi('education-profile/fields-of-study', 'GET'),
        FireApi('education-profile/enrollment-statuses', 'GET'),
        FireApi('education-profile/academic-standings', 'GET'),
        FireApi('education-profile/college-types', 'GET'),
      ]);

      if (levelsRes?.success) setEducationLevels(levelsRes.data || []);
      if (institutionsRes?.success) {
        const instData = institutionsRes.data?.items || [];
        setInstitutions(instData);
        setFilteredInstitutions(instData.slice(0, 10)); // Show first 10 initially
      }
      if (fieldsRes?.success) {
        const fieldsData = fieldsRes.data?.items || [];
        setFieldsOfStudy(fieldsData);
        setFilteredFields(fieldsData.slice(0, 10));
      }
      if (enrollmentRes?.success) setEnrollmentStatuses(enrollmentRes.data || []);
      if (standingsRes?.success) setAcademicStandings(standingsRes.data?.items || []);
      if (typesRes?.success) setCollegeTypes(typesRes.data || []);

      // Load existing user data if available
      loadExistingData();

    } catch (error) {
      console.error('Error fetching education data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load education data',
      });
    } finally {
      setLoading(false);
    }
  };

  // Load existing user education data
  const loadExistingData = () => {
    if (userProfile) {
      if (userProfile.current_education_level_id) {
        setSelectedEducationLevel(userProfile.current_education_level_id);
      }
      if (userProfile.current_institution_id && userProfile.institution) {
        setSelectedInstitutionId(userProfile.current_institution_id);
        setSelectedInstitutionName(userProfile.institution?.name || '');
      }
      if (userProfile.expected_graduation_date) {
        setExpectedGraduationDate(userProfile.expected_graduation_date);
      }
      if (userProfile.cumulative_gpa !== null) {
        setCumulativeGPA(userProfile.cumulative_gpa.toString());
      }
      if (userProfile.intended_field_of_study_id && userProfile.fieldOfStudy) {
        setSelectedFieldOfStudyId(userProfile.intended_field_of_study_id);
        setSelectedFieldName(userProfile.fieldOfStudy?.name || '');
      }
      if (userProfile.enrollment_status_id) {
        setSelectedEnrollmentStatus(userProfile.enrollment_status_id);
      }
      if (userProfile.academicStandings?.length > 0) {
        setSelectedAcademicStandings(userProfile.academicStandings.map(item => item.id));
      }
      if (userProfile.preferred_college_type_id) {
        setSelectedCollegeType(userProfile.preferred_college_type_id);
      }
    }
  };

  useEffect(() => {
    fetchEducationData();
  }, []);

  // Filter institutions based on search
  useEffect(() => {
    if (institutionSearch.trim() === '') {
      setFilteredInstitutions(institutions.slice(0, 10));
    } else {
      const filtered = institutions.filter(inst =>
        inst.name.toLowerCase().includes(institutionSearch.toLowerCase())
      );
      setFilteredInstitutions(filtered.slice(0, 20));
    }
  }, [institutionSearch, institutions]);

  // Filter fields based on search
  useEffect(() => {
    if (fieldSearch.trim() === '') {
      setFilteredFields(fieldsOfStudy.slice(0, 10));
    } else {
      const filtered = fieldsOfStudy.filter(field =>
        field.name.toLowerCase().includes(fieldSearch.toLowerCase())
      );
      setFilteredFields(filtered.slice(0, 20));
    }
  }, [fieldSearch, fieldsOfStudy]);

  // Handle institution selection
  const handleInstitutionSelect = (institution) => {
    setSelectedInstitutionId(institution.id);
    setSelectedInstitutionName(institution.name);
    setInstitutionSearch('');
    setShowInstitutionModal(false);
  };

  // Handle field of study selection
  const handleFieldSelect = (field) => {
    setSelectedFieldOfStudyId(field.id);
    setSelectedFieldName(field.name);
    setFieldSearch('');
    setShowFieldModal(false);
  };

  // Handle education level selection
  const handleEducationLevelSelect = (levelId) => {
    setSelectedEducationLevel(levelId === selectedEducationLevel ? null : levelId);
  };

  // Handle enrollment status selection
  const handleEnrollmentStatusSelect = (statusId) => {
    setSelectedEnrollmentStatus(statusId === selectedEnrollmentStatus ? null : statusId);
  };

  // Handle academic standing selection
  const handleAcademicStandingSelect = (standingId) => {
    setSelectedAcademicStandings(prev => {
      if (prev.includes(standingId)) {
        return prev.filter(id => id !== standingId);
      } else {
        return [...prev, standingId];
      }
    });
  };

  // Handle college type selection
  const handleCollegeTypeSelect = (typeId) => {
    setSelectedCollegeType(typeId === selectedCollegeType ? null : typeId);
  };

  // Validate GPA
  const validateGPA = (gpa) => {
    const num = parseFloat(gpa);
    return !isNaN(num) && num >= 0 && num <= 4.0;
  };

  // Validate form
  const validateForm = () => {
    if (!selectedEducationLevel) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select your education level',
      });
      return false;
    }

    if (cumulativeGPA && !validateGPA(cumulativeGPA)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid GPA',
        text2: 'GPA must be between 0 and 4.0',
      });
      return false;
    }

    // Validate date format if provided
    if (expectedGraduationDate && !/^\d{4}-\d{2}-\d{2}$/.test(expectedGraduationDate)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date Format',
        text2: 'Date must be in YYYY-MM-DD format',
      });
      return false;
    }

    return true;
  };

  //  Submit education profile
  const submitEducationProfile = async () => {
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

      //  Prepare payload according to API specification
      const payload = {
        user_id: userData.id,
        current_education_level_id: selectedEducationLevel,
        current_institution_id: selectedInstitutionId || null, //  Send UUID or null
        expected_graduation_date: expectedGraduationDate || null,
        cumulative_gpa: cumulativeGPA ? parseFloat(cumulativeGPA) : null,
        intended_field_of_study_id: selectedFieldOfStudyId || null, //  Send UUID or null
        enrollment_status_id: selectedEnrollmentStatus || null,
        academic_standing_ids: selectedAcademicStandings.length > 0 ? selectedAcademicStandings : null,
        preferred_college_type_id: selectedCollegeType || null
      };

      console.log('Education Profile Payload:', JSON.stringify(payload, null, 2));

      const response = await FireApi(
        'education-profile',
        'POST',
        {},
        payload
      );

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Education profile saved successfully!',
        });

        //  Refresh user profile to update completion percentage
        await refreshUserProfile();
        
        setTimeout(() => {
          navigation.navigate('Financial');
        }, 1500);
        
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to save education profile',
        });
      }
    } catch (error) {
      console.error('Error saving education profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save education profile',
      });
    } finally {
      setSaving(false);
    }
  };

  //  Render institution modal
  const renderInstitutionModal = () => (
    <Modal
      visible={showInstitutionModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowInstitutionModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Institution</Text>
            <TouchableOpacity onPress={() => setShowInstitutionModal(false)}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search institutions..."
            placeholderTextColor="#aaa"
            value={institutionSearch}
            onChangeText={setInstitutionSearch}
            autoFocus={true}
          />
          
          <FlatList
            data={filteredInstitutions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleInstitutionSelect(item)}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
                <Text style={styles.modalItemType}>{item.type}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No institutions found</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );

  //  Render field of study modal
  const renderFieldModal = () => (
    <Modal
      visible={showFieldModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFieldModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Field of Study</Text>
            <TouchableOpacity onPress={() => setShowFieldModal(false)}>
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Search fields..."
            placeholderTextColor="#aaa"
            value={fieldSearch}
            onChangeText={setFieldSearch}
            autoFocus={true}
          />
          
          <FlatList
            data={filteredFields}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => handleFieldSelect(item)}
              >
                <Text style={styles.modalItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultsText}>No fields found</Text>
            }
          />
        </View>
      </View>
    </Modal>
  );

  //  Calculate progress for this screen
  const calculateScreenProgress = () => {
    let completedFields = 0;
    const totalFields = 8;
    
    if (selectedEducationLevel) completedFields++;
    if (selectedInstitutionId) completedFields++;
    if (expectedGraduationDate) completedFields++;
    if (cumulativeGPA) completedFields++;
    if (selectedFieldOfStudyId) completedFields++;
    if (selectedEnrollmentStatus) completedFields++;
    if (selectedAcademicStandings.length > 0) completedFields++;
    if (selectedCollegeType) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  //  Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading education data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showHeader && (
        <LinearGradient
          colors={['#01D7FB', '#0257A7']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Education Status</Text>
            <Text style={styles.headerProgress}>
               {userProfile?.profile_completion_percentage || 0}% Completed
            </Text>
          </View>
        </LinearGradient>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerDescription}>
          These details help us tailor scholarship opportunities that best
          fit your academic journey.
        </Text>
        <Text style={styles.headerLabel}>
          You can skip any question and update it later in settings
        </Text>

        {/* Current Education Level */}
        <Section title="Current Education Level" subtitle="Required">
          <View style={styles.tagGroup}>
            {educationLevels.map(level => (
              <Tag
                key={level.id}
                label={level.level_name}
                isSelected={selectedEducationLevel === level.id}
                onPress={() => handleEducationLevelSelect(level.id)}
              />
            ))}
          </View>
        </Section>

        {/* Current School or Institution */}
        <Section title="Current School or Institution">
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => setShowInstitutionModal(true)}
          >
            <Text style={selectedInstitutionName ? styles.selectedText : styles.placeholderText}>
              {selectedInstitutionName || 'Select institution'}
            </Text>
            <Icon name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {selectedInstitutionName && (
            <Text style={styles.selectedLabel}>
              Selected: {selectedInstitutionName}
            </Text>
          )}
        </Section>

        {/* Expected Graduation Date */}
        <Section title="Expected Graduation Year">
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="YYYY-MM-DD (e.g., 2025-06-30)"
              placeholderTextColor="#aaa"
              style={styles.inputWithIcon}
              value={expectedGraduationDate}
              onChangeText={setExpectedGraduationDate}
            />
            <Icon
              name="calendar-outline"
              size={20}
              color="#fff"
              style={styles.rightIcon}
            />
          </View>
          <Text style={styles.helperText}>Must be in YYYY-MM-DD format (optional)</Text>
        </Section>

        {/* Cumulative GPA */}
        <Section title="Cumulative GPA">
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter GPA (0.0 - 4.0)"
              placeholderTextColor="#aaa"
              style={styles.inputWithIcon}
              value={cumulativeGPA}
              onChangeText={setCumulativeGPA}
              keyboardType="decimal-pad"
            />
            <Icon
              name="stats-chart-outline"
              size={20}
              color="#fff"
              style={styles.rightIcon}
            />
          </View>
          <Text style={styles.helperText}>On a 4.0 scale (optional)</Text>
        </Section>

        {/* Intended Field of Study */}
        <Section title="Intended Major / Field of Study">
          <TouchableOpacity 
            style={styles.selectInput}
            onPress={() => setShowFieldModal(true)}
          >
            <Text style={selectedFieldName ? styles.selectedText : styles.placeholderText}>
              {selectedFieldName || 'Select field of study'}
            </Text>
            <Icon name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {selectedFieldName && (
            <Text style={styles.selectedLabel}>
              Selected: {selectedFieldName}
            </Text>
          )}
        </Section>

        {/* Enrollment Status */}
        <Section title="Enrollment Status">
          <View style={styles.tagGroup}>
            {enrollmentStatuses.map(status => (
              <Tag
                key={status.id}
                label={status.status_name}
                isSelected={selectedEnrollmentStatus === status.id}
                onPress={() => handleEnrollmentStatusSelect(status.id)}
              />
            ))}
          </View>
        </Section>

        {/* Academic Standing */}
        <Section title="Academic Standing">
          <View style={styles.tagGroup}>
            {academicStandings.slice(0, 4).map(standing => (
              <Tag
                key={standing.id}
                label={standing.standing_name}
                isSelected={selectedAcademicStandings.includes(standing.id)}
                onPress={() => handleAcademicStandingSelect(standing.id)}
              />
            ))}
          </View>
        </Section>

        {/* Preferred College Type */}
        <Section title="Preferred College Type">
          <View style={styles.tagGroup}>
            {collegeTypes.map(type => (
              <Tag
                key={type.id}
                label={type.type_name}
                isSelected={selectedCollegeType === type.id}
                onPress={() => handleCollegeTypeSelect(type.id)}
              />
            ))}
          </View>
        </Section>

        {/* Action Buttons */}
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={[styles.continueBtn, saving && styles.disabledBtn]}
              onPress={submitEducationProfile}
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
          <TouchableOpacity
            style={[styles.continueBtn, saving && styles.disabledBtn]}
            onPress={submitEducationProfile}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#03A2D5" />
            ) : (
              <Text style={styles.continueText}>Save Education Profile</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Modals */}
      {renderInstitutionModal()}
      {renderFieldModal()}
    </View>
  );
};

export default EducationStatusScreen;

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
    marginRight: 60,
  },
  headerProgress: { color: '#fff', fontSize: 13 },
  scrollContainer: { paddingBottom: 30, paddingHorizontal: 10 },
  headerDescription: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  headerLabel: {
    color: '#8E8E8E',
    fontSize: 13,
    marginBottom: 15,
  },
  section: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
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
  },
  sectionSubtitle: {
    color: '#03A2D5',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  tagGroup: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 8,
  },
  selectedTag: {
    backgroundColor: '#03A2D5',
    borderColor: '#fff',
  },
  tagText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  selectedTagText: {
    color: '#fff',
    fontWeight: 'bold',
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
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#021E38',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 15,
    height: 50,
    marginVertical: 8,
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  selectedLabel: {
    color: '#03A2D5',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
  },
  helperText: {
    color: '#8E8E8E',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
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
  continueText: { color: '#03A2D5', fontSize: 24, fontWeight: '600' },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#021E38',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 14,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#03365B',
  },
  modalItemText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  modalItemType: {
    color: '#03A2D5',
    fontSize: 12,
  },
  noResultsText: {
    color: '#8E8E8E',
    textAlign: 'center',
    padding: 20,
    fontSize: 14,
  },
});
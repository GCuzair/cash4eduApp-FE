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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../context/ProfileContext';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';
import { Storage } from '../../utils/Storage';

const { width } = Dimensions.get('window');

//  Tag Component - AS PER YOUR ORIGINAL STYLING
const Tag = ({
  label,
  showCross = false,
  onPress,
  onRemove,
  isSelected = false,
}) => (
  <TouchableOpacity
    style={[styles.tag, isSelected && styles.selectedTag]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
      {label}
    </Text>
    {showCross && isSelected && (
      <TouchableOpacity onPress={onRemove} style={styles.closeIconWrapper}>
        <Icon name="close" size={14} color="#000" />
      </TouchableOpacity>
    )}
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

const InterestsGoalsScreen = ({
  navigation,
  showHeader = true,
  showContinueButton = true,
}) => {
  const { userProfile, refreshUserProfile } = useContext(ProfileContext);

  //  States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  //  API Data States
  const [scholarshipTypes, setScholarshipTypes] = useState([]);
  const [videoTypes, setVideoTypes] = useState([]);
  const [academicInterests, setAcademicInterests] = useState([]);

  //  Selection States - WITH ALL STATIC OPTIONS
  const [selectedAcademic, setSelectedAcademic] = useState([]); // Array of IDs
  const [selectedExtra, setSelectedExtra] = useState([]); // Array of IDs
  const [selectedVideos, setSelectedVideos] = useState([]); // Array of IDs
  const [selectedScholarshipTypes, setSelectedScholarshipTypes] = useState([]); // Array of IDs

  //  Text Input States
  const [customAcademic, setCustomAcademic] = useState('');
  const [customExtra, setCustomExtra] = useState('');
  const [educationJourney, setEducationJourney] = useState('');
  const [employerTuition, setEmployerTuition] = useState(null); // true/false/null

  //  Static Options Arrays
  const staticAcademicOptions = ['Design', 'Arts', 'Education', 'Law'];
  const staticExtraOptions = ['Photography', 'Debate Club', 'Music'];
  const staticEmployerOptions = ['Yes', 'No'];
  const staticVideoOptions = [
    'Scholarships Tips',
    'College Admissions',
    'Career Paths',
    'Financial Literacy',
    'FAFSA Help',
  ];
  const staticScholarshipOptions = [
    'Need-based',
    'Merit-based',
    'Athletic',
    'Creative / Essay',
    'Community Service',
    'STEM',
    'Minority / Identity-based',
  ];

  //  Fetch all interest data
  const fetchInterestData = async () => {
    try {
      setLoading(true);

      const [scholarshipRes, videoRes, academicRes] = await Promise.all([
        FireApi('scholarship-types', 'GET'),
        FireApi('video-types', 'GET'),
        FireApi('interest-profile/academic-career', 'GET'),
      ]);

      if (scholarshipRes?.success)
        setScholarshipTypes(scholarshipRes.data || []);
      if (videoRes?.success) setVideoTypes(videoRes.data || []);
      if (academicRes?.success) setAcademicInterests(academicRes.data || []);

      //  Load existing user data if available
      loadExistingData();
    } catch (error) {
      console.error('Error fetching interest data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load interest data',
      });
    } finally {
      setLoading(false);
    }
  };

  //  Load existing user interest data
  const loadExistingData = () => {
    if (userProfile) {
      // Load academic interests
      if (userProfile.interests?.length > 0) {
        const apiAcademicIds = userProfile.interests
          .filter(int => int.type === 'academic')
          .map(int => int.id);
        setSelectedAcademic(apiAcademicIds);
      }

      // Load extracurricular
      if (userProfile.extracurricular_involvements) {
        setCustomExtra(userProfile.extracurricular_involvements);
      }

      // Load education journey
      if (userProfile.education_journey_description) {
        setEducationJourney(userProfile.education_journey_description);
      }

      // Load employer benefits
      if (userProfile.employer_tuition_benefits !== null) {
        setEmployerTuition(userProfile.employer_tuition_benefits);
      }

      // Load scholarship types
      if (userProfile.scholarshipTypes?.length > 0) {
        const scholarshipIds = userProfile.scholarshipTypes.map(st => st.id);
        setSelectedScholarshipTypes(scholarshipIds);
      }

      // Load video types
      if (userProfile.videoTypes?.length > 0) {
        const videoIds = userProfile.videoTypes.map(vt => vt.id);
        setSelectedVideos(videoIds);
      }
    }
  };

  useEffect(() => {
    fetchInterestData();
  }, []);

  //  Toggle function for ALL tags
  const toggleTag = (tagId, section, setSection) => {
    setSection(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId],
    );
  };

  //  Add custom academic interest
  const addCustomAcademic = () => {
    if (!customAcademic.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter an academic interest',
      });
      return;
    }

    const newInterest = {
      id: `custom_academic_${Date.now()}`,
      name: customAcademic.trim(),
      isCustom: true,
    };

    // Add to academicInterests state
    setAcademicInterests(prev => [...prev, newInterest]);
    // Also select it
    setSelectedAcademic(prev => [...prev, newInterest.id]);
    setCustomAcademic('');

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Custom interest added and selected',
    });
  };

  //  Add custom extracurricular
  const addCustomExtra = () => {
    if (!customExtra.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter extracurricular activity',
      });
      return;
    }

    // For extracurricular, we just update the text field
    setCustomExtra(customExtra);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Extracurricular activity added',
    });
  };

  //  Handle employer benefits selection
  const handleEmployerSelect = value => {
    const boolValue = value === 'Yes' ? true : false;
    setEmployerTuition(boolValue);
  };

  //  Validate form
  const validateForm = () => {
    if (selectedAcademic.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select at least one academic interest',
      });
      return false;
    }

    if (!educationJourney.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please describe your education journey',
      });
      return false;
    }

    if (employerTuition === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select employer tuition benefits status',
      });
      return false;
    }

    if (selectedScholarshipTypes.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select at least one scholarship type',
      });
      return false;
    }

    if (selectedVideos.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select at least one video type',
      });
      return false;
    }

    return true;
  };

  //  Find item by ID
  const findItemById = (array, id) => {
    return array.find(item => item.id === id);
  };

  //  Get label from API data or static
  const getLabelForId = (id, sourceArray, staticArray = []) => {
    // Check API data first
    const apiItem = findItemById(sourceArray, id);
    if (apiItem) return apiItem.type_name || apiItem.name || apiItem.label;

    // Check if it's a custom academic
    if (id.startsWith('custom_academic_')) {
      const customItem = academicInterests.find(item => item.id === id);
      return customItem?.name || 'Custom';
    }

    // Check static options (for backward compatibility)
    const staticIndex = parseInt(id.split('_')[1]);
    if (!isNaN(staticIndex) && staticArray[staticIndex]) {
      return staticArray[staticIndex];
    }

    return 'Unknown';
  };

  //  Prepare interests array for API
  const prepareInterestsArray = () => {
    return selectedAcademic.map(academicId => {
      const item =
        findItemById(academicInterests, academicId) ||
        staticAcademicOptions.find(
          (_, index) => academicId === `static_academic_${index}`,
        );

      return {
        type: 'academic',
        title:
          item?.name ||
          item ||
          getLabelForId(academicId, academicInterests, staticAcademicOptions),
        ...(academicId.startsWith('custom_') ? {} : { id: academicId }),
      };
    });
  };

  //  Map static video options to API data
  const getVideoTypeId = staticLabel => {
    // Try to find matching API video type
    const apiVideo = videoTypes.find(
      vt =>
        vt.type_name.toLowerCase() === staticLabel.toLowerCase() ||
        vt.type_name.toLowerCase().includes(staticLabel.toLowerCase()),
    );

    return apiVideo
      ? apiVideo.id
      : `static_video_${staticVideoOptions.indexOf(staticLabel)}`;
  };

  //  Map static scholarship options to API data
  const getScholarshipTypeId = staticLabel => {
    // Try to find matching API scholarship type
    const apiScholarship = scholarshipTypes.find(
      st =>
        st.type_name.toLowerCase() === staticLabel.toLowerCase() ||
        st.type_name.toLowerCase().includes(staticLabel.toLowerCase()),
    );

    return apiScholarship
      ? apiScholarship.id
      : `static_scholarship_${staticScholarshipOptions.indexOf(staticLabel)}`;
  };

  //  Submit interest profile
  const submitInterestProfile = async () => {
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

      //  Prepare video type IDs (map static to API or keep static IDs)
      const videoTypeIds = selectedVideos.map(videoId => {
        if (videoId.startsWith('static_video_')) {
          const staticIndex = parseInt(videoId.split('_')[2]);
          const staticLabel = staticVideoOptions[staticIndex];
          const apiVideo = videoTypes.find(
            vt => vt.type_name.toLowerCase() === staticLabel.toLowerCase(),
          );
          return apiVideo ? apiVideo.id : videoId;
        }
        return videoId;
      });

      //  Prepare scholarship type IDs (map static to API or keep static IDs)
      const scholarshipTypeIds = selectedScholarshipTypes.map(scholarshipId => {
        if (scholarshipId.startsWith('static_scholarship_')) {
          const staticIndex = parseInt(scholarshipId.split('_')[2]);
          const staticLabel = staticScholarshipOptions[staticIndex];
          const apiScholarship = scholarshipTypes.find(
            st => st.type_name.toLowerCase() === staticLabel.toLowerCase(),
          );
          return apiScholarship ? apiScholarship.id : scholarshipId;
        }
        return scholarshipId;
      });

      //  Prepare payload according to API specification
      const payload = {
        user_id: userData.id,
        video_type_ids: videoTypeIds,
        scholarship_type_ids: scholarshipTypeIds,
        extracurricular_involvements: customExtra || null,
        employer_tuition_benefits: employerTuition,
        education_journey_description: educationJourney,
        interests: prepareInterestsArray(),
      };

      console.log(
        'Interest Profile Payload:',
        JSON.stringify(payload, null, 2),
      );

      const response = await FireApi('interest-profile', 'POST', {}, payload);

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Interests and goals saved successfully!',
        });

        //  Refresh user profile to update completion percentage
        await refreshUserProfile();

        setTimeout(() => {
          navigation.navigate('Residency');
        }, 1500);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to save interests',
        });
      }
    } catch (error) {
      console.error('Error saving interest profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save interests',
      });
    } finally {
      setSaving(false);
    }
  };

  //  Calculate progress for this screen
  const calculateScreenProgress = () => {
    let completedFields = 0;
    const totalFields = 6;

    if (selectedAcademic.length > 0) completedFields++;
    if (customExtra.trim()) completedFields++;
    if (educationJourney.trim()) completedFields++;
    if (employerTuition !== null) completedFields++;
    if (selectedScholarshipTypes.length > 0) completedFields++;
    if (selectedVideos.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  //  Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading interest data...</Text>
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
            <Text style={styles.headerTitle}>Interests and Goals</Text>
            <Text style={styles.headerProgress}>
              {userProfile?.profile_completion_percentage || 0}% Completed
            </Text>
          </View>
        </LinearGradient>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerDescription}>
          Your Profile Match Score increases as you add more details about
          yourself, helping us connect you with better scholarship and program
          matches.
        </Text>
        <Text style={styles.headerLabel}>
          You can skip any question and update it later in settings
        </Text>

        {/* Academic Interests / Career Goals */}
        <Section title="Academic Interests / Career Goals">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add custom academic interest"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={customAcademic}
              onChangeText={setCustomAcademic}
            />
            {customAcademic.trim() && (
              <TouchableOpacity
                onPress={addCustomAcademic}
                style={styles.addButton}
              >
                <Icon name="add-circle" size={24} color="#03A2D5" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {academicInterests.map((interest, index) => (
              <Tag
                key={interest.id}
                label={interest.name}
                showCross={true}
                isSelected={selectedAcademic.includes(interest.id)}
                onPress={() =>
                  toggleTag(interest.id, selectedAcademic, setSelectedAcademic)
                }
                onRemove={() =>
                  toggleTag(interest.id, selectedAcademic, setSelectedAcademic)
                }
              />
            ))}
          </View>

          {selectedAcademic.length > 0 && (
            <Text style={styles.selectedCount}>
              {selectedAcademic.length} interest(s) selected
            </Text>
          )}
        </Section>

        {/* Extracurricular Involvement */}
        <Section title="Extracurricular Involvement">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add extracurricular activities (e.g., Sports Club, Art Club)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={customExtra}
              onChangeText={setCustomExtra}
            />
            {customExtra.trim() && (
              <TouchableOpacity
                onPress={addCustomExtra}
                style={styles.addButton}
              >
                <Icon name="add-circle" size={24} color="#03A2D5" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {staticExtraOptions.map((option, index) => (
              <Tag
                key={`static_extra_${index}`}
                label={option}
                showCross={true}
                isSelected={selectedExtra.includes(`static_extra_${index}`)}
                onPress={() =>
                  toggleTag(
                    `static_extra_${index}`,
                    selectedExtra,
                    setSelectedExtra,
                  )
                }
                onRemove={() =>
                  toggleTag(
                    `static_extra_${index}`,
                    selectedExtra,
                    setSelectedExtra,
                  )
                }
              />
            ))}
          </View>

          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Education Journey Description */}
        <Section title="Tell us in one sentence what drives your education journey.">
          <TextInput
            placeholder="I want to use technology to make education accessible to everyone..."
            placeholderTextColor="#aaa"
            style={styles.input}
            value={educationJourney}
            onChangeText={setEducationJourney}
            multiline={true}
            numberOfLines={3}
          />
        </Section>

        {/* Employer Tuition Benefits */}
        <Section title="Do you currently receive employer tuition benefits or discounts?">
          <View style={styles.tagGroup}>
            {staticEmployerOptions.map((option, index) => (
              <Tag
                key={`employer_${index}`}
                label={option}
                showCross={false}
                isSelected={
                  (option === 'Yes' && employerTuition === true) ||
                  (option === 'No' && employerTuition === false)
                }
                onPress={() => handleEmployerSelect(option)}
              />
            ))}
          </View>

          {employerTuition !== null && (
            <Text style={styles.selectedText}>
              Selected: {employerTuition ? 'Yes' : 'No'}
            </Text>
          )}
        </Section>

        {/* Preferred Scholarship Types */}
        <Section title="Preferred Scholarship Types">
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {scholarshipTypes.map((type, index) => (
              <Tag
                key={type.id}
                label={type.type_name}
                showCross={false}
                isSelected={selectedScholarshipTypes.includes(type.id)}
                onPress={() =>
                  toggleTag(
                    type.id,
                    selectedScholarshipTypes,
                    setSelectedScholarshipTypes,
                  )
                }
              />
            ))}
          </View>

          {selectedScholarshipTypes.length > 0 && (
            <Text style={styles.selectedCount}>
              {selectedScholarshipTypes.length} type(s) selected
            </Text>
          )}

          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Video Preferences */}
        <Section title="Tell us what kind of videos you want to see?">
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {videoTypes.map((type, index) => (
              <Tag
                key={type.id}
                label={type.type_name}
                showCross={false}
                isSelected={selectedVideos.includes(type.id)}
                onPress={() =>
                  toggleTag(type.id, selectedVideos, setSelectedVideos)
                }
              />
            ))}
          </View>

          {selectedVideos.length > 0 && (
            <Text style={styles.selectedCount}>
              {selectedVideos.length} video type(s) selected
            </Text>
          )}
        </Section>

        {/* Action Buttons */}
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={[styles.continueBtn, saving && styles.disabledBtn]}
              onPress={submitInterestProfile}
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
            onPress={submitInterestProfile}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#03A2D5" />
            ) : (
              <Text style={styles.continueText}>Save Interests & Goals</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default InterestsGoalsScreen;

const styles = StyleSheet.create({
  //  ALL YOUR ORIGINAL STYLES - KEPT EXACTLY THE SAME
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
    marginRight: 60,
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
  suggested: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  exclamationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    elevation: 8,
  },
  selectedTag: {
    backgroundColor: '#03A2D5',
    borderColor: '#fff',
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 6,
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
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#021E38',
    color: '#fff',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  addButton: {
    marginLeft: 10,
  },
  selectedText: {
    color: '#03A2D5',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  selectedCount: {
    color: '#03A2D5',
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold',
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
});

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
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';
import { Storage } from '../../utils/Storage';
import { ProfileContext } from '../../context/ProfileContext';

const { width } = Dimensions.get('window');

// Tag Component
const Tag = ({ label, isSelected = false, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.tag,
      isSelected && styles.selectedTag
    ]}
    onPress={onPress}
  >
    <Text style={[
      styles.tagText,
      isSelected && styles.selectedTagText
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ✅ Section Component
const Section = ({ title, children, subtitle }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

const PersonalIdentityScreen = ({
  navigation,
  showHeader = true,
  startFrom,
  showContinueButton = true,
  onSave,
  customButtonLabel = 'Custom Action',
}) => {
  // ✅ States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [genderIdentities, setGenderIdentities] = useState([]);
  const [ethnicHeritages, setEthnicHeritages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [groups, setGroups] = useState([]);
  const [faiths, setFaiths] = useState([]);
  const [activities, setActivities] = useState([]);

  // ✅ Selection states
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedEthnicities, setSelectedEthnicities] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedFaiths, setSelectedFaiths] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Custom inputs
  const [customLanguage, setCustomLanguage] = useState('');
  const [customFaith, setCustomFaith] = useState('');
  const [customActivity, setCustomActivity] = useState('');

  // conext 
  const {userProfile} = useContext(ProfileContext);

  // Fetch all data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [
        genderRes,
        ethnicRes,
        langRes,
        groupRes,
        faithRes,
        activityRes
      ] = await Promise.all([
        FireApi('personal-profile/gender-identities', 'GET'),
        FireApi('personal-profile/ethnic-cultural-heritages', 'GET'),
        FireApi('personal-profile/languages-you-speak-fluently', 'GET'),
        FireApi('personal-profile/groups-you-identify-with', 'GET'),
        FireApi('personal-profile/faith-community-affiliations', 'GET'),
        FireApi('personal-profile/volunteer-or-leadership-activities', 'GET')
      ]);

      if (genderRes?.success) setGenderIdentities(genderRes.data || []);
      if (ethnicRes?.success) setEthnicHeritages(ethnicRes.data || []);
      if (langRes?.success) setLanguages(langRes.data || []);
      if (groupRes?.success) setGroups(groupRes.data || []);
      if (faithRes?.success) setFaiths(faithRes.data || []);
      if (activityRes?.success) setActivities(activityRes.data || []);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load data',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ✅ Handle selections
  const handleGenderSelect = (genderId, genderName) => {
    setSelectedGenders(prev => {
      if (prev.some(g => g.id === genderId)) {
        return [];
      }
      return [{ id: genderId, name: genderName }];
    });
  };

  const handleEthnicitySelect = (ethnicityId, ethnicityName) => {
    setSelectedEthnicities(prev => {
      const exists = prev.find(e => e.id === ethnicityId);
      if (exists) {
        return prev.filter(e => e.id !== ethnicityId);
      } else {
        return [...prev, { id: ethnicityId, name: ethnicityName }];
      }
    });
  };

  const handleLanguageSelect = (languageId, languageName) => {
    setSelectedLanguages(prev => {
      const exists = prev.find(l => l.id === languageId);
      if (exists) {
        return prev.filter(l => l.id !== languageId);
      } else {
        return [...prev, { id: languageId, name: languageName }];
      }
    });
  };

  const handleGroupSelect = (groupId, groupName) => {
    setSelectedGroups(prev => {
      const exists = prev.find(g => g.id === groupId);
      if (exists) {
        return prev.filter(g => g.id !== groupId);
      } else {
        return [...prev, { id: groupId, name: groupName }];
      }
    });
  };

  const handleFaithSelect = (faithId, faithName) => {
    setSelectedFaiths(prev => {
      const exists = prev.find(f => f.id === faithId);
      if (exists) {
        return prev.filter(f => f.id !== faithId);
      } else {
        return [...prev, { id: faithId, name: faithName }];
      }
    });
  };

  const handleActivitySelect = (activityId, activityName) => {
    setSelectedActivities(prev => {
      const exists = prev.find(a => a.id === activityId);
      if (exists) {
        return prev.filter(a => a.id !== activityId);
      } else {
        return [...prev, { id: activityId, name: activityName }];
      }
    });
  };

  // ✅ Add custom language
  const addCustomLanguage = async () => {
    if (!customLanguage.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a language',
      });
      return;
    }
    
    try {
      const response = await FireApi(
        'personal-profile/languages-you-speak-fluently',
        'POST',
        {},
        { language_name: customLanguage.trim() }
      );
      
      if (response?.success) {
        const newLang = {
          language_id: response.data?.language_id || `custom_${Date.now()}`,
          language_name: customLanguage.trim()
        };
        
        // Update languages list
        setLanguages(prev => [...prev, newLang]);
        // Automatically select the new language
        handleLanguageSelect(newLang.language_id, newLang.language_name);
        
        setCustomLanguage('');
        
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Language added successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to add language',
        });
      }
    } catch (error) {
      console.error('Error adding language:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add language',
      });
    }
  };

  // ✅ Add custom faith
  const addCustomFaith = async () => {
    if (!customFaith.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a faith/community',
      });
      return;
    }
    
    try {
      const response = await FireApi(
        'personal-profile/faith-community-affiliations',
        'POST',
        {},
        { faith_name: customFaith.trim() }
      );
      
      if (response?.success) {
        const newFaith = {
          faith_id: response.data?.faith_id || `custom_${Date.now()}`,
          faith_name: customFaith.trim()
        };
        
        // Update faiths list
        setFaiths(prev => [...prev, newFaith]);
        // Automatically select the new faith
        handleFaithSelect(newFaith.faith_id, newFaith.faith_name);
        
        setCustomFaith('');
        
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Faith/Community added successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to add faith',
        });
      }
    } catch (error) {
      console.error('Error adding faith:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add faith/community',
      });
    }
  };

  // ✅ Add custom activity
  const addCustomActivity = () => {
    if (!customActivity.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter an activity',
      });
      return;
    }
    
    const newActivity = {
      activity_id: `custom_${Date.now()}`,
      activity_name: customActivity.trim()
    };
    
    // Update activities list
    setActivities(prev => [...prev, newActivity]);
    // Automatically select the new activity
    handleActivitySelect(newActivity.activity_id, newActivity.activity_name);
    
    setCustomActivity('');
    
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Activity added successfully',
    });
  };

  // ✅ Validate UUIDs - Remove empty/undefined IDs
  const validateUUIDs = (ids) => {
    return ids.filter(id => 
      id && 
      id !== '' && 
      id !== undefined && 
      id !== null &&
      typeof id === 'string' &&
      id.trim().length > 0
    );
  };

  // ✅ Create final profile
  const createProfile = async () => {
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

      // ✅ FIX: Filter out undefined/empty IDs
      const payload = {
        user_id: userData.id,
        gender_identity_ids: validateUUIDs(selectedGenders.map(g => g.id)),
        ethnic_cultural_heritage_ids: validateUUIDs(selectedEthnicities.map(e => e.id)),
        language_ids: validateUUIDs(selectedLanguages.map(l => l.id)),
        group_ids: validateUUIDs(selectedGroups.map(g => g.id)),
        faith_ids: validateUUIDs(selectedFaiths.map(f => f.id)),
        activity_ids: validateUUIDs(selectedActivities.map(a => a.id))
      };

      console.log('Validated Profile payload:', payload);

      // ✅ Check if at least something is selected
      const totalSelections = 
        payload.gender_identity_ids.length +
        payload.ethnic_cultural_heritage_ids.length +
        payload.language_ids.length +
        payload.group_ids.length +
        payload.faith_ids.length +
        payload.activity_ids.length;

      if (totalSelections === 0) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Please select at least one option to continue.',
        });
        setSaving(false);
        return;
      }

      const response = await FireApi(
        'personal-profile',
        'POST',
        {},
        payload
      );

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Profile created successfully!',
        });
        
        setTimeout(() => {
          if (showContinueButton) {
            navigation.navigate('EduStatus');
          } else if (onSave) {
            onSave();
          }
        }, 1500);
        
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to create profile',
        });
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create profile',
      });
    } finally {
      setSaving(false);
    }
  };

  const calculateProgress = () => {
    const totalFields = 6;
    let completedFields = 0;
    
    if (selectedGenders.length > 0) completedFields++;
    if (selectedEthnicities.length > 0) completedFields++;
    if (selectedLanguages.length > 0) completedFields++;
    if (selectedGroups.length > 0) completedFields++;
    if (selectedFaiths.length > 0) completedFields++;
    if (selectedActivities.length > 0) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading data...</Text>
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
            <Text style={styles.headerTitle}>Personal Identity</Text>
            <Text style={styles.headerProgress}>
             {userProfile?.profile_completion_percentage || 0}% Completed
            </Text>
          </View>
        </LinearGradient>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'gender' && (
          <>
            <Text style={styles.headerDescription}>
              This information helps us connect you with identity-based &
              organization specific scholarships
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}
        
        {/* Gender Identity */}
        <Section title="Gender Identity" subtitle="Why we need this?">
          <View style={styles.tagGroup}>
            {genderIdentities.map(gender => (
              <Tag
                key={gender.gender_identity_id}
                label={gender.gender_identity_name}
                isSelected={selectedGenders.some(g => g.id === gender.gender_identity_id)}
                onPress={() => handleGenderSelect(
                  gender.gender_identity_id, 
                  gender.gender_identity_name
                )}
              />
            ))}
          </View>
        </Section>

        {/* Ethnic / Cultural Heritage */}
        <Section title="Ethnic / Cultural Heritage" subtitle="Why we need this?">
          <View style={styles.tagGroup}>
            {ethnicHeritages.map(ethnicity => (
              <Tag
                key={ethnicity.ethnic_cultural_heritage_id}
                label={ethnicity.ethnic_cultural_heritage_name}
                isSelected={selectedEthnicities.some(e => e.id === ethnicity.ethnic_cultural_heritage_id)}
                onPress={() => handleEthnicitySelect(
                  ethnicity.ethnic_cultural_heritage_id,
                  ethnicity.ethnic_cultural_heritage_name
                )}
              />
            ))}
          </View>
        </Section>

        {/* Languages */}
        <Section title="Languages you speak fluently">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add language e.g. Spanish"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={customLanguage}
              onChangeText={setCustomLanguage}
              onSubmitEditing={addCustomLanguage}
              returnKeyType="done"
            />
            {customLanguage.trim() && (
              <TouchableOpacity style={styles.addButton} onPress={addCustomLanguage}>
                <Icon name="add-circle" size={24} color="#03A2D5" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.tagGroup}>
            {languages.map(language => (
              <Tag
                key={language.language_id}
                label={language.language_name}
                isSelected={selectedLanguages.some(l => l.id === language.language_id)}
                onPress={() => handleLanguageSelect(
                  language.language_id,
                  language.language_name
                )}
              />
            ))}
          </View>
          
          {/* Show custom added languages that are not in API */}
          {selectedLanguages.filter(lang => lang.id.startsWith('custom_')).length > 0 && (
            <View style={styles.customItemsContainer}>
              <Text style={styles.customItemsTitle}>Custom Languages:</Text>
              <View style={styles.tagGroup}>
                {selectedLanguages
                  .filter(lang => lang.id.startsWith('custom_'))
                  .map((lang, index) => (
                    <Tag
                      key={lang.id}
                      label={lang.name}
                      isSelected={true}
                      onPress={() => {}}
                    />
                  ))}
              </View>
            </View>
          )}
        </Section>

        {/* Groups */}
        <Section title="Groups you identify with">
          <View style={styles.tagGroup}>
            {groups.map(group => (
              <Tag
                key={group.group_id}
                label={group.group_name}
                isSelected={selectedGroups.some(g => g.id === group.group_id)}
                onPress={() => handleGroupSelect(
                  group.group_id,
                  group.group_name
                )}
              />
            ))}
          </View>
        </Section>

        {/* Faith / Community */}
        <Section title="Faith / Community Affiliation">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type faith or community group (optional)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={customFaith}
              onChangeText={setCustomFaith}
              onSubmitEditing={addCustomFaith}
              returnKeyType="done"
            />
            {customFaith.trim() && (
              <TouchableOpacity style={styles.addButton} onPress={addCustomFaith}>
                <Icon name="add-circle" size={24} color="#03A2D5" />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.tagGroup}>
            {faiths.map(faith => (
              <Tag
                key={faith.faith_id || faith.community_id}
                label={faith.faith_name || faith.community_name}
                isSelected={selectedFaiths.some(f => f.id === (faith.faith_id || faith.community_id))}
                onPress={() => handleFaithSelect(
                  faith.faith_id || faith.community_id,
                  faith.faith_name || faith.community_name
                )}
              />
            ))}
          </View>
        </Section>

        {/* Activities */}
        <Section title="Leadership Activities" subtitle="Why we need this?">
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add activities (e.g. Sports Club, Art Club)"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={customActivity}
              onChangeText={setCustomActivity}
              onSubmitEditing={addCustomActivity}
              returnKeyType="done"
            />
            {customActivity.trim() && (
              <TouchableOpacity style={styles.addButton} onPress={addCustomActivity}>
                <Icon name="add-circle" size={24} color="#03A2D5" />
              </TouchableOpacity>
            )}
          </View>
          
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {activities.map(activity => (
              <Tag
                key={activity.activity_id}
                label={activity.activity_name}
                isSelected={selectedActivities.some(a => a.id === activity.activity_id)}
                onPress={() => handleActivitySelect(
                  activity.activity_id,
                  activity.activity_name
                )}
              />
            ))}
          </View>
        </Section>

        {/* Action Buttons */}
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={[styles.continueBtn, saving && styles.disabledBtn]}
              onPress={createProfile}
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
            {onSave ? (
              <TouchableOpacity 
                style={[styles.continueBtn, saving && styles.disabledBtn]}
                onPress={createProfile}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#03A2D5" />
                ) : (
                  <Text style={styles.continueText}>{customButtonLabel}</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.continueBtn, saving && styles.disabledBtn]}
                onPress={createProfile}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#03A2D5" />
                ) : (
                  <Text style={styles.continueText}>Save Profile</Text>
                )}
              </TouchableOpacity>
            )}

            {customButtonLabel === 'Update & Save' && (
              <TouchableOpacity
                style={styles.primaryBtnFull}
                onPress={() => navigation.navigate('ManageDocument')}
              >
                <Text style={styles.primaryBtnText}>Manage Document</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default PersonalIdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
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
  headerGradient: {
    width: width,
    marginTop: 10,
  },
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
    marginRight: 75,
  },
  headerProgress: {
    color: '#fff',
    fontSize: 13,
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  headerDescription: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
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
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
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
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginVertical: 8,
    fontSize: 14,
  },
  addButton: {
    marginLeft: 10,
  },
  suggested: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
    fontWeight: '500',
    marginTop: 10,
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
  customItemsContainer: {
    marginTop: 10,
  },
  customItemsTitle: {
    color: '#03A2D5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
});
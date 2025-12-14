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

//    Tag Component
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

//    Section Component
const Section = ({ title, children, subtitle }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

const FinancialInformationScreen = ({
  navigation,
  showHeader = true,
  showContinueButton = true,
}) => {
  const { userProfile, refreshUserProfile } = useContext(ProfileContext);
  
  //    States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  //    API Data States
  const [citizenshipStatuses, setCitizenshipStatuses] = useState([]);
  const [householdIncomeRanges, setHouseholdIncomeRanges] = useState([]);
  
  //    Selection States
  const [selectedCitizenshipStatus, setSelectedCitizenshipStatus] = useState(null);
  const [selectedHouseholdIncome, setSelectedHouseholdIncome] = useState(null);
  const [receivesFinancialAid, setReceivesFinancialAid] = useState(null); // true/false/null
  const [fafsaDependencyStatus, setFafsaDependencyStatus] = useState(null); // 'Independent'/'Dependent'/null
  const [workStatus, setWorkStatus] = useState(null); // 'full_time'/'part_time'/'not_working'
  const [parentOccupation, setParentOccupation] = useState('');

  //    Fetch all financial data
  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      
      const [citizenRes, householdRes] = await Promise.all([
        FireApi('financial-profile/citizenship-statuses', 'GET'),
        FireApi('financial-profile/household-income-ranges', 'GET'),
      ]);

      if (citizenRes?.success) setCitizenshipStatuses(citizenRes.data || []);
      if (householdRes?.success) setHouseholdIncomeRanges(householdRes.data || []);

      //    Load existing user data if available
      loadExistingData();

    } catch (error) {
      console.error('Error fetching financial data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load financial data',
      });
    } finally {
      setLoading(false);
    }
  };

  //    Load existing user financial data
  const loadExistingData = () => {
    if (userProfile) {
      if (userProfile.citizenship_status_id) {
        setSelectedCitizenshipStatus(userProfile.citizenship_status_id);
      }
      if (userProfile.household_income_range_id) {
        setSelectedHouseholdIncome(userProfile.household_income_range_id);
      }
      if (userProfile.receives_financial_aid_or_pell_grant !== null) {
        setReceivesFinancialAid(userProfile.receives_financial_aid_or_pell_grant);
      }
      if (userProfile.fafsa_dependency_status) {
        setFafsaDependencyStatus(userProfile.fafsa_dependency_status);
      }
      if (userProfile.work_status) {
        setWorkStatus(userProfile.work_status);
      }
      if (userProfile.parent_guardian_occupation) {
        setParentOccupation(userProfile.parent_guardian_occupation);
      }
    }
  };

  useEffect(() => {
    fetchFinancialData();
  }, []);

  //    Handle citizenship status selection
  const handleCitizenshipSelect = (statusId) => {
    setSelectedCitizenshipStatus(statusId === selectedCitizenshipStatus ? null : statusId);
  };

  //    Handle household income selection
  const handleHouseholdIncomeSelect = (incomeId) => {
    setSelectedHouseholdIncome(incomeId === selectedHouseholdIncome ? null : incomeId);
  };

  //    Handle financial aid selection
  const handleFinancialAidSelect = (value) => {
    setReceivesFinancialAid(value === receivesFinancialAid ? null : value);
  };

  //    Handle FAFSA dependency selection
  const handleFafsaSelect = (value) => {
    setFafsaDependencyStatus(value === fafsaDependencyStatus ? null : value);
  };

  //    Handle work status selection
  const handleWorkStatusSelect = (value) => {
    setWorkStatus(value === workStatus ? null : value);
  };

  //    Validate form
  const validateForm = () => {
    if (!selectedCitizenshipStatus) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select your citizenship status',
      });
      return false;
    }

    if (!selectedHouseholdIncome) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select household income range',
      });
      return false;
    }

    if (receivesFinancialAid === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select financial aid/Pell Grant status',
      });
      return false;
    }

    if (fafsaDependencyStatus === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select FAFSA dependency status',
      });
      return false;
    }

    if (workStatus === null) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Please select work status',
      });
      return false;
    }

    return true;
  };

  //    Map work status values to API format
  const getWorkStatusValue = () => {
    switch(workStatus) {
      case 'full_time': return 'full_time';
      case 'part_time': return 'part_time';
      case 'not_working': return 'not_working';
      default: return null;
    }
  };

  //    Submit financial profile
  const submitFinancialProfile = async () => {
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

      //    Prepare payload according to API specification
      const payload = {
        user_id: userData.id,
        parent_guardian_occupation: parentOccupation || null,
        citizenship_status_id: selectedCitizenshipStatus,
        household_income_range_id: selectedHouseholdIncome,
        fafsa_dependency_status: fafsaDependencyStatus, // 'Independent' or 'Dependent'
        receives_financial_aid_or_pell_grant: receivesFinancialAid, // boolean
        work_status: getWorkStatusValue(), // 'full_time', 'part_time', 'not_working'
      };

      console.log('Financial Profile Payload:', JSON.stringify(payload, null, 2));

      const response = await FireApi(
        'financial-profile',
        'POST',
        {},
        payload
      );

      if (response?.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response?.message || 'Financial information saved successfully!',
        });

        //    Refresh user profile to update completion percentage
        await refreshUserProfile();
        
        setTimeout(() => {
          navigation.navigate('Interest');
        }, 1500);
        
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response?.message || 'Failed to save financial information',
        });
      }
    } catch (error) {
      console.error('Error saving financial profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save financial information',
      });
    } finally {
      setSaving(false);
    }
  };

  //    Calculate progress for this screen
  const calculateScreenProgress = () => {
    let completedFields = 0;
    const totalFields = 6;
    
    if (selectedCitizenshipStatus) completedFields++;
    if (selectedHouseholdIncome) completedFields++;
    if (receivesFinancialAid !== null) completedFields++;
    if (fafsaDependencyStatus) completedFields++;
    if (workStatus) completedFields++;
    if (parentOccupation.trim()) completedFields++;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  //    Find label by ID
  const findLabelById = (array, id) => {
    const item = array.find(item => item.id === id);
    return item ? item.status_name || item.range_label || item.name : '';
  };

  //    Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Loading financial data...</Text>
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
            <Text style={styles.headerTitle}>Financial Information</Text>
            <Text style={styles.headerProgress}>
             {userProfile?.profile_completion_percentage || 0}% Completed
            </Text>
          </View>
        </LinearGradient>
      )}
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerDescription}>
          This section is private and will never be shared with schools or
          any third parties.
        </Text>
        <Text style={styles.headerLabel}>
          You can skip any question and update it later in settings
        </Text>

        {/* Citizenship Status */}
        <Section title="Citizenship Status" subtitle="Required">
          <View style={styles.tagGroup}>
            {citizenshipStatuses.map(status => (
              <Tag
                key={status.id}
                label={status.status_name}
                isSelected={selectedCitizenshipStatus === status.id}
                onPress={() => handleCitizenshipSelect(status.id)}
              />
            ))}
          </View>
          {selectedCitizenshipStatus && (
            <Text style={styles.selectedText}>
              Selected: {findLabelById(citizenshipStatuses, selectedCitizenshipStatus)}
            </Text>
          )}
        </Section>

        {/* Household Income */}
        <Section title="Household Income Range" subtitle="Required">
          <View style={styles.tagGroup}>
            {householdIncomeRanges.map(income => (
              <Tag
                key={income.id}
                label={income.range_label}
                isSelected={selectedHouseholdIncome === income.id}
                onPress={() => handleHouseholdIncomeSelect(income.id)}
              />
            ))}
          </View>
          {selectedHouseholdIncome && (
            <Text style={styles.selectedText}>
              Selected: {findLabelById(householdIncomeRanges, selectedHouseholdIncome)}
            </Text>
          )}
        </Section>

        {/* Pell Grants */}
        <Section title="Do you currently receive financial aid or Pell Grants?" subtitle="Required">
          <View style={styles.tagGroup}>
            <Tag
              label="Yes"
              isSelected={receivesFinancialAid === true}
              onPress={() => handleFinancialAidSelect(true)}
            />
            <Tag
              label="No"
              isSelected={receivesFinancialAid === false}
              onPress={() => handleFinancialAidSelect(false)}
            />
          </View>
          {receivesFinancialAid !== null && (
            <Text style={styles.selectedText}>
              Selected: {receivesFinancialAid ? 'Yes' : 'No'}
            </Text>
          )}
        </Section>

        {/* FAFSA */}
        <Section title="Are you independent or dependent for FAFSA purposes?" subtitle="Required">
          <View style={styles.tagGroup}>
            <Tag
              label="Independent"
              isSelected={fafsaDependencyStatus === 'Independent'}
              onPress={() => handleFafsaSelect('Independent')}
            />
            <Tag
              label="Dependent"
              isSelected={fafsaDependencyStatus === 'Dependent'}
              onPress={() => handleFafsaSelect('Dependent')}
            />
          </View>
          {fafsaDependencyStatus && (
            <Text style={styles.selectedText}>
              Selected: {fafsaDependencyStatus}
            </Text>
          )}
        </Section>

        {/* Work Status */}
        <Section title="Do you work while attending school?" subtitle="Required">
          <View style={styles.tagGroup}>
            <Tag
              label="Yes - Full-time"
              isSelected={workStatus === 'full_time'}
              onPress={() => handleWorkStatusSelect('full_time')}
            />
            <Tag
              label="Yes - Part-time"
              isSelected={workStatus === 'part_time'}
              onPress={() => handleWorkStatusSelect('part_time')}
            />
            <Tag
              label="No"
              isSelected={workStatus === 'not_working'}
              onPress={() => handleWorkStatusSelect('not_working')}
            />
          </View>
          {workStatus && (
            <Text style={styles.selectedText}>
              Selected: {
                workStatus === 'full_time' ? 'Full-time' :
                workStatus === 'part_time' ? 'Part-time' : 'Not working'
              }
            </Text>
          )}
        </Section>

        {/* Parent Occupation */}
        <Section title="Parent/Guardian Occupation">
          <TextInput
            placeholder="Enter occupation of your parent or guardian"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={parentOccupation}
            onChangeText={setParentOccupation}
          />
          <Text style={styles.helperText}>Optional - helps find occupation-specific scholarships</Text>
        </Section>

        {/* Action Buttons */}
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={[styles.continueBtn, saving && styles.disabledBtn]}
              onPress={submitFinancialProfile}
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
            onPress={submitFinancialProfile}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#03A2D5" />
            ) : (
              <Text style={styles.continueText}>Save Financial Information</Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default FinancialInformationScreen;

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
  headerProgress: { 
    color: '#fff', 
    fontSize: 13,
    textAlign: 'right',
    flexShrink: 1,
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
  tagGroup: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 4,
    elevation: 8,
  },
  selectedTag: {
    backgroundColor: '#03A2D5',
    borderColor: '#fff',
  },
  tagText: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedTagText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#03A2D5',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#021E38',
    color: '#fff',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 14,
  },
  helperText: {
    color: '#8E8E8E',
    fontSize: 11,
    marginTop: 4,
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
    fontWeight: '600' 
  },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
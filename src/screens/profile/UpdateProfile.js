import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonalIdentityScreen from '../student/PersonalIdentityScreen';
import EducationScreen from '../student/EducationStatusScreen';
import FinancialScreen from '../student/FinancialInformationScreen';
import InterestGoal from '../student/InterestsGoalsScreen';
import Residency from '../student/ResidencyEligibilityScreen';
import { ProfileContext } from '../../context/ProfileContext';

const { width } = Dimensions.get('window');

const TABS = [
  { key: 'personal', label: 'Personal' },
  { key: 'education', label: 'Education' },
  { key: 'financial', label: 'Financial' },
  { key: 'interest', label: 'Interest' },
  { key: 'residency', label: 'Residency' },
];

const UpdateProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const {userInfo, userProfile} = useContext(ProfileContext);
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalIdentityScreen
            navigation={navigation}
            showHeader={false}
            startFrom="gender"
            showContinueButton={false}
            customButtonLabel="Update & Save"
            onSave={() => {}}
          />
        );
      case 'education':
        return (
          <EducationScreen
            navigation={navigation}
            showHeader={false}
            startFrom="edu"
            showContinueButton={false}
            customButtonLabel="Update & Save"
            onSave={() => {}}
          />
        );
      case 'financial':
        return (
          <FinancialScreen
            navigation={navigation}
            showHeader={false}
            startFrom="financial"
            showContinueButton={false}
            customButtonLabel="Update & Save"
            onSave={() => {}}
          />
        );
      case 'interest':
        return (
          <InterestGoal
            navigation={navigation}
            showHeader={false}
            startFrom="interest"
            showContinueButton={false}
            customButtonLabel="Update & Save"
            onSave={() => {}}
          />
        );
      case 'residency':
        return (
          <Residency
            navigation={navigation}
            showHeader={false}
            startFrom="residency"
            showContinueButton={false}
            customButtonLabel="Update & Save"
            onSave={() => {}}
          />
        );
      default:
        return null;
    }
  };

  const Badge = ({ label }) => (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Update Profile</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Update your information to keep matches accurate
        </Text>

        {/* Profile Full Card */}
        <View style={styles.profileCard}>
          {/* Avatar with Edit Icon */}
          <View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.camIcon}>
              <Icon name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.profileName}>{userInfo?.full_name}</Text>
            <Text style={styles.profileText}>
              University of {userProfile?.institution?.name}
            </Text>
            <Text style={styles.profileText}>
              {userProfile?.fieldOfStudy?.name} 
              collegeType: {userProfile?.collegeType?.type_name}
            </Text>
          </View>

          {/* Tags */}
          <View
            style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}
          >
            <Badge label="1,203 Tokens" />
            <Badge label="Class of 2026" />
          </View>
        </View>

        {/* TAB BAR */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.tabActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.contentContainer}>{renderTabContent()}</View>
      
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingBottom: 70,
  },

  // HEADER
  headerContainer: {
    paddingHorizontal: 15,
    paddingTop: 45,
    paddingBottom: 10,
    backgroundColor: '#000',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    marginLeft: 35,
  },

  profileCard: {
    backgroundColor: '#032641',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginTop: -20,
  },
  camIcon: {
    backgroundColor: '#00C6FB',
    borderRadius: 6,
    padding: 3,
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  profileName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  profileText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
    paddingRight: 16,
  },

  badge: {
    alignSelf: 'flex-end',
    backgroundColor: '#021E38',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#03A2D5',
  },
  badgeText: {
    color: '#03A2D5',
    fontSize: 8,
    fontWeight: '500',
  },

  // TABS
  tabsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginTop: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#03A2D5',
    backgroundColor: '#000',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#03A2D5',
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  // CONTENT
  contentContainer: {
    flex: 1,
  },
});

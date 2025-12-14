// screens/HomeScreen.js
import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ScholarshipCard from '../../components/ScholarshipCard';
import EarnCard from '../../components/EarnCard';
import { Storage } from '../../utils/Storage';
import { ProfileContext } from '../../context/ProfileContext';
import { FireApi } from '../../utils/FireApi';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0.2);
  const { userInfo, userProfile } = useContext(ProfileContext);
  const [nextScreen, setNextScreen] = useState('PersonalIdentity');

  useEffect(() => {
    if (userProfile) {
      const completionPercent = userProfile.profile_completion_percentage || 0;
      
      if (completionPercent <= 13) {
        setNextScreen('PersonalIdentity');
      } else if (completionPercent > 13 && completionPercent <= 27) {
        setNextScreen('EduStatus');
      } else if (completionPercent > 27 && completionPercent <= 32) {
        setNextScreen('Financial');
      } else if (completionPercent > 33 && completionPercent <= 42) {
        setNextScreen('Interest');
      } else if (completionPercent > 42 && completionPercent <= 56) {
        setNextScreen('Residency');
      } else if (completionPercent > 56 && completionPercent <= 84) {
        setNextScreen('QuickApply');
      } else if (completionPercent > 84 && completionPercent <= 95) {
        setNextScreen('Notification');
      } else {
        // All done or near completion
        setNextScreen('Congratulations');
      }
      
      setProgress(completionPercent / 100);
    }
  }, [userProfile]);

  const earnData = [
    {
      id: '1',
      title: '5 Budgeting Tips Every Student Should Know',
      image: require('../../assets/onboarding/image2.jpg'),
      author: 'Rose William',
      views: '2.2 million',
      level: 'Beginner',
    },
    {
      id: '2',
      title: 'Smart Saving Hacks for College Students',
      image: require('../../assets/onboarding/image2.jpg'),
      author: 'Rose William',
      views: '2.1 million',
      level: 'Intermediate',
    },
  ];

  const handleContinueProfile = () => {
    navigation.navigate(nextScreen);
  };

  const getProgressText = () => {
    if (!userProfile) return 'Your Journey Begins Here';
    
    const percent = userProfile.profile_completion_percentage || 0;
    
    if (percent <= 13) return 'Start Your Journey';
    if (percent <= 27) return 'Continue Personal Identity';
    if (percent <= 32) return 'Complete Education Status';
    if (percent <= 42) return 'Fill Financial Details';
    if (percent <= 70) return 'Share Your Interests';
    if (percent <= 84) return 'Complete Residency Info';
    if (percent <= 99) return 'Finalize Your Profile';
    return 'Profile Complete!';
  };

  const getLevelText = () => {
    if (!userProfile) return 'Level 0 ➡ Level 1 "Scholar Starter"';
    
    const percent = userProfile.profile_completion_percentage || 0;
    
    if (percent < 25) return 'Level 0 ➡ Level 1 "Scholar Starter"';
    if (percent < 50) return 'Level 1 ➡ Level 2 "Profile Builder"';
    if (percent < 75) return 'Level 2 ➡ Level 3 "Detail Expert"';
    if (percent < 100) return 'Level 3 ➡ Level 4 "Almost There"';
    return 'Level 4 "Profile Master" ✅';
  };

   const getAllPerks = async () => {
          const res = await FireApi('perks', 'GET');
          console.log(res, 'fffffff');
      };
  
      useEffect(() => {
          getAllPerks();
      }, []);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.tokenContainer}>
          <Icon name="cash-outline" size={18} color="#fff" />
          <Text style={styles.tokenText}>0</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity style={styles.bellContainer}>
          <Icon name="notifications-outline" size={22} color="#FFA629" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome, {userInfo?.full_name}! 👋</Text>
          <Text style={styles.subtitle}>
            Let's take the next step toward funding your education.
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
            <View style={styles.rocketIcon}>
              <Icon name="rocket-outline" size={30} color="#fff" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.levelText}>{getProgressText()}</Text>
              <Text style={styles.levelHeader}>{getLevelText()}</Text>
            </View>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={[
              styles.progressBarFill, 
              { 
                width: `${(userProfile?.profile_completion_percentage || 0)}%`,
                backgroundColor: userProfile?.profile_completion_percentage === 100 ? '#4CAF50' : '#03A2D5'
              }
            ]} />
          </View>

          <Text style={[styles.subtitle, { marginTop: 6 }]}>
            Profile Completion: {userProfile?.profile_completion_percentage || 0}%
          </Text>

          <TouchableOpacity 
            style={styles.rewardsBtn}
            onPress={handleContinueProfile}
          >
            <Text style={styles.rewardsText}>
              {userProfile?.profile_completion_percentage === 100 
                ? 'View Matched Scholarships'
                : 'Continue Your Profile'}
            </Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.skipBtn}
            onPress={() => navigation.navigate('stdDashboardFinal')}
          >
            <Text style={styles.skipText}>Explore without completing</Text>
          </TouchableOpacity>
        </View>

        {/* Verified Opportunity Section - Show only if profile is complete */}
        {userProfile?.profile_completion_percentage === 100 ? (
          <>
            <View style={styles.sectionHeaderRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="checkmark-circle" size={20} color="#FFD700" style={{ marginRight: 6 }} />
                <Text style={styles.sectionTitle}>Matched Scholarships</Text>
              </View>
            </View>

            <ScholarshipCard
              title="Academic Excellence Scholarship"
              amount="2,500"
              deadline="Oct 20, 2025"
              matched="89"
              type="new"
              tags={['🎓 Undergraduation', '📈 3.5+ GPA', '🏅 Merit-Based']}
            />
          </>
        ) : (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              🚀 Complete {100 - (userProfile?.profile_completion_percentage || 0)}% more to unlock matched scholarships!
            </Text>
          </View>
        )}

        {/*  Earn While You Learn */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎥 Earn While You Learn</Text>
          <TouchableOpacity style={styles.i}>
            <Text style={styles.viewAllText}>View Video Hub</Text>
            <Icon name="arrow-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={earnData}
          renderItem={({ item }) => (
            <EarnCard {...item} />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/*  Complete Profile Card - Show current section info */}
        <View style={styles.profileCard}>
          <Text style={styles.profileCardTitle}>Complete Your Profile</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[
                styles.progressFill, 
                { 
                  width: `${userProfile?.profile_completion_percentage || 0}%`,
                  backgroundColor: userProfile?.profile_completion_percentage === 100 ? '#4CAF50' : '#03A2D5'
                }
              ]} />
            </View>
            <Text style={styles.progressPercent}>{`${userProfile?.profile_completion_percentage || 0}%`}</Text>
          </View>

          {/*  Show completed and pending sections dynamically */}
          {userProfile?.profile_completion_percentage === 100 ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="checkmark-outline" size={18} color="#4CAF50" />
                <Text style={[styles.profileSteps, { color: '#4CAF50' }]}>✓ All sections completed!</Text>
              </View>
            </>
          ) : (
            <>
              {/* Show completed sections */}
              {userProfile?.profile_completion_percentage >= 14 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-outline" size={18} color="#4CAF50" />
                  <Text style={[styles.profileSteps, { color: '#4CAF50' }]}>Personal Identity</Text>
                </View>
              )}
              
              {userProfile?.profile_completion_percentage >= 28 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-outline" size={18} color="#4CAF50" />
                  <Text style={[styles.profileSteps, { color: '#4CAF50' }]}>Education Status</Text>
                </View>
              )}
              
              {/* Show next section */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Icon 
                  name="arrow-forward-circle-outline" 
                  size={18} 
                  color="#03A2D5" 
                />
                <Text style={[styles.profileSteps, { color: '#03A2D5', fontWeight: 'bold' }]}>
                  {nextScreen === 'PersonalIdentity' && 'Personal Identity'}
                  {nextScreen === 'EduStatus' && 'Education Status'}
                  {nextScreen === 'Financial' && 'Financial Information'}
                  {nextScreen === 'Interest' && 'Interests & Goals'}
                  {nextScreen === 'Residency' && 'Residency Information'}
                  {nextScreen === 'QuickApply' && 'Quick Apply Setup'}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity 
            style={styles.continueBtn}
            onPress={handleContinueProfile}
          >
            <Text style={styles.continueText}>
              {userProfile?.profile_completion_percentage === 100 
                ? 'View Dashboard' 
                : `Continue to ${nextScreen === 'PersonalIdentity' ? 'Personal Identity' : 
                   nextScreen === 'EduStatus' ? 'Education Status' :
                   nextScreen === 'Financial' ? 'Financial Info' :
                   nextScreen === 'Interest' ? 'Interests & Goals' :
                   nextScreen === 'Residency' ? 'Residency' : 'Next Step'}`}
            </Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/*  Student Perks */}
        <View style={styles.studentPerks}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>🎁 Student Perks</Text>
            <TouchableOpacity style={styles.i}>
              <Text style={styles.learnMore}>Learn more</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.lockedBox}>
            <Icon 
              name={userProfile?.profile_completion_percentage === 100 ? "lock-open-outline" : "lock-closed-outline"} 
              size={30} 
              color="#03A2D5" 
            />
            <Text style={styles.lockedText}>
              {userProfile?.profile_completion_percentage === 100 
                ? "🎉 Profile complete! You can now redeem rewards and tuition perks."
                : "Redeem rewards and tuition perks once you complete your profile."}
            </Text>
          </View>

          <TouchableOpacity style={styles.rewardsBtn}>
            <Text style={styles.rewardsText}>Learn How Rewards Work</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 30,paddingBottom:30 },
  i: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 6 },
  scrollContainer: { paddingBottom: 70 },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  logo: { width: 110, height: 65, resizeMode: 'contain' },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#606060',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tokenText: { color: '#fff', fontWeight: '700', marginLeft: 5 },
  bellContainer: { backgroundColor: '#021E38', borderRadius: 10, padding: 6 },

  welcomeCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  rocketIcon: {
    backgroundColor: '#03A2D5',
    padding: 14,
    borderRadius: 10,
  },
  welcomeText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#fff', fontSize: 14, marginVertical: 6 },
  levelText: { color: '#fff', fontSize: 20, fontWeight: '700' },
  levelHeader: { color: '#fff', fontSize: 15, fontWeight: '500' },
  progressBarBackground: {
    backgroundColor: '#03365B',
    borderRadius: 10,
    height: 8,
    overflow: 'hidden',
    marginTop: 14,
  },
  skipBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: { color: '#fff', fontWeight: '600', fontSize: 18 },

  sectionHeaderRow: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 6,
  },
  sectionHeader: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  infoCard: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 12,
    marginVertical: 15,
  },
  infoText: { color: '#fff', fontSize: 14 },

  profileCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  profileCardTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  progressBackground: {
    backgroundColor: '#03365B',
    height: 6,
    borderRadius: 10,
    width: '80%',
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#03A2D5',
    borderRadius: 10,
  },
  progressPercent: { color: '#fff', fontSize: 14 },

  profileSteps: { color: '#fff', fontSize: 14, marginVertical: 4 },

  continueBtn: {
    backgroundColor: '#03A2D5',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  continueText: { color: '#fff', fontWeight: '600', marginRight: 8 },

  studentPerks: {
    marginHorizontal: 15,
  },
  sectionHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  lockedBox: {
    backgroundColor: '#001A2E',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  lockedText: { color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 10 },

  rewardsBtn: {
    backgroundColor: '#03A2D5',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  rewardsText: { color: '#fff', fontSize: 16, fontWeight: '600', marginRight: 8 },

  viewAllText: { color: '#03A2D5', fontSize: 14 },
  learnMore: { color: '#03A2D5', fontSize: 14 },
});

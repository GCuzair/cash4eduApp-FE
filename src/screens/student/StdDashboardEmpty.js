// screens/HomeScreen.js
import React, { useState } from 'react';
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

// ✅ Importing Components you provided
import ScholarshipCard from '../../components/ScholarshipCard';
import EarnCard from '../../components/EarnCard';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0.2);

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

        {/* ✅ Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Welcome, Aroma! 👋</Text>
          <Text style={styles.subtitle}>
            Let’s take the first step toward funding your education.
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
            <View style={styles.rocketIcon}>
              <Icon name="rocket-outline" size={30} color="#fff" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.levelText}>Your Journey Begins Here</Text>
              <Text style={styles.levelHeader}>Level 0 ➡ Level 1 “Scholar Starter”</Text>
            </View>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%`, backgroundColor: '#03A2D5' }]} />
          </View>

          <Text style={[styles.subtitle, { marginTop: 6 }]}>
            Every step you take earns you rewards!
          </Text>

          <TouchableOpacity style={styles.rewardsBtn}
            onPress={() => navigation.navigate('PersonalIdentity')}>
            <Text style={styles.rewardsText}>Complete Your Profile</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn}>
            <Text style={styles.skipText}>Explore without completing</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Verified Opportunity Section */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-circle" size={20} color="#FFD700" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Verified Opportunity</Text>
          </View>
        </View>

        {/* ✅ Using your ScholarshipCard */}
        <ScholarshipCard
          title="Academic Excellence Scholarship"
          amount="2,500"
          deadline="Oct 20, 2025"
          matched="89"
          type="new"
          tags={['🎓 Undergraduation', '📈 3.5+ GPA', '🏅 Merit-Based']}
        />
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🚀 Just one step away! Complete your profile to unlock matched scholarships
          </Text>
        </View>

        {/* ✅ Earn While You Learn */}
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

        {/* ✅ Complete Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.profileCardTitle}>Complete Your Profile</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{`${progress * 100}%`}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-outline" size={18} color="#fff" />
            <Text style={styles.profileSteps}>Financial and Household Information</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-outline" size={18} color="#fff" />
            <Text style={styles.profileSteps}>Interests, Hobbies & Goals</Text>
          </View>

          <Icon name="alert-circle-outline" size={16} color="#fff" style={styles.exclamationIcon} />

          <TouchableOpacity style={styles.continueBtn}
            onPress={() => navigation.navigate('stdDashboardFinal')}>
            <Text style={styles.continueText}>Continue Profile</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ✅ Student Perks */}
        <View style={styles.studentPerks}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderTitle}>🎁 Student Perks</Text>
            <TouchableOpacity style={styles.i}>
              <Text style={styles.learnMore}>Learn more</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.lockedBox}>
            <Icon name="lock-closed-outline" size={30} color="#03A2D5" />
            <Text style={styles.lockedText}>
              Redeem rewards and tuition perks once you complete your profile.
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

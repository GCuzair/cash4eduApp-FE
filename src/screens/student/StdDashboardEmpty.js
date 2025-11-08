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

const { width, height } = Dimensions.get('window');

/* ✅ ScholarshipCard Component (same styling as CongratulationsScreen) */
const ScholarshipCard = ({ title, amount, deadline, tags, matched, type }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Icon
        name="heart"
        size={20}
        color={type === 'featured' ? '#FF5F5F' : '#8E8E8E'}
      />
      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: '#12DB00' }]}>
          <Text style={styles.badgeText}>{matched}% Matched</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: type === 'featured' ? '#FFC947' : '#03A2D5' },
          ]}>
          <Text style={styles.badgeText}>
            {type === 'featured' ? 'Featured' : 'New'}
          </Text>
        </View>
      </View>
    </View>

    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.amount}>${amount}</Text>
    <Text style={styles.deadline}>Deadline: {deadline}</Text>

    <View style={styles.tagRow}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>

    <View style={styles.actionRow}>
      <TouchableOpacity>
        <Icon name="bookmark-outline" size={30} color="#03A2D5" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyBtn}>
        <Text style={styles.applyText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  </View>
);

/* ✅ Replaces old VerifiedOpportunityCard */
const VerifiedOpportunityCard = () => (
  <ScholarshipCard
    title="Academic Excellence Scholarship"
    amount="2,500"
    deadline="Oct 20, 2025"
    matched="89"
    type="new"
    tags={['🎓 Undergraduation', '📈 3.5+ GPA', '🏅 Merit-Based']}
  />
);

/* ✅ Earn While You Learn Card (Video Card Updated Design) */
const EarnCard = ({ image, title, level, views, author }) => (
  <View style={styles.videoCard}>
    <Image source={image} style={styles.videoImage} />
    <View style={styles.playIconContainer}>
      <Icon name="play-circle" size={40} color="#fff" />
    </View>
    <View style={styles.videoInfo}>
      <Text style={styles.videoTitle} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.videoMeta}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.views}>{views} views</Text>
      </View>
      <Text style={styles.level}>{level}</Text>
    </View>
  </View>
);

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
        {/* Welcome Card */}
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
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
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

  {/* ✅ Verified Opportunity Section with Tick Icon */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="checkmark-circle" size={20} color="#FFD700" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Verified Opportunity</Text>
          </View>
        </View>
        <VerifiedOpportunityCard />

        {/* ✅ New Section (Blue Info Card) */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🚀 Just one step away! Complete your profile to unlock matched scholarships
            <Icon name="arrow-forward" size={14} color="#fff" />
          </Text>
        </View>

        {/* ✅ Earn While You Learn Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎥 Earn While You Learn</Text>
          <TouchableOpacity style={styles.i}>
            <Text style={styles.viewAllText}>View Video Hub</Text>
            <Icon name="arrow-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={earnData}
          renderItem={({ item }) => (
            <EarnCard
              image={item.image}
              title={item.title}
              author={item.author}
              views={item.views}
              level={item.level}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingRight: 15 }}
        />

        {/* Complete Profile Card */}
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

          <Icon
            name="alert-circle-outline"
            size={16}
            color="#fff"
            style={styles.exclamationIcon}
          />

          <TouchableOpacity style={styles.continueBtn}
          onPress={() => navigation.navigate('stdDashboardFinal')}>
            <Text style={styles.continueText}>Continue Profile</Text>
            <Icon name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Student Perks */}
        <View style={styles.studentPerks}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
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
  container: { flex: 1, backgroundColor: '#000' },
  i: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
  },
  exclamationIcon: { position: 'absolute', top: 10, right: 10 },
  scrollContainer: { paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#000',
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
  bellContainer: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 6,
  },

  /** Welcome Card **/
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
  progressBarFill: {},
  skipBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  skipText: { color: '#fff', fontWeight: '600', fontSize: 18 },

  /** Scholarship Card **/
  card: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRow: { flexDirection: 'row' },
  badge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  badgeText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginTop: 5 },
  amount: { color: '#03A2D5', fontSize: 20, fontWeight: '600' },
  deadline: { color: '#51E3FC', fontSize: 15, marginVertical: 6 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  tag: {
    borderRadius: 6,
    borderColor: '#03A2D5',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 25,
    elevation: 8,
  },
  applyText: { color: '#03A2D5', fontSize: 16, fontWeight: '600' },

  /** Earn Section **/
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
    paddingRight: 14,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 18,
    marginBottom: 6,
  },
  viewAllText: { color: '#51E3FC', fontSize: 10, marginRight: 5 },
  earnCard: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    width: width * 0.6,
    marginLeft: 15,
    paddingBottom: 12,
  },
  earnImage: {
    width: '100%',
    height: 110,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  earnTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    paddingHorizontal: 8,
  },

  /** Profile **/
  profileCard: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    marginHorizontal: 15,
    padding: 15,
    marginVertical: 15,
  },
  profileCardTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBackground: {
    backgroundColor: '#fff',
    height: 6,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
  },
  progressFill: {
    backgroundColor: '#03A2D5',
    height: 6,
    borderRadius: 10,
  },
  progressPercent: { color: '#fff', fontSize: 12 },
  profileSteps: { color: '#fff', fontSize: 14, fontWeight: '600', marginVertical: 6 },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#03A2D5',
    borderRadius: 30,
    paddingVertical: 10,
    marginTop: 10,
  },
  continueText: { color: '#fff', fontWeight: '600', fontSize: 16, marginRight: 8 },

  /** Student Perks **/
  studentPerks: { paddingHorizontal: 15, marginBottom: 30 },
  sectionHeaderTitle: { color: '#fff', fontWeight: '700', fontSize: 16 },
  learnMore: { color: '#51E3FC', fontSize: 14, marginRight: 5 },
  lockedBox: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  lockedText: {
    color: '#A3A3A3',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15,
  },
  rewardsBtn: {
    backgroundColor: '#03A2D5',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rewardsText: { color: '#fff', fontWeight: '600', fontSize: 18, marginRight: 7 },

  /** Bottom Nav **/
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#021E38',
  },


  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 15,
  },
  sectionTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },

  /** Blue Info Card **/
  infoCard: {
    borderWidth: 1,
    borderColor: '#03A2D5',
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    flexDirection:'row',
    alignItems:'center'
  },
  infoText: {
    color: '#03A2D5',
    fontSize: 13,
    fontWeight: '500',
  },
  

  /** Video Section **/
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
    paddingRight: 14,
  },
  i: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { color: '#51E3FC', fontSize: 10, marginRight: 5 },

  /** Video Card **/
  videoCard: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    width: width * 0.6,
    marginLeft: 15,
    marginBottom: 15,
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  playIconContainer: {
    position: 'absolute',
    top: 40,
    left: '40%',
  },
  videoInfo: {
    padding: 10,
  },
  videoTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  author: { color: '#A3A3A3', fontSize: 12 },
  views: { color: '#A3A3A3', fontSize: 12 },
  level: {
    color: '#12DB00',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },

  /** Scholarship Card **/
  card: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 18,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRow: { flexDirection: 'row' },
  badge: {
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  badgeText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: '600', marginTop: 5 },
  amount: { color: '#03A2D5', fontSize: 20, fontWeight: '600' },
  deadline: { color: '#51E3FC', fontSize: 15, marginVertical: 6 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  tag: {
    borderRadius: 6,
    borderColor: '#03A2D5',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applyBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 25,
  },
  applyText: { color: '#03A2D5', fontSize: 16, fontWeight: '600' },

});

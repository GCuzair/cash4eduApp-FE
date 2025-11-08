import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

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

const CongratulationsScreen = ({ navigation }) => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <View style={styles.container}>
      {/* Background screen content */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={34} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../../assets/images/celebration.png')}
          style={styles.confettiImage}
          resizeMode="cover"
        />

        <View style={styles.celebration}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.congratsTitle}>Congratulations!</Text>
          <Text style={styles.congratsSubtitle}>
            Your Cash4Edu profile is set up.
          </Text>
          <Text style={styles.congratsText}>
            You’re all set! Your personalized scholarship matches are ready.
            Complete your first application now or explore more opportunities.
          </Text>
        </View>

        <ScholarshipCard
          title="First Generation College Student Grant"
          amount="2,500"
          deadline="Oct 20, 2025"
          matched="92"
          type="featured"
          tags={['🎓 Any Level', '🌟 First-Gen', '💰 Need Based']}
        />

        <ScholarshipCard
          title="Academic Excellence Scholarship"
          amount="2,500"
          deadline="Oct 20, 2025"
          matched="89"
          type="new"
          tags={['🎓 Undergraduation', '📈 3.5+ GPA', '🏅 Merit-Based']}
        />

        <ScholarshipCard
          title="First Generation College Student Grant"
          amount="2,500"
          deadline="Oct 20, 2025"
          matched="95"
          type="featured"
          tags={['🎓 Any Level', '🌟 First-Gen', '💰 Need Based']}
        />

        <TouchableOpacity style={styles.viewMoreBtn}
        >
          <Text style={styles.viewMoreText}>View More Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeBtn}
        onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.homeText}>Go to Home</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* White Popup Overlay */}
      {showPopup && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowPopup(false)}
          style={styles.overlayContainer}>
          <View style={styles.whiteBox}>
            <Image
              source={require('../../assets/images/tick.png')}
              style={styles.tickImage}
            />
            <Text style={styles.completedText}>100% Completed</Text>
            <Text style={styles.subtitle}>Profile completed successfully!</Text>
            <Text style={styles.rewardText}>You've been rewarded with</Text>
            <Text style={styles.tokenText}>200 Tokens</Text>
            <Image
              source={require('../../assets/images/box.jpg')}
              style={styles.giftBox}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CongratulationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  confettiImage: { width: width, height: 180, alignSelf: 'center' },
  topBar: { position: 'absolute', top: 45, left: 20, zIndex: 10 },
  scrollContainer: { paddingHorizontal: 15, paddingBottom: 40 },
  emoji: { fontSize: 40, marginTop: -120 },
  celebration: { alignItems: 'center', marginBottom: 15, paddingHorizontal: 10 },
  congratsTitle: { color: '#fff', fontSize: 32, fontWeight: '600' },
  congratsSubtitle: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 5,
  },
  congratsText: {
    color: '#A3A3A3',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
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
  viewMoreBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 25,
  },
  viewMoreText: { color: '#03A2D5', fontSize: 18, fontWeight: '600' },
  homeBtn: {
    backgroundColor: '#03A2D5',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 25,
  },
  homeText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  /** Overlay (white popup) **/
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: width * 0.8,
  },
  tickImage: { width: 120, height: 105, },
  completedText: { fontSize: 32, fontWeight: '600', color: '#03A2D5' },
  subtitle: { fontSize: 16, color: '#0257A7', marginTop: 6 },
  rewardText: { fontSize: 16, color: '#0257A7' },
  tokenText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0257A7',
    marginVertical: 10,
  },
  giftBox: { width: 180, height: 100, marginTop: 5 },
});

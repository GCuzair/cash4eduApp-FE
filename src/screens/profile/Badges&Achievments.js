import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AchievementCard = ({ title, subtitle, tokens, icon, color }) => (
  <View style={styles.achievementCard}>
    <View style={[styles.iconWrapper, { backgroundColor: color }]}>
      <Icon name={icon} size={28} color="#fff" />
    </View>
    <Text style={styles.achievementTitle}>{title}</Text>
    <Text style={styles.achievementSubtitle}>{subtitle}</Text>

    <TouchableOpacity style={styles.tokenBtn}>
      <Text style={styles.tokenText}>+{tokens} Tokens</Text>
    </TouchableOpacity>
  </View>
);

const AchievementsScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Scholarship', 'Learning'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
      </View>

      <Text style={styles.headerSubtitle}>
        Earn badges, level up, and unlock new rewards
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.levelCard}>
          <View style={styles.levelRow}>
            <View style={styles.rocketIcon}>
              <Icon name="rocket-outline" size={30} color="#fff" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.levelTitle}>Level 3 - Scholarship Explorer</Text>
              <Text style={styles.levelSubtitle}>
                * Keep going to reach Level 4!
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={styles.progresstext}>XP Progress</Text>
            <Text style={styles.progressText}>1,203 / 2,000 XP</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '60%' }]} />
          </View>

          <View style={styles.rewardRow}>
            <Text style={styles.rewardText}>+200 Tokens</Text>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View Level Map</Text>
              <Icon name="arrow-forward" size={14} color="#03A2D5" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FILTERS */}
        <View style={styles.filterRow}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterBtn,
                activeFilter === filter && styles.filterActive,
              ]}
            >
              <Text
                style={
                  activeFilter === filter
                    ? styles.filterTextActive
                    : styles.filterText
                }
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ACHIEVEMENT CARDS */}
        <View style={styles.cardsContainer}>
          <AchievementCard
            title="Verified Profile"
            subtitle="Profile 100% complete"
            tokens={100}
            icon="person-circle-outline"
            color="#FFB636"
          />
          <AchievementCard
            title="Scholarship Starter"
            subtitle="Applied to 5 scholarships"
            tokens={75}
            icon="school-outline"
            color="#78DB89"
          />
          <AchievementCard
            title="Video Learner"
            subtitle="Watched 10 videos"
            tokens={50}
            icon="play-circle-outline"
            color="#78DB89"
          />
          <AchievementCard
            title="Token Collector"
            subtitle="Earn 1,000 tokens"
            tokens={100}
            icon="wallet-outline"
            color="#FFB636"
          />
          <AchievementCard
            title="Scholarship Star"
            subtitle="Applied to 15 scholarships"
            tokens={125}
            icon="star-outline"
            color="#78DB89"
          />
          <AchievementCard
            title="Referral Champion"
            subtitle="Invite 5 friends"
            tokens={75}
            icon="share-social-outline"
            color="#FFB636"
          />
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Your Achievements So Far</Text>

          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Badges Unlocked</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4,250</Text>
              <Text style={styles.statLabel}>Total XP Earned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1,350</Text>
              <Text style={styles.statLabel}>Tokens from Badges</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.gradientBtnFull}
          onPress={() => navigation.navigate("ProfileAnalytics")}>
            <Text style={styles.gradientBtnText}>View Full Analytics</Text>
            <Icon name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* CTA - ALMOST THERE */}
        <LinearGradient
          colors={['#03A2D5', '#05549E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaCard}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Almost there! ✅</Text>
            <Text style={styles.ctaSubtitle}>
              2 more scholarships to unlock {'\n'}"Scholarship Star"
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.ctaBtn, { backgroundColor: '#FFB636' }]}
            >
              <Text style={styles.ctaBtnText}>Apply Now</Text>
              <Icon name="arrow-forward" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* CTA - QUICK WIN */}
        <LinearGradient
          colors={['#03A2D5', '#05549E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.ctaCard, { marginTop: 10 }]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Quick win! 🎥</Text>
            <Text style={styles.ctaSubtitle}>
              Watch 1 more video to {'\n'}earn 50 tokens
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.ctaBtn, { backgroundColor: '#78DB89' }]}
            >
              <Text style={[styles.ctaBtnText, { color: '#000' }]}>Watch Now</Text>
              <Icon name="arrow-forward" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default AchievementsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingBottom: 40 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '700', marginLeft: 10 },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 50,
    marginTop: 2,
    marginBottom: 10,
  },
  scrollContainer: { paddingBottom: 80 },
  levelCard: {
    backgroundColor: '#021E38',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  levelRow: { flexDirection: 'row', alignItems: 'center' },
  rocketIcon: {
    backgroundColor: '#03A2D5',
    padding: 14,
    borderRadius: 10,
  },
  levelTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  levelSubtitle: { color: '#E0E0E0', fontSize: 13 },
  progressBar: {
    height: 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressFill: { height: 9, backgroundColor: '#03A2D5', borderRadius: 5 },
  progressText: { color: '#fff', fontSize: 16, marginTop: 4, fontWeight: '500' },
  progresstext: { color: '#fff', fontSize: 16, marginTop: 4 },
  rewardRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardText: { color: '#03A2D5', fontSize: 18, fontWeight: '500' },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewBtnText: { color: '#03A2D5', fontSize: 13, marginRight: 5 },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  filterBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 26,
    marginHorizontal: 6,
  },
  filterActive: { backgroundColor: '#03A2D5' },
  filterText: { color: '#fff', fontSize: 13 },
  filterTextActive: { color: '#fff', fontSize: 13, fontWeight: '600' },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  achievementCard: {
    width: width / 2.3,
    backgroundColor: '#021E38',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    margin: 6,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementTitle: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  achievementSubtitle: { color: '#ccc', fontSize: 12, marginVertical: 2, textAlign: 'center' },
  tokenBtn: {
    backgroundColor: '#03A2D5',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginTop: 8,
  },
  tokenText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  summaryBox: {
    backgroundColor: '#021E38',
    borderRadius: 14,
    margin: 15,
    padding: 16,
    alignItems: 'center',
  },
  summaryTitle: { color: '#fff', fontSize: 18, fontWeight: '600', alignSelf: 'flex-start' },
  summaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statItem: { width: '45%', alignItems: 'center', marginBottom: 10 },
  statNumber: { color: '#fff', fontSize: 28, fontWeight: '700' },
  statLabel: { color: '#fff', fontSize: 12, textAlign: 'center' },
  gradientBtnFull: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#03A2D5',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignSelf: 'center',
    marginTop: 15,
  },
  gradientBtnText: { color: '#fff', fontSize: 16, marginRight: 6, fontWeight: '600' },
  ctaCard: {
    borderRadius: 14,
    marginHorizontal: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  ctaTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  ctaSubtitle: { color: '#fff', fontSize: 12, flexWrap: 'wrap' },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    minWidth: 100,
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  ctaBtnText: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 5,
    flexShrink: 1,
  },
});

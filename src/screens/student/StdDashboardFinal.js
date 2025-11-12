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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScholarshipCard from '../../components/ScholarshipCard';
import PerkCard from '../../components/PerkCard';
import EarnCard from '../../components/EarnCard';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [progress, setProgress] = useState(0.2);
  const [selectedTag, setSelectedTag] = useState('STEM');

  const earnData = [
    {
      id: '1',
      title: '5 Budgeting Tips Every Student Should Know',
      image: require('../../assets/onboarding/image2.jpg'),
      author: 'Rose William',
      views: '2.2M',
    },
    {
      id: '2',
      title: 'Smart Saving Hacks for College Students',
      image: require('../../assets/onboarding/image2.jpg'),
      author: 'John Davis',
      views: '1.8M',
    },
  ];

  const perkData = [
    {
      id: '1',
      title: 'Pizza Hut College Plan',
      desc: 'Get exclusive student discounts on pizzas nationwide.',
      image: require('../../assets/images/pizza.png'),
    },
    {
      id: '2',
      title: 'McDonald’s Meal Deal',
      desc: 'Free fries and drink with every student combo meal.',
      image: require('../../assets/images/burger.png'),
    },
    {
      id: '3',
      title: 'Spotify Student Premium',
      desc: '50% off Premium with free Hulu and Showtime bundle.',
      image: require('../../assets/images/spotify.png'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.tokenContainer}>
          <Icon name="cash-outline" size={18} color="#fff" />
          <Text style={styles.tokenText}>125</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
        />

        <TouchableOpacity style={styles.bellContainer}>
          <Icon name="notifications-outline" size={22} color="#FFA629" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Welcome */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome Back, Aroma! 👋</Text>
          <Text style={styles.subtitle}>
            Ready to discover new scholarships?
          </Text>
        </View>

        {/* Earn Tokens */}
        <View style={styles.tokenCard}>
          <Text style={styles.tokenEarned}>
            You’ve earned 125 tokens this week 🎉
          </Text>
          <Text style={styles.tokenStreak}>🔥 Streak: 3 Days</Text>

          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>

          <TouchableOpacity style={styles.watchBtn}>
            <Text style={styles.watchText}>Watch Now</Text>
            <Icon name="arrow-forward" size={16} color="#03A2D5" />
          </TouchableOpacity>
        </View>

        {/* Search + Tags */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Icon name="search-outline" size={18} color="#A3A3A3" />
            <TextInput
              style={styles.searchInput}
              placeholder="Scholarships, programs, or perks..."
              placeholderTextColor="#A3A3A3"
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagRow}>
            {[
              'STEM',
              'Athletes',
              'Creatives',
              'Need',
              'Leadership',
              'Community',
              'Women in Tech',
            ].map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <TouchableOpacity key={tag} onPress={() => setSelectedTag(tag)}>
                  <View style={[
                    styles.categoryTag,
                    isSelected && { backgroundColor: '#03A2D5', borderColor: '#03A2D5' }
                  ]}>
                    <Text style={[
                      styles.categoryText,
                      isSelected && { color: '#fff', fontWeight: '700' }
                    ]}>
                      {tag}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Personalized */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎓 Your Personalized Matches</Text>
          <TouchableOpacity style={styles.i}>
            <Text style={styles.viewAllText}>See All</Text>
            <Icon name="arrow-forward" size={14} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScholarshipCard
          title="First Generation College Student Grant"
          amount="2,500"
          deadline="Oct 20, 2025"
          matched="89"
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

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View My Applications</Text>
          <Icon name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>

        {/* Earn & Learn */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎥 Earn and Learn</Text>
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

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View All Videos</Text>
          <Icon name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>

        {/* Perks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎁 Student Perks</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Learn More</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={perkData}
          renderItem={({ item }) => (
            <PerkCard {...item} />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View All Perks</Text>
          <Icon name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingBottom: 85, paddingTop: 30 },
  i: { flexDirection: 'row', alignItems: 'center', padding: 6 },
  viewAllText: { color: '#51E3FC', fontSize: 12, marginRight: 5 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB636',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tokenText: { color: '#fff', fontWeight: '700', marginLeft: 5 },
  logo: { width: 110, height: 65, resizeMode: 'contain' },
  bellContainer: { backgroundColor: '#021E38', borderRadius: 10, padding: 6 },

  /* Welcome */
  welcomeCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  welcomeTitle: { color: '#fff', fontSize: 20, fontWeight: '700', paddingRight: 90 },
  subtitle: { color: '#fff', fontSize: 14, marginTop: 5 },

  /* Token Card */
  tokenCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  tokenEarned: { color: '#fff', fontSize: 20, fontWeight: '700' },
  tokenStreak: { color: '#ffff', fontSize: 16, marginTop: 5, fontWeight: '600', textAlign: 'right' },
  progressBarBackground: { backgroundColor: '#fff', borderRadius: 10, height: 8, marginTop: 4 },
  progressBarFill: { backgroundColor: '#03A2D5', height: 8, borderRadius: 10 },
  watchBtn: {
    borderColor: '#03A2D5',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 15,
    width: 160,
  },
  watchText: { color: '#03A2D5', marginRight: 6, fontWeight: '600' },

  /* Search */
  searchContainer: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#03A2D5',
    paddingHorizontal: 15,
  },
  searchInput: { flex: 1, color: '#fff', marginLeft: 2 },
  tagRow: { flexDirection: 'row', marginTop: 8 },
  categoryTag: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  categoryText: { color: '#fff', fontSize: 12, fontWeight: '500' },

  /* Sections */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: { color: '#fff', fontWeight: '700', fontSize: 18 },
  viewAll: { color: '#51E3FC', fontSize: 13 },

  Btn: {
    borderColor: '#03A2D5',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 15,
    width: '70%',
    alignSelf: 'center',
  },
  BtnText: { color: '#03A2D5', fontWeight: '600', marginRight: 6, fontSize: 16 },
});

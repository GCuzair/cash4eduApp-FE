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

const { width } = Dimensions.get('window');

/* 🎥 Earn & Learn Card */
const EarnCard = ({ image, title, author, views }) => (
  <View style={styles.earnCard}>
    <Image source={image} style={styles.earnImage} />

    {/* Floating Tokens Badge */}
    <View style={styles.videoToken}>
      <Text style={styles.badgePlus}>+4</Text>
    </View>

    {/* Play Button */}
    <View style={styles.earnPlay}>
      <Icon name="play" size={20} color="#fff" />
    </View>

    {/* Bottom Info */}
    <View style={styles.earnInfo}>
      <Text style={styles.earnTitle} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.earnMetaRow}>
        <View style={styles.earnUserRow}>
          <Image
            source={require('../../assets/onboarding/image2.jpg')}
            style={styles.earnUserImg}
          />
          <Text style={styles.earnUser}>{author}</Text>
        </View>

        <View style={styles.earnViewsRow}>
          <Icon name="eye" size={12} color="#51E3FC" />
          <Text style={styles.earnViews}>{views} views</Text>
        </View>
      </View>

      <View style={styles.earnLevelRow}>
        <Text style={styles.earnLevel}>Beginner</Text>
      </View>
    </View>
  </View>
);
/* 🍕 Perk Card */
const PerkCard = ({ title, image, desc }) => (
  <View style={styles.perkCardBox}>
    {/* Image + Verified Partner Row */}
    <View style={styles.perkTopRow}>
      <Image source={image} style={styles.perkIcon} />
      <Text style={styles.partnerBadge}>Verified Partner</Text>
    </View>

    <Text style={styles.perkHeading} numberOfLines={2}>
      {title}
    </Text>

    <Text style={styles.perkDesc}>{desc}</Text>

    <TouchableOpacity style={styles.learnMoreBtn}>
      <Text style={styles.learnMoreText}>Learn More</Text>
    </TouchableOpacity>
  </View>
);

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
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome Back, Aroma! 👋</Text>
          <Text style={styles.subtitle}>
            Ready to discover new scholarships?
          </Text>
        </View>

        {/* Earned Tokens */}
        <View style={styles.tokenCard}>
          <Text style={styles.tokenEarned}>
            You’ve earned 125 tokens this week 🎉
          </Text>
          <Text style={styles.tokenStreak}>🔥 Streak: 3 Days</Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <TouchableOpacity style={styles.watchBtn}>
            <Text style={styles.watchText}>Watch Now</Text>
            <Icon name="arrow-forward" size={16} color="#03A2D5" />
          </TouchableOpacity>
        </View>

        {/* Search Bar + Scrollable Categories */}
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagRow}
            contentContainerStyle={{ paddingRight: 10 }}
          >
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
                <TouchableOpacity
                  key={tag}
                  onPress={() => setSelectedTag(tag)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.categoryTag,
                      isSelected && {
                        backgroundColor: '#03A2D5',
                        borderColor: '#03A2D5',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && { color: '#fff', fontWeight: '700' },
                      ]}
                    >
                      {tag}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Personalized Matches */}
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

        {/* Earn & Learn Section */}
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
            <EarnCard
              image={item.image}
              title={item.title}
              author={item.author}
              views={item.views}
            />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 15 }}
        />
        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View All Videos</Text>
          <Icon name="arrow-forward" size={16} color="#fff" />
        </TouchableOpacity>

        {/* Student Perks */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🎁 Student Perks</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Learn More </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={perkData}
          renderItem={({ item }) => (
            <PerkCard title={item.title} image={item.image} desc={item.desc} />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
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
  container: { flex: 1, backgroundColor: '#000', paddingBottom: 75 },
  i: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
  },
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
  bellContainer: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 6,
  },

  /* Welcome */
  welcomeCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
  },
  welcomeTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingRight: 90,
  },
  subtitle: { color: '#fff', fontSize: 14, marginTop: 5 },

  /* Token Card */
  tokenCard: {
    backgroundColor: '#021E38',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  tokenEarned: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    paddingRight: 40,
  },
  tokenStreak: {
    color: '#ffff',
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '600',
    textAlign: 'right',
    marginRight: 10,
  },
  progressBarBackground: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 8,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBarFill: {
    backgroundColor: '#03A2D5',
    height: 8,
    borderRadius: 10,
  },
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
    elevation: 8,
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
  searchInput: {
    flex: 1,
    marginLeft: 2,
    color: '#fff',
  },
  tagRow: { flexDirection: 'row', marginVertical: 6 },
  tagrow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 6 },
  categoryTag: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginTop: 8,
  },
  categoryText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  /* Video Section */
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
    elevation: 8,
  },
  BtnText: {
    color: '#03A2D5',
    fontWeight: '600',
    marginRight: 6,
    fontSize: 16,
  },

  /* Perks */
  perkCard: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    width: width * 0.4,
    marginRight: 10,
    padding: 10,
    alignItems: 'center',
  },

  /* Earn & Learn */
  earnCard: {
    width: width * 0.53,
    backgroundColor: '#021E38',
    borderRadius: 14,
    marginLeft: 15,
    marginTop: 10,
    overflow: 'hidden',
  },
  earnImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  videoToken: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#03A2D5',
    borderRadius: 14,
    width: 30,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgePlus: { color: '#fff', fontWeight: '700', fontSize: 12 },
  earnPlay: {
    position: 'absolute',
    top: 55,
    left: 55,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnInfo: { padding: 10 },
  earnTitle: { color: '#fff', fontSize: 13, fontWeight: '700' },
  earnMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    alignItems: 'center',
  },
  earnUserRow: { flexDirection: 'row', alignItems: 'center' },
  earnUserImg: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
  },
  earnUser: { color: '#A3A3A3', fontSize: 11 },
  earnViewsRow: { flexDirection: 'row', alignItems: 'center' },
  earnViews: { color: '#51E3FC', fontSize: 11, marginLeft: 4 },
  earnLevelRow: {
    backgroundColor: '#002C4A',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  earnLevel: { color: '#51E3FC', fontSize: 11 },

  perkCardBox: {
    width: width * 0.6,
    backgroundColor: '#021E38',
    borderRadius: 14,
    padding: 15,
    marginTop: 10,
    marginRight: 15,
  },

  perkTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  perkIcon: { width: 40, height: 40, resizeMode: 'contain', marginRight: 10 },

  partnerBadge: {
    backgroundColor: '#FFB636',
    color: '#000',
    fontSize: 11,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontWeight: '700',
  },

  perkHeading: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 6,
  },

  perkDesc: {
    color: '#A3A3A3',
    fontSize: 13,
    marginBottom: 10,
  },

  learnMoreBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },

  learnMoreText: {
    color: '#03A2D5',
    fontWeight: '600',
    fontSize: 13,
  },
});

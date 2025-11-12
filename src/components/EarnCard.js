import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.52;

/* 🎥 Clean & Improved EarnCard */
const EarnCard = ({ image, title, author, views }) => (
  <TouchableOpacity activeOpacity={0.85} style={styles.card}>
    <Image source={image} style={styles.thumbnail} />

    {/* Tokens Badge */}
    <View style={styles.tokenBadge}>
      <Text style={styles.tokenText}>+4</Text>
    </View>

    {/* Play Button */}
    <View style={styles.playBtn}>
      <Icon name="play" size={20} color="#fff" />
    </View>

    {/* INFO */}
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {/* Author */}
      <View style={styles.authorRow}>
        <Image
          source={require('../assets/onboarding/image2.jpg')}
          style={styles.authorImg}
        />
        <Text style={styles.authorName}>{author}</Text>
      </View>

      {/* Beginner + Views Together */}
      <View style={styles.levelViewsRow}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Beginner</Text>
        </View>

        <View style={styles.viewsRow}>
          <Icon name="eye" size={12} color="#51E3FC" />
          <Text style={styles.viewsText}>{views} views</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default EarnCard;


const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#021E38',
    borderRadius: 12,
    marginLeft: 15,
    marginTop: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 145,
  },

  tokenBadge: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#03A2D5',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  playBtn: {
    position: 'absolute',
    top: 55,
    left: 75,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 38,
    height: 38,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: { padding: 10 },
  title: { color: '#fff', fontSize: 13, fontWeight: '700' },

  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  authorImg: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 6,
  },
  authorName: { color: '#A3A3A3', fontSize: 11 },

  levelViewsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'flex-start',
    gap: 10,
  },

  levelBadge: {
    backgroundColor: '#002C4A',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  levelText: { color: '#51E3FC', fontSize: 11 },

  viewsRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 10 },
  viewsText: { color: '#51E3FC', fontSize: 11, marginLeft: 4 },
});

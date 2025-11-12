import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

export default PerkCard;

const styles = StyleSheet.create({
  perkCardBox: {
    width: width * 0.6,
    backgroundColor: '#021E38',
    borderRadius: 14,
    padding: 15,
    marginTop: 10,
    marginLeft:15
    
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

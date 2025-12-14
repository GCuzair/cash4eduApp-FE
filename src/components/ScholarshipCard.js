import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ScholarshipCard = ({ title, amount, deadline, matched, type, tags, scholarshipData }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.card}>
      {/* Top Row: Heart + Badges */}
      <View style={styles.cardTopRow}>
        <Icon name="heart" size={22} color="#FF5F5F" />

        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: '#12DB00' }]}>
            <Text style={styles.badgeText}>{matched}% Matched</Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: type === 'featured' ? '#FFC947' : '#03A2D5' },
            ]}
          >
            <Text style={styles.badgeText}>
              {type === 'featured' ? 'Featured' : 'New'}
            </Text>
          </View>
        </View>
      </View>

      {/* Title + Amount */}
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.amount}>${amount}</Text>
      <Text style={styles.deadline}>Deadline: {deadline}</Text>

      {/* Tags */}
      <View style={styles.tagrow}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity>
          <Icon name="bookmark-outline" size={28} color="#03A2D5" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.applyBtn} 
          onPress={() => navigation.navigate('ScholarshipDetails', {
            scholarship: {
              title,
              amount,
              deadline,
              matched,
              type,
              tags,
              // Pass full scholarship data if available
              ...scholarshipData
            }
          })}
        >
          <Text style={styles.applyText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScholarshipCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#021E38',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
  },
  cardTopRow: {
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
  badgeText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
  },
  amount: {
    color: '#03A2D5',
    fontSize: 18,
    fontWeight: '600',
  },
  deadline: {
    color: '#51E3FC',
    fontSize: 14,
    marginVertical: 4,
  },
  tagrow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 6,
  },
  tag: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 5,
  },
  tagText: { color: '#fff', fontSize: 12 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  applyBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  applyText: {
    color: '#03A2D5',
    fontWeight: '600',
  },
});

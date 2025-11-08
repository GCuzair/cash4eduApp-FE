import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Tag = ({ label }) => (
  <TouchableOpacity style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
  </TouchableOpacity>
);

const Section = ({ title, children, subtitle }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
    {children}
  </View>
);

const PersonalIdentityScreen = ({
  navigation,
  showHeader = true,
  startFrom,
  showContinueButton = true,
  onSave,
  customButtonLabel = 'Custom Action',
}) => {
  return (
    <View style={styles.container}>
      {showHeader && (
        <LinearGradient
          colors={['#01D7FB', '#0257A7']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Personal Identity</Text>
            <Text style={styles.headerProgress}>14% Completed</Text>
          </View>
        </LinearGradient>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'gender' && (
          <>
            <Text style={styles.headerDescription}>
              This information helps us connect you with identity-based &
              organization specific scholarships
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}
        {/* Gender Identity */}
        <Section title="Gender Identity" subtitle="Why we need this?">
          <View style={styles.tagGroup}>
            <Tag label="Male" />
            <Tag label="Female" />
            <Tag label="Non-binary" />
            <Tag label="Self Describe" />
            <Tag label="Prefer not to say" />
          </View>
        </Section>

        {/* Ethnic / Cultural Heritage */}
        <Section
          title="Ethnic / Cultural Heritage"
          subtitle="Why we need this?"
        >
          <View style={styles.tagGroup}>
            <Tag label="African American / Black" />
            <Tag label="Hispanic / Latinx" />
            <Tag label="Asian / Pacific Islander" />
            <Tag label="Native American" />
            <Tag label="Middle Eastern" />
            <Tag label="White" />
            <Tag label="Other" />
            <Tag label="Prefer not to say" />
          </View>
        </Section>

        {/* Languages */}
        <Section title="Languages you speak fluently">
          <TextInput
            placeholder="Add language e.g. Spanish"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          {/* <Tag label="French" /> */}
        </Section>

        {/* Groups You Identify With */}
        <Section title="Groups you identify with">
          <View style={styles.tagGroup}>
            <Tag label="LGBTQ+" />
            <Tag label="Student with Disability" />
            <Tag label="First-Generation College Student" />
            <Tag label="Veteran / Military Affiliated" />
            <Tag label="Foster Care / Formerly in Care" />
            <Tag label="Parenting Student" />
            <Tag label="None of the Above" />
          </View>
        </Section>

        {/* Faith / Community */}
        <Section title="Faith / Community Affiliation">
          <TextInput
            placeholder="Type faith or community group (optional)"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </Section>

        {/* Volunteer Activities */}
        <Section title="Leadership Activities" subtitle="Why we need this?">
          <TextInput
            placeholder="Add activities (e.g. Sports Club, Art Club)"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            <Tag label="Sports Club" />
            <Tag label="Arts Club" />
            <Tag label="Debate Club" />
          </View>
        </Section>

        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('EduStatus')}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.saveLaterText}>Save and continue Later</Text>
            </TouchableOpacity>
          </>
        ) : (
          onSave && (
            <TouchableOpacity style={styles.continueBtn} onPress={onSave}>
              <Text style={styles.continueText}>{customButtonLabel}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
    </View>
  );
};

export default PersonalIdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  suggested: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
    fontWeight: '500',
  },
  headerGradient: {
    width: width,
    marginTop: 10,
  },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 75,
  },
  headerProgress: {
    color: '#fff',
    fontSize: 13,
  },
  scrollContainer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
  },
  headerDescription: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  headerLabel: {
    color: '#8E8E8E',
    fontSize: 13,
    marginBottom: 15,
  },
  section: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  sectionSubtitle: {
    color: '#03A2D5',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  tagGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 5,
    elevation: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#021E38',
    color: '#fff',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginVertical: 8,
    fontSize: 14,
  },
  continueBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 25,
    elevation: 8,
  },
  continueText: {
    color: '#03A2D5',
    fontSize: 24,
    fontWeight: '600',
  },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

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

// Tag Component
const Tag = ({ label, showCross, onRemove }) => (
  <View style={styles.tag}>
    <Text style={styles.tagText}>{label}</Text>
    {showCross && (
      <TouchableOpacity onPress={onRemove} style={styles.closeIconWrapper}>
        <Icon name="close" size={14} color="#000" />
      </TouchableOpacity>
    )}
  </View>
);

// Section Component
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const InterestsGoalsScreen = ({
  navigation,
  showHeader = true,
  showContinueButton = true,
  startFrom,
  customButtonLabel = 'Update & Save',
  onSave,
}) => {
  // State for only the 3 specified sections
  const [selectedAcademic, setSelectedAcademic] = useState([
    'Engineering',
    'Public Service',
  ]);
  const [selectedExtra, setSelectedExtra] = useState([
    'Photography',
    'Volunteering',
  ]);
  const [selectedVideos, setSelectedVideos] = useState(['Scholarships Tips']);

  // Toggle tag for specific section
  const toggleTag = (tag, section, setSection) => {
    setSection(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag],
    );
  };

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
            <Text style={styles.headerTitle}>Interests and Goals</Text>
            <Text style={styles.headerProgress}>57% Completed</Text>
          </View>
        </LinearGradient>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'interest' && (
          <>
            <Text style={styles.headerDescription}>
              Your Profile Match Score increases as you add more details about
              yourself, helping us connect you with better scholarship and
              program matches.
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}

        {/* Academic Interests */}
        <Section title="Academic Interests / Career Goals">
          <TextInput
            placeholder="Add interests (e.g. Sports Club, Art Club etc)"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {['Design', 'Arts', 'Education', 'Law'].map(label => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.8}
                onPress={() =>
                  toggleTag(label, selectedAcademic, setSelectedAcademic)
                }
              >
                <Tag
                  label={label}
                  showCross={selectedAcademic.includes(label)}
                  onRemove={() =>
                    toggleTag(label, selectedAcademic, setSelectedAcademic)
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Extracurricular Involvement */}
        <Section title="Extracurricular Involvement">
          <TextInput
            placeholder="Extracurricular Involvement(e.g. Sports..."
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <Text style={styles.suggested}>Suggested:</Text>
          <View style={styles.tagGroup}>
            {['Photography', 'Debate Club', 'Music'].map(label => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.8}
                onPress={() =>
                  toggleTag(label, selectedExtra, setSelectedExtra)
                }
              >
                <Tag
                  label={label}
                  showCross={selectedExtra.includes(label)}
                  onRemove={() =>
                    toggleTag(label, selectedExtra, setSelectedExtra)
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Description */}
        <Section title="Tell us in one sentence what drives your education journey.">
          <TextInput
            placeholder="I want to use technology to make education..."
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </Section>

        {/* Employer Tuition */}
        <Section title="Do you currently receive employer tuition benefits or discounts?">
          <View style={styles.tagGroup}>
            {['Yes', 'No'].map(label => (
              <Tag key={label} label={label} showCross={false} />
            ))}
          </View>
        </Section>

        {/* Preferred Scholarship Types */}
        <Section title="Preferred Scholarship Types">
          <View style={styles.tagGroup}>
            {[
              'Need-based',
              'Merit-based',
              'Athletic',
              'Creative / Essay',
              'Community Service',
              'STEM',
              'Minority / Identity-based',
            ].map(label => (
              <Tag key={label} label={label} showCross={false} />
            ))}
          </View>
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Video Section */}
        <Section title="Tell us what kind of videos you want to see?">
          <View style={styles.tagGroup}>
            {[
              'Scholarships Tips',
              'College Admissions',
              'Career Paths',
              'Financial Literacy',
              'FAFSA Help',
            ].map(label => (
              <TouchableOpacity
                key={label}
                activeOpacity={0.8}
                onPress={() =>
                  toggleTag(label, selectedVideos, setSelectedVideos)
                }
              >
                <Tag
                  label={label}
                  showCross={selectedVideos.includes(label)}
                  onRemove={() =>
                    toggleTag(label, selectedVideos, setSelectedVideos)
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </Section>

        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('Residency')}
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

export default InterestsGoalsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerGradient: { width: width, marginTop: 10 },
  header: {
    width: width,
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
    marginRight: 60,
  },
  headerProgress: { color: '#fff', fontSize: 13 },
  scrollContainer: { paddingBottom: 30, paddingHorizontal: 10 },
  headerDescription: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
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
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  suggested: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
    fontWeight: '500',
  },
  exclamationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  tagGroup: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0257A7',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    elevation: 8,
  },
  tagText: { color: '#fff', fontSize: 14, fontWeight: '500', marginRight: 6 },
  closeIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  continueText: { color: '#03A2D5', fontSize: 24, fontWeight: '600' },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

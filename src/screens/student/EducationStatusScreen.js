import React from 'react';
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

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const EducationStatusScreen = ({
  navigation,
  showHeader = true,
  showContinueButton = true,
  startFrom,
  customButtonLabel = 'Update & Save',
  onSave,
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
            <Text style={styles.headerTitle}>Education Status</Text>
            <Text style={styles.headerProgress}>28% Completed</Text>
          </View>
        </LinearGradient>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'edu' && (
          <>
            <Text style={styles.headerDescription}>
              These details help us tailor scholarship opportunities that best
              fit your academic journey.
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}

        {/* Current Education Level */}
        <Section title="Current Education Level">
          <View style={styles.tagGroup}>
            <Tag label="High School Student" />
            <Tag label="Undergraduate Student" />
            <Tag label="Graduate Student" />
            <Tag label="GED / Adult Learner" />
            <Tag label="Trade / Vocational Program" />
          </View>
        </Section>

        {/* Current School */}
        <Section title="Current School or Institution">
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Add your current school or institution"
              placeholderTextColor="#aaa"
              style={styles.inputWithIcon}
            />
            <Icon
              name="search"
              size={20}
              color="#fff"
              style={styles.leftIcon}
            />
          </View>
        </Section>

        {/* Expected Graduation Year */}
        <Section title="Expected Graduation Year">
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your expected graduation year"
              placeholderTextColor="#aaa"
              style={styles.inputWithIcon}
            />
            <Icon
              name="chevron-down-circle-outline"
              size={20}
              color="#fff"
              style={styles.rightIcon}
            />
          </View>
        </Section>

        {/* Cumulative GPA */}
        <Section title="Cumulative GPA">
          <TextInput
            placeholder="Enter your GPA (on a 4.0 scale)"
            placeholderTextColor="#aaa"
            style={styles.input}
          />

          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Intended Major */}
        <Section title="Intended Major / Field of Study">
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Enter your field of study"
              placeholderTextColor="#aaa"
              style={styles.inputWithIcon}
            />

            <Icon
              name="search"
              size={20}
              color="#fff"
              style={styles.leftIcon}
            />
          </View>
        </Section>

        {/* Enrollment Status */}
        <Section title="Enrollment Status">
          <View style={styles.tagGroup}>
            <Tag label="Full-time" />
            <Tag label="Part-time" />
          </View>
        </Section>

        {/* Academic Standing */}
        <Section title="Academic Standing">
          <View style={styles.tagGroup}>
            <Tag label="Honors Program" />
            <Tag label="Ten College Student" />
          </View>
        </Section>

        {/* Preferred College Type */}
        <Section title="Preferred College Type">
          <View style={styles.tagGroup}>
            <Tag label="Public" />
            <Tag label="Community" />
            <Tag label="Private" />
            <Tag label="Online" />
          </View>
        </Section>

        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('Financial')}
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

export default EducationStatusScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerGradient: { width: width, marginTop: 10 },
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
  tagGroup: { flexDirection: 'row', flexWrap: 'wrap' },
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
  tagText: { color: '#fff', fontSize: 14, fontWeight: '500' },
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021E38',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 10,
    marginVertical: 8,
  },

  inputWithIcon: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 10,
  },

  leftIcon: {
    marginRight: 5,
  },

  rightIcon: {
    position: 'absolute',
    right: 15,
  },

  exclamationIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  continueText: { color: '#03A2D5', fontSize: 24, fontWeight: '600' },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

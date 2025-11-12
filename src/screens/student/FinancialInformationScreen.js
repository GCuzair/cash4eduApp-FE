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

const FinancialInformationScreen = ({
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
            <Text style={styles.headerTitle}>Financial Information</Text>
            <Text style={styles.headerProgress}>43% Completed</Text>
          </View>
        </LinearGradient>
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {startFrom !== 'financial' && (
          <>
            <Text style={styles.headerDescription}>
              This section is private and will never be shared with schools or
              any third parties.
            </Text>
            <Text style={styles.headerLabel}>
              You can skip any question and update it later in settings
            </Text>
          </>
        )}

        {/* Citizenship Status */}
        <Section title="Citizenship Status">
          <View style={styles.tagGroup}>
            <Tag label="U.S. Citizen" />
            <Tag label="Permanent Resident" />
            <Tag label="International Student" />
            <Tag label="DACA" />
          </View>
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Household Income */}
        <Section title="Household Income Range">
          <View style={styles.tagGroup}>
            <Tag label="Under $25K" />
            <Tag label="$25K-$50K" />
            <Tag label="$50K-$75K" />
            <Tag label="$75K-$100K" />
            <Tag label="Over $100K" />
            <Tag label="Prefer not to say" />
          </View>
          <Icon
            name="alert-circle-outline"
            size={20}
            color="#fff"
            style={styles.exclamationIcon}
          />
        </Section>

        {/* Pell Grants */}
        <Section title="Do you currently receive financial aid or Pell Grants?">
          <View style={styles.tagGroup}>
            <Tag label="Yes" />
            <Tag label="No" />
          </View>
        </Section>

        {/* FAFSA */}
        <Section title="Are you independent or dependent for FAFSA purposes?">
          <View style={styles.tagGroup}>
            <Tag label="Independent" />
            <Tag label="Dependent" />
          </View>
        </Section>

        {/* Work Status */}
        <Section title="Do you work while attending school?">
          <View style={styles.tagGroup}>
            <Tag label="Yes - Full-time" />
            <Tag label="Yes - Part-time" />
            <Tag label="No" />
          </View>
        </Section>

        {/* Parent Occupation */}
        <Section title="Parent/Guardian Occupation">
          <TextInput
            placeholder="Enter occupation of your parent or guardian"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </Section>
        {showContinueButton ? (
          <>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => navigation.navigate('Interest')}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.saveLaterText}>Save and continue Later</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
    {onSave && (
      <TouchableOpacity style={styles.continueBtn} onPress={onSave}>
        <Text style={styles.continueText}>{customButtonLabel}</Text>
      </TouchableOpacity>
    )}

    {customButtonLabel === 'Update & Save' && (
      <TouchableOpacity
        style={[styles.primaryBtnFull]}
        onPress={() => navigation.navigate('ManageDocument')}
      >
        <Text style={styles.primaryBtnText}>
          Manage Document
        </Text>
      </TouchableOpacity>
    )}
  </>
)}
      </ScrollView>
    </View>
  );
};

export default FinancialInformationScreen;

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
    marginBottom: 10,
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
   primaryBtnFull: {
    backgroundColor: "#00C6FB",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 13,
    borderRadius: 10,
    width:'85%'
},
primaryBtnText: { color: "#fff",fontSize: 24,
    fontWeight: '600', },
});

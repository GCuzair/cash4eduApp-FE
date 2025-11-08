import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  CheckBox,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const UploadSection = ({ title, description }) => (
  <View style={styles.uploadSection}>
    <Icon name="cloud-upload-outline" size={34} color="#03A2D5" style={{ marginBottom: 8 }} />
    <Text style={styles.uploadTitle}>{title}</Text>
    <Text style={styles.uploadDesc}>{description}</Text>
    <View style={styles.uploadBtnGroup}>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadBtnText}>Take a Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadBtn}>
        <Text style={styles.uploadBtnText}>Select File</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const QuickApplyScreen = ({ navigation }) => {
  const [agree, setAgree] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#01D7FB', '#0257A7']} style={styles.headerGradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Quick Apply</Text>
          <Text style={styles.headerProgress}>86% Completed</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerDescription}>
          Quick apply saves you an average of 3+ hours!
        </Text>
        <Text style={styles.headerLabel}>
          You can skip any question and update it later in settings
        </Text>
        <Text style={styles.label}>Upload Optional Documents</Text>
        {/* Upload Sections */}
        <UploadSection
          title="Upload Resume"
          description="Upload a recent resume or scan one using your camera. We’ll convert images to readable PDFs automatically."
        />
        <UploadSection
          title="Upload Transcript"
          description="You can upload your latest transcript or snap a photo we’ll clean and convert it into a PDF."
        />
        <UploadSection
          title="Upload Letter"
          description="Add your letter of recommendation now or skip you can upload it later anytime."
        />
        <UploadSection
          title="Upload FAFSA Summary"
          description="If available, upload your FAFSA or financial summary. It helps us pre-qualify need-based scholarships."
        />

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAgree(!agree)}
        >
          <Icon
            name={agree ? 'checkbox-outline' : 'square-outline'}
            size={22}
            color="#03A2D5"
          />
          <Text style={styles.checkboxLabel}>
            I agree to use my uploaded documents and profile for faster scholarship applications.
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueBtn}
        onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.saveLaterText}>Save and continue Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default QuickApplyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  headerGradient: { width, marginTop: 10 },
  header: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  label:{color:'#fff',fontSize:16,fontWeight:'500',marginBottom:6},
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '500', marginRight: 60 },
  headerProgress: { color: '#fff', fontSize: 13 },
  scrollContainer: { paddingBottom: 30, paddingHorizontal: 10 },
  headerDescription: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  headerLabel: { color: '#8E8E8E', fontSize: 13, marginBottom: 15 },
  uploadSection: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
  },
  uploadTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 5 },
  uploadDesc: { color: '#fff', fontSize: 14, textAlign: 'center', marginBottom: 10, paddingHorizontal:30 },
  uploadBtnGroup: { flexDirection: 'row', justifyContent: 'center' },
  uploadBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    elevation:8
  },
  uploadBtnText: { color: '#03A2D5', fontSize: 16, fontWeight: '600' },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  checkboxLabel: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 10,
    flex: 1,
  },
  continueBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
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

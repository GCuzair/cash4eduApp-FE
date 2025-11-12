import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DocumentCard = ({ name, date, status, fileType }) => {
  const statusColor =
    status === 'Verified'
      ? '#20A447'
      : status === 'Pending'
      ? '#FFB636'
      : '#03A2D5';

  const fileIcon =
    fileType === 'pdf'
      ? 'document-outline'
      : fileType === 'doc'
      ? 'document-text-outline'
      : 'document-attach-outline';

  return (
    <LinearGradient
      colors={['#03385F', '#021E38']}
      style={styles.documentCardGradient}
    >
      <View style={styles.documentTopRow}>
        <View style={styles.fileIconWrapper}>
          <Icon name={fileIcon} size={20} color="#fff" />
        </View>

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.docName}>{name}</Text>
          <Text style={styles.docDate}>Uploaded {date}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text
            style={[
              styles.statusText,
              { color: status === 'Pending' ? '#000' : '#fff' },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.docFooterBtns}>
        <TouchableOpacity style={styles.viewBtn}>
          <Text style={styles.viewBtnText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replaceBtn}>
          <Text style={styles.replaceBtnText}>Replace</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const ManageDocumentsScreen = ({ navigation }) => {
  const [expanded, setExpanded] = useState('academic');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Documents</Text>
      </View>
      <Text style={styles.headerSubtitle}>
        Secure your account by completing profile verification.
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Verification */}
        <View style={styles.verificationCard}>
          <View style={styles.levelRow}>
            <View style={styles.rocketIcon}>
              <Icon name="shield-checkmark-outline" size={28} color="#fff" />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.levelTitle}>Profile Verification</Text>
              <Text style={styles.levelSubtitle}>90% Complete</Text>
            </View>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '90%' }]} />
          </View>

          <Text style={styles.levelDesc}>
            You’re verified for scholarship applications. Update any document at
            any time.
          </Text>
        </View>

        {/* Upload Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Documents Uploaded</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Verified Files</Text>
          </View>
        </View>

        {/* Identity Documents */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setExpanded(expanded === 'identity' ? null : 'identity')
          }
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="id-card-outline" size={20} color="#03A2D5" />
              <Text style={styles.sectionTitle}>Identity Documents</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Used for verification and security
            </Text>
          </View>
          <Icon
            name={
              expanded === 'identity'
                ? 'chevron-up-outline'
                : 'chevron-down-outline'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Academic Documents */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setExpanded(expanded === 'academic' ? null : 'academic')
          }
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="school-outline" size={20} color="#03A2D5" />
              <Text style={styles.sectionTitle}>Academic Documents</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Boost your scholarship eligibility
            </Text>
          </View>

          <Icon
            name={
              expanded === 'academic'
                ? 'chevron-up-outline'
                : 'chevron-down-outline'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {expanded === 'academic' && (
          <View>
            <DocumentCard
              name="Official Transcript.pdf"
              date="Aug 15, 2025"
              status="Verified"
              fileType="pdf"
            />
            <DocumentCard
              name="Resume.doc"
              date="Aug 15, 2025"
              status="Verified"
              fileType="doc"
            />
            <DocumentCard
              name="Letter.pdf"
              date="Aug 15, 2025"
              status="Pending"
              fileType="pdf"
            />
          </View>
        )}

        {/* Additional Documents */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setExpanded(expanded === 'additional' ? null : 'additional')
          }
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="folder-open-outline" size={20} color="#03A2D5" />
              <Text style={styles.sectionTitle}>Additional Documents</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Portfolios, certificates & essays
            </Text>
          </View>

          <Icon
            name={
              expanded === 'additional'
                ? 'chevron-up-outline'
                : 'chevron-down-outline'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Financial Documents */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() =>
            setExpanded(expanded === 'financial' ? null : 'financial')
          }
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="cash-outline" size={20} color="#03A2D5" />
              <Text style={styles.sectionTitle}>Financial Documents</Text>
            </View>
            <Text style={styles.sectionSubtitle}>
              Used for need-based aid
            </Text>
          </View>

          <Icon
            name={
              expanded === 'financial'
                ? 'chevron-up-outline'
                : 'chevron-down-outline'
            }
            size={20}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Upload New Documents */}
        <View style={styles.uploadSection}>
          <Icon
            name="cloud-upload-outline"
            size={34}
            color="#03A2D5"
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.uploadTitle}>Upload New Documents</Text>
          <Text style={styles.uploadDesc}>
            Add transcripts, certificates, or other verification files
          </Text>
          <View style={styles.uploadBtnGroup}>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadBtn}>
              <Text style={styles.uploadBtnText}>Select File</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Update & Save Button */}
        <TouchableOpacity style={styles.saveBtn}
        onPress={()=> navigation.replace('ProfileAndSetting')}>
          <LinearGradient
            colors={['#03A2D5', '#05549E']}
            style={styles.saveGradient}
          >
            <Text style={styles.saveText}>Update & Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ManageDocumentsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContainer: { paddingBottom: 90 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 10,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 50,
    marginTop: 2,
    marginBottom: 10,
  },
  verificationCard: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 15,
    margin: 15,
  },
  levelRow: { flexDirection: 'row', alignItems: 'center' },
  rocketIcon: {
    backgroundColor: '#03A2D5',
    padding: 10,
    borderRadius: 8,
  },
  levelTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  levelSubtitle: { color: '#fff', fontSize: 13 },
  progressBar: {
    height: 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: { height: 9, backgroundColor: '#03A2D5', borderRadius: 5 },
  levelDesc: { color: '#fff', fontSize: 15 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  statBox: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    width: width / 2.3,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statNumber: { color: '#fff', fontSize: 32, fontWeight: '700' },
  statLabel: { color: '#fff', fontSize: 12, fontWeight: '500' },
  sectionHeader: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
  sectionSubtitle: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 28,
    marginTop: 3,
  },

  // ---- New Card Styles (Academic Section) ----
  documentCardGradient: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: 10,
    padding: 14,
  },
  documentTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconWrapper: {
    backgroundColor: '#03A2D5',
    padding: 8,
    borderRadius: 8,
  },
  docName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  docDate: {
    color: '#fff',
    fontSize: 13,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  docFooterBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  viewBtn: {
    backgroundColor: '#03A2D5',
    borderRadius: 8,
    flex: 1,
    paddingVertical: 7,
    marginRight: 8,
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  replaceBtn: {
    backgroundColor: '#021E38',
    borderRadius: 8,
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#03A2D5',

  },
  replaceBtnText: {
    color: '#03A2D5',
    fontWeight: '600',
    fontSize: 13,
  },

  // ---- Upload Section ----
  uploadSection: {
    backgroundColor: '#021E38',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    alignItems: 'center',
  },
  uploadTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  uploadDesc: {
    color: '#A0A0A0',
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 6,
  },
  uploadBtnGroup: { flexDirection: 'row', justifyContent: 'center' },
  uploadBtn: {
    borderColor: '#03A2D5',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  uploadBtnText: { color: '#03A2D5', fontSize: 14, fontWeight: '600' },
  saveBtn: { marginHorizontal: 15, marginTop: 5 },
  saveGradient: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});

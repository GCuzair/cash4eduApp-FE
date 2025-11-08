import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const NotificationScreen = ({ navigation }) => {
  const [scholarshipAlerts, setScholarshipAlerts] = useState(true);
  const [videosRewards, setVideosRewards] = useState(true);
  const [studentPerks, setStudentPerks] = useState(true);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#01D7FB', '#0257A7']} style={styles.headerGradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Quick Apply</Text>
          <Text style={styles.headerProgress}>100% Completed</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>
          Turn on notifications to never miss scholarship deadlines, new rewards, or student perks.
        </Text>
        <Text style={styles.subTitle}>
          You can skip any question and update it later in settings
        </Text>

        {/* Notification Section */}
        <View style={styles.notificationContainer}>
          <View style={styles.iconRow}>
            <Icon name="notifications-outline" size={28} color="#03A2D5" />
            <Text style={styles.allowText}>Allow Push Notifications</Text>
          </View>

          <Text style={styles.sectionTitle}>Manage Your Alerts</Text>

          {/* Alert Item */}
          <View style={styles.alertRow}>
            <View style={styles.alertTextBox}>
              <Text style={styles.alertTitle}>New Scholarship Alerts</Text>
              <Text style={styles.alertDesc}>
                Get notified instantly when new scholarships match your profile
              </Text>
            </View>
            <Switch
              value={scholarshipAlerts}
              onValueChange={setScholarshipAlerts}
              trackColor={{ false: '#555', true: '#03A2D5' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.alertRow}>
            <View style={styles.alertTextBox}>
              <Text style={styles.alertTitle}>Financial Literacy Videos & Rewards</Text>
              <Text style={styles.alertDesc}>
                Get short tips and videos that earn you reward points
              </Text>
            </View>
            <Switch
              value={videosRewards}
              onValueChange={setVideosRewards}
              trackColor={{ false: '#555', true: '#03A2D5' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.alertRow}>
            <View style={styles.alertTextBox}>
              <Text style={styles.alertTitle}>Student Discounts & Perks</Text>
              <Text style={styles.alertDesc}>
                Stay updated with exclusive student offers and benefits
              </Text>
            </View>
            <Switch
              value={studentPerks}
              onValueChange={setStudentPerks}
              trackColor={{ false: '#555', true: '#03A2D5' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.continueBtn}
        onPress={() => navigation.navigate('Congratulations')}>
          <Text style={styles.continueText}>Save and Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.saveLaterText}>Save and continue Later</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

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
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '500', marginRight: 60 },
  headerProgress: { color: '#fff', fontSize: 13 },
  scrollContainer: { paddingBottom: 40, paddingHorizontal: 15 },
  mainTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
  },
  subTitle: { color: '#8E8E8E', fontSize: 13, marginBottom: 20 },
  notificationContainer: {
    // backgroundColor: '#021E38',
    // borderColor: '#03A2D5',
    // borderWidth: 1,
    // borderRadius: 12,
    // padding: 15,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  allowText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#787878',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  alertTextBox: { flex: 1, paddingRight: 10 },
  alertTitle: { color: '#fff', fontSize: 20, fontWeight: '600' },
  alertDesc: { color: '#A3A3A3', fontSize: 15, marginTop: 2 },
  continueBtn: {
    borderColor: '#03A2D5',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 25,
    marginHorizontal: 25,
    elevation: 8,
  },
  continueText: { color: '#03A2D5', fontSize: 20, fontWeight: '600' },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 15,
  },
});

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { ProfileContext } from '../../context/ProfileContext';
import { FireApi } from '../../utils/FireApi';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const NotificationScreen = ({ navigation }) => {
  const { userProfile } = useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  const [saveLaterLoading, setSaveLaterLoading] = useState(false);
  
  // Notification states
  const [scholarshipAlerts, setScholarshipAlerts] = useState(true);
  const [videosRewards, setVideosRewards] = useState(true);
  const [studentPerks, setStudentPerks] = useState(true);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);

  // Validate user profile
  const validateUserProfile = () => {
    if (!userProfile || !userProfile.id) {
      Toast.show({
        type: 'error',
        text1: 'User Profile Error',
        text2: 'User profile not found. Please login again.',
      });
      return false;
    }
    return true;
  };

  // Handle API call for notifications
  const handleNotificationsSubmit = async (navigateToNext = true) => {
    // Validate user profile
    if (!validateUserProfile()) {
      return;
    }

    // Check if push notifications are enabled (optional warning)
    if (!pushNotificationsEnabled) {
      Alert.alert(
        'Push Notifications Disabled',
        'You have disabled push notifications. Some alerts may not reach you. Do you want to continue?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Continue', 
            onPress: () => proceedWithSubmission(navigateToNext) 
          }
        ]
      );
    } else {
      await proceedWithSubmission(navigateToNext);
    }
  };

  const proceedWithSubmission = async (navigateToNext) => {
    setLoading(true);
    
    try {
      // Prepare payload according to API spec
      const payload = {
        user_id: userProfile.id.toString(), // Convert to string if needed
        contact_preferences: {
          new_scholarship_alerts: scholarshipAlerts,
          financial_literacy_videos: videosRewards,
          student_discounts_perks: studentPerks
        }
      };

      console.log('Sending notification payload:', payload);
      
      // Call the API
      const result = await FireApi('notification-profile', 'POST', {}, payload);

      if (result && result.success) {
        Toast.show({
          type: 'success',
          text1: 'Preferences Saved!',
          text2: 'Your notification preferences have been updated successfully.',
          visibilityTime: 3000,
        });

        // Navigate after a short delay
        if (navigateToNext) {
          setTimeout(() => {
            navigation.navigate('Congratulations');
          }, 1500);
        }
      } else {
        const errorMessage = result?.message || result?.error || 'Failed to save preferences';
        throw new Error(errorMessage);
      }

    } catch (error) {
      console.error('Notification API Error:', error);
      
      // Check for specific error types
      if (error.message.includes('foreign key constraint') || error.message.includes('user_id')) {
        Toast.show({
          type: 'error',
          text1: 'User Not Found',
          text2: 'User profile not found in database. Please contact support.',
        });
      } else if (error.message.includes('network') || error.message.includes('Network')) {
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: 'Please check your internet connection and try again.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Save Failed',
          text2: error.message || 'Failed to save notification preferences.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle "Save and Continue Later"
  const handleSaveLater = async () => {
    if (!validateUserProfile()) {
      return;
    }

    setSaveLaterLoading(true);
    
    try {
      const payload = {
        user_id: userProfile.id.toString(),
        contact_preferences: {
          new_scholarship_alerts: scholarshipAlerts,
          financial_literacy_videos: videosRewards,
          student_discounts_perks: studentPerks
        }
      };

      const result = await FireApi('notification-profile', 'POST', {}, payload);

      if (result && result.success) {
        Toast.show({
          type: 'success',
          text1: 'Saved for Later',
          text2: 'Your preferences have been saved. You can update them anytime.',
          visibilityTime: 3000,
        });
        
        // Go back or to home screen
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } else {
        throw new Error(result?.message || 'Save failed');
      }

    } catch (error) {
      console.error('Save Later Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Save Failed',
        text2: 'Could not save preferences. Please try again.',
      });
    } finally {
      setSaveLaterLoading(false);
    }
  };

  // Handle push notifications toggle
  const handlePushNotificationsToggle = (value) => {
    if (!value) {
      Alert.alert(
        'Disable Push Notifications?',
        'If you disable push notifications, you may miss important scholarship deadlines. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          { 
            text: 'Disable', 
            onPress: () => setPushNotificationsEnabled(false)
          }
        ]
      );
    } else {
      setPushNotificationsEnabled(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#01D7FB', '#0257A7']} style={styles.headerGradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set Up Quick Apply</Text>
          <Text style={styles.headerProgress}>
            {userProfile?.profile_completion_percentage || 0}% Completed
          </Text>
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

          {/* Push Notifications Toggle */}
          <View style={styles.pushNotificationRow}>
            <Text style={styles.pushNotificationText}>
              Receive push notifications on your device
            </Text>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={handlePushNotificationsToggle}
              trackColor={{ false: '#555', true: '#03A2D5' }}
              thumbColor="#fff"
            />
          </View>

          <Text style={styles.sectionTitle}>Manage Your Alerts</Text>

          {/* Alert Items */}
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
              disabled={!pushNotificationsEnabled}
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
              disabled={!pushNotificationsEnabled}
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
              disabled={!pushNotificationsEnabled}
            />
          </View>

          {/* Status Message */}
          {!pushNotificationsEnabled && (
            <View style={styles.warningContainer}>
              <Icon name="warning-outline" size={18} color="#FFA726" />
              <Text style={styles.warningText}>
                Push notifications are disabled. Enable them to receive alerts.
              </Text>
            </View>
          )}
        </View>

        {/* Buttons */}
        <TouchableOpacity 
          style={[
            styles.continueBtn, 
            (loading || !userProfile?.id) && styles.buttonDisabled
          ]}
          onPress={() => handleNotificationsSubmit(true)}
          disabled={loading || !userProfile?.id}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#03A2D5" />
          ) : (
            <Text style={styles.continueText}>Save and Continue</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[saveLaterLoading && styles.buttonDisabled]}
          onPress={handleSaveLater}
          disabled={saveLaterLoading || !userProfile?.id}
        >
          {saveLaterLoading ? (
            <ActivityIndicator size="small" color="#717171" style={styles.saveLaterLoader} />
          ) : (
            <Text style={styles.saveLaterText}>Save and Continue Later</Text>
          )}
        </TouchableOpacity>

        {/* Debug Info (remove in production) */}
        {__DEV__ && userProfile && (
          <View style={styles.debugContainer}>
            <Text style={styles.debugText}>
              User ID: {userProfile.id}
            </Text>
            <Text style={styles.debugText}>
              Profile Completion: {userProfile.profile_completion_percentage || 0}%
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Toast Component */}
      <Toast />
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
    // Remove or adjust background/border if needed
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  allowText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 4,
  },
  pushNotificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 162, 213, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#03A2D5',
  },
  pushNotificationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
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
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 167, 38, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#FFA726',
  },
  warningText: {
    color: '#FFA726',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
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
  buttonDisabled: {
    opacity: 0.5,
  },
  continueText: { color: '#03A2D5', fontSize: 20, fontWeight: '600' },
  saveLaterText: {
    color: '#717171',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 15,
  },
  saveLaterLoader: {
    marginTop: 15,
  },
  debugContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  debugText: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
});
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, useColorScheme, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

// Import all screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import Otp from './src/screens/auth/OtpScreen';

// Student Screens
import personalIdentity from './src/screens/student/PersonalIdentityScreen';
import eduStatus from './src/screens/student/EducationStatusScreen';
import Financial from './src/screens/student/FinancialInformationScreen';
import InterestGoal from './src/screens/student/InterestsGoalsScreen';
import Residency from './src/screens/student/ResidencyEligibilityScreen';
import QuickApply from './src/screens/student/QuickApplyScreen';
import Notification from './src/screens/student/NotificationScreen';
import Congratulations from './src/screens/student/ConfirmationScreen';

// Vendor Screens
import vendor from './src/screens/vendor/VendorDashboardScreen';
import CreateListing from './src/screens/vendor/CreateListingScreen';
import VendorProfile from './src/screens/vendor/VendorProfile';
import PerkListing from './src/screens/vendor/PerkListing';
import ScholarshipListing from './src/screens/vendor/ScholarshipListing';
import TuitionAssistanceVendor from './src/screens/vendor/TuitionAssistanceVendor';
import EducationalVideo from './src/screens/vendor/EducationalVideo';
import ManageListingScreen from './src/screens/vendor/ManageListingScreen';
import CocaCola from './src/screens/vendor/CocaCola';
import Setting from './src/screens/vendor/Setting';

// Admin Screens
import AdmninSignIn from './src/screens/admin/AdminSignIn';
import AdminDashboard from './src/screens/admin/AdminDashboard';
import VendorManagement from './src/screens/admin/VendorManagement';
import ManageListing from './src/screens/admin/ManageListing';
import Scholarship from './src/screens/admin/Schorlarship';
import StudentManagement from './src/screens/admin/StudentManagement';
import ContentManagement from './src/screens/admin/ContentManagement';
import AnalyticsReporting from './src/screens/admin/AnalyticsReporting';
import AdminSetting from './src/screens/admin/AdminSetting';

// Common Screens
import ScholarshipDetails from './src/screens/scholarships/ScholarshipDetails';
import videoHub from './src/screens/videos/videoHub';
import videoPlayer from './src/screens/videos/videoPlayer';
import TuitionAssistance from './src/screens/perks/tuitionAssitance';
import PerkPreview from './src/screens/perks/perkPreview';

// Navigation
import BottomTabs from './src/navigation/BottomTabs';
import VendorStackNavigator from './src/navigation/VendorStackNavigator';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Splash');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      const userDataStr = await AsyncStorage.getItem('@user_data');
      
      if (token && userDataStr) {
        const userData = JSON.parse(userDataStr);
        const userType = userData.user_type || 'student';
        
        if (userType === 'admin') {
          setInitialRoute('AdminDashboard');
        } else if (userType === 'vendor') {
          setInitialRoute('VendorDashboard');
        } else if (userType === 'student') {
          if (userData.has_profile) {
            setInitialRoute('MainTabs');
          } else {
            setInitialRoute('PersonalIdentity');
          }
        }
      } else {
        setInitialRoute('Splash');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setInitialRoute('Splash');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ProfileProvider>
        <GestureHandlerRootView style={styles.root}>
          <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={initialRoute}
              >
                {/* Public Screens */}
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="GetStarted" component={GetStartedScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="AdminSignIn" component={AdmninSignIn} />
                
                {/* Student Registration Flow */}
                <Stack.Screen name="PersonalIdentity" component={personalIdentity} />
                <Stack.Screen name="EduStatus" component={eduStatus} />
                <Stack.Screen name="Financial" component={Financial} />
                <Stack.Screen name="Interest" component={InterestGoal} />
                <Stack.Screen name="Residency" component={Residency} />
                <Stack.Screen name="QuickApply" component={QuickApply} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Congratulations" component={Congratulations} />
                
                {/* Student Main App */}
                <Stack.Screen name="MainTabs" component={BottomTabs} />
                
                {/* Student Common Screens */}
                <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />
                <Stack.Screen name="videoHub" component={videoHub} />
                <Stack.Screen name="videoPlayer" component={videoPlayer} />
                <Stack.Screen name="tuitionAssistance" component={TuitionAssistance} />
                <Stack.Screen name="perkPreview" component={PerkPreview} />
                
                {/* Vendor Screens */}
                <Stack.Screen name="VendorTabs" component={VendorStackNavigator} />
                <Stack.Screen name="VendorDashboard" component={vendor} />
                <Stack.Screen name="CreateListing" component={CreateListing} />
                <Stack.Screen name="ManageListingScreen" component={ManageListingScreen} />
                <Stack.Screen name="VendorProfile" component={VendorProfile} />
                <Stack.Screen name="PerkListing" component={PerkListing} />
                <Stack.Screen name="ScholarshipListing" component={ScholarshipListing} />
                <Stack.Screen name="TuitionAssistanceVendor" component={TuitionAssistanceVendor} />
                <Stack.Screen name="EducationalVideo" component={EducationalVideo} />
                <Stack.Screen name="CocaCola" component={CocaCola} />
                <Stack.Screen name="Setting" component={Setting} />
                
                {/* Admin Screens */}
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
                <Stack.Screen name="VendorManagement" component={VendorManagement} />
                <Stack.Screen name="ManageListing" component={ManageListing} />
                <Stack.Screen name="Scholarship" component={Scholarship} />
                <Stack.Screen name="StudentManagement" component={StudentManagement} />
                <Stack.Screen name="ContentManagement" component={ContentManagement} />
                <Stack.Screen name="AnalyticsReporting" component={AnalyticsReporting} />
                <Stack.Screen name="AdminSetting" component={AdminSetting} />
              </Stack.Navigator>
            </NavigationContainer>
            {/* Toast should be outside NavigationContainer but inside GestureHandlerRootView */}
              <Toast 
              position="top"
              topOffset={30}
              visibilityTime={3000}
              autoHide={true}
            />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ProfileProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  // Toast Styles
  toastSuccess: {
    height: 80,
    width: '90%',
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  toastError: {
    height: 80,
    width: '90%',
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  toastInfo: {
    height: 80,
    width: '90%',
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 20,
  },
  toastIconContainer: {
    marginRight: 12,
  },
  toastContent: {
    flex: 1,
  },
  toastTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  toastMessage: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
});

export default App;
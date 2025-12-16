// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { enableScreens } from 'react-native-screens';
// import BottomTabs from './src/navigation/BottomTabs';
// import SplashScreen from './src/screens/SplashScreen';
// import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
// import GetStartedScreen from './src/screens/GetStartedScreen';
// import SignInScreen from './src/screens/auth/SignInScreen';
// import SignUpScreen from './src/screens/auth/SignUpScreen';
// import Otp from './src/screens/auth/OtpScreen';
// import VendorSetup from './src/screens/vendor/VendorSetupScreen';
// import forgotPassword from './src/screens/vendor/ForgotPasswordScreen';
// import codeVerify from './src/screens/vendor/CodeVerificationScreen';
// import personalIdentity from './src/screens/student/PersonalIdentityScreen';
// import eduStatus from './src/screens/student/EducationStatusScreen';
// import Financial from './src/screens/student/FinancialInformationScreen';
// import InterestGoal from './src/screens/student/InterestsGoalsScreen';
// import Residency from './src/screens/student/ResidencyEligibilityScreen';
// import QuickApply from './src/screens/student/QuickApplyScreen';
// import Notification from './src/screens/student/NotificationScreen';
// import Congratulations from './src/screens/student/ConfirmationScreen';
// import vendor from './src/screens/vendor/VendorDashboardScreen';
// import CreateListing from './src/screens/vendor/CreateListingScreen';
// import ManageListing from './src/screens/vendor/ManageListingScreen';
// import VendorProfile from './src/screens/vendor/VendorProfile';
// import AdmninSignIn from './src/screens/admin/AdminSignIn';
// import AdminDashboard from './src/screens/admin/AdminDashboard';
// import ScholarshipDetails from './src/screens/scholarships/ScholarshipDetails';
// import Toast from 'react-native-toast-message';
// import { AuthProvider } from './src/context/AuthContext';
// import { ProfileProvider } from './src/context/ProfileContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { 
//   View, 
//   ActivityIndicator, 
// } from 'react-native';

// enableScreens();

// const Stack = createNativeStackNavigator();

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//  const [userToken, setUserToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     checkToken();
//   }, []);

//   const checkToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('@auth_token');
//       setUserToken(token);
//     } catch (error) {
//       console.error('Error checking token:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Show loading screen
//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#03A2D5" />
//       </View>
//     );
//   }
//    return (
//     <AuthProvider>
//       <ProfileProvider>
//         <GestureHandlerRootView style={styles.root}>
//           <SafeAreaProvider>
//             <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//             <NavigationContainer>
//               <Stack.Navigator
//                 screenOptions={{ headerShown: false }}
//                 initialRouteName={userToken ? "MainTabs" : "Splash"}
//               >
//                 {/* Public Routes - No authentication needed */}
//                 <Stack.Screen name="Splash" component={SplashScreen} />
//                 <Stack.Screen name="Onboarding" component={OnboardingScreen} />
//                 <Stack.Screen name="GetStarted" component={GetStartedScreen} />
//                 <Stack.Screen name="SignIn" component={SignInScreen} />
//                 <Stack.Screen name="SignUp" component={SignUpScreen} />
//                 <Stack.Screen name="Otp" component={Otp} />
//                 <Stack.Screen name="forgotPassword" component={forgotPassword} />
//                 <Stack.Screen name="CodeVerification" component={codeVerify} />
//                 <Stack.Screen name="AdminSignIn" component={AdmninSignIn} />
                
//                 {/* Protected Routes - Require authentication */}
//                 {userToken && (
//                   <>
//                     <Stack.Screen name="PersonalIdentity" component={personalIdentity} />
//                     <Stack.Screen name="EduStatus" component={eduStatus} />
//                     <Stack.Screen name="Financial" component={Financial} />
//                     <Stack.Screen name="Interest" component={InterestGoal} />
//                     <Stack.Screen name="Residency" component={Residency} />
//                     <Stack.Screen name="QuickApply" component={QuickApply} />
//                     <Stack.Screen name="Notification" component={Notification} />
//                     <Stack.Screen name="Congratulations" component={Congratulations} />
//                     <Stack.Screen name="MainTabs" component={BottomTabs} />
//                     <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />
//                     <Stack.Screen name="VendorDashboard" component={vendor} />
//                     <Stack.Screen name="CreateListing" component={CreateListing} />
//                     <Stack.Screen name="ManageListing" component={ManageListing} />
//                     <Stack.Screen name="VendorProfile" component={VendorProfile} />
//                     <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
//                     <Stack.Screen name="VendorSetup" component={VendorSetup} />
//                   </>
//                 )}
//               </Stack.Navigator>
//             </NavigationContainer>
//             <Toast 
//               position="top" 
//               topOffset={50}
//               visibilityTime={3000}
//               autoHide={true}
//             />
//           </SafeAreaProvider>
//         </GestureHandlerRootView>
//       </ProfileProvider>
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
// });

// export default App;

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import BottomTabs from './src/navigation/BottomTabs';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import GetStartedScreen from './src/screens/GetStartedScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import Otp from './src/screens/auth/OtpScreen';
import personalIdentity from './src/screens/student/PersonalIdentityScreen';
import eduStatus from './src/screens/student/EducationStatusScreen';
import Financial from './src/screens/student/FinancialInformationScreen';
import InterestGoal from './src/screens/student/InterestsGoalsScreen';
import Residency from './src/screens/student/ResidencyEligibilityScreen';
import QuickApply from './src/screens/student/QuickApplyScreen';
import Notification from './src/screens/student/NotificationScreen';
import Congratulations from './src/screens/student/ConfirmationScreen';
import vendor from './src/screens/vendor/VendorDashboardScreen';
import CreateListing from './src/screens/vendor/CreateListingScreen';
// import ManageListing1 from './src/screens/vendor/ManageListingScreen';
import VendorProfile from './src/screens/vendor/VendorProfile';
import AdminSignIn from './src/screens/admin/AdminSignIn';
import AdminDashboard from './src/screens/admin/AdminDashboard';
import ScholarshipDetails from './src/screens/scholarships/ScholarshipDetails';
import videoHub from './src/screens/videos/videoHub'
import videoPlayer from './src/screens/videos/videoPlayer'
import TuitionAssistance from './src/screens/perks/tuitionAssitance';
import PerkPreview from './src/screens/perks/perkPreview';
import VendorManagement from './src/screens/admin/VendorManagement'
import ManageListing from './src/screens/admin/ManageListing'
import Scholarship from './src/screens/admin/Schorlarship'
import StudentManagement from './src/screens/admin/StudentManagement'
import ContentManagement from './src/screens/admin/ContentManagement'
import AnalyticsReporting from './src/screens/admin/AnalyticsReporting'
import AdminSetting from './src/screens/admin/AdminSetting'
import PerkListing from './src/screens/vendor/PerkListing'
import ScholarshipListing from './src/screens/vendor/ScholarshipListing'
import TuitionAssistanceVendor from './src/screens/vendor/TuitionAssistanceVendor'
import EducationalVideo from './src/screens/vendor/EducationalVideo'
import ManageListingScreen from './src/screens/vendor/ManageListingScreen'
import CocaCola from './src/screens/vendor/CocaCola'
import Setting from './src/screens/vendor/Setting'
import VendorTabs from './src/navigation/VendorStackNavigator';
import VendorStackNavigator from './src/navigation/VendorStackNavigator';
import VendorHeader from './src/components/VendorHeader';
import AdmninSignIn from './src/screens/admin/AdminSignIn';

enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Splash');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('@auth_token');
      const userStr = await AsyncStorage.getItem('@user_data');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        setUserData(user);
        
        if (user.user_type === 'admin') {
          setInitialRoute('AdminDashboard');
        } else if (user.user_type === 'vendor') {
          setInitialRoute('VendorDashboard');
        } else {
          setInitialRoute('MainTabs');
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

  // Show loading screen
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Splash"
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="PersonalIdentity" component={personalIdentity}/>
            <Stack.Screen name="EduStatus" component={eduStatus} />
            <Stack.Screen name="Financial" component={Financial} />
            <Stack.Screen name="Interest" component={InterestGoal} />
            <Stack.Screen name="Residency" component={Residency} />
            <Stack.Screen name="QuickApply" component={QuickApply} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Congratulations" component={Congratulations} />

            {/* Main app with tabs */}
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            {/* vendor tabs */}


            <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />
            <Stack.Screen name="videoHub" component={videoHub} />
            <Stack.Screen name="videoPlayer" component={videoPlayer} />
            <Stack.Screen name="tuitionAssistance" component={TuitionAssistance} />
            <Stack.Screen name="perkPreview" component={PerkPreview} />
            
            {/* Components */}
            <Stack.Screen name="VendorHeader" component={VendorHeader} />
            {/* vendor flow */}
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

            {/* Amin Flow */}
            <Stack.Screen name="AdminSignIn" component={AdmninSignIn} />
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
});

export default App;
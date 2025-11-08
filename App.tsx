import 'react-native-gesture-handler';
import React from 'react';
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
import VendorSetup from './src/screens/vendor/VendorSetupScreen';
import forgotPassword from './src/screens/vendor/ForgotPasswordScreen';
import codeVerify from './src/screens/vendor/CodeVerificationScreen';
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
import ManageListing from './src/screens/vendor/ManageListingScreen';
import VendorProfile from './src/screens/vendor/VendorProfile';
import AdmninSignIn from './src/screens/admin/AdminSignIn';
import AdminDashboard from './src/screens/admin/AdminDashboard';
import ScholarshipDetails from './src/screens/scholarships/ScholarshipDetails';
enableScreens();

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
            <Stack.Screen name="VendorSetup" component={VendorSetup} />
            <Stack.Screen name="forgotPassword" component={forgotPassword} />
            <Stack.Screen name="CodeVerification" component={codeVerify} />
            <Stack.Screen
              name="PersonalIdentity"
              component={personalIdentity}
            />
            <Stack.Screen name="EduStatus" component={eduStatus} />
            <Stack.Screen name="Financial" component={Financial} />
            <Stack.Screen name="Interest" component={InterestGoal} />
            <Stack.Screen name="Residency" component={Residency} />
            <Stack.Screen name="QuickApply" component={QuickApply} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Congratulations" component={Congratulations} />

            {/* Main app with tabs */}
            <Stack.Screen name="MainTabs" component={BottomTabs} />

            <Stack.Screen name="ScholarshipDetails" component={ScholarshipDetails} />

            {/* vendor flow */}
            <Stack.Screen name="VendorDashboard" component={vendor} />
            <Stack.Screen name="CreateListing" component={CreateListing} />
            <Stack.Screen name="ManageListing" component={ManageListing} />
            <Stack.Screen name="VendorProfile" component={VendorProfile} />
            {/* Amin Flow */}
            <Stack.Screen name="AdminSignIn" component={AdmninSignIn} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
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
});

export default App;

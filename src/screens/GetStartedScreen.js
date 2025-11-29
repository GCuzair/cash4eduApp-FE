import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('window');

const GetStartedScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      {/* Top Gradient Layer */}
      <LinearGradient
        colors={['#51E3FC', '#03A2D5', '#021E38', '#000']}
        style={styles.gradientTop}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Logo */}
          <Image
            source={require('../assets/images/Logo2.png')}
            style={styles.logo}
          />

          {/* Headings */}
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>
            Unlock opportunities to fund your education
          </Text>

          {/* Social Buttons */}
          {[
            { name: 'google', text: 'Continue with Google', color: '#000' },
            { name: 'apple', text: 'Continue with Apple', color: '#000' },
            { name: 'facebook', text: 'Continue with Facebook', color: '#1877F2' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.socialButton}
              activeOpacity={0.85}
              accessibilityLabel={`Sign in with ${item.text}`}
              onPress={()=>navigation.replace('VendorTabs')}
            >
              <Icon name={item.name} size={22} color={item.color} />
              <Text style={styles.socialText}>{item.text}</Text>
            </TouchableOpacity>
          ))}

          {/* Divider */}
          <View style={styles.orDivider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          {/* Email Buttons */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signupBtn}
            activeOpacity={0.85}
            accessibilityLabel="Sign up with email"
          >
            <Text style={styles.signupText}>Sign up with email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signinBtn}
            onPress={() => navigation.navigate('SignIn')}
            activeOpacity={0.85}
            accessibilityLabel="Sign in with email"
          >
            <Text style={styles.signinText}>Sign in with email</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.7} 
            onPress={() => navigation.navigate('AdminSignIn')}>
              <Text style={styles.footerText}>Privacy Policy</Text>
            </TouchableOpacity>
            <View style={styles.dot} />
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('VendorDashboard')}>
              <Text style={styles.footerText}>Terms of Service</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GetStartedScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    opacity: 0.8,
    zIndex: 0,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginTop: 5,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    width: '90%',
    borderRadius: 30,
    marginBottom: 15,
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  socialText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#848484',
  },
  orText: {
    color: '#848484',
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  signupBtn: {
    backgroundColor: '#03A2D5',
    width: '90%',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#03A2D5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  signupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  signinBtn: {
    borderWidth: 1,
    borderColor: '#5C5C5C',
    paddingVertical: 14,
    width: '90%',
    borderRadius: 30,
    marginTop: 15,
  },
  signinText: {
    color: '#03A2D5',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#848484',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 6,
    backgroundColor: '#BFBFBF',
  },
});

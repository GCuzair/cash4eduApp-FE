import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      {/* Top Gradient Layer */}
      <LinearGradient
        colors={['#51E3FC', '#03A2D5', '#021E38', '#000']}
        style={styles.gradientTop}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Back Icon */}
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              >
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={36}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* Logo */}
              <Image
                source={require('../../assets/images/Logo2.png')}
                style={styles.logo}
              />

              {/* Headings */}
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Connecting you to smarter financial opportunities.
              </Text>

              {/* Email */}
              <Text style={styles.label}>Email address*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password */}
              <Text style={styles.label}>Password*</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>

              {/* Remember Me + Forgot */}
              <View style={styles.rememberForgotRow}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <Ionicons
                    name={rememberMe ? 'checkbox' : 'square-outline'}
                    size={20}
                    color="#03A2D5"
                  />
                  <Text style={styles.rememberMeText}> Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Sign-In Button */}
              <TouchableOpacity
                style={styles.signinBtn}
                onPress={() => navigation.navigate('VendorSetup')}
              >
                <Text style={styles.signinText}>Sign in</Text>
              </TouchableOpacity>

              {/* Footer */}
              <Text style={styles.footer}>
                Don’t have an account?{' '}
                <Text
                  onPress={() => navigation.navigate('SignUp')}
                  style={styles.link}
                >
                  Sign up
                </Text>
              </Text>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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
  backIcon: {
    position: 'absolute',
    top: 30,
    zIndex: 2,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 4,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 9,
  },
  input: {
    backgroundColor: '#0000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    paddingHorizontal: 8,
    color: '#fff',
    marginBottom: 20,
    height: 54,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    paddingVertical: 15,
  },
  rememberForgotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: '#fff',
    fontSize: 13,
  },
  forgot: {
    color: '#fff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  signinBtn: {
    backgroundColor: '#000',
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#03A2D5',
    marginTop: 10,
    shadowColor: '#03A2D5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  signinText: {
    color: '#03A2D5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 80,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

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
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const AdminSignIn = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      {/* Top Gradient */}
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

              {/* Heading */}
              <Text style={styles.title}>Admin Login</Text>
              <Text style={styles.subtitle}>
                Authorized Personnel Only. Enter your credentials to access the admin dashboard.
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

              {/* Remember + Forgot */}
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

              {/* Two-Factor Authentication */}
              <View style={styles.twoFactorRow}>
                <Text style={styles.twoFactorText}>
                  Two-factor authentication required for this session.
                </Text>
                <Switch
                  value={twoFactor}
                  onValueChange={setTwoFactor}
                  thumbColor={twoFactor ? '#03A2D5' : '#aaa'}
                  trackColor={{ false: '#444', true: '#051622' }}
                />
              </View>

              {/* Sign In Button */}
              <TouchableOpacity
                style={styles.signinBtn}
                onPress={() => navigation.navigate('AdminDashboard')}
              >
                <Text style={styles.signinText}>Sign in</Text>
              </TouchableOpacity>

              {/* Footer */}
              <Text style={styles.footer}>
                Access restricted to authorized staff only.
              </Text>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AdminSignIn;

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
  },
  backIcon: {
    position: 'absolute',
    top: 30,
    zIndex: 2,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    
  },
  subtitle: {
    color: '#BDBDBD',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 15,
    lineHeight: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 9,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    paddingHorizontal: 8,
    color: '#fff',
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
  twoFactorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  twoFactorText: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  signinBtn: {
    backgroundColor: '#000',
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#03A2D5',
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
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 12,
  },
});

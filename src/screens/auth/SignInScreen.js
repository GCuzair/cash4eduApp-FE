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
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';
import { Storage } from '../../utils/Storage';

const SignInScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all fields',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter valid email',
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await FireApi('login', 'POST', {}, payload);

      if (!response) {
        return;
      }

      // Check if response has success property
      if (response && response.success === true) {
        if (response?.token) {
          await Storage.setToken(response.token);
        }

        if (response?.user) {
          await Storage.setUser(response.user);
        }

        // Login successful
        Toast.show({
          type: 'success',
          text1: 'Welcome!',
          text2: response.message || 'Login successful',
        });

        // Navigate based on user type or to main app
        navigation.navigate('MainTabs'); // or 'VendorDashboard' based on user type
      } else {
        // Login failed
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response?.message || 'Invalid email or password',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network error. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
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

              <Image
                source={require('../../assets/images/Logo2.png')}
                style={styles.logo}
              />

              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Connecting you to smarter financial opportunities.
              </Text>

              <Text style={styles.label}>Email address*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
              />

              <Text style={styles.label}>Password*</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={text => handleInputChange('password', text)}
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

                <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                  <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.signinBtn, loading && styles.disabledBtn]}
                onPress={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#03A2D5" />
                ) : (
                  <Text style={styles.signinText}>Sign in</Text>
                )}
              </TouchableOpacity>

              <Text style={styles.footer}>
                Don't have an account?{' '}
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
  disabledBtn: {
    opacity: 0.7,
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

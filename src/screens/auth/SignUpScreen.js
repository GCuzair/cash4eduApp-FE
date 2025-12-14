import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import {FireApi} from '../../utils/FireApi';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [contactMethods, setContactMethods] = useState({
    text: false,
    email: true,
    app: false,
  });
  const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
    fullName: '',
    yearOfBirth: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignUp = async () => {
    if (!formData.fullName || !formData.yearOfBirth || !formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all required fields',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }

    setLoading(true);

     try {
    const requestData = {
      name: formData.fullName,
      yearOfBirth: formData.yearOfBirth,
      email: formData.email,
      password: formData.password,
      contactMethods: contactMethods
    };

    const response = await FireApi(
      'create-user',
      'POST',
      {},
      requestData
    );
    
    if (response && response.success === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response.message || 'OTP sent to your email',
      });
      
      navigation.navigate('Otp', { 
        email: formData.email,
        fullName: formData.fullName 
      });
    } else {
      // Don't navigate - show error
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: response?.message || 'Unable to create account',
      });
    }
  } catch (error) {
    console.error('Sign up error:', error);
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Please check your connection and try again',
    });
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <LinearGradient colors={['#051622', '#000000']} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#03A2D5" />
        <Text style={styles.loadingText}>Creating your account...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.container}>
            {/* Top Overlay Gradient */}
            <LinearGradient
              colors={['#51E3FC', '#51E3FC', '#021E38', '#000000']}
              style={styles.gradientTop}
            />

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back-circle-outline" size={36} color="#fff" />
            </TouchableOpacity>

            {/* Logo */}
            <Image
              source={require('../../assets/images/Logo2.png')}
              style={styles.logo}
            />

            {/* Title */}
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Create your profile and access exclusive scholarship offers.
            </Text>

            {/* Form */}
            <View style={styles.formBox}>
              <Text style={styles.label}>Full name*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#aaa"
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
              />

              <Text style={styles.label}>Year of birth*</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={formData.yearOfBirth}
                onChangeText={(text) => handleInputChange('yearOfBirth', text)}
              />

              <Text style={styles.label}>Email address*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
              />

              <Text style={styles.label}>Password*</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#aaa"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="#aaa"
                  />
                </TouchableOpacity>
              </View>

              {/* Contact Method */}
              <Text style={styles.label}>Preferred Contact Method*</Text>
              <View style={styles.checkboxContainer}>
                {[
                  { key: 'text', label: 'Text' },
                  { key: 'email', label: 'Email' },
                  { key: 'app', label: 'In-app Notifications' },
                ].map(({ key, label }) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() =>
                      setContactMethods((prev) => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    style={styles.checkboxItem}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name={
                        contactMethods[key] ? 'checkbox' : 'square-outline'
                      }
                      size={22}
                      color="#03A2D5"
                    />
                    <Text style={styles.checkboxLabel}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.nextBtn}
              activeOpacity={0.8}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.nextText}>
                {loading ? 'Creating Account...' : 'Next'}
              </Text>
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.footer}>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('SignIn')}
                style={styles.link}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </LinearGradient>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 25,
    paddingTop: 35,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    opacity: 0.7,
    zIndex: 0,
  },
  backIcon: {
    position: 'absolute',
    top: 50,
    left: 25,
    zIndex: 10,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDBDBD',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 13,
    paddingHorizontal: 10,
  },
  formBox: {
    marginTop: 10,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
    height: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  nextBtn: {
    backgroundColor: '#000',
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#03A2D5',
    width: '70%',
    alignSelf: 'center',
    marginTop: 14,
    shadowColor: '#03A2D5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  nextText: {
    color: '#03A2D5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
  },
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
  },
});
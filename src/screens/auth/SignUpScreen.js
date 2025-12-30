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
import { FireApi } from '../../utils/FireApi';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [contactMethods, setContactMethods] = useState({
    text_based_notifications: false,
    email_notification: true,
    in_app_notification: false,
  });
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState('student'); // Default to student
  const [formData, setFormData] = useState({
    name: '',
    birthday: '', // Changed from yearOfBirth
    email: '',
    password: '',
  });

  const validateAndFormatDate = dateStr => {
    // Check if input is exactly 8 digits
    if (!/^\d{8}$/.test(dateStr)) {
      return {
        isValid: false,
        message: 'Date must be exactly 8 digits (DDMMYYYY)',
      };
    }

    const day = parseInt(dateStr.substring(0, 2));
    const month = parseInt(dateStr.substring(2, 4));
    const year = parseInt(dateStr.substring(4, 8));

    // Validate day
    if (day < 1 || day > 31) {
      return { isValid: false, message: 'Day must be between 01-31' };
    }

    // Validate month
    if (month < 1 || month > 12) {
      return { isValid: false, message: 'Month must be between 01-12' };
    }

    // Validate year (reasonable range)
    if (year < 1900 || year > new Date().getFullYear()) {
      return {
        isValid: false,
        message: 'Year must be between 1900 and current year',
      };
    }

    // Check if date is valid (e.g., not 31st Feb)
    const date = new Date(year, month - 1, day);
    if (
      date.getDate() !== day ||
      date.getMonth() !== month - 1 ||
      date.getFullYear() !== year
    ) {
      return { isValid: false, message: 'Invalid date' };
    }

    // Format to YYYY-MM-DD
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    return {
      isValid: true,
      formattedDate: formattedDate,
      displayDate: `${day}/${month}/${year}`, // For displaying back to user if needed
    };
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = dateStr => {
    // Format DD/MM/YYYY to YYYY-MM-DD
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  const handleSignUp = async () => {
    // Validate all required fields
    if (
      !formData.name ||
      !formData.birthday ||
      !formData.email ||
      !formData.password
    ) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all required fields',
      });
      return;
    }

    // Validate and format date (DDMMYYYY format)
    const dateValidation = validateAndFormatDate(formData.birthday);
    if (!dateValidation.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Date',
        text2: dateValidation.message,
      });
      return;
    }

    // Validate email
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
      // Use the formatted date from validation
      const formattedDate = dateValidation.formattedDate;

      // Prepare payload according to API requirements
      const requestData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        user_type: userType,
        birthday: formattedDate, // Now in YYYY-MM-DD format
        email_notification: contactMethods.email_notification,
        in_app_notification: contactMethods.in_app_notification,
        text_based_notifications: contactMethods.text_based_notifications,
      };

      console.log('Sending payload:', requestData);

      const response = await FireApi('create-user', 'POST', {}, requestData, true);
     
      if(!response) return;

      if (response && response.success === true) {
        console.log('response in signup screen ',response)
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.message || 'OTP sent to your email',
        });

        navigation.navigate('Otp', {
          email: formData.email,
          name: formData.name,
        });
      };
      //  else {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Sign Up Failed',
      //     text2: response?.message || 'Unable to create account',
      //   });
      // }
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
      <LinearGradient
        colors={['#051622', '#000000']}
        style={styles.loadingContainer}
      >
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
              Create your profile and access exclusive opportunities.
            </Text>

            {/* Form */}
            <View style={styles.formBox}>
              {/* User Type Selection */}
              <Text style={styles.label}>I am a*</Text>
              <View style={styles.userTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'student' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('student')}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === 'student' && styles.userTypeTextActive,
                    ]}
                  >
                    Student
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'vendor' && styles.userTypeButtonActive,
                  ]}
                  onPress={() => setUserType('vendor')}
                >
                  <Text
                    style={[
                      styles.userTypeText,
                      userType === 'vendor' && styles.userTypeTextActive,
                    ]}
                  >
                    Vendor
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Full name*</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#aaa"
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
              />

              <Text style={styles.label}>Date of birth*</Text>
              <TextInput
                style={styles.input}
                placeholder="DDMMYYYY (e.g., 02042004 for 2nd April 2004)"
                placeholderTextColor="#aaa"
                value={formData.birthday}
                onChangeText={text => handleInputChange('birthday', text)}
                maxLength={8}
                keyboardType="numeric"
              />

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
                  {
                    key: 'text_based_notifications',
                    label: 'Text',
                    icon: contactMethods.text_based_notifications
                      ? 'checkbox'
                      : 'square-outline',
                  },
                  {
                    key: 'email_notification',
                    label: 'Email',
                    icon: contactMethods.email_notification
                      ? 'checkbox'
                      : 'square-outline',
                  },
                  {
                    key: 'in_app_notification',
                    label: 'In-app Notifications',
                    icon: contactMethods.in_app_notification
                      ? 'checkbox'
                      : 'square-outline',
                  },
                ].map(({ key, label, icon }) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() =>
                      setContactMethods(prev => ({
                        ...prev,
                        [key]: !prev[key],
                      }))
                    }
                    style={styles.checkboxItem}
                    activeOpacity={0.8}
                  >
                    <Icon name={icon} size={22} color="#03A2D5" />
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
    marginTop: 20,
  },
  subtitle: {
    color: '#BDBDBD',
    textAlign: 'center',
    marginVertical: 5,
    fontSize: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  formBox: {
    marginTop: 10,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 6,
    marginHorizontal: 5,
  },
  userTypeButtonActive: {
    backgroundColor: '#03A2D5',
  },
  userTypeText: {
    color: '#03A2D5',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  userTypeTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
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

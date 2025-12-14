import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Email Required',
        text2: 'Please enter your email address',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email',
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
      };

      const response = await FireApi('forgot-password', 'POST', {}, payload);

      if (!response) return;

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Code Sent',
          text2: response.message || 'Verification code sent to your email',
        });

        navigation.navigate('CodeVerification', { email: email.trim() });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: response.message || 'Unable to send code',
        });
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['#51E3FC', '#03A2D5', '#021E38', '#000']}
            style={styles.gradientTop}
          />

          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={38} color="#fff" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we'll send a 4-digit verification code instantly.
          </Text>

          <View style={styles.formBox}>
            <Text style={styles.label}>Email address*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.nextBtn, loading && styles.disabledBtn]}
            activeOpacity={0.85}
            onPress={handleSendCode}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#03A2D5" />
            ) : (
              <Text style={styles.nextText}>Send Code</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.link}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 40,
  },

  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    opacity: 0.8,
  },

  backIcon: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 10,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 15,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },

  subtitle: {
    color: '#BDBDBD',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    paddingHorizontal: 8,
  },

  formBox: {
    marginBottom: 20,
  },

  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },

  input: {
    backgroundColor: '#000',
    borderWidth: 1.2,
    borderColor: '#03A2D5',
    borderRadius: 8,
    paddingHorizontal: 14,
    color: '#fff',
    height: 50,
    fontSize: 15,
  },

  nextBtn: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#03A2D5',
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#03A2D5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },

  disabledBtn: {
    opacity: 0.7,
  },

  nextText: {
    color: '#03A2D5',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 220,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
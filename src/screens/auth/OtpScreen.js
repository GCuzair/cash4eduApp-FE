import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
// import { FireApi } from '../../utils/FireApi';
import { handleApiError } from '../../utils/errorHandler';
import { verifyEmail } from '../../api/public/auth.api';

const EmailVerificationScreen = ({ navigation, route }) => {
  const { email, fullName } = route.params || {};
  console.log('📩 OTP Screen Email:', email);

  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');

    if (code.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Enter 4 digit verification code.',
      });
      return;
    }

    try {
      const payload = {
        email: email,
        otp: code,
      };

      const response = await verifyEmail(payload);

      if (!response) {
        Toast.show({
          type: 'error',
          text1: response.message || 'Verification Failed',
        });
        return;
      }

      if (response.success === true) {
        Toast.show({
          type: 'success',
          text1: response.message || 'Email Verified 🎉',
        });

        navigation.replace('MainTabs');

      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: response.message || 'Invalid OTP. Try again.',
        });
        return;
      }
    } catch (error) {
      const message = handleApiError(error);
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#51E3FC', '#51E3FC', '#021E38', '#000000']}
          style={styles.gradientTop}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back-circle-outline" size={36} color="#fff" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Account Verification</Text>
          <Text style={styles.subtitle}>
            A verification code has been sent to:{' '}
            <Text style={{ color: '#03A2D5' }}>{email}</Text>
          </Text>

          <View style={styles.otpHeader}>
            <Text style={styles.otpLabel}>Enter 4 Digit Code</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.otpContainer}
          >
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => (inputsRef.current[index] = el)}
                style={styles.otpBox}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={text =>
                  handleChange(text.replace(/[^0-9]/g, ''), index)
                }
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
            <Text style={styles.verifyText}>Verify</Text>
          </TouchableOpacity>

          <View style={styles.linkRow}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Resend code</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Change email</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text
              style={styles.signInLink}
              onPress={() => navigation.navigate('SignIn')}
            >
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default EmailVerificationScreen;

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  backIcon: { position: 'absolute', top: 50, left: 25 },
  logo: { width: 110, height: 110, resizeMode: 'contain', marginTop: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: '600', marginTop: 10 },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  otpHeader: { width: '100%', marginTop: 40, marginBottom: 10 },
  otpLabel: { color: '#fff', fontSize: 16 },
  otpContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 25,
  },
  otpBox: {
    width: 55,
    height: 60,
    borderWidth: 2,
    borderColor: '#03A2D5',
    borderRadius: 10,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: '#03A2D5',
  },
  verifyBtn: {
    width: '100%',
    backgroundColor: '#000',
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#03A2D5',
    marginTop: 10,
  },
  verifyText: {
    color: '#03A2D5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  linkRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  linkText: { color: '#fff', fontSize: 14, textDecorationLine: 'underline' },
  footer: { color: '#717171', textAlign: 'center', marginTop: 200 },
  signInLink: { color: '#fff', fontWeight: '700' },
});

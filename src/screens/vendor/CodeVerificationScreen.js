import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { FireApi } from '../../utils/FireApi';

const CodeVerificationScreen = ({ navigation, route }) => {
  const { email } = route.params || {};
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer(prev => prev > 1 ? prev - 1 : 0);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  const handleInput = (text, index) => {
    if (/^[0-9]$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Auto-focus next input
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleVerify = async () => {
    const otpCode = code.join('');

    if (otpCode.length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Code',
        text2: 'Please enter all 4 digits',
      });
      return;
    }

    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email not found',
      });
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: email.trim(),
        otp: otpCode,
      };

      const response = await FireApi('verify-otp', 'POST', {}, payload);

      if (!response) return;

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Verified!',
          text2: response.message || 'Code verified successfully',
        });

        // navigation.navigate('ResetPassword', { email });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: response.message || 'Invalid code',
        });
      }
    } catch (error) {
      console.error('Verify error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || !canResend) return;

    setResendLoading(true);

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
          text2: response.message || 'New code sent to your email',
        });

        // Reset timer and code
        setTimer(60);
        setCanResend(false);
        setCode(['', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed',
          text2: response.message || 'Unable to resend code',
        });
      }
    } catch (error) {
      console.error('Resend error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to resend',
      });
    } finally {
      setResendLoading(false);
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
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={36} color="#fff" />
          </TouchableOpacity>

          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
          />

          <View style={styles.whiteBox}>
            <Text style={styles.title}>Enter your code</Text>
            <Text style={styles.subtitle}>
              We sent a code to: {'\n'}
              <Text style={{ color: '#03A2D5', fontWeight: '600' }}>{email}</Text>
            </Text>

            <View style={styles.codeContainer}>
              {code.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.codeInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleInput(text, index)}
                  returnKeyType="next"
                  autoFocus={index === 0}
                  editable={!loading}
                />
              ))}
            </View>

            <Text style={styles.resendText}>
              Didn't receive the code?{' '}
              <TouchableOpacity onPress={handleResendCode} disabled={!canResend || resendLoading}>
                {resendLoading ? (
                  <ActivityIndicator size="small" color="#03A2D5" />
                ) : (
                  <Text style={[styles.resendLink, !canResend && styles.disabledLink]}>
                    {canResend ? 'Click to resend' : `Resend in ${timer}s`}
                  </Text>
                )}
              </TouchableOpacity>
            </Text>

            <TouchableOpacity
              style={[styles.nextBtn, loading && styles.disabledBtn]}
              onPress={handleVerify}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.nextText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text onPress={() => navigation.navigate('SignIn')} style={styles.link}>
              Sign in
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default CodeVerificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 60,
    paddingBottom: 40,
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
    top: 50,
    left: 25,
    zIndex: 2,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#555',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 13,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '80%',
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#03A2D5',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
  resendText: {
    color: '#555',
    fontSize: 13,
    marginBottom: 20,
    textAlign: 'center',
  },
  resendLink: {
    color: '#03A2D5',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  disabledLink: {
    color: '#999',
    textDecorationLine: 'none',
  },
  nextBtn: {
    backgroundColor: '#03A2D5',
    paddingVertical: 13,
    borderRadius: 10,
    width: '80%',
  },
  disabledBtn: {
    opacity: 0.7,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 220,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
  },
});
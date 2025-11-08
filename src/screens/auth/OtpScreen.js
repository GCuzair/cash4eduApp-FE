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

const EmailVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      const chars = text.split('').slice(0, otp.length - index);
      const updatedOtp = [...otp];
      for (let i = 0; i < chars.length; i++) {
        updatedOtp[index + i] = chars[i];
        if (inputsRef.current[index + i + 1]) {
          inputsRef.current[index + i + 1].focus();
        }
      }
      setOtp(updatedOtp);
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (
      nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      inputsRef.current[index - 1]
    ) {
      inputsRef.current[index - 1].focus();
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    console.log('OTP entered:', code);
  };

  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Top Gradient */}
        <LinearGradient
          colors={['#51E3FC', '#51E3FC', '#021E38', '#000000']}
          style={styles.gradientTop}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Back Icon */}
          <TouchableOpacity
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back-circle-outline" size={36} color="#fff" />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
          />

          {/* Title */}
          <Text style={styles.title}>Account Verification</Text>
          <Text style={styles.subtitle}>
            Check your inbox for a verification code. We’ve sent it to your
            email.
          </Text>

          {/* OTP Label */}
          <View style={styles.otpHeader}>
            <Text style={styles.otpLabel}>Enter Verification Code</Text>
          </View>

          {/* OTP Input */}
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
                returnKeyType="next"
                textContentType="oneTimeCode"
                importantForAutofill="yes"
                contextMenuHidden={false}
              />
            ))}
          </KeyboardAvoidingView>

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.verifyBtn}
            activeOpacity={0.8}
            onPress={() => {
              handleVerify();
              navigation.navigate('MainTabs');
            }}
          >
            <Text style={styles.verifyText}>Verify</Text>
          </TouchableOpacity>

          {/* Links */}
          <View style={styles.linkRow}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>Resend code</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.linkText}>Change email</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
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
    marginTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 10,
  },
  otpHeader: {
    width: '100%',
    marginTop: 40,
    marginBottom: 5,
  },
  otpLabel: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  otpBox: {
    width: 48,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#03A2D5',
    borderRadius: 8,
    color: '#03A2D5',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  verifyBtn: {
    width: '100%',
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
    elevation: 8,
  },
  verifyText: {
    color: '#03A2D5',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
  },
  linkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 220,
  },
  signInLink: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

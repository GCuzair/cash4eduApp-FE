import React, { useRef, useState } from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CodeVerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleInput = (text, index) => {
    if (/^[0-9]$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Auto-focus next input
      if (index < 3) {
        inputs.current[index + 1].focus();
      }
    } else if (text === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  return (
    <LinearGradient
      colors={['#051622', '#000000']}
      style={{ flex: 1 }}
    >
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
            <Text style={styles.subtitle}>We sent a code to your email</Text>

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
                />
              ))}
            </View>

            <Text style={styles.resendText}>
              Didn’t receive the code?{' '}
              <Text
                style={styles.resendLink}
                onPress={() => {
                  // Handle resend code
                  // console.log('Resend code');
                }}
              >
                Click to resend
              </Text>
            </Text>

            <TouchableOpacity style={styles.nextBtn} activeOpacity={0.8}>
              <Text style={styles.nextText}>Continue</Text>
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
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  nextBtn: {
    backgroundColor: '#03A2D5',
    paddingVertical: 13,
    borderRadius: 10,
    width: '80%',
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

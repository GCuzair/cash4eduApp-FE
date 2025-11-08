import React from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const ForgotPasswordScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#051622', '#000000']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Gradient Header Glow */}
          <LinearGradient
            colors={['#51E3FC', '#03A2D5', '#021E38', '#000']}
            style={styles.gradientTop}
          />

          {/* Back Icon */}
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={38} color="#fff" />
          </TouchableOpacity>

          {/* Logo */}
          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
          />

          {/* Title Section */}
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we’ll send a 4-digit verification code instantly.
          </Text>

          {/* Form */}
          <View style={styles.formBox}>
            <Text style={styles.label}>Email address*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('CodeVerification')}
          >
            <Text style={styles.nextText}>Send Code</Text>
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

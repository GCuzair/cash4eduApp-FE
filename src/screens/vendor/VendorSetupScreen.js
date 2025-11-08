import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const VendorSetupScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#051622', '#000000']} style={{ flex: 1 }}>
      {/* Top Gradient Layer */}
      <LinearGradient
        colors={['#51E3FC', '#03A2D5', '#021E38', '#000']}
        style={styles.gradientTop}
      />

      <View style={styles.container}>
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

        <Text style={styles.title}>Tell Us About Your Business</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formBox}>
            {['Business Name', 'Category', 'Services Offered', 'Tuition Benefits'].map(
              (label, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={styles.label}>{label}*</Text>
                  <TextInput
                    style={[
                      styles.input,
                      label === 'Tuition Benefits' && {
                        height: 90,
                        textAlignVertical: 'top',
                      },
                    ]}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    placeholderTextColor="#aaa"
                    multiline={label === 'Tuition Benefits'}
                  />
                </View>
              )
            )}
          </View>

          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('forgotPassword')}
          >
            <Text style={styles.nextText}>Save & Continue</Text>
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
      </View>
    </LinearGradient>
  );
};

export default VendorSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 25,
    paddingTop: 60,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    opacity: 0.8,
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
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  formBox: {},
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
    height: 50,
  },
  nextBtn: {
    backgroundColor: '#000',
    paddingVertical: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#03A2D5',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#03A2D5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  nextText: {
    color: '#03A2D5',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  footer: {
    color: '#717171',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
  },
});

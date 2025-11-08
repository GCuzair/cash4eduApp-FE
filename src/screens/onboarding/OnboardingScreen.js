import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// import MaterialIcons from react-native-vector-icons
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Find Scholarships That Fit You',
    description:
      'Get AI-powered scholarship suggestions tailored to your profile. Apply easily and boost your chances of funding your education.',
    image: require('../../assets/onboarding/image1.jpg'),
  },
  {
    id: 2,
    title: 'Learn & Earn with Short Videos',
    description:
      'Watch quick, engaging videos to build skills. Earn tokens while learning smarter ways to manage your finances.',
    image: require('../../assets/onboarding/image2.jpg'),
  },
  {
    id: 3,
    title: 'Unlock Student Perks & Rewards',
    description:
      'Enjoy exclusive discounts and redeem tokens for real benefits. From food to tuition perks, savings designed just for students.',
    image: require('../../assets/onboarding/image3.jpg'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const scrollViewRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = event => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
    } else {
      navigation.replace('GetStarted');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {slides.map(item => (
          <ImageBackground
            key={item.id}
            source={item.image}
            style={styles.slide}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['transparent', '#000']}
              style={styles.gradientOverlay}
            >
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('GetStarted');
          }}
        >
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
  <View style={styles.nextBtn}>
    <View style={{ transform: [{ rotate: '-45deg' }] }}>
      {currentSlide === slides.length - 1 ? (
        <Ionicons name="checkmark" size={34} color="#fff" />
      ) : (
        <Ionicons name="chevron-forward" size={34} color="#fff" />
      )}
    </View>
  </View>
</TouchableOpacity>

        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentSlide === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    height,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.60, // Adjust based on how much fade you want
    justifyContent: 'flex-end',
  },

  textContainer: {
    paddingHorizontal: 28,
    paddingBottom: 98,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 19,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  skip: {
    color: '#51E3FC',
    fontSize: 15,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#51E3FC',
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: '#51E3FC',
    width: 22,
  },
  nextBtn: {
  backgroundColor: '#51E3FC',
  width: 50,
  height: 50,
  transform: [{ rotate: '45deg' }],
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 12, 
  shadowColor: '#51E3FC',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 8, 
},

});

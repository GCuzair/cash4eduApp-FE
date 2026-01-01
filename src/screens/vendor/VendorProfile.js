import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ProfileContext } from '../../context/ProfileContext';
import { RefreshControl } from 'react-native-gesture-handler';
import { FireApi } from '../../utils/FireApi';

const { width } = Dimensions.get('window');

// --- Reusable Component for Info Sections ---
const InfoSection = ({ title, children, showEdit = true, onEdit }) => (
  <View style={styles.infoSection}>
    <View style={styles.infoHeader}>
      <Text style={styles.infoTitle}>{title}</Text>
      {showEdit && onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <MatIcon name="pencil-outline" size={20} color="#00BFFF" />
        </TouchableOpacity>
      )}
    </View>
    <View style={styles.infoContent}>{children}</View>
  </View>
);

const VendorProfileScreen = ({ navigation }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [descModalVisible, setDescModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);

  const { userProfile, userInfo, refreshUserProfile } =
    useContext(ProfileContext);
  const [loading, setLoading] = useState(false);
  
  // BUSINESS
  const [businessName, setBusinessName] = useState('');
  // CONTACT
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  // DESCRIPTION
  const [description, setDescription] = useState('');
  // SOCIAL LINKS
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');

  // Function to handle profile refresh
  const handleRefresh = async () => {
    setLoading(true);
    await refreshUserProfile(true);
    setLoading(false);
  };

  // Function to handle edit
  const handleEdit = section => {
    Alert.alert(
      'Edit Profile',
      `Edit ${section} functionality would open a form here.`,
      [{ text: 'OK' }],
    );
  };

  // Get initials for avatar
  const getInitials = name => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Extract REAL data from profile and userInfo
  const getProfileData = () => {
    // First check if we have userInfo (from Storage.getUser())
    if (userInfo && Object.keys(userInfo).length > 0) {
      return {
        // User basic info from Storage
        fullName: userInfo.full_name || 'Vendor',
        email: userInfo.email || 'Email not available',
        phone: userInfo.phone || 'Phone not available',
        // Profile specific data
        businessName:
          userInfo.current_school_name || userInfo.full_name || 'Business Name',
        isVerified: userInfo.is_verified || false,
        motto:
          userInfo.education_journey_description ||
          userInfo.bio ||
          'No description available',
        description:
          userInfo.education_journey_description ||
          userInfo.about ||
          'No description available',
        // From userProfile API
        zipCode: userInfo.zip_code || 'Not provided',
        state: userInfo.state_of_residence || 'Not provided',
        gpa: userInfo.cumulative_gpa || 'Not provided',
        graduationDate: userInfo.expected_graduation_date || 'Not provided',
        workStatus: userInfo.work_status || 'Not provided',
        website: userInfo.website || 'Not provided',
        // Profile completion
        profileCompletion: userInfo.profile_completion_percentage || 0,
        // Subscription info (if available)
        currentPlan: userInfo.subscription_plan || 'Free',
        renewalDate: userInfo.subscription_end_date || 'Not subscribed',
      };
    }

    // If no userInfo, check userProfile from API
    if (userProfile) {
      return {
        fullName: userProfile.current_school_name || 'User',
        email: userProfile.email || 'Email not available',
        phone: userProfile.phone || 'Phone not available',
        businessName: userProfile.business_name || 'Business Name',
        isVerified: userProfile.is_verified || false,
        motto:
          userProfile.education_journey_description ||
          'No description available',
        description:
          userProfile.education_journey_description || userProfile.description ||
          'No description available',
        zipCode: userProfile.zip_code || 'Not provided',
        state: userProfile.state_of_residence || 'Not provided',
        gpa: userProfile.cumulative_gpa || 'Not provided',
        graduationDate: userProfile.expected_graduation_date || 'Not provided',
        workStatus: userProfile.work_status || 'Not provided',
        website: userProfile.website || 'Not provided',
        profileCompletion: userProfile.profile_completion_percentage || 0,
        currentPlan: userProfile.subscription_plan || 'Free',
        renewalDate: userProfile.subscription_end_date || 'Not subscribed',
      };
    }

    // Default fallback only when no data available
    return {
      fullName: 'Loading...',
      email: email || 'Loading...',
      phone: phone || 'Loading...',
      businessName: businessName || 'Loading...',
      isVerified: false,
      motto: 'Loading...',
      description: description || 'Loading...',
      zipCode: 'Loading...',
      state: 'Loading...',
      gpa: 'Loading...',
      graduationDate: 'Loading...',
      workStatus: 'Loading...',
      website: website || 'Loading...',
      profileCompletion: 0,
      currentPlan: 'Loading...',
      renewalDate: 'Loading...',
    };
  };

  const profileData = getProfileData();

  useEffect(() => {
  if (!profileData) return;

  // Only set initial values once
  setBusinessName(profileData?.businessName || '');
  setPhone(profileData?.phone || '');
  setEmail(profileData?.email || '');
  setWebsite(profileData?.website || '');
  setDescription(profileData?.description || '');

  setFacebook(profileData?.social_links?.facebook || '');
  setInstagram(profileData?.social_links?.instagram || '');
  setLinkedin(profileData?.social_links?.linkedin || '');
  setTwitter(profileData?.social_links?.twitter || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); 

// {
//   "business_name": "string",
//   "logo_base64": "string",
//   "phone": "string",
//   "email": "user@example.com",
//   "website": "string",
//   "description": "string",
//   "social_links": {
//     "facebook": "string",
//     "instagram": "string",
//     "linkedin": "string",
//     "twitter": "string"
//   }
// }

const handleSubmit = async () => {
  const payload = {
    business_name : businessName,
    logo_base64 : '',
    phone : phone,
    email : email,
    website : website || '',
    description : description,
    social_links: {
     facebook: facebook || "",
     instagram: instagram || "" ,
    linkedin: linkedin || "" , 
    twitter: twitter || ""
  }

  }
  console.log('payload on submit',payload);

  
  try {
    setLoading(true);
    const response = await FireApi(
      'vendor/profile',   // ✅ correct endpoint
      'POST',             // ✅ POST method
      {},                 // options (headers optional)
      payload             // ✅ body
    );

    if (response || response?.success) {
      console.log('Profile updated successfully', response);

      Toast.show({
        type: 'success',
        text1: 'Profile Updated',
        text2: 'Your profile has been saved successfully',
      });

      // optional: refresh profile context
      refreshUserProfile(true);
    }
  } catch (error) {
    console.log('Submit profile error', error);
  } finally {
    setLoading(false);
  }
}

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={handleRefresh}
          tintColor="#00BFFF"
        />
      }
    >
      {/* 1. Header (Navigation Back Button) */}
      <View style={styles.screenHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 2. Profile Header (Avatar and Title) */}
      <View style={styles.profileHeader}>
        {/* Profile Avatar with Initials */}
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {getInitials(profileData.fullName)}
          </Text>
        </View>

        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{profileData.fullName}</Text>

          {profileData.isVerified ? (
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark-circle" size={16} color="#48BB78" />
              <Text style={styles.verifiedText}>Verified Vendor</Text>
            </View>
          ) : (
            <View style={styles.notVerifiedBadge}>
              <Icon name="time-outline" size={16} color="#A0AEC0" />
              <Text style={styles.notVerifiedText}>Not Verified</Text>
            </View>
          )}

          <Text style={styles.profileMotto}>{profileData.motto}</Text>
        </View>
      </View>

      {/* Profile Completion Indicator - Always show */}
      <View style={styles.completionSection}>
        <View style={styles.completionHeader}>
          <Text style={styles.completionTitle}>Profile Completion</Text>
          <Text style={styles.completionPercentage}>
            {profileData.profileCompletion}%
          </Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${profileData.profileCompletion}%` },
            ]}
          />
        </View>
        <Text style={styles.completionHint}>
          Complete your profile to get better opportunities
        </Text>
      </View>

      {/* {/* 3. Business Information */}
      <InfoSection
        title="Business Information"
        onEdit={() => setActiveModal('business')}
      >
        <Text style={styles.infoDetail}>
          Business Name: {profileData.businessName}
        </Text>
      </InfoSection>

      <Modal
        visible={activeModal === 'business'}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Business Information</Text>

            <TextInput
              placeholder="Business Name"
              placeholderTextColor="#94A3B8"
              value={businessName}
              onChangeText={setBusinessName}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setActiveModal(null)}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 4. Contact Info */}
      <InfoSection
        title="Contact Info"
        onEdit={() => setContactModalVisible(true)}
      >
        <Text style={styles.infoDetail}>
          <Icon name="call-outline" size={14} color="#A0AEC0" /> Phone:{' '}
          {/* profileData?.businessName && profileData.businessName !== 'Loading...' ? profileData.businessName : businessName */}
          {profileData.phone}
        </Text>

        <Text style={styles.infoDetail}>
          <Icon name="mail-outline" size={14} color="#A0AEC0" /> Email:{' '}
          {profileData.email}
        </Text>

        <Text style={styles.infoDetail}>
          <Icon name="globe-outline" size={14} color="#A0AEC0" /> Website:{' '}
          {profileData.website}
        </Text>
      </InfoSection>

      <Modal visible={contactModalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Contact Information</Text>
            <Text style={{}}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <Text style={{}}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={{}}>Website</Text>
            <TextInput
              style={styles.input}
              placeholder="Website"
              value={website}
              onChangeText={setWebsite}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setContactModalVisible(false)}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 5. Description / About Us */}
      <InfoSection
        title="Description / About Us"
        onEdit={() => setDescModalVisible(true)}
      >
        <Text style={styles.descriptionText}>{profileData.description}</Text>
      </InfoSection>

      <Modal
        visible={descModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Description / About Us</Text>

            <TextInput
              placeholder="Description"
              placeholderTextColor="#94A3B8"
              value={description}
              onChangeText={setDescription}
              style={styles.modalInput}
            />

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setDescModalVisible(false)}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 6. Academic Information */}
      {/* <InfoSection
        title="Academic Information"
        onEdit={() => handleEdit('Academic Information')}
      >
        <Text style={styles.infoDetail}>GPA: {profileData.gpa}</Text>
        <Text style={styles.infoDetail}>
          Expected Graduation: {profileData.graduationDate}
        </Text>
        <Text style={styles.infoDetail}>
          Work Status: {profileData.workStatus}
        </Text>
      </InfoSection> */}

      {/* 7. Social Links */}
      <InfoSection
        title="Social Links"
        onEdit={() => setSocialModalVisible(true)}
      >
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton}>
            <FAIcon
              name="facebook"
              size={24}
              color="#007BFF"
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FAIcon
              name="instagram"
              size={24}
              color="#FF007B"
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FAIcon
              name="linkedin-square"
              size={24}
              color="#0077B5"
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </InfoSection>

     <Modal visible={socialModalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Contact Information</Text>
            <Text style={{}}>Facebook</Text>
            <TextInput
              style={styles.input}
              placeholder="Facebook"
              value={facebook}
              onChangeText={setFacebook}
              keyboardType="email-address"
            />
            <Text style={{}}>Instagram</Text>
            <TextInput
              style={styles.input}
              placeholder="Instagram"
              value={instagram}
              onChangeText={setInstagram}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={{}}>LinkedIn</Text>
            <TextInput
              style={styles.input}
              placeholder="LinkedIn"
              value={linkedin}
              onChangeText={setLinkedin}
              autoCapitalize="none"
            />

            <Text style={{}}>twitter</Text>
            <TextInput
              style={styles.input}
              placeholder="twitter"
              value={twitter}
              onChangeText={setTwitter}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setSocialModalVisible(false)}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* 8. Subscription / Plan Info */}
      <View style={styles.subscriptionSection}>
        <View style={styles.infoHeader}>
          <Text style={styles.subscriptionTitle}>Subscription / Plan Info</Text>
          <TouchableOpacity onPress={() => handleEdit('Subscription')}>
            <MatIcon name="pencil-outline" size={20} color="#00BFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.subscriptionDetails}>
          <Text style={styles.planInfo}>
            Current Plan:{' '}
            <Text style={styles.planValue}>{profileData.currentPlan}</Text>
          </Text>
          <Text style={styles.planInfo}>
            Renewal Date:{' '}
            <Text style={styles.planValue}>{profileData.renewalDate}</Text>
          </Text>
        </View>
        <View style={styles.upgradeRow}>
          <TouchableOpacity style={styles.upgradeButton} 
           onPress={handleSubmit}>
            <Text style={styles.upgradeText}>Upgrade Plan</Text>
          </TouchableOpacity>
          <View style={styles.upgradeHint}>
            <Icon name="information-circle-outline" size={18} color="#00BFFF" />
            <Text style={styles.upgradeHintText}>
              Premium users get featured listing
            </Text>
          </View>
        </View>
      </View>

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Icon name="refresh" size={20} color="#00BFFF" />
        <Text style={styles.refreshText}>Refresh Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },

  // --- Profile Header ---
  screenHeader: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 12,
    padding: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#03a2d5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E3E66',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  notVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D3748',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    color: '#48BB78',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  notVerifiedText: {
    color: '#A0AEC0',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  profileMotto: {
    color: '#A0AEC0',
    fontSize: 14,
    textAlign: 'left',
  },

  // --- Profile Completion ---
  completionSection: {
    backgroundColor: '#021e38',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  completionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  completionTitle: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  completionPercentage: {
    color: '#48BB78',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#2D3748',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#48BB78',
    borderRadius: 4,
  },
  completionHint: {
    color: '#A0AEC0',
    fontSize: 12,
  },

  // --- Info Sections ---
  // infoSection: {
  //   backgroundColor: '#021e38',
  //   borderRadius: 10,
  //   padding: 15,
  //   marginBottom: 15,
  // },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoTitle: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoContent: {},
  // infoDetail: {
  //   color: '#A0AEC0',
  //   fontSize: 14,
  //   lineHeight: 24,
  // },
  // descriptionText: {
  //   color: '#A0AEC0',
  //   fontSize: 14,
  //   lineHeight: 20,
  // },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    alignItems: 'center',
  },
  socialIcon: {
    marginBottom: 5,
  },
  socialText: {
    color: '#A0AEC0',
    fontSize: 12,
  },

  // --- Subscription Info ---
  subscriptionSection: {
    backgroundColor: '#021e38',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  subscriptionTitle: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  subscriptionDetails: {
    marginBottom: 15,
  },
  planInfo: {
    color: '#ffffffff',
    fontSize: 14,
    marginBottom: 4,
  },
  planValue: {
    color: '#A0AEC0',
    fontSize: 14,
  },
  upgradeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  upgradeButton: {
    backgroundColor: '#03a2d5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  upgradeText: {
    color: '#000000ff',
    fontWeight: '600',
    fontSize: 16,
    padding: 4,
  },
  upgradeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  upgradeHintText: {
    color: '#A0AEC0',
    fontSize: 12,
    marginLeft: 5,
    flexShrink: 1,
  },

  // --- Refresh Button ---
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#021e38',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  refreshText: {
    color: '#00BFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#fff',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: '#0F172A', // dark background
  },

  /* ========= Info Text ========= */
  infoDetail: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 6,
  },

  /* ========= Description Text ========= */
  descriptionText: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginTop: 6,
  },

  /* ========= Section Container (optional helper) ========= */
  infoSection: {
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  /* ========= Edit Row ========= */
  editRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  /* ========= Label ========= */
  label: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
  },

  /* ========= Social Row ========= */
  socialRow: {
    marginBottom: 10,
  },
  overlay: {
    flex: 1, // full screen cover
    backgroundColor: 'rgba(0,0,0,0.65)', // dark background
    justifyContent: 'center', // center vertically
    alignItems: 'center', // center horizontally
  },
  modalBox: {
    width: '88%', // thoda margin side se
    backgroundColor: '#fff',    // dark card
    borderRadius: 18, // smooth corners
    padding: 20,
    elevation: 8, // Android shadow
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#00BFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#0F172A',
  },
  okButton: {
    marginTop: 22,
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  okText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    color: '#E2E8F0',
    fontSize: 14,
  },
});

export default VendorProfileScreen;

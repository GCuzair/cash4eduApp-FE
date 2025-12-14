import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProfileContext } from "../../context/ProfileContext";
import { AuthContext } from "../../context/AuthContext"; // Add this import
import { useNavigation } from '@react-navigation/native'; // Add this import

const ProfileScreen = ({ navigation }) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { userInfo } = useContext(ProfileContext);
  const { logout } = useContext(AuthContext); // Get logout from AuthContext

  // Handle logout function
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              // Navigate to login screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
              });
            } else {
              Alert.alert("Error", result.error || "Failed to logout");
            }
          },
        },
      ]
    );
  };

  // Handle setting item clicks
  const handleSettingItemPress = (title) => {
    switch (title) {
      case "Logout":
        handleLogout();
        break;
      case "Language":
        navigation.navigate("LanguageSettings");
        break;
      case "Security":
        navigation.navigate("SecuritySettings");
        break;
      case "Terms & Conditions":
        navigation.navigate("TermsAndConditions");
        break;
      case "Privacy Policy":
        navigation.navigate("PrivacyPolicy");
        break;
      case "Help":
        navigation.navigate("HelpCenter");
        break;
      case "Invite a friend":
        // Handle invite logic
        Alert.alert("Invite", "Invite feature coming soon!");
        break;
      case "Delete Account":
        Alert.alert(
          "Delete Account",
          "This action cannot be undone. Are you sure?",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive" },
          ]
        );
        break;
      default:
        console.log(`Pressed: ${title}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.ProfileHeader}>
        <Text style={styles.ProfileText}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER SECTION */}
        <View style={styles.headerCard}>
          <View style={styles.row}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=3" }}
              style={styles.profileImage}
            />
            <View style={styles.headerInfo}>
              <Text style={styles.userName}>{userInfo?.full_name}</Text>
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>Level 3 Learner</Text>
              </View>
            </View>
          </View>

          {/* STATS */}
          <View style={styles.statsGrid}>
            {statsData.map((item, index) => (
              <TouchableOpacity key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View style={styles.statRow}>
                    <Icon name={item.icon} size={20} color="#fff" />
                    <Text style={styles.statValue}>{item.value}</Text>
                  </View>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* HEADER BUTTONS */}
          <View style={styles.profileButtons}>
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={() => navigation.navigate("UpdateProfile")}
            >
              <Text style={styles.primaryBtnText}>Update Profile</Text>
              <Icon name="arrow-forward" size={16} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => navigation.navigate("BadgesnAchievements")}
            >
              <Text style={styles.secondaryBtnText}>View Badges</Text>
              <Icon name="arrow-forward" size={16} color="#00C6FB" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SETTINGS & SUPPORT */}
        <Text style={styles.sectionTitle}>Settings & Support</Text>

        <View style={styles.listCard}>
          <ToggleRow
            title="Notifications"
            icon="notifications-outline"
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <ToggleRow
            title="Light Mode"
            icon="sunny-outline"
            value={isLightMode}
            onValueChange={() => setIsLightMode(!isLightMode)}
          />
        </View>

        {/* Updated RowItem with onPress */}
        {chunkArray(settingsItems, 4).map((group, i) => (
          <View key={i} style={styles.listCard}>
            {group.map((item, index) => (
              <RowItem 
                key={index} 
                title={item.title} 
                icon={item.icon} 
                onPress={() => handleSettingItemPress(item.title)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

/* COMPONENTS */
// Update RowItem to accept onPress prop
const RowItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.rowItem} onPress={onPress}>
    <View style={styles.iconRow}>
      <Icon name={icon} size={18} color="#fff" />
      <Text style={[styles.rowText, title === "Logout" && styles.logoutText]}>
        {title}
      </Text>
    </View>
    <Icon name="chevron-forward-outline" size={18} color="#fff" />
  </TouchableOpacity>
);

const ToggleRow = ({ title, icon, value, onValueChange }) => (
  <View style={styles.rowItem}>
    <View style={styles.iconRow}>
      <Icon name={icon} size={18} color="#fff" />
      <Text style={styles.rowText}>{title}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ true: "#00C6FB" }}
      thumbColor="#fff"
    />
  </View>
);

/* HELPER */
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

/* DATA */
const statsData = [
  { label: "Tokens", value: "1,203", icon: "wallet-outline" },
  { label: "Day Streak", value: "7", icon: "flame-outline" },
  { label: "Success Rate", value: "40%", icon: "checkmark-circle-outline" },
  { label: "Badges", value: "12", icon: "ribbon-outline" },
];

const analyticsData = [
  { label: "Applied Scholarships", value: "5", icon: "newspaper-outline" },
  { label: "Videos Watched", value: "34", icon: "play-circle-outline" },
];

const documentItems = [
  { title: "View Scholarship Applications", icon: "document-text-outline" },
  { title: "Upload & Manage Documents", icon: "folder-outline" },
  { title: "Upload Account Info", icon: "person-circle-outline" },
];

const settingsItems = [
  { title: "Language", icon: "language-outline" },
  { title: "Security", icon: "lock-closed-outline" },
  { title: "Terms & Conditions", icon: "document-text-outline" },
  { title: "Privacy Policy", icon: "shield-checkmark-outline" },
  { title: "Help", icon: "help-circle-outline" },
  { title: "Invite a friend", icon: "share-social-outline" },
  { title: "Delete Account", icon: "trash-outline" },
  { title: "Logout", icon: "log-out-outline" }, // This is the logout button
];

/* STYLES - Add logoutText style */
const styles = StyleSheet.create({
  container: { backgroundColor: "#000", flex: 1 },
  ProfileHeader: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 16,
    backgroundColor: "#000",
  },
  ProfileText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },
  scrollContainer: { flex: 1 },
  headerCard: {
    borderRadius: 14,
    padding: 16,
    margin: 14,
    backgroundColor: "#021E38",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  profileImage: { width: 60, height: 60, borderRadius: 50 },
  headerInfo: { marginLeft: 12 },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  levelBadge: {
    backgroundColor: "#FFB636",
    paddingVertical: 3,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginTop: 4,
  },
  levelText: { fontSize: 11, fontWeight: "600", color: "#000" },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    borderColor: "#0BA8E3",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  statContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  statLabel: {
    color: "#8FBBD4",
    fontSize: 12,
    marginTop: 4,
  },
  profileButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  primaryBtn: {
    backgroundColor: "#00C6FB",
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },
  secondaryBtn: {
    borderColor: "#00C6FB",
    borderWidth: 1.5,
    width: "48%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  secondaryBtnText: {
    color: "#00C6FB",
    fontWeight: "700",
  },
  sectionTitle: {
    color: "#fff",
    marginLeft: 14,
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
  },
  listCard: {
    backgroundColor: "#021E38",
    borderRadius: 14,
    marginHorizontal: 14,
    marginTop: 8,
    paddingVertical: 4,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#0F2A44",
  },
  iconRow: { flexDirection: "row", alignItems: "center" },
  rowText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 16,
  },
  logoutText: {
    color: "#FF5252", // Red color for logout text
  },
});

export default ProfileScreen;
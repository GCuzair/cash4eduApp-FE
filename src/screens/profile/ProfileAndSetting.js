import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Fixed Header (Non-scrollable) */}
      <View style={styles.ProfileHeader}>
        <Text style={styles.ProfileText}>Profile</Text>
      </View>

      {/* Scrollable Content */}
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
              <Text style={styles.userName}>Aroma Tariq</Text>
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

        {/* ANALYTICS OVERVIEW */}
        <Text style={styles.sectionTitle}>Analytics Overview</Text>
        <View style={styles.analyticsCard}>
          <View style={styles.statsGrid}>
            {analyticsData.map((item, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statContent}>
                  <View style={styles.statRow}>
                    <Icon name={item.icon} size={20} color="#fff" />
                    <Text style={styles.statValue}>{item.value}</Text>
                  </View>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.primaryBtnFull}
            onPress={() => navigation.navigate("ProfileAnalytics")}>
            <Text style={styles.primaryBtnText}>View Full Analytics</Text>
            <Icon name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* DOCUMENT & PROFILE */}
        <Text style={styles.sectionTitle}>Document & Profile</Text>
        <View style={styles.listCard}>
          {documentItems.map((item, index) => (
            <RowItem key={index} title={item.title} icon={item.icon} />
          ))}
          <TouchableOpacity style={styles.primaryBtnFullOutline}>
            <Text style={styles.secondaryBtnText}>Complete Your Profile</Text>
            <Icon name="arrow-forward" size={16} color="#00C6FB" />
          </TouchableOpacity>
        </View>

        {/* SETTINGS & SUPPORT */}
        <Text style={styles.sectionTitle}>Settings & Support</Text>

        <View style={styles.listCard}>
          <ToggleRow
            title="Notifications"
            icon="notifications-outline"
            value={notificationsEnabled}
            onValueChange={() =>
              setNotificationsEnabled(!notificationsEnabled)
            }
          />
          <ToggleRow
            title="Light Mode"
            icon="sunny-outline"
            value={isLightMode}
            onValueChange={() => setIsLightMode(!isLightMode)}
          />
        </View>

        {chunkArray(settingsItems, 4).map((group, i) => (
          <View key={i} style={styles.listCard}>
            {group.map((item, index) => (
              <RowItem key={index} title={item.title} icon={item.icon} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

/* COMPONENTS */
const RowItem = ({ title, icon }) => (
  <TouchableOpacity style={styles.rowItem}>
    <View style={styles.iconRow}>
      <Icon name={icon} size={18} color="#fff" />
      <Text style={styles.rowText}>{title}</Text>
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
  { title: "Logout", icon: "log-out-outline" },
];

/* STYLES */
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

  primaryBtnFull: {
    backgroundColor: "#00C6FB",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  primaryBtnText: { color: "#fff", fontWeight: "700" },

  primaryBtnFullOutline: {
    borderColor: "#00C6FB",
    borderWidth: 1.5,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 10,
  },

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

  analyticsCard: {
    backgroundColor: "#021E38",
    padding: 14,
    margin: 14,
    borderRadius: 14,
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
});

export default ProfileScreen;

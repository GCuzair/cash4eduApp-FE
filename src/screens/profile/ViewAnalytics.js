import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { LineChart, BarChart } from "react-native-chart-kit";
import { ProfileContext } from "../../context/ProfileContext";

const { width } = Dimensions.get("window");

const ViewAnalyticsScreen = ({ navigation }) => {
  const {userInfo} = useContext(ProfileContext);
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Analytics</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Track your progress and performance across all activities.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER SECTION (same as Profile headerCard) */}
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

          {/* Stats */}
          <View style={styles.statsGrid}>
            {statsData.map((item, index) => (
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

          {/* Note */}
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              You're in the top 20% of learners this Week!
            </Text>
          </View>
        </View>

        {/* Your Activity Overview */}
        <Text style={styles.sectionTitle}>Your Activity Overview</Text>
        <View style={styles.grid}>
          {activityData.map((item, index) => (
            <View key={index} style={styles.activityCard}>
              <View
                style={[styles.iconContainer, { backgroundColor: item.bgColor }]}
              >
                <Icon name={item.icon} size={22} color="#fff" />
              </View>
              <Text style={styles.activityValue}>{item.value}</Text>
              <Text style={styles.activityLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Charts */}
        <Text style={styles.sectionTitle}>Engagement Over Time</Text>
        <View style={styles.chartCard}>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [{ data: [10, 40, 35, 50, 70, 90] }],
            }}
            width={width - 40}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={{ borderRadius: 10 }}
          />
        </View>

        <Text style={styles.sectionTitle}>Token Growth by Category</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={{
              labels: ["Videos", "Perks", "Referrals"],
              datasets: [{ data: [180, 120, 90] }],
            }}
            width={width - 40}
            height={180}
            chartConfig={chartConfig}
            style={{ borderRadius: 10 }}
          />
        </View>

        {/* Achievement Milestones */}
        <Text style={styles.sectionTitle}>Achievement Milestones</Text>
        <View style={styles.milestoneCard}>
          {milestones.map((item, index) => (
            <View key={index} style={styles.milestoneRow}>
              <Icon name={item.icon} size={24} color={item.iconColor} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.milestoneTitle}>{item.title}</Text>
                <Text style={styles.milestoneDesc}>{item.desc}</Text>
              </View>
              <TouchableOpacity style={styles.tokenButton}>
                <Text style={styles.tokenButtonText}>{item.reward}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Token Summary */}
        <Text style={styles.sectionTitle}>Token Summary</Text>
        <View style={styles.tokenSummaryCard}>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenLabel}>Total Tokens:</Text>
            <Text style={styles.tokenValue}>2,450</Text>
          </View>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenLabel}>Earn this month:</Text>
            <Text style={[styles.tokenValue, { color: "#78DB89" }]}>+800</Text>
          </View>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenLabel}>Spent on perks:</Text>
            <Text style={[styles.tokenValue, { color: "#FF4D4D" }]}>-200</Text>
          </View>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenLabel}>Available Balance:</Text>
            <Text style={[styles.tokenValue, { color: "#00C6FB" }]}>2,250</Text>
          </View>

          <TouchableOpacity style={styles.walletButton}>
            <Text style={styles.walletButtonText}>View Wallet & Redeem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewAnalyticsScreen;

/* Chart Config */
const chartConfig = {
  backgroundColor: "#021E38",
  backgroundGradientFrom: "#021E38",
  backgroundGradientTo: "#021E38",
  color: () => "#03A2D5",
  labelColor: () => "#A0A0A0",
  decimalPlaces: 0,
  propsForDots: { r: "4", strokeWidth: "2", stroke: "#03A2D5" },
};

/* Data */
const statsData = [
  { label: "Tokens", value: "1,203", icon: "wallet-outline" },
  { label: "Day Streak", value: "7", icon: "flame-outline" },
  { label: "Success Rate", value: "40%", icon: "checkmark-circle-outline" },
  { label: "Badges", value: "12", icon: "ribbon-outline" },
];

const activityData = [
  { icon: "school-outline", label: "Scholarships Applied", value: "12", bgColor: "#03A2D5" },
  { icon: "trophy-outline", label: "Scholarships Won", value: "8", bgColor: "#1B463D" },
  { icon: "play-circle-outline", label: "Videos Watched", value: "25", bgColor: "#BE5BBC" },
  { icon: "gift-outline", label: "Perks Redeemed", value: "8", bgColor: "#0257A7" },
];

const milestones = [
  {
    icon: "flame-outline",
    title: "Scholarship Streak",
    desc: "Applied to 5 scholarships this month",
    reward: "+150 Tokens",
    iconColor: "#FFB636",
  },
  {
    icon: "school-outline",
    title: "Learning Champ",
    desc: "Watched 40 videos this quarter",
    reward: "Bonus Badge",
    iconColor: "#03A2D5",
  },
  {
    icon: "gift-outline",
    title: "Perk Explorer",
    desc: "Redeemed 10 perks this month",
    reward: "500 Tokens",
    iconColor: "#03a2d5",
  },
];

/* Styles */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  headerContainer: {
    backgroundColor: "#000",
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 10,
  },
  headerSubtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    marginLeft: 34,
    marginTop: 2,
  },

  scrollContainer: { flex: 1 },

  headerCard: {
    borderRadius: 14,
    padding: 16,
    margin: 14,
    backgroundColor: "#021E38",
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
  profileImage: { width: 60, height: 60, borderRadius: 50 },
  headerInfo: { marginLeft: 12 },
  userName: { color: "#fff", fontSize: 16, fontWeight: "700" },
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
  statContent: { justifyContent: "center", alignItems: "center", paddingVertical: 12 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statValue: { color: "#fff", fontWeight: "700", fontSize: 16 },
  statLabel: { color: "#8FBBD4", fontSize: 12, marginTop: 4 },

  noteBox: {
    marginTop: 12,
    backgroundColor: "#1B463D",
    borderRadius: 8,
    padding: 8,
  },
  noteText: { color: "#20A447", fontSize: 13, textAlign: "center" },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginHorizontal: 16,
    marginTop: 10,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 14,
  },
  activityCard: {
    backgroundColor: "#021E38",
    width: "48%",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 10,
  },
  iconContainer: { padding: 10, borderRadius: 20, marginBottom: 6 },
  activityValue: { color: "#fff", fontSize: 28, fontWeight: "700" },
  activityLabel: { color: "#fff", fontSize: 14, textAlign: "center" },

  chartCard: {
    backgroundColor: "#021E38",
    borderRadius: 12,
    marginHorizontal: 14,
    marginTop: 10,
    paddingVertical: 10,
    alignItems: "center",
  },

  milestoneCard: {
    backgroundColor: "#021E38",
    borderRadius: 12,
    padding: 12,
    margin: 14,
  },
  milestoneRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00172B",
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  milestoneTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  milestoneDesc: { color: "#A0A0A0", fontSize: 12 },
  tokenButton: {
    backgroundColor: "#03A2D5",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tokenButtonText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  tokenSummaryCard: {
    backgroundColor: "#021E38",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 14,
    marginTop: 10,
  },
  tokenRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  tokenLabel: { color: "#A0A0A0", fontSize: 13 },
  tokenValue: { color: "#fff", fontSize: 14, fontWeight: "600" },
  walletButton: {
    backgroundColor: "#03A2D5",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 12,
  },
  walletButtonText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});

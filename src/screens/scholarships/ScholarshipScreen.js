import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import ScholarshipCard from "../../components/ScholarshipCard";

const { width } = Dimensions.get("window");

const ScholarshipScreen = ({navigation}) => {
  const [search, setSearch] = useState("");

  const checklistData = [
    "Personal Information",
    "Education Status",
    "Financial & Household Information",
    "Interests, Hobbies & Goals",
    "Residency Eligibility",
    "Set Up Quick Apply",
    "Stay in the Loop"
  ];

  const scholarshipData = [
    {
      id: "1",
      title: "First Generation College Student Grant",
      amount: "2,500",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "featured",
      tags: ["Any Level", "First-Gen", "Need Based"]
    },
    {
      id: "2",
      title: "Academic Excellence Scholarship",
      amount: "2,500",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "new",
      tags: ["Undergraduate", "3.0+ GPA", "Merit-Based"]
    },
    {
      id: "3",
      title: "Creative Arts Scholarship",
      amount: "4,000",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "new",
      tags: ["Undergraduate", "Creative Arts", "Portfolio"]
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scholarship</Text>
          <Text style={styles.headerSub}>
            Welcome back, Aroma. Find scholarships that match your profile.
          </Text>
        </View>

        <LinearGradient
          colors={["#51E3FC", "#0257A7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBox}
        >
            <Text style={styles.percentText}>20%</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.profileText}>of your profile is complete</Text>
            <Icon name="alert-circle" size={10} color="#000" style={{ marginTop: -10 }} />
          </View>

          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.listBox}>
            {checklistData.map((text, i) => (
              <View key={i} style={styles.checkRow}>
                <Icon name="checkmark-circle" size={18} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.listItem}>{text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.compBtn}>
            <Text style={styles.compText}>Complete profile</Text>
            <Icon name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.searchCard}>
          <View style={styles.searchInputBox}>
            <Icon name="search" size={18} color="#8FA6B5" />
            <TextInput
              placeholder="Search by scholarships name, university..."
              placeholderTextColor="#8FA6B5"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.advBtn}>
              <Icon name="filter-outline" size={16} color="#03A2D5" />
              <Text style={styles.advText}>Advanced Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sortBtn}>
              <Text style={styles.sortText}>Sort by: Match %</Text>
              <Icon name="chevron-down" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.matchesHeader}>
          <Text style={styles.sectionTitle}>Your Personalized Matches</Text>
          <Text style={styles.countText}>15 found</Text>
        </View>

        {scholarshipData.map(item => (
          <ScholarshipCard key={item.id} {...item} />
        ))}

        <TouchableOpacity style={styles.Btn}
        onPress={() => navigation.navigate('ScholarshipDetails')}>
          <Text style={styles.BtnText}>View All Scholarships</Text>
          <Icon name="arrow-forward" size={16} color="#03A2D5" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View Scholarship Applications</Text>
          <Icon name="arrow-forward" size={16} color="#03A2D5" />
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default ScholarshipScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingBottom: 75 },

  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "700" },
  headerSub: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginTop: 3,
    width: "90%"
  },

  gradientBox: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 25,
    marginBottom: 25
  },
  percentText: {
    fontSize: 55,
    fontWeight: "600",
    color: "#000"
  },
  profileText: {
    fontSize: 11,
    color: "#000",
    marginTop: -10,
    fontWeight: "600",
    
  },
  progressBar: {
    width: "70%",
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 10
  },
  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: "#0257A7",
    borderRadius: 10
  },

  listBox: { marginTop: 10 },
  checkRow: { flexDirection: "row", alignItems: "center", marginVertical: 1 },
  listItem: { color: "#E6F7FF", fontSize: 14, fontWeight: "500" },

  searchCard: {
    marginHorizontal: 20,
    backgroundColor: "#021E38",
    padding: 12,
    borderRadius: 14
  },
  searchInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20
  },
  searchInput: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 12,
    flex: 1
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  advBtn: { flexDirection: "row", alignItems: "center" },
  advText: { color: "#03A2D5", fontSize: 11, marginLeft: 5 },

  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#052033",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#03A2D5"
  },
  sortText: { color: "#fff", fontSize: 11, marginRight: 5 },

  matchesHeader: {
    paddingHorizontal: 20,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700"
  },
  countText: { color: "#8FA6B5", fontSize: 12 },

  Btn: {
    borderColor: "#03A2D5",
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 15,
    width: "80%",
    alignSelf: "center"
  },
  BtnText: {
    color: "#03A2D5",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 14
  },

  compBtn: {
    backgroundColor: "#021E38",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 15,
    width: "65%",
    alignSelf: "center"
  },
  compText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 14
  }
});

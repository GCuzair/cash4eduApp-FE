import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import ScholarshipCard from "../../components/ScholarshipCard";
import { ProfileContext } from "../../context/ProfileContext";
import { FireApi } from "../../utils/FireApi";
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window");

const ScholarshipScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: true,
  });
  const [filters, setFilters] = useState({
    category: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "match", // default: match, deadline, amount, new
    filterType: "",
  });
  
  const { userInfo, userProfile } = useContext(ProfileContext);

  // Checklist data
  const checklistData = [
    "Personal Information",
    "Education Status",
    "Financial & Household Information",
    "Interests, Hobbies & Goals",
    "Residency Eligibility",
    "Set Up Quick Apply",
    "Stay in the Loop",
  ];

  // ========================
  // API CALL FUNCTIONS
  // ========================

  /**
   * Fetch scholarships from API with filters
   */
  const fetchScholarships = async (page = 1, isRefresh = false) => {
    try {
      if (page === 1) setLoading(true);
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...(search && { search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minAmount && { minAmount: filters.minAmount }),
        ...(filters.maxAmount && { maxAmount: filters.maxAmount }),
        ...(filters.sortBy && { sortBy: filters.sortBy }),
        ...(filters.filterType && { filterType: filters.filterType }),
      }).toString();

      const endpoint = `scholarships${queryParams ? `?${queryParams}` : ''}`;
      console.log('Fetching scholarships from:', endpoint);
      
      const response = await FireApi(endpoint, 'GET');
      
      if (response && response.success) {
        const data = response.data || response;
        
        // Handle both array and paginated response
        if (Array.isArray(data)) {
          setScholarships(isRefresh ? data : [...scholarships, ...data]);
          setPagination(prev => ({
            ...prev,
            page,
            hasMore: data.length === pagination.limit,
            total: data.length,
          }));
        } else if (data.scholarships) {
          // If API returns paginated response
          setScholarships(isRefresh ? data.scholarships : [...scholarships, ...data.scholarships]);
          setPagination({
            page: data.page || page,
            limit: data.limit || pagination.limit,
            total: data.total || 0,
            totalPages: data.totalPages || Math.ceil((data.total || 0) / pagination.limit),
            hasMore: data.hasMore || (data.page < data.totalPages),
          });
        } else {
          // Fallback for different response structures
          const items = data.items || data.results || [];
          setScholarships(isRefresh ? items : [...scholarships, ...items]);
          setPagination(prev => ({
            ...prev,
            page,
            hasMore: items.length === pagination.limit,
          }));
        }
        
        Toast.show({
          type: 'success',
          text1: 'Scholarships loaded',
          text2: `Found ${scholarships.length + (isRefresh ? 0 : data.scholarships?.length || data.length || 0)} scholarships`,
          visibilityTime: 2000,
        });
      } else {
        throw new Error(response?.message || 'Failed to fetch scholarships');
      }
      
    } catch (error) {
      console.error('Error fetching scholarships:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to load scholarships',
        text2: error.message || 'Please try again later',
      });
      
      // For development, use mock data if API fails
      if (__DEV__ && scholarships.length === 0) {
        setScholarships(getMockScholarships());
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
   * Handle pull-to-refresh
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScholarships(1, true);
  }, [search, filters]);

  /**
   * Load more scholarships (pagination)
   */
  const loadMoreScholarships = () => {
    if (!loading && pagination.hasMore) {
      fetchScholarships(pagination.page + 1);
    }
  };

  /**
   * Apply search with debounce
   */
  const handleSearch = (text) => {
    setSearch(text);
    // Reset to page 1 when search changes
    fetchScholarships(1, true);
  };

  /**
   * Apply filter changes
   */
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Refetch with new filters
    setTimeout(() => fetchScholarships(1, true), 300);
  };

  // ========================
  // COMPONENT LIFECYCLE
  // ========================

  // Initial fetch
  useEffect(() => {
    fetchScholarships(1);
  }, []);

  // ========================
  // MOCK DATA FOR DEVELOPMENT
  // ========================

  const getMockScholarships = () => [
    {
      id: "1",
      title: "First Generation College Student Grant",
      amount: "2,500",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "featured",
      tags: ["Any Level", "First-Gen", "Need Based"],
      description: "For students who are the first in their family to attend college.",
      category: "need-based",
      organization: "Education Foundation",
      eligibility: ["First-generation student", "Minimum 2.5 GPA"],
    },
    {
      id: "2",
      title: "Academic Excellence Scholarship",
      amount: "2,500",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "new",
      tags: ["Undergraduate", "3.0+ GPA", "Merit-Based"],
      description: "Rewarding outstanding academic achievement.",
      category: "merit",
      organization: "University Board",
      eligibility: ["Minimum 3.0 GPA", "Full-time enrollment"],
    },
    {
      id: "3",
      title: "Creative Arts Scholarship",
      amount: "4,000",
      deadline: "Oct 20, 2025",
      matched: "89",
      type: "new",
      tags: ["Undergraduate", "Creative Arts", "Portfolio"],
      description: "Supporting talented artists and performers.",
      category: "arts",
      organization: "Arts Council",
      eligibility: ["Portfolio submission", "Art major"],
    },
  ];

  // ========================
  // RENDER FUNCTIONS
  // ========================

  const renderScholarshipCards = () => {
    if (loading && scholarships.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#03A2D5" />
          <Text style={styles.loadingText}>Loading scholarships...</Text>
        </View>
      );
    }

    if (scholarships.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Icon name="school-outline" size={60} color="#555" />
          <Text style={styles.emptyTitle}>No scholarships found</Text>
          <Text style={styles.emptyText}>
            {search ? 'Try different search terms' : 'Check back later for new opportunities'}
          </Text>
        </View>
      );
    }

    return (
      <>
        {scholarships.map((item) => (
          <ScholarshipCard 
            key={item.id || item._id} 
            {...item} 
            scholarshipData={item}
            onPressLearnMore={() => navigation.navigate('ScholarshipDetails', {
              scholarship: item
            })}
          />
        ))}
        
        {/* Load More Indicator */}
        {pagination.hasMore && (
          <TouchableOpacity 
            style={styles.loadMoreBtn}
            onPress={loadMoreScholarships}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#03A2D5" />
            ) : (
              <Text style={styles.loadMoreText}>Load More Scholarships</Text>
            )}
          </TouchableOpacity>
        )}
      </>
    );
  };

  // ========================
  // MAIN RENDER
  // ========================

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scholarships</Text>
        <Text style={styles.headerSub}>
          Welcome back, {userInfo?.full_name}. Find scholarships that match your profile.
        </Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#03A2D5']}
            tintColor="#03A2D5"
          />
        }
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
          
          if (isCloseToBottom && pagination.hasMore && !loading) {
            loadMoreScholarships();
          }
        }}
        scrollEventThrottle={400}
      >
        {/* Profile Completion Section */}
        <LinearGradient
          colors={["#51E3FC", "#0257A7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBox}
        >
          <Text style={styles.percentText}>
            {userProfile?.profile_completion_percentage || 0}%
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.profileText}>of your profile is complete</Text>
            <Icon
              name="alert-circle"
              size={10}
              color="#000"
              style={{ marginTop: -10 }}
            />
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { 
              width: `${userProfile?.profile_completion_percentage || 0}%` 
            }]} />
          </View>

          <View style={styles.listBox}>
            {checklistData.map((text, i) => (
              <View key={i} style={styles.checkRow}>
                <Icon
                  name="checkmark-circle"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.listItem}>{text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.compBtn}>
            <Text style={styles.compText}>Complete profile</Text>
            <Icon name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Search & Filter Section */}
        <View style={styles.searchCard}>
          <View style={styles.searchInputBox}>
            <Icon name="search" size={18} color="#8FA6B5" />
            <TextInput
              placeholder="Search by scholarships name, university..."
              placeholderTextColor="#8FA6B5"
              style={styles.searchInput}
              value={search}
              onChangeText={handleSearch}
              onSubmitEditing={() => fetchScholarships(1, true)}
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close-circle" size={18} color="#8FA6B5" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={styles.advBtn}
              onPress={() => {
                // TODO: Implement advanced filters modal
                Toast.show({
                  type: 'info',
                  text1: 'Advanced Filters',
                  text2: 'Feature coming soon!',
                });
              }}
            >
              <Icon name="filter-outline" size={16} color="#03A2D5" />
              <Text style={styles.advText}>Advanced Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sortBtn}
              onPress={() => {
                // TODO: Implement sort options modal
                const sortOptions = ['match', 'deadline', 'amount', 'new'];
                const currentIndex = sortOptions.indexOf(filters.sortBy);
                const nextSort = sortOptions[(currentIndex + 1) % sortOptions.length];
                handleFilterChange('sortBy', nextSort);
              }}
            >
              <Text style={styles.sortText}>
                Sort by: {filters.sortBy === 'match' ? 'Match %' : 
                         filters.sortBy === 'deadline' ? 'Deadline' :
                         filters.sortBy === 'amount' ? 'Amount' : 'Newest'}
              </Text>
              <Icon name="chevron-down" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Active Filters Display */}
          {(search || filters.category || filters.minAmount || filters.maxAmount) && (
            <View style={styles.activeFilters}>
              <Text style={styles.filtersLabel}>Active filters:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {search && (
                  <View style={styles.activeFilterTag}>
                    <Text style={styles.filterTagText}>Search: {search}</Text>
                    <TouchableOpacity onPress={() => handleSearch('')}>
                      <Icon name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
                {filters.category && (
                  <View style={styles.activeFilterTag}>
                    <Text style={styles.filterTagText}>Category: {filters.category}</Text>
                    <TouchableOpacity onPress={() => handleFilterChange('category', '')}>
                      <Icon name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
                {(filters.minAmount || filters.maxAmount) && (
                  <View style={styles.activeFilterTag}>
                    <Text style={styles.filterTagText}>
                      Amount: {filters.minAmount || '0'} - {filters.maxAmount || '∞'}
                    </Text>
                    <TouchableOpacity onPress={() => {
                      handleFilterChange('minAmount', '');
                      handleFilterChange('maxAmount', '');
                    }}>
                      <Icon name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Matches Header */}
        <View style={styles.matchesHeader}>
          <Text style={styles.sectionTitle}>Your Personalized Matches</Text>
          <Text style={styles.countText}>{pagination.total || scholarships.length} found</Text>
        </View>

        {/* Scholarships List */}
        {renderScholarshipCards()}

        {/* Footer Buttons */}
        <TouchableOpacity
          style={styles.Btn}
          onPress={() => {
            // Navigate to all scholarships screen or show more
            if (scholarships.length > 0) {
              navigation.navigate('AllScholarships', { scholarships });
            }
          }}
        >
          <Text style={styles.BtnText}>View All Scholarships</Text>
          <Icon name="arrow-forward" size={16} color="#03A2D5" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.Btn}>
          <Text style={styles.BtnText}>View Scholarship Applications</Text>
          <Icon name="arrow-forward" size={16} color="#03A2D5" />
        </TouchableOpacity>
      </ScrollView>

      {/* Toast Component */}
      <Toast />
    </View>
  );
};

// ========================
// STYLES
// ========================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", paddingBottom: 85, paddingTop: 15 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#000",
    zIndex: 2,
  },
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "700" },
  headerSub: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginTop: 3,
    width: "90%",
  },
  gradientBox: {
    width: width,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 25,
    marginBottom: 25,
  },
  percentText: {
    fontSize: 55,
    fontWeight: "600",
    color: "#000",
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
    marginTop: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0257A7",
    borderRadius: 10,
  },
  listBox: { marginTop: 10 },
  checkRow: { flexDirection: "row", alignItems: "center", marginVertical: 1 },
  listItem: { color: "#E6F7FF", fontSize: 14, fontWeight: "500" },
  searchCard: {
    marginHorizontal: 20,
    backgroundColor: "#021E38",
    padding: 12,
    borderRadius: 14,
    marginBottom: 20,
  },
  searchInputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  searchInput: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 12,
    flex: 1,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
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
    borderColor: "#03A2D5",
  },
  sortText: { color: "#fff", fontSize: 11, marginRight: 5 },
  activeFilters: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#1E3A5F",
  },
  filtersLabel: {
    color: "#8FA6B5",
    fontSize: 11,
    marginBottom: 8,
  },
  activeFilterTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#03A2D5",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  filterTagText: {
    color: "#fff",
    fontSize: 10,
    marginRight: 6,
  },
  matchesHeader: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  countText: { color: "#8FA6B5", fontSize: 12 },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    color: "#8FA6B5",
    fontSize: 14,
    marginTop: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 8,
  },
  emptyText: {
    color: "#8FA6B5",
    fontSize: 14,
    textAlign: "center",
  },
  loadMoreBtn: {
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  loadMoreText: {
    color: "#03A2D5",
    fontSize: 14,
    fontWeight: "600",
  },
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
    alignSelf: "center",
  },
  BtnText: {
    color: "#03A2D5",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 14,
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
    alignSelf: "center",
  },
  compText: {
    color: "#fff",
    fontWeight: "600",
    marginRight: 6,
    fontSize: 14,
  },
});

export default ScholarshipScreen;
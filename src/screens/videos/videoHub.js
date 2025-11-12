import React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
const categories = [
    {
        id: "1",
        title: "Financial Literacy",
        subtitle: "Earn while you learn to save smarter",
        videos: 24,
        color1: "#4dd0e1",
        color2: "#007acc",
        icon: "cash-outline",
    },
    {
        id: "2",
        title: "Scholarship Tips",
        subtitle: "Earn while you learn to save smarter",
        videos: 18,
        color1: "#9c27b0",
        color2: "#673ab7",
        icon: "school-outline",
    },
    {
        id: "3",
        title: "Finance Management",
        subtitle: "Plan your spending wisely",
        videos: 33,
        color1: "#2196f3",
        color2: "#1a237e",
        icon: "bar-chart-outline",
    },
];

const recommendedVideos = [
    {
        id: "1",
        title: "5 Budgeting Tips Every Student Should Know",
        author: "Rose William",
        level: "Beginner",
        views: "2.2 million",
        image:
            "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600",
        isSponsored: true,
        tokens: "+4",
    },
    {
        id: "2",
        title: "5 Budgeting Tips Every Student Should Know",
        author: "Rose William",
        level: "Intermediate",
        views: "2.2 million",
        image:
            "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600",
        isSponsored: true,
        tokens: "+4",
    },
    {
        id: "3",
        title: "5 Budgeting Tips Every Student Should Know",
        author: "Rose William",
        level: "Advanced",
        views: "2.2 million",
        image:
            "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600",
        isSponsored: true,
        tokens: "+4",
    },
    {
        id: "4",
        title: "5 Budgeting Tips Every Student Should Know",
        author: "Rose William",
        level: "Beginner",
        views: "2.2 million",
        image:
            "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600",
        isSponsored: true,
        tokens: "+4",
    },
];

const VideoHubScreen = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Video Hub</Text>

                    <View style={styles.tokenContainer}>
                        <Ionicons name="wallet-outline" size={14} color="#fff" />
                        <Text style={styles.tokenText}>1,250 Tokens</Text>
                    </View>
                </View>

                <Text style={styles.subtitle}>
                    Watch, learn, and earn tokens for every video you complete.
                </Text>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBox}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search videos or topics..."
                            placeholderTextColor="#aaa"
                        />
                        <FontAwesome5 name="search" size={16} color="#fff" />
                        <FontAwesome5
                            name="microphone"
                            size={16}
                            color="#fff"
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.sortBox}>
                        <Text style={styles.sortText}>Sort by: Highest Tokens</Text>
                        <MaterialIcons name="arrow-drop-down" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Explore by Category */}
                <Text style={styles.sectionTitle}>Explore by Category</Text>
                <FlatList
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <LinearGradient
                            colors={[item.color1, item.color2]}
                            style={styles.categoryCard}
                        >
                            <Ionicons name={item.icon} size={24} color="#fff" />
                            <Text style={styles.categoryTitle}>{item.title}</Text>
                            <Text style={styles.categorySubtitle}>{item.subtitle}</Text>
                            <Text style={styles.categoryVideos}>{item.videos} videos</Text>
                        </LinearGradient>
                    )}
                />

                {/* Weekly Progress */}
                <View style={styles.weeklyBox}>
                    <Text style={styles.sectionTitle}>Weekly Progress</Text>
                    <Text style={styles.weeklyText}>
                        You’ve watched <Text style={{ fontWeight: "bold" }}>8</Text> out of{" "}
                        <Text style={{ fontWeight: "bold" }}>20</Text> videos this week
                    </Text>
                    <View style={styles.progressBar}>
                        <View style={styles.progressFill} />
                    </View>
                    <View style={styles.streakRow}>
                        <Ionicons name="flame-outline" size={20} color="#ff9800" />
                        <Text style={styles.streakText}>Streak: 3 Days</Text>
                    </View>
                </View>

                {/* Daily Challenge */}
                <LinearGradient
                    colors={['#51e3fc', '#006b8f']} // gradient shades (light → dark)
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.challengeBox}
                >
                    <View style={styles.challengeLeft}>
                        <Text style={styles.challengeTitle}>Daily Challenge</Text>
                        <Text style={styles.challengeSubtitle}>
                            Watch 3 videos today to earn +50 tokens!
                        </Text>

                        <TouchableOpacity
                            style={styles.watchNowBtn}
                            onPress={() => navigation.navigate('VideoPlayer')}
                        >
                            <Text style={styles.watchNowText}>Watch Now</Text>
                            <Ionicons name="arrow-forward-outline" size={16} color="#00b4d8" />
                        </TouchableOpacity>
                    </View>
                    <FontAwesome5 name="trophy" size={75} color="#ffb300" />
                </LinearGradient>

                {/* Recommended for You */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                    Recommended for You
                </Text>
                <View style={styles.recommendGrid}>
                    {recommendedVideos.map((item) => (
                        <View key={item.id} style={styles.videoCard}>
                            <View>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.videoImage}
                                    resizeMode="cover"
                                />
                                {/* Overlay labels */}
                                <View style={styles.overlayTop}>
                                    {item.isSponsored && (
                                        <View style={styles.sponsoredBadge}>
                                            <Text style={styles.badgeText}>Sponsored</Text>
                                        </View>
                                    )}
                                    <LinearGradient
                                        colors={['#51e3fc', '#021e38']} // golden gradient
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                        style={styles.tokenBadge}
                                    >
                                        <Text style={styles.badgeText}>{item.tokens}</Text>
                                    </LinearGradient>
                                </View>
                                <AntDesign
                                    name="playcircleo"
                                    size={32}
                                    color="#fff"
                                    style={styles.playIcon}
                                />
                                <Text style={styles.durationText}>2:25</Text>
                            </View>
                            <View style={{ padding: 8 }}>
                                <Text style={styles.videoTitle} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <View style={styles.authorRow}>
                                    <FontAwesome5 name="user-circle" size={14} color="#fff" />
                                    <Text style={styles.authorText}>{item.author}</Text>
                                </View>
                                <View style={styles.videoMeta}>
                                    <Text style={[styles.levelText, { color: "#00e676" }]}>
                                        {item.level}
                                    </Text>
                                    <Text style={styles.viewsText}>
                                        👁 {item.views} views
                                    </Text>


                                </View>

                            </View>
                        </View>
                    ))}

                </View>

                <View style={{ width: '100%', alignItems: 'center', paddingVertical: 24, marginBottom: 20 }}>
                    <TouchableOpacity style={styles.lastBtn} onPress={() => navigation.navigate('VideoHub')}>
                        <Text style={{ color: '#03A2D5', fontSize: 22, fontWeight: '600' }}>Load More Videos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000814",
        paddingHorizontal: 16,
        paddingTop: 40,
        paddingBottom: 40, // Increased bottom padding
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: { color: "#fff", fontSize: 24, fontWeight: "bold" },
    tokenContainer: {
        flexDirection: "row",
        backgroundColor: "#0077b6",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignItems: "center",
        gap: 6,
    },
    tokenText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
    subtitle: {
        color: "#b0bec5",
        marginTop: 8,
        marginBottom: 16,
        fontSize: 14,
    },
    searchContainer: {
        backgroundColor: "#021e38",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#333e48ff",
        borderRadius: 30,
        paddingHorizontal: 10,
    },
    searchInput: {
        color: "#ffffffff",
        marginLeft: 8,
        flex: 1,
    },
    sortBox: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        borderWidth: 1,
        borderColor: "#0077b6",
        borderRadius: 5,
    },
    sortText: {
        color: "#fff",
        fontSize: 12,
        padding: 4,
    },
    sectionTitle: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
        marginBottom: 10,
    },
    categoryCard: {
        width: 180,
        borderRadius: 16,
        padding: 16,
        marginRight: 12,
    },
    categoryTitle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10,
    },
    categorySubtitle: {
        color: "#e0e0e0",
        fontSize: 12,
        marginVertical: 6,
    },
    categoryVideos: {
        color: "#fff",
        opacity: 0.8,
        fontSize: 12,
    },
    weeklyBox: {
        backgroundColor: "#001f3f",
        borderRadius: 16,
        padding: 16,
        marginTop: 20,
    },
    weeklyText: {
        color: "#fff",
        fontSize: 14,
    },
    progressBar: {
        backgroundColor: "#003366",
        height: 10,
        borderRadius: 10,
        marginTop: 8,
        overflow: "hidden",
    },
    progressFill: {
        backgroundColor: "#00b4d8",
        width: "40%",
        height: "100%",
        borderRadius: 10,
    },
    streakRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    streakText: { color: "#ff9800", marginLeft: 5, fontSize: 13 },
    challengeBox: {
        backgroundColor: "#001f3f",
        borderRadius: 16,
        padding: 16,
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    challengeLeft: { flex: 1, marginRight: 10 },
    challengeTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    challengeSubtitle: {
        color: "#ffffffff",
        fontSize: 13,
        marginVertical: 6,
    },
    watchNowBtn: {
        backgroundColor: "#ffffffff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: "flex-start",
        flexDirection: "row",
    },
    watchNowText:
    {
        color: "#00b4d8",
        fontWeight: "600",
        fontSize: 13
    },

    // Recommended Section
    recommendGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: -14,

    },
    videoCard: {
        backgroundColor: "#001f3f",
        borderRadius: 16,
        width: "48%",
        marginBottom: 16,
        overflow: "hidden",
    },
    videoImage: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    overlayTop: {
        position: "absolute",
        top: 8,
        left: 8,
        right: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    sponsoredBadge: {
        backgroundColor: "#ffb300",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    tokenBadge: {
        backgroundColor: "#0077b6",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "600",
        paddingHorizontal:5,
        paddingVertical:1,
    },
    playIcon: {
        position: "absolute",
        top: "40%",
        left: "40%",
    },
    durationText: {
        position: "absolute",
        bottom: 6,
        left: 8,
        color: "#fff",
        fontSize: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    videoTitle:
    {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13
    },
    authorRow:
    {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4
    },
    authorText:
    {
        color: "#b0bec5",
        fontSize: 11,
        marginLeft: 4
    },
    videoMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
        gap: 2,
    },
    levelText: { fontSize: 10, fontWeight: "600" },
    viewsText: { color: "#b0bec5", fontSize: 11 },
    lastBtn: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        width: '97%',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#03A2D5',
        borderRadius: 10,
    }
});
export default VideoHubScreen;
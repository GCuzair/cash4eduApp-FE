import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign'

const pendingActions = [
  {
    id: 1,
    title: 'Vendor Applications',
    subtitle: 'Pending review',
    icon: 'file-export',
    badge: 8,
    badgeColor: '#ef4444', // red
    buttonText: 'Review',
    screenName: 'VendorManagement',
  },
  {
    id: 2,
    title: 'Scholarship Listing',
    subtitle: 'Need approval',
    icon: 'clipboard-list',
    badge: 12,
    badgeColor: '#12db00', // green
    buttonText: 'Approve',
    screenName: 'ManageListing',
  },
  {
    id: 3,
    title: 'Educational Videos',
    subtitle: 'Quality review',
    icon: 'video',
    badge: 5,
    badgeColor: '#FFc947', // yellow/orange
    buttonText: 'Review',
    screenName: 'ContentManagement',
  },
  {
    id: 4,
    title: 'Student Reports',
    subtitle: 'Requires attention',
    icon: 'file-invoice',
    badge: 3,
    badgeColor: '#a855f7', // purple
    buttonText: 'View',
    screenName: 'AnalyticsReporting',
  },
];

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Image
            source={require('../../assets/images/burger.png')}
            style={styles.avatar}
          />
          <View style={styles.searchContainer}>
            <Text style={styles.searchPlaceholder}>Search</Text>
            <Ionicons name="search" size={18} color="#aaa" style={{ marginLeft: 150 }} />
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>Welcome back, Admin</Text>
        <Text style={styles.subtitle}>
          Here's what's happening across Cash 4 Edu this week
        </Text>
        <Text style={styles.updateText}>
          Last updated: Oct 29, 2025, 09:00 PST
        </Text>
      </View>

      <ScrollView>
        {/* Horizontal Stats */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Active Users Card */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('StudentManagement')}
          >
            <View style={styles.users}>
              <FontAwesome5 name="user" size={18} color="#51e3fc" />
              <Text style={styles.cardTitle}>Active Users</Text>
            </View>
            <Text style={styles.cardValue}>12,450</Text>
            <Text style={styles.cardSubText}>+3.5% from last week</Text>
          </TouchableOpacity>

          {/* Scholarship Card */}
          <TouchableOpacity 
            style={styles.card}
            onPress={() => navigation.navigate('Scholarship')}
          >
            <View style={styles.users}>
              <FontAwesome5 name="graduation-cap" size={18} color="#7B61FF" />
              <Text style={styles.cardTitle}>Scholarship</Text>
            </View>
            <Text style={styles.cardValue}>820</Text>
            <Text style={styles.scholarshipText}>+5 New</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Recent Activity Feed */}
        <View style={styles.recentCont}>
          <Text style={styles.textRecent}>Recent Activity Feed</Text>

          {[
            'New Vendor "John Mark" submitted a Scholarship of listing for review',
            '12 new users joined via referral campaign',
            'Admin K. Rutledge updated system tokens-to-USD conversion ratio',
            '2 videos listing flagged for quality review',
          ].map((text, index) => (
            <View key={index} style={styles.innerCont}>
              <Text style={{ fontSize: 25, color: 'white' }}>*</Text>
              <View>
                <Text style={{ color: 'white', fontSize: 12.5 }}>{text}</Text>
                <Text style={{ color: 'gray', fontSize: 10 }}>Today, 10:30 AM</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pending Actions Section */}
        <View style={styles.pendingContainer}>
          <Text style={styles.pendingHeader}>Pending Actions</Text>
          {pendingActions.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.pendingCard}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <View style={styles.cardLeft}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name={item.icon} size={20} color="#4FC3F7" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.badgeWrapper}>
                <View style={[styles.badge, { backgroundColor: item.badgeColor }]}>
                  <Text style={styles.digitBadge}>{item.badge}</Text>
                </View>
                <Text style={styles.badgeText}>{item.buttonText}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.recentCont}>
          <Text style={styles.textRecent}>Quick Access</Text>
          
          {/* User Management Section */}
          <TouchableOpacity 
            style={styles.userManage}
            onPress={() => navigation.navigate('StudentManagement')}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.userTitle}>User Management</Text>
              <Text style={styles.userSubTitle}>Manage Users</Text>
            </View>
            <AntDesign name="right" size={20} color="#51e3fc" />
          </TouchableOpacity>
          
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'gray' }}>Active Students: 12,480</Text>
            <Text style={{ color: 'gray' }}>Vendors: 310</Text>
            <Text style={{ color: 'gray' }}>Admin: 6</Text>
          </View>

          {/* Content Overview Section */}
          <TouchableOpacity 
            style={styles.userManage}
            onPress={() => navigation.navigate('ContentManagement')}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.userTitle}>Content Overview</Text>
              <Text style={styles.userSubTitle}>Manage Content</Text>
            </View>
            <AntDesign name="right" size={20} color="#51e3fc" />
          </TouchableOpacity>
          
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'gray' }}>Active Scholarships: 820</Text>
            <Text style={{ color: 'gray' }}>Educational Videos: 1,024</Text>
            <Text style={{ color: 'gray' }}>Student Perks: 112</Text>
          </View>
        </View>

        {/* Settings Section */}
        <TouchableOpacity 
          style={styles.recentCont}
          onPress={() => navigation.navigate('AdminSetting')}
        >
          <View style={styles.userManage}>
            <Text style={styles.userTitle}>Settings</Text>
            <AntDesign name="right" size={20} color="#51e3fc" />
          </View>
          <Text style={{ color: 'gray', marginTop: 5 }}>
            Manage system settings and preferences
          </Text>
        </TouchableOpacity>

        {/* System Alerts Section */}
        <View style={styles.sysCont}>
          <Text style={styles.textRecent}>System Alerts</Text>

          <View style={styles.sysinner}>
            <Foundation name='alert' size={28} color='#ef4444' style={{marginTop:5}}/>
            <View>
              <Text style={styles.userTitle}>Scheduled Maintenance</Text>
              <Text style={{color:'#bcbcbcff',fontSize:14}}>Nov 2,2025 - 12:00 AM to 3:00 AM PST</Text>
            </View>
          </View>

          <View style={styles.sysinner2}>
            <FontAwesome5 name='info-circle' size={28} color='#03a2d5' style={{marginTop:5}}/>
            <View>
              <Text style={styles.userTitle}>Token Rate Update</Text>
              <Text style={{color:'#bcbcbcff',fontSize:14}}>New conversion logic effective Nov 5</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sysinner:{
    flexDirection:'row',
    backgroundColor:'#616161ff',
    gap:10,
    borderRadius:10,
    padding:10,
    marginTop:10,
  },
  sysinner2:{
    flexDirection:'row',
    backgroundColor:'#449eae84',
    gap:10,
    borderRadius:10,
    padding:10,
    marginTop:10,
  },
  userTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: "white",
  },
  userSubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#51e3fc',
    marginTop:2,
  },
  userManage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  badgeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    width: 60,
  },
  innerCont: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  textRecent: {
    fontSize: 23,
    color: 'white',
    fontWeight: '600',
  },
  recentCont: {
    backgroundColor: '#021e38',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  sysCont: {
    backgroundColor: '#021e38',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  users: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#0B0F1A',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    marginHorizontal: 10,
  },
  searchPlaceholder: {
    color: '#aaa',
    marginLeft: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#ffffffff',
    marginTop: 5,
  },
  updateText: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  scrollContainer: {
    paddingVertical: 4,
  },
  card: {
    backgroundColor: '#021e38',
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    width: 180,
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cardValue: {
    color: '#fff',
    fontSize: 29,
    fontWeight: 'bold',
  },
  cardSubText: {
    color: '#52e3fc',
    fontSize: 12,
    marginTop: 4,
  },
  scholarshipText: {
    color: '#7B61FF',
    fontSize: 12,
    marginTop: 4,
  },
  pendingContainer: {
    marginTop: 20,
  },
  pendingHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  pendingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#021e38',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#51e2fc87',
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  textContainer: {
    maxWidth: '70%',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  digitBadge: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default DashboardScreen;
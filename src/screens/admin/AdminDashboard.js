import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const StatCard = ({ title, value, percent, icon }) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Icon name={icon} size={22} color="#51E3FC" />
      <Text style={styles.statTitle}>{title}</Text>
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statChange}>{percent}</Text>
  </View>
);

const AdminDashboardScreen = () => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [10, 40, 25, 55, 45, 60, 75],
        strokeWidth: 3,
        color: (opacity = 1) => `rgba(3,162,213,${opacity})`,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
              style={styles.avatarImage}
            />
          </View>
        </View>

        {/* Top Cards */}
        <View style={styles.cardsRow}>
          <StatCard title="Total Users" value="12,450" percent="+3.5% from last week" icon="account-group" />
          <StatCard title="Active Students" value="8,230" percent="+2.1% from last week" icon="school" />
          <StatCard title="Verified Vendors" value="1,200" percent="+1.4% from last week" icon="account" />
          <StatCard title="Referrals" value="953" percent="+5.2% from last week" icon="account-multiple-plus" />
        </View>

        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>User Growth Over Time</Text>
            <Icon name="calendar-week" size={20} color="#fff" />
          </View>

          <LineChart
            data={chartData}
            width={width - 55}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#021E38',
              backgroundGradientTo: '#000',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(81, 227, 252, ${opacity})`,
              labelColor: () => '#888',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#03A2D5',
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        </View>

        {/* Recent Activity & System Alerts */}
        <View style={styles.alertContainer}>
          <Text style={styles.sectionTitle}>Recent Activity & System Alerts</Text>

          <View style={styles.alertItem}>
            <Icon name="alert-circle-outline" size={20} color="#03A2D5" />
            <Text style={styles.alertText}>5 new scholarships pending verification</Text>
          </View>

          <View style={styles.alertItem}>
            <Icon name="close-circle-outline" size={20} color="#FF5C5C" />
            <Text style={styles.alertText}>System error logged 2:45 AM</Text>
          </View>

          <View style={styles.alertItem}>
            <Icon name="check-circle-outline" size={20} color="#00FF88" />
            <Text style={styles.alertText}>Vendor ‘Tech4Youth’ verified successfully</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btns}>
            <Text style={styles.btnText}>View Scholarship Queue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btns}>
            <Text style={styles.btnText}>View Bug Logs</Text>
          </TouchableOpacity>
        </View>

        {/* Admin Announcements */}
        <View style={styles.announcementContainer}>
          <Text style={styles.sectionTitle}>Admin Announcements</Text>
          <Text style={styles.announcementText}>• System v2.5 launched new referral tracking added.</Text>
          <Text style={styles.announcementText}>• Next maintenance window: 28 Oct, 2:00 AM PST.</Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '600',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#03A2D5',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width / 2) - 25,
    backgroundColor: '#021E38',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,

  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
  statValue: {
    color: '#FFF',
    fontSize: 29,
    fontWeight: '700',
  },
  statChange: {
    color: '#51E3FC',
    fontSize: 12,
    marginTop: 3,
  },
  chartContainer: {
    backgroundColor: '#021E38',
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal:10,
    paddingTop:10
  },
  chartTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  chartStyle: {
    borderRadius: 15,
    padding:7
  },
  alertContainer: {
    backgroundColor: '#021E38',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  alertText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  btns:{
     flexDirection: 'row',
    backgroundColor: '#021E38',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },

  announcementContainer: {
    backgroundColor: '#021E38',
    borderRadius: 15,
    padding: 15,
    marginBottom: 40,
  },
  announcementText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
});

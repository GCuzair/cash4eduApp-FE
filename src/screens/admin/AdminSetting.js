import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// --- INTEGRATION DATA SOURCE ---
const INTEGRATIONS_DATA = [
    {
        id: '1',
        name: 'Firebase',
        description: 'Authentication & hosting',
        iconColor: '#D9534F',
        iconLibrary: 'FontAwesome5',
        iconName: 'fire',
        status: 'Connected'
    },
    {
        id: '2',
        name: 'Stripe',
        description: 'Payment processing',
        iconColor: '#6772E5',
        iconLibrary: 'FontAwesome5',
        iconName: 'stripe',
        status: 'Connected'
    },
    {
        id: '3',
        name: 'Google Maps',
        description: 'Location services',
        iconColor: '#4285F4',
        iconLibrary: 'FontAwesome5',
        iconName: 'map-marker-alt',
        status: 'Connected'
    },
    {
        id: '4',
        name: 'YouTube API',
        description: 'Video management',
        iconColor: '#FF0000',
        iconLibrary: 'FontAwesome5',
        iconName: 'youtube',
        status: 'Connected'
    },
];


// --- INTEGRATION ITEM COMPONENT ---
const IntegrationItem = ({ name, description, iconColor, iconLibrary, iconName, status }) => {
    let IconComponent;
    if (iconLibrary === 'FontAwesome5') IconComponent = FontAwesome5;

    return (
        <View style={styles.itemContainer} activeOpacity={0.7}>
            {/* Icon Box */}
            <View style={[styles.iconBox, { backgroundColor: iconColor }]}>
                {IconComponent && <IconComponent name={iconName} size={20} color="#fff" />}
            </View>

            {/* Details Text */}
            <View style={styles.details}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.descriptionText}>{description}</Text>
            </View>

            {/* Status Pill */}
            <View style={styles.statusPill}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        </View>
    );
};

// --- TOKEN ECONOMY CONTROLS COMPONENT (New Code) ---
const TokenEconomyControls = () => {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <FontAwesome6 name="coins" size={22} color="#51e3fc" />
                <Text style={styles.cardTitle}>Token Economy Controls</Text>
            </View>

            {/* Default Token Value */}
            <Text style={styles.label}>Default Token Value</Text>
            <TextInput
                style={styles.input}
                value="1000"
                placeholderTextColor="#8a8a8a"
                keyboardType="numeric"
            />

            {/* Token Expiration */}
            <Text style={styles.label}>Token Expiration</Text>
            <TextInput
                style={styles.input}
                value="12 months"
                placeholderTextColor="#8a8a8a"
            />

            {/* Reward Ranges */}
            <Text style={styles.label}>Reward Ranges</Text>
            <View style={styles.rewardRow}>
                <View style={styles.rewardGroup}>
                    <Text style={styles.rewardLabel}>Video Completion</Text>
                    <View style={styles.rewardInputs}>
                        <TextInput style={styles.tokenInputSmall} value="10" keyboardType="numeric" />
                        <Text style={styles.tokenSeparator}>-</Text>
                        <TextInput style={styles.tokenInputSmall} value="25" keyboardType="numeric" />
                        <Text style={styles.tokenLabel}>Tokens</Text>
                    </View>
                </View>

                <View style={[styles.rewardGroup, { marginRight: 0 }]}>
                    <Text style={styles.rewardLabel}>Scholarship Application</Text>
                    <View style={styles.rewardInputs}>
                        <TextInput style={styles.tokenInputSmall} value="75" keyboardType="numeric" />
                        <Text style={styles.tokenSeparator}>-</Text>
                        <TextInput style={styles.tokenInputSmall} value="100" keyboardType="numeric" />
                        <Text style={styles.tokenLabel}>Tokens</Text>
                    </View>
                </View>
            </View>


            {/* Referral Bonus */}
            <Text style={styles.label}>Referral Bonus</Text>
            <View style={styles.rewardInputs}>
                <TextInput style={styles.tokenInputMedium} value="150" keyboardType="numeric" />
                <Text style={styles.tokenLabel}>Tokens</Text>
            </View>
        </View>
    );
};
// --- END TOKEN ECONOMY CONTROLS COMPONENT ---


const AdminSetting = () => {
    const [status, setStatus] = useState(true);

    // Placeholder URI for local image assets
    const placeholderImageUri = 'https://placehold.co/50x50/3A3A58/ffffff?text=P';


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Ionicons name="menu" size={24} color="#fff" />
                    {/* Replaced local asset with placeholder URI */}
                    <Image  source={require('../../assets/images/burger.png')} style={styles.avatar} />
                    <TouchableOpacity style={styles.bellButton}>
                        <Ionicons name="notifications" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.mainTitle}>Admin Setting</Text>
                <Text style={styles.subtitle}>
                    Configure roles, permissions, integration, and platform-wide preferences for Cash 4 Edu
                </Text>

                {/* Action Buttons */}
                <View style={styles.actionButtonsRow}>
                    <TouchableOpacity style={styles.exportButton}>
                        <FontAwesome6 name="arrows-rotate" size={18} color="#fff" style={styles.actionIcon} />
                        <Text style={styles.exportText}>Reset to Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.createButton}>
                        <Ionicons name="save-sharp" size={18} color="#ffffffff" style={styles.actionIcon} />
                        <Text style={styles.createText}>Save All Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Platform Information Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="information-circle-outline" size={22} color="#03a2d5" />
                        <Text style={styles.cardTitle}>Platform Information</Text>
                    </View>

                    {/* Input Fields */}
                    <Text style={styles.label}>Platform Name</Text>
                    <TextInput
                        style={styles.input}
                        value="Cash 4 Edu Admin Console"
                        placeholderTextColor="#8a8a8a"
                    />

                    <Text style={styles.label}>Support Email</Text>
                    <TextInput
                        style={styles.input}
                        value="support@cash4edu.com"
                        placeholderTextColor="#8a8a8a"
                    />

                    <Text style={styles.label}>Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value="+1 (555) 123-4567"
                        placeholderTextColor="#8a8a8a"
                    />

                    {/* Switch */}
                    <View style={styles.switchCont}>
                        <Text style={styles.label}>Platform Status</Text>

                        <Switch
                            value={status}
                            onValueChange={() => setStatus(!status)}
                            trackColor={{ false: "#3A3A58", true: "#03a2d5" }}
                            thumbColor="#ffffff"
                        />
                    </View>

                    {/* Upload Box */}
                    <Text style={styles.label}>Platform Logo</Text>
                    <TouchableOpacity style={styles.uploadBox}>
                        <Ionicons name="cloud-upload-outline" size={32} color="#bbbbbbff" />
                        <Text style={styles.uploadText}>
                            Drag and drop your logo here, or
                            <Text style={styles.browseText}> browse</Text>
                        </Text>

                        <Text style={styles.fileInfo}>PNG, JPG up to 2MB</Text>
                    </TouchableOpacity>

                </View>
                {/* Display Preferences Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome6 name="palette" size={22} color="#03a2d5" />
                        <Text style={styles.cardTitle}>Display Preferences</Text>
                    </View>

                    <Text style={styles.label}>Theme</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value="Dark"
                            placeholder="Select"
                            placeholderTextColor="#8a8a8a"
                        />
                        <Ionicons name="chevron-down" size={18} color="#ffffffff" style={styles.icon} />
                    </View>

                    <Text style={styles.label}>Date Format</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value="MM/DD/YYYY"
                            placeholder="Select"
                            placeholderTextColor="#8a8a8a"
                        />
                        <Ionicons name="chevron-down" size={18} color="#ffffffff" style={styles.icon} />
                    </View>

                    <Text style={styles.label}>Default Dashboard View</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value="Analytics"
                            placeholder="Select"
                            placeholderTextColor="#8a8a8a"
                        />
                        <Ionicons name="chevron-down" size={18} color="#ffffffff" style={styles.icon} />
                    </View>

                    <Text style={styles.label}>Platform Status</Text>
                    <View style={{ flexDirection: 'row', gap: 5 }}>
                        <FontAwesome name='circle' size={40} color='#03a2d5' />
                        <FontAwesome name='circle' size={40} color='#ffc947' />
                        <FontAwesome name='circle' size={40} color='#12db00' />
                        <FontAwesome name='circle' size={40} color='#ef4444' />
                        <FontAwesome name='circle' size={40} color='#0257a7' />

                    </View>
                </View>

                {/* Admin Team Management Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome6 name="users" size={22} color="#03a2d5" />
                        <Text style={styles.cardTitle}>Admin Team Management</Text>
                    </View>

                    <Text style={styles.cardsubTitle}>Name</Text>
                    <View style={styles.stdCont}>
                        {/* Replaced local asset with placeholder URI */}
                        <Image source={require('../../assets/images/std.jpg')} style={styles.profileImage} />
                        <Text style={styles.stdName}>Aroma Tariq</Text>
                    </View>

                    <View style={styles.stdCont}>
                        {/* Replaced local asset with placeholder URI */}
                        <Image source={require('../../assets/images/std.jpg')} style={styles.profileImage} />
                        <Text style={styles.stdName}>Aroma Tariq</Text>
                    </View>

                    <View style={styles.stdCont}>
                        {/* Replaced local asset with placeholder URI */}
                        <Image source={{ uri: placeholderImageUri }} style={styles.profileImage} />
                        <Text style={styles.stdName}>Aroma Tariq</Text>
                    </View>
                </View>

                {/* CONNECTED INTEGRATION CARD */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <FontAwesome6 name="plug" size={22} color="#03a2d5" />
                        <Text style={styles.cardTitle}>Connected Integration</Text>
                    </View>
                    {/* Render Integration Items */}
                    {INTEGRATIONS_DATA.map(item => (
                        <IntegrationItem key={item.id} {...item} />
                    ))}
                </View>

                {/* Token Economy Controls Card (New Addition) */}
                <TokenEconomyControls />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    stdCont: {
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 7
    },
    stdName: {
        color: 'white',
        fontSize: 22,
        marginTop: 15,
        fontWeight: '700'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 12,
    },
    switchCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0B0F1A',
    },

    /* HEADER */
    header: {
        marginBottom: 10,
        paddingTop: 10,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 200,
    },
    bellButton: {
        padding: 5,
    },
    mainTitle: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 5,
    },
    subtitle: {
        color: '#ffffffff',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 15,
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    exportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1F2E',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#51e3fc',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flex: 1,
        justifyContent: 'center',
    },
    actionIcon: {
        marginRight: 8,
    },
    exportText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 15,
    },
    createText: {
        // Changed color for better contrast on the light blue button
        color: '#ffffffff',
        fontWeight: '700',
        fontSize: 15,
    },

    /* CARDS */
    card: {
        backgroundColor: '#021e38',
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        marginTop: 10,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 21,
        fontWeight: "700",
        marginLeft: 8,
    },

    cardsubTitle: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "700",
        marginLeft: 8,
        marginTop: 10,
    },

    label: {
        color: "#ffffffff",
        marginTop: 12,
        marginBottom: 12,
        fontSize: 15,
        fontWeight: 'bold',

    },

    input: {
        backgroundColor: "#1c384eff",
        borderRadius: 8,
        color: "#FFFFFF",
        fontSize: 13,
        paddingHorizontal: 15,
        paddingVertical: 12,
        paddingHorizontal: 15,
        paddingRight: 35, // important to avoid overlap
        flex: 1
    },

    icon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -10 }],
    },

    uploadBox: {
        marginTop: 10,
        height: 140,
        borderWidth: 1.5,
        borderColor: "#51e3fc",
        borderStyle: "dashed",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

    },
    uploadText: {
        color: "#7A8FA6",
        marginTop: 10,
        fontSize: 10,
    },
    browseText: {
        color: "#51e3fc",
        fontWeight: "600",
        marginTop: 2,
    },
    fileInfo: {
        color: "#7A8FA6",
        marginTop: 5,
        fontSize: 10,
    },

    // --- INTEGRATION STYLES ---
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        marginVertical: 6,
        borderRadius: 10,

    },
    iconBox: {
        width: 55,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        flex: 1,
        marginLeft: 12,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '800',
        color: 'white'
    },
    descriptionText: {
        fontSize: 12,
        color: '#ffffffff',
        marginTop: 2,
    },
    statusPill: {
        backgroundColor: '#12db00',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginLeft: 15,
    },
    statusText: {
        fontSize: 12,
        color: '#ffffffff',
        fontWeight: '600',
    },

    // --- NEW TOKEN ECONOMY STYLES (New Code) ---
    rewardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // space between the two groups
        marginVertical: 10,
    },

    rewardGroup: {
        flex: 1,           // each group takes equal space
        marginRight: 10,   // spacing between groups
    },
    rewardLabel: {
        color: "#ffffffff",
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 8,
    },
    rewardInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    tokenInputSmall: {
        flex: 1,
        height: 45,
        borderRadius: 10,
        color: 'white',
        backgroundColor: "#1c384eff",
        textAlign:'center',
    },
    tokenInputMedium: {
        backgroundColor: "#1c384eff",
        borderRadius: 8,
        color: "#FFFFFF",
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: 70, // Fixed width for medium input
        textAlign: 'center',
    },
    tokenSeparator: {
        marginHorizontal: 4,
        fontSize: 16,
        color: 'white'
    },

    tokenLabel: {
        marginLeft: 4,
        fontSize: 14,
        color: 'white',
    },
});

export default AdminSetting;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const LocationPerksScreen = () => {
    const navigation = useNavigation();
    const [chatVisible, setChatVisible] = useState(false);
    const [chatMinimized, setChatMinimized] = useState(false);

    return (
        <View style={styles.screenContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#343434" />

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search perks by location or category..."
                    placeholderTextColor="#A0A0A0"
                />
                <Icon name="search" size={20} color="#FFFFFF" style={styles.searchIcon} />
                <Icon name="microphone" size={20} color="#FFFFFF" style={styles.micIcon} />
            </View>

            {/* Map Section */}
            <View style={styles.mapPlaceholder}>
                <Image source={require('../../assets/images/map-bg.png')}style={{opacity: 0.4 }}  />
                <Text style={styles.mapText}>[Interactive Map Area]</Text>

                {/* Chatbot Floating Button */}
                <View style={styles.chatBotIconPlaceholder}>
                    <TouchableOpacity onPress={() => setChatVisible(true)}>
                        <Image
                            source={require('../../assets/images/chatbot.png')}
                            style={styles.chatBotImage}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Card */}
            <View style={styles.detailCard}>
                <View style={styles.validityBadge}>
                    <Text style={styles.validityText}>Valid until Nov 30, 2025</Text>
                </View>

                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={()=>navigation.navigate('PerkPreview')}>
                    <Image
                        source={require('../../assets/images/burger.png')}
                        style={styles.logo}
                    />
                    </TouchableOpacity>
                    <View style={styles.cardTitleContent}>
                        <Text style={styles.textBusinessName}>McDonald's</Text>
                        <Text style={styles.textPerkDetail}>10% Off Meals for Students</Text>
                    </View>
                </View>

                <View style={styles.tagsRow}>
                    <Text style={styles.tag}>Food & Dining</Text>
                    <Text style={styles.tag}>Student Verified</Text>
                </View>

                <View style={styles.distanceRow}>
                    <MaterialIcon name="location-on" size={16} color="#fff" />
                    <Text style={styles.textDistance}>0.7 miles away</Text>
                </View>

                <View style={styles.buttonsRow}>
                    <TouchableOpacity style={styles.buttonDetail}>
                        <Text style={styles.buttonTextDetail}>View Detail</Text>
                        <MaterialIcon name="arrow-right-alt" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDirections}>
                        <Text style={styles.buttonTextDirections}>Get Directions</Text>
                        <MaterialIcon name="alt-route" size={20} color="#00CFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chatbot Modal */}
            <Modal
                visible={chatVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setChatVisible(false)}
            >
                <View style={styles.chatModalContainer}>
                    {chatMinimized ? (
                        <TouchableOpacity
                            style={styles.minimizedChat}
                            onPress={() => setChatMinimized(false)}
                        >
                            <Text style={styles.minimizedText}>💬 Chat (Tap to reopen)</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.chatBox}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatTitle}>Chat with us</Text>
                                <View style={styles.headerIcons}>
                                    <TouchableOpacity onPress={() => setChatMinimized(true)}>
                                        <AntDesign name="minus" size={20} color="#000000ff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setChatVisible(false)} style={{ marginLeft: 10 }}>
                                        <MaterialIcon name="close" size={20} color="#000000ff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.afterHeader}>
                                <Image
                                    source={require('../../assets/images/chatbot.png')}
                                    style={styles.afterHeaderImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.afterHeaderTxt}>Cash4Edu AI</Text>

                                <Image
                                    source={require('../../assets/images/Logo2.png')}
                                    style={styles.logoInChat}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={styles.chatMessages}>

                                {/* First bot message */}
                                <View style={styles.chatBubbleRow}>
                                    <Image
                                        source={require('../../assets/images/chatbot.png')}
                                        style={styles.chatImage}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.chatBubbleBot}>
                                        <Text style={styles.chatText}>Hey Aroma! Welcome to Cash4Edu.</Text>
                                    </View>
                                </View>

                                {/* Second bot message */}
                                <View style={styles.chatBubbleRow}>
                                    <Image
                                        source={require('../../assets/images/chatbot.png')}
                                        style={styles.chatImage}
                                        resizeMode="contain"
                                    />
                                    <View style={styles.chatBubbleBot}>
                                        <Text style={styles.chatText}>What do you need help with today?</Text>
                                    </View>
                                </View>

                                {/* Quick replies */}
                                <TouchableOpacity style={styles.chatButton}>
                                    <Text style={styles.chatButtonText}>Ask a question</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.chatButton}>
                                    <Text style={styles.chatButtonText}>Where can I use my tokens?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.chatButton}>
                                    <Text style={styles.chatButtonText}>Show me food perks near me</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.chatInput}
                                placeholder="Type something..."
                                placeholderTextColor="#999"
                            />
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    afterHeaderTxt: {
        color: 'black',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },
    afterHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd', // optional subtle divider color
        backgroundColor: '#fff', // ensure shadow is visible
        shadowOpacity: 0.75,        // shadow visibility
        shadowRadius: 3.5,          // blur effect
    },
    screenContainer: {
        flex: 1,
        backgroundColor: '#343434',
    },
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1e1e1ed2',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 4,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 12,
        paddingRight: 10,
    },
    searchIcon: {
        marginRight: 15,
    },
    mapPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    chatBotIconPlaceholder: {
        position: 'absolute',
        bottom: 220,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 5,
    },
    chatBotImage: {
        width: 55,
        height: 55,
        borderRadius: 50,
    },
    chatImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 8,
        marginTop: 10,
    },
    afterHeaderImage: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginRight: 8,
        marginTop: 10,
    },
    logoInChat: {
        width: 45,
        height: 45,
        borderRadius: 50,
        left: 115,
        marginTop: 10,
    },
    chatBubbleRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        paddingBottom:10,
    },
    chatBubbleBot: {
        backgroundColor: '#E6F7FF',
        borderRadius: 10,
        padding: 10,
        flexShrink: 1,
        maxWidth: '80%',
    },
    detailCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingTop: 2,
        paddingBottom:73,
    },
    validityBadge: {
        position: 'absolute',
        left: 219,
        top:-8,
        backgroundColor: '#ffc947',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 3,
        marginTop: 25,
    },
    validityText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    cardTitleContent: {
        flex: 1,
    },
    textBusinessName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    textPerkDetail: {
        fontSize: 14,
        color: '#B0D8F1',
    },
    tagsRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    tag: {
        borderWidth: 1,
        borderColor: '#00588A',
        color: '#B0D8F1',
        backgroundColor: '#031E35',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
        fontSize: 12,
    },
    distanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    textDistance: {
        fontSize: 14,
        color: '#B0D8F1',
        marginLeft: 5,
    },
    buttonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    buttonDetail: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00CFFF',
        borderRadius: 10,
        marginRight: 10,
        gap: 5,
        padding: 15,
    },
    buttonTextDetail: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonDirections: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00CFFF',
        padding: 15,
        borderRadius: 8,
    },
    buttonTextDirections: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00CFFF',
    },
    chatModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        
    },
    chatBox: {
        height: '75%',
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffffffff',
        padding: 5,
        borderRadius: 10,
    },
    chatTitle: {
        color: '#000000ff',
        fontSize: 16,
    },
    chatMessages: {
        flex: 1,
        padding: 10,
    },
    chatText: {
        color: '#000',
        fontSize: 14,
    },
    chatButton: {
        backgroundColor: '#00CFFF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 8,
        alignSelf: 'flex-start',
        marginLeft: 45,
    },
    chatButtonText: {
        color: '#ebebebff',
        fontWeight: 'bold'
    },
    chatInput: {
        backgroundColor: '#d6d6d6ff',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 5,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    minimizedChat: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        backgroundColor: '#00CFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    minimizedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LocationPerksScreen;
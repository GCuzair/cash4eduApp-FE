import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const VideoPlayer = () => {
    const [text, setText] = useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/onboarding/image1.jpg')}
                style={styles.image}
                resizeMode="cover"
            />

            {/* Search bar overlay */}
            <View style={styles.searchbarContainer}>
                <View style={styles.searchBox}>

                    <View style={{ flex: 1, position: 'relative' }}>
                        {/* Two-line placeholder */}
                        {text.length === 0 && (
                            <View style={styles.placeholderContainer}>
                                <Text style={styles.placeholderLine}>Daily Goal</Text>
                                <Text style={styles.placeholderLineSmall}>1 more to earn 10 bonus tokens</Text>
                            </View>
                        )}

                        <TextInput
                            style={styles.searchInput}
                            value={text}
                            onChangeText={setText}
                            placeholderTextColor="#000000ff"
                        />
                    </View>

                    <FontAwesome5 name="search" size={23} color="#fff" style={styles.searchIcon} />
                </View>



            </View>

            <View style={styles.actionBar}>
                <TouchableOpacity style={styles.profileContainer}>
                    <Image
                        source={{ uri: "https://i.pravatar.cc/100" }} // profile pic
                        style={styles.profileImage}
                    />
                    <View style={styles.plusIcon}>
                        <FontAwesome5 name="plus" size={10} color="#fff" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                    <FontAwesome5 name="bookmark" size={24} color="#fff" />
                    <Text style={styles.actionLabel}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                    <Feather name="send" size={24} color="#fff" />
                    <Text style={styles.actionLabel}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                    <Ionicons name="heart" size={30} color="#ff0050" />
                    <Text style={styles.actionText}>22.9k</Text>
                </TouchableOpacity>

                {/* Comment */}
                <TouchableOpacity style={styles.actionItem}>
                    <Ionicons name="chatbubble-outline" size={28} color="#fff" />
                    <Text style={styles.actionText}>801</Text>
                </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.card} activeOpacity={0.9}>
                {/* Top Section */}
                <View style={styles.topRow}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100' }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.name}>Rose Willian</Text>
                        <View style={styles.tagContainer}>
                            <Text style={[styles.tag, { backgroundColor: '#51e3fc' }]}>
                                Financial Tips
                            </Text>
                            <Text style={[styles.tag, { backgroundColor: '#0984e3' }]}>
                                Budgeting
                            </Text>
                        </View>
                        <Text style={[styles.fullWidthTag, { backgroundColor: '#12db00' }]}>
                            College Money
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.description}>
                    Everybody talks about investing in the stock market and earning passive income,
                    but nobody shows you how to actually do it... Today, I cover EXACTLY how to...
                    <Text style={styles.more}>more</Text>
                </Text>

                {/* Bottom Row */}
                <View style={styles.bottomRow}>
                    <View style={styles.leftInfo}>
                        <FontAwesome5 name="coins" size={14} color="#00cec9" />
                        <Text style={styles.bottomText}> Earn 2 tokens by watching </Text>
                    </View>

                    <View style={styles.rightInfo}>
                        <Ionicons name="time-outline" size={16} color="#b2bec3" />
                        <Text style={styles.bottomText}> 2 min </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>



    );
};

const styles = StyleSheet.create({
    userCont: {
        justifyContent: 'center',

    },

    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',
    },
    searchbarContainer: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        zIndex: 10,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(106, 106, 106, 0.6)',
        borderRadius: 10,
        paddingHorizontal:15,
        paddingVertical:5,
    },
    searchInput: {
        flex: 1,
        color: '#c5c5c5ff',
        fontSize: 16,
        paddingTop: 4,
    },
    searchIcon: {
        marginLeft: 8,
    },
    placeholderContainer: {
        position: 'absolute',
        
    },
    placeholderLine: {
        color: '#ffffffff',
        fontSize: 16,
        opacity: 0.6,
        fontWeight: '600',
    },
    placeholderLineSmall: {
        color: '#ffffffff',
        fontSize: 12,
        opacity: 0.4,
        marginTop: 2,
    },
    actionBar: {
        position: "absolute",
        right: 10,
        bottom: 140,
        alignItems: "center",
        gap: 22,
        
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "#fff",
    },
    plusIcon: {
        position: "absolute",
        bottom: -4,
        right: 12,
        backgroundColor: "#0095f6",
        borderRadius: 10,
        padding: 3,
    },
    actionItem: {
        alignItems: "center",
    },
    actionText: {
        color: "#fff",
        marginTop: 4,
        fontWeight: "500",
        fontSize: 13,
    },
    actionLabel: {
        color: "#fff",
        marginTop: 3,
        fontSize: 12,
        fontWeight: "500",
    },
    card: {
        padding: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        position: 'absolute',
        bottom: 0, // stick to bottom
        left: 0,
        right: 0,

    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 4,
    },
    tag: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '500',
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
        marginRight: 5,
    },
    fullWidthTag: {
        width: '53%',
        color: '#fff',
        fontSize: 11,
        fontWeight: '500',
        borderRadius: 20,
        padding: 1,
        marginRight:5,
        marginTop: 5,
    },
    description: {
        color: '#dfe6e9',
        fontSize: 13,
        marginVertical: 10,
        lineHeight: 18,
    },
    more: {
        color: '#0984e3',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#2d3436',
        borderTopWidth: 1,
        paddingTop: 8,
    },
    leftInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomText: {
        color: '#b2bec3',
        fontSize: 13,
    },
});

export default VideoPlayer;
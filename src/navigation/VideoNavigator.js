import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoHub from '../screens/videos/videoHub';
import VideoPlayer from '../screens/videos/videoPlayer';


const stack = createNativeStackNavigator();

export default function VideoNavigator() {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="VideoHub" component={VideoHub} />
            <stack.Screen name="VideoPlayer" component={VideoPlayer} />
        </stack.Navigator>
    );
}
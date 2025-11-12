import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StdPerk from '../screens/perks/stdPerk';
import PerkDetails from '../screens/perks/perkDetails';
import ExpandedMap from '../screens/perks/extendedMap';
import PerkPreview from '../screens/perks/perkPreview';
import TuitionAssistance from "../screens/perks/tuitionAssitance";
import Redemption from '../screens/perks/redemption';

const stack = createNativeStackNavigator();

export default function PerkNavigator() {
    return (
        <stack.Navigator screenOptions={{ headerShown: false }}>
            <stack.Screen name="StdPerk" component={StdPerk} />
            <stack.Screen name="PerkDetails" component={PerkDetails} />
            <stack.Screen name="ExpandedMap" component={ExpandedMap} />
            <stack.Screen name="PerkPreview" component={PerkPreview} />
            <stack.Screen name="TuitionAssistance" component={TuitionAssistance} />
            <stack.Screen name="Redemption" component={Redemption} />
        </stack.Navigator>
    );
}
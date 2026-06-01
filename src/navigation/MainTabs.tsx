import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/dashboard/DashboardScreen"
import CreateTicketScreen from "../screens/ticket/CreateTicketScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs(){
    return (
        <Tab.Navigator>
            <Tab.Screen
                name = "Dashboard"
                component = {DashboardScreen}
            />

            <Tab.Screen
                name = "Create"
                component = {CreateTicketScreen}
            />

            <Tab.Screen
                name = "Profile"
                component = {ProfileScreen}
            />

        </Tab.Navigator>
    );
}
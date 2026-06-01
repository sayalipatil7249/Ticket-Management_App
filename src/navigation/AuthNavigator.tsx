import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

import LoginScreen from "../screens/auth/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";

import TicketDetailsScreen from "../screens/ticket/TicketDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator(){
    const isLoggedIn = useSelector(
        (state : RootState) => state.auth.isLoggedIn
    );

    return(
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                <Stack.Screen
                name="MainTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false}} 
                />
                <Stack.Screen 
                    name="TicketDetails"
                    component={TicketDetailsScreen}
                />
                </>
            ): (
                <Stack.Screen
                name = "Login"
                component = {LoginScreen}
            />
            )
        
        }
            
        </Stack.Navigator>
    );
}
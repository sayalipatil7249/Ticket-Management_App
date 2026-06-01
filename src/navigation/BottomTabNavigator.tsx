import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import CreateTicketScreen from "../screens/ticket/CreateTicketScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomtabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#6C63FF",

        tabBarInactiveTintColor: "gray",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Create Ticket") {
            iconName = "add-circle";
          } else {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Create Ticket" component={CreateTicketScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

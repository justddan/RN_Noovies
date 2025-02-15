import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarLabelStyle: {
          backgroundColor: "red",
        },
        tabBarLabelPosition: "beside-icon",
        // headerShown: false,
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarLabelStyle: {
            backgroundColor: "purple",
          },
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}

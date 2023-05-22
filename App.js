import { Button, Pressable, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GlobalStyles } from "./constants/styles";
import TaskOverviewScreen from "./screens/TaskStack/TaskOverviewScreen";
import CalendarOverviewScreen from "./screens/CalendarStack/CalendarOverviewScreen";
import IconButton from "./components/ui/IconButton";
import TaskContextProvider from "./store/task-context";

import AllTasks from "./screens/TaskStack/AllTasks";
import AddTaskScreen from "./screens/TaskStack/AddTaskScreen";
import EditTaskScreen from "./screens/TaskStack/EditTaskScreen";
import EditTaskScreenOld from "./screens/TaskStack/EditTaskScreenOld";

import CalendarScreen from "./screens/CalendarStack/CalendarScreen";
import ClockIOScreen from "./screens/ClockIOScreen";

import SettingsScreen from "./screens/SettingsStack/SettingsScreen";
import AddSalesPeople from "./screens/SettingsStack/AddSalesPeople";
import SaleContextProvider from "./store/sales-context";
import SalesPeople from "./screens/SettingsStack/SalesPeople";
import EditSales from "./components/settings/SalesList/EditSales";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/Login/SignUpScreen";

const BottomTabs = createBottomTabNavigator();
const Task = createNativeStackNavigator();
const Calendar = createNativeStackNavigator();
const Settings = createNativeStackNavigator();
const Authentication = createNativeStackNavigator();
// const AuthenticatedStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function TaskNavigator() {
  return (
    <Task.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      <Task.Screen
        name={"AllTasks"}
        component={AllTasks}
        options={{
          title: "Task Screen",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={"AddTaskScreen"}
            />
          ),
        }}
      />
      <Task.Screen
        name={"TaskOverviewScreen"}
        component={TaskOverviewScreen}
        options={{
          title: "Details",
        }}
      />
      <Task.Screen
        name={"EditTaskScreen"}
        component={EditTaskScreen}
        options={{
          title: "Edit",
          presentation: "modal",
        }}
      />
      <Task.Screen
        name={"AddTaskScreen"}
        component={AddTaskScreen}
        options={{
          title: "Add Task",
        }}
      />
    </Task.Navigator>
  );
}

function CalendarNavigator() {
  return (
    <Calendar.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      <Calendar.Screen
        name={"CalendarScreen"}
        component={CalendarScreen}
        options={{
          title: "Calendar",
        }}
      />
      <Calendar.Screen
        name={"CalendarOverviewScreen"}
        component={CalendarOverviewScreen}
        options={{
          title: "Details",
        }}
      />
    </Calendar.Navigator>
  );
}

function SettingNavigator() {
  return (
    <Settings.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      <Settings.Screen
        name={"SettingsScreen"}
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
      <Settings.Screen
        name={"SalesPeople"}
        component={SalesPeople}
        options={{
          title: "Sales People",
        }}
      />
      <Settings.Screen
        name={"AddSalesPeople"}
        component={AddSalesPeople}
        options={{
          title: "Add Sales People",
        }}
      />
      <Settings.Screen
        name={"EditSales"}
        component={EditSales}
        options={{
          title: "Edit Sales Person",
        }}
      />
    </Settings.Navigator>
  );
}

function BottomTabsNavigator() {
  return (
    <TaskContextProvider>
      <SaleContextProvider>
        <BottomTabs.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
          }}
        >
          <BottomTabs.Screen
            name="TaskStack"
            component={TaskNavigator}
            options={{
              title: "In progress",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="layers" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="CalendarStack"
            component={CalendarNavigator}
            options={{
              title: "Calendar",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="ClockIOScreen"
            component={ClockIOScreen}
            options={{
              title: "Clock IO",
              // headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="power" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen
            name="Settings"
            component={SettingNavigator}
            options={{
              title: "Settings",
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cog" size={size} color={color} />
              ),
            }}
          />
        </BottomTabs.Navigator>
      </SaleContextProvider>
    </TaskContextProvider>
  );
}

function AuthStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Authentication.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      <Authentication.Screen name="Login" component={LoginScreen} />
      <Authentication.Screen name="Signup" component={SignUpScreen} />
    </Authentication.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="BottomTabsNavigator"
        component={BottomTabsNavigator}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return null;
  }

  return <Navigation />;
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <BottomTabsNavigator />}
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

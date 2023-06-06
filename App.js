import { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

// Navigation Stack
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/ui/IconButton";

// Context provider
import TaskContextProvider from "./store/task-context";
import SaleContextProvider from "./store/sales-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";

// Task Stack
import InProgress from "./screens/TaskStack/InProgress";
import Complete from "./screens/TaskStack/Complete";
import TaskOverviewScreen from "./screens/TaskStack/TaskOverviewScreen";

import AddTaskScreen from "./screens/TaskStack/AddTaskScreen";
import EditTaskScreen from "./screens/TaskStack/EditTaskScreen";

// Calendar Stack
import CalendarScreen from "./screens/CalendarStack/CalendarScreen";
import CalendarOverviewScreen from "./screens/CalendarStack/CalendarOverviewScreen";

import ClockIOScreen from "./screens/ClockIO/ClockIOScreen";

// Settings Stack
import SettingsScreen from "./screens/SettingsStack/SettingsScreen";
import AddSalesPeople from "./screens/SettingsStack/AddSalesPeople";
import SalesPeople from "./screens/SettingsStack/SalesPeople";
import EditSales from "./components/settings/SalesList/EditSales";
import LoginScreen from "./screens/Login/LoginScreen";
import SignUpScreen from "./screens/Login/SignUpScreen";

// sets up all the navigation stacks for each different part of the app
// main stack is Bottom Tabs
const BottomTabs = createBottomTabNavigator();
const Task = createNativeStackNavigator();
const Calendar = createNativeStackNavigator();
const Settings = createNativeStackNavigator();
const Authentication = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="In Progress" component={InProgress} />
      <Tab.Screen name="Complete" component={Complete} />
    </Tab.Navigator>
  );
}

// Task navigator responsable for the task stack
// showing the task stack with every job in on the database
function TaskNavigator() {
  return (
    <Task.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      {/* AllTasks is the main page for the inprogress tab */}
      <Task.Screen
        name={"MyTabs"}
        component={MyTabs}
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
      {/* TaskOverViewScreen shows the details of the job in question after tapping
       the job from the AllTask screen */}
      <Task.Screen
        name={"TaskOverviewScreen"}
        component={TaskOverviewScreen}
        options={{
          title: "Details",
        }}
      />
      {/* EditTaskScreen pops up a a modal and changes the details within the job 
      and exits back to AllTasks */}
      <Task.Screen
        name={"EditTaskScreen"}
        component={EditTaskScreen}
        options={{
          title: "Edit",
          presentation: "modal",
        }}
      />
      {/* AddTaskScreen Button at the top of AllTasks for the admin to add new jobs to the stack */}
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

// CalenarNavigator under the Calendar bottom tab showing a calendar
function CalendarNavigator() {
  return (
    <Calendar.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      {/* Displays the calendar and the jobs on different days */}
      <Calendar.Screen
        name={"CalendarScreen"}
        component={CalendarScreen}
        options={{
          title: "Calendar",
        }}
      />
      {/* Displays the overview of the different jobs baised on the day selected */}
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

// SettingNavigator under the Settings tab
function SettingNavigator() {
  return (
    <Settings.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      {/* Settings tab first page allowing users to do different things (incomplete) */}
      <Settings.Screen
        name={"SettingsScreen"}
        component={SettingsScreen}
        options={{
          title: "Settings",
        }}
      />
      {/* Button that allows admins to add and delete sales people */}
      <Settings.Screen
        name={"SalesPeople"}
        component={SalesPeople}
        options={{
          title: "Sales People",
        }}
      />
      {/* A page that allows admins to add the sales people */}
      <Settings.Screen
        name={"AddSalesPeople"}
        component={AddSalesPeople}
        options={{
          title: "Add Sales People",
        }}
      />
      {/* A editable page for admins */}
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

// ButtonTabsNavigator the main navigation for the app that keeps the
// app together and brings everything into 1
function BottomTabsNavigator() {
  return (
    <TaskContextProvider>
      <SaleContextProvider>
        <BottomTabs.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
          }}
        >
          {/* TaskStack which holds the TaskNavigator to keep everything together */}
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
          {/* CalenderStack which holds the CalendarNavigator */}
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
          {/* ClockIOScreen which needs to be seen still */}
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
          {/* SettingsNavigator which holds the SettingNavigator with all the buttons */}
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

// AuthStack which holds the login and sign up pages in order to bring everything together
function AuthStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Authentication.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.topBar },
      }}
    >
      {/* Login screen */}
      <Authentication.Screen name="Login" component={LoginScreen} />
      {/* SignUp screen */}
      <Authentication.Screen
        name="Signup"
        component={SignUpScreen}
        options={{ title: "Sign Up" }}
      />
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

// The main Root of the whole app in order to keep everything together
function Root() {
  const [isTryingLogin, setIstryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIstryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return null;
  }

  return <Navigation />;
}

// this is the part of the app that seperates
// the authenticated and the non authenticated part of the app
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

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import icons from MaterialCommunityIcons

import LanguageSelection from './src/screens/LanguageSelection';
import Auth from './src/screens/auth';
import Reel from './src/screens/news';
import SettingsScreen from './src/screens/Settings';
import SplashScreen from './src/screens/splash';
import ChooseInterestScreen from './src/screens/ChooseInterest';
import PrivacyScreen from "./src/screens/PrivacyScreen";

enableScreens(); // Enable screen optimizations for performance

export type RootStackParamList = {
  LanguageSelection: undefined;
  PersonalizeFeed: undefined;
  VideoFeed: undefined;
  InterestSelection: undefined;
  News: undefined;
  HomeTabs: undefined;
  Splash: undefined;
  Auth:undefined;
  Privacy:undefined;
  Settings:undefined;
};

// Stack and Tab Navigator creation
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Tab navigator with Reel and Settings screens
const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = 'play-circle-outline';
          if (route.name === 'Reel') {
            iconName = 'play-circle-outline'; 
          } else if (route.name === 'Settings') {
            iconName = 'cog-outline'; 
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#000', // Black background for tab bar
        },
        tabBarActiveTintColor: '#fff', // Active icon color - white
        tabBarInactiveTintColor: '#888', // Inactive icon color - gray
        showLabel: false, // Hide tab labels
      })}
    >
      <Tab.Screen name="News" component={Reel}  options={{
          headerStyle: {
            backgroundColor: 'black', // Set the header background color to black
          },
          headerTintColor: 'white', 
          headerTitleAlign:'center'
        }}
        />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
          headerStyle: {
            backgroundColor: 'black', // Set the header background color to black
          },
          headerTintColor: 'white', 
          headerTitleAlign:'center'
        }}/>
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
            <Stack.Screen name="InterestSelection" component={ChooseInterestScreen} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

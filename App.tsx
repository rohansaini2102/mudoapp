import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { MoodProvider } from './src/contexts/MoodContext';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { HomeScreenNew } from './src/screens/HomeScreenNew';
import { HomeScreenV2 } from './src/screens/HomeScreenV2';
import { MoodEntryScreen } from './src/screens/MoodEntryScreen';
import { InsightsScreen } from './src/screens/InsightsScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { HistoryScreenV2 } from './src/screens/HistoryScreenV2';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { View, ActivityIndicator, Text } from 'react-native';
import { Colors } from './src/constants/theme';
import { Icon } from './src/components/Icon';
import { ModernTabBar } from './src/components/ModernTabBar';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import { ReactPlugin } from '@stagewise-plugins/react';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#f5f5f5' }
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <ModernTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.secondaryBackground,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: Colors.label,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 17,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenV2}
        options={{
          title: 'MoodVibe',
          headerShown: false,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreenV2}
        options={{
          title: 'History',
          headerShown: false,
          tabBarLabel: 'History',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="MoodEntry" 
        component={MoodEntryScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'none',
        }}
      />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();
  
  console.log('RootNavigator: loading =', loading, 'user =', user);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#6B46C1" />
        <Text style={{ marginTop: 10, color: '#6B46C1' }}>Loading...</Text>
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
}

export default function App() {
  return (
    <NavigationContainer>
      {process.env.NODE_ENV === 'development' && (
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      )}
      <AuthProvider>
        <MoodProvider>
          <RootNavigator />
        </MoodProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
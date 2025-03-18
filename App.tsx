/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';
import HomeScreen from './src/screens/Home/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedShapes, setSavedShapes] = useState([]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');

        // Load saved shapes
        const storedShapes = await AsyncStorage.getItem('savedShapes');
        if (storedShapes) {
          setSavedShapes(JSON.parse(storedShapes));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {props => <HomeScreen {...props} savedShapes={savedShapes} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

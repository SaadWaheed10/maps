import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';

export default function LoginScreen({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Store login status
    await AsyncStorage.setItem('isLoggedIn', 'true');

    Alert.alert('Success', 'Login Successful!', [
      {text: 'OK', onPress: () => navigation.replace('Home')},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

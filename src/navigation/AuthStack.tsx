import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginPage from '../auth/LoginPage';
import {NavigationContainer} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatPage from '../chat/ChatPage';
import ChatScreen from '../chat/ChatScreen';

export type ChatStackParamList = {
  ChatPage: undefined;
  ChatScreen: {
    name: string;
    role: string;
    userId: string;
    roomId: number;
    counterpartId: number;
  };
};

const Stack = createNativeStackNavigator<ChatStackParamList>();

export default function ChatStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: '채팅',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="ChatPage"
        component={ChatPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '채팅',
          headerTitleAlign: 'center',
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}

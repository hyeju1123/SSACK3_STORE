import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPage from '../mypage/MyPage';
import StoreInfoPage from '../mypage/StoreInfoPage';

export type MyPageStackParamList = {
  MyPage: undefined;
  StoreInfoPage: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

export default function MyPageStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="MyPage"
        component={MyPage}
      />
      <Stack.Screen
        options={{headerTitle: '가게정보', headerTitleAlign: 'center'}}
        name="StoreInfoPage"
        component={StoreInfoPage}
      />
    </Stack.Navigator>
  );
}

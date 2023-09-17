/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import PostPage from '../post/PostPage';
import MyPageStack from './MyPageStack';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

type TabBarIconParams = {
  route: {
    name: string;
  };
  focused: boolean;
  color: string;
  size: number;
};

const tabBarIconHander = ({route, focused, color, size}: TabBarIconParams) => {
  let iconName;

  if (route.name === '홈') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === '채팅') {
    iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
  } else if (route.name === '상품등록') {
    iconName = focused ? 'create' : 'create-outline';
  } else if (route.name === '마이페이지') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <IonIcon name={iconName || ''} size={size} color={color} />;
};

export default function MainTab(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {fontSize: 5, marginTop: -10, marginBottom: 8},
          headerShown: false,
          tabBarIcon: props => tabBarIconHander({route, ...props}),
          tabBarActiveTintColor: '#94E048',
          tabBarInactiveTintColor: 'black',
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen name="홈" component={HomeStack} />
        <Tab.Screen name="채팅" component={ChatStack} />
        <Tab.Screen name="상품등록" component={PostPage} />
        <Tab.Screen name="마이페이지" component={MyPageStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

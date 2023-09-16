import React from 'react';
import AuthStack from './AuthStack';
import {useUser} from '../context/AuthContext';
import MainTab from './MainTab';

export default function Root(): JSX.Element {
  const {userId} = useUser();
  // const userId = '4';
  console.log('userid in root', userId, ' => id');

  return <>{userId ? <MainTab /> : <AuthStack />}</>;
}

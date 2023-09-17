import React from 'react';
import AuthStack from './AuthStack';
import {useUser} from '../context/AuthContext';
import MainTab from './MainTab';
import {NotificationProvider} from '../context/NotificationContext';
import NotificationModal from '../components/NotificationModal';

export default function Root(): JSX.Element {
  const {userId} = useUser();
  // const userId = '4';
  console.log('userid in root', userId, ' => id');

  return (
    <>
      <NotificationProvider>
        {userId ? (
          <>
            <NotificationModal />
            <MainTab />
          </>
        ) : (
          <AuthStack />
        )}
      </NotificationProvider>
    </>
  );
}

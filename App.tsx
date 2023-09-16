/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import Root from './src/navigation/Root';
import SWRConfigContext from './src/context/SWRConfigContext';
import {UserProvider} from './src/context/AuthContext';

function App(): JSX.Element {
  return (
    <SWRConfigContext>
      <UserProvider>
        <Root />
      </UserProvider>
    </SWRConfigContext>
  );
}

export default App;

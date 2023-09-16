import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AuthStack from './AuthStack';
import {useUser} from '../context/AuthContext';

export default function Root(): JSX.Element {
  const {userId} = useUser();
  console.log('userid in root', userId, ' => id');

  return (
    <>
      {userId ? (
        <View>
          <Text style={styles.myText}>main</Text>
        </View>
      ) : (
        <AuthStack />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  myText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
});

import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {useUser} from '../context/AuthContext';

export default function Avatar() {
  const {imageURL} = useUser();

  return (
    <>
      {imageURL ? (
        <Image source={{uri: imageURL}} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../../images/olaf.jpeg')}
          style={styles.profileImage}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

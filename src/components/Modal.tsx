import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from './text';

export default function Modal({title, content}) {
  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.contentBox}>{content}</View>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  header: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
  contentBox: {
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
});

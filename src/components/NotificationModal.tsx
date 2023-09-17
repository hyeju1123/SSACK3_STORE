import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './text';
import AiIcon from 'react-native-vector-icons/AntDesign';
import {useNotification} from '../context/NotificationContext';

export default function NotificationModal() {
  const {SHOW, MESSAGE, handleModal} = useNotification();
  console.log('show in modal:', SHOW, MESSAGE);
  const message = MESSAGE
    ? JSON.parse(JSON.parse(JSON.stringify(MESSAGE)))
    : '';
  return (
    <View style={SHOW ? styles.container : {display: 'none'}}>
      <View style={styles.modalBox}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{message.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleModal(false, '')}
          style={styles.closeIcon}>
          <AiIcon name="close" size={15} color={'#FD8535'} />
        </TouchableOpacity>
        <View style={styles.contentBox}>
          <Text style={styles.message}>{message.content}</Text>
        </View>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    zIndex: 100,
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  message: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    paddingVertical: 20,
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

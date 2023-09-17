import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AiIcon from 'react-native-vector-icons/AntDesign';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from '../components/text';
import Avatar from '../components/Avatar';
import {OptionType} from './MainPage';
import {useUser} from '../context/AuthContext';
import {logout} from '../api/useLogin';

type HeaderProps = {
  option: OptionType;
  setOption: React.Dispatch<React.SetStateAction<OptionType>>;
};

export default function Header({option, setOption}: HeaderProps): JSX.Element {
  const {handleUser} = useUser();
  const getToggledInfo = () => {
    setOption({bargain: !option.bargain, show: false});
  };
  const handleLogout = () => {
    logout();
    handleUser({
      userId: '',
      sub: '',
      role: '',
      exp: 0,
      imageURL: '',
      handleUser: () => {},
      handleUserImg: () => {},
    });
  };
  return (
    <>
      <StatusBar backgroundColor={'#48d3e0'} />
      <View style={styles.headerContainer}>
        <View style={styles.headerMenuContainer}>
          <View style={styles.headerMenuLeft}>
            <TouchableOpacity
              onPress={() => setOption(prev => ({...prev, show: !prev.show}))}>
              <Text style={styles.locText}>
                {option.bargain ? '흥정있음' : '흥정없음'}
              </Text>
            </TouchableOpacity>
            <AiIcon
              name="right"
              size={13}
              color={'white'}
              style={{marginLeft: 3}}
            />
            {option.show && (
              <TouchableOpacity onPress={getToggledInfo}>
                <Text style={styles.locText}>
                  {option.bargain ? '흥정없음' : '흥정있음'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.headerMenuRight}>
            <TouchableOpacity onPress={() => {}}>
              <McIcon
                name="bell"
                size={24}
                color={'white'}
                style={{marginRight: 7}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Avatar />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <AiIcon
            name="search1"
            size={20}
            color={'#48d3e0'}
            style={{marginRight: 10, backgroundColor: 'white'}}
          />
          <TextInput style={styles.input} placeholder="Batch Number" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 10,
    backgroundColor: '#48d3e0',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMenuLeft: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    alignItems: 'center',
  },
  locText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  headerMenuRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    height: 40,
    marginTop: 7,
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 20,
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: '#48d3e0',
    borderBottomWidth: 1,
  },
});

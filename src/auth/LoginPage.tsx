import React, {useState} from 'react';
import {
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../components/text';
import login from '../api/useLogin';
import {useUser} from '../context/AuthContext';
import {useNotification} from '../context/NotificationContext';

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {handleUser} = useUser();
  const {handleModal} = useNotification();

  const handleLogin = async () => {
    const userData = await login({username, password, handleModal});
    handleUser(userData);
  };

  const onUsername = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setUsername(e.nativeEvent.text);
  };
  const onPassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setPassword(e.nativeEvent.text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>로그인</Text>
      </View>
      <View style={styles.textInputBox}>
        <Text style={styles.textInputText}>아이디(이메일)</Text>
        <TextInput
          placeholder="이메일 주소"
          style={styles.textInput}
          value={username}
          onChange={onUsername}
        />
      </View>
      <View style={styles.textInputBox}>
        <Text style={styles.textInputText}>비밀번호</Text>
        <TextInput
          placeholder="비밀번호"
          style={styles.textInput}
          value={password}
          onChange={onPassword}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.gotoSignupBox}>
        <Text style={styles.questionText}>계정이 없으신가요?</Text>
        <TouchableOpacity>
          <Text style={styles.gotoSignupText}>회원가입 하러가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 80,
  },
  headerText: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 20,
  },
  textInputBox: {
    width: '100%',
    padding: 20,
    marginBottom: 10,
  },
  textInputText: {
    fontFamily: 'Inter-Regular',
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    padding: 5,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#94E048',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    fontSize: 18,
  },
  gotoSignupBox: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  questionText: {
    fontFamily: 'Inter-Regular',
    color: '#D9D9D9',
    fontSize: 15,
    marginRight: 15,
  },
  gotoSignupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

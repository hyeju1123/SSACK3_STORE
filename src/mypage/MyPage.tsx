import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../components/text';
import {useUser} from '../context/AuthContext';
import AiIcon from 'react-native-vector-icons/AntDesign';
import Avatar from '../components/Avatar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyPageStackParamList} from '../navigation/MyPageStack';

type MyPageProps = NativeStackScreenProps<MyPageStackParamList, 'MyPage'>;

export default function MyPage({navigation}: MyPageProps) {
  const {sub} = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>마이페이지</Text>
      </View>
      <View style={styles.infoBox}>
        <Avatar />
        <Text style={styles.infoText}>스노우카페</Text>
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={() => navigation.push('StoreInfoPage')}
          style={styles.button}>
          <Text style={styles.text}>가게 정보</Text>
          <AiIcon name="right" size={13} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>리뷰 관리</Text>
          <AiIcon name="right" size={13} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>이전 판매 내역</Text>
          <AiIcon name="right" size={13} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>흥정 진행 내역</Text>
          <AiIcon name="right" size={13} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    marginLeft: 15,
    color: 'black',
  },
  headerText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    color: 'black',
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'black',
  },
  buttonBox: {
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});

import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../components/text';
import {useUser} from '../context/AuthContext';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Modal from '../components/Modal';
import {uploadStoreInfo} from '../api/useStoreInfo';
import {MyPageStackParamList} from '../navigation/MyPageStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type StoreInfoPageProps = NativeStackScreenProps<
  MyPageStackParamList,
  'StoreInfoPage'
>;

export default function StoreInfoPage({navigation}: StoreInfoPageProps) {
  const {sub, userId} = useUser();

  const [loading, setLoading] = useState(false);
  const [menuImage, setMenuImage] = useState<Asset[]>([]);
  const [avatarImage, setAvatarImage] = useState<Asset[]>([]);
  const [dto, setDto] = useState({
    storeName: sub,
    mainAddress: '',
    detailAddress: '',
    zipcode: '',
    phoneNumber: '',
    startTime: '',
    endTime: '',
    holiday: '',
    introduce: '',
  });

  const handleTextInput = (name: string, text: string) => {
    setDto({
      ...dto,
      [name]: text,
    });
  };

  const selectImage = async (isMenu: boolean) => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!response || response.didCancel) {
      return;
    }

    isMenu ? setMenuImage(response.assets) : setAvatarImage(response.assets);
  };

  const handleUploadStoreInfo = async () => {
    setLoading(true);
    const infoDto = {
      userId,
      storeName: dto.storeName,
      mainAddress: dto.mainAddress,
      detailAddress: dto.detailAddress,
      zipcode: dto.zipcode,
      phoneNumber: dto.phoneNumber,
      startTime: dto.startTime,
      endTime: dto.endTime,
      holiday: dto.holiday,
      introduce: dto.introduce,
    };

    const profile = {
      name: avatarImage[0].fileName,
      type: avatarImage[0].type,
      uri: avatarImage[0].uri,
    };

    const menus = {
      name: menuImage[0].fileName,
      type: menuImage[0].type,
      uri: menuImage[0].uri,
    };

    const res = await uploadStoreInfo({dto: infoDto, profile, menus});
    console.log('res in handleUploadStoreInfo: ', res);

    setLoading(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {loading && (
          <Modal
            title="🔔"
            content={
              <Text
                style={{
                  paddingVertical: 20,
                  fontFamily: 'Inter-Bold',
                  fontSize: 15,
                }}>
                가게정보를 업로드하고 있어요!
              </Text>
            }
          />
        )}
        <View style={styles.contentsContainer}>
          <View style={styles.rowBox}>
            <TextInput
              value={dto.storeName}
              onChangeText={text => handleTextInput('storeName', text)}
              style={[styles.textinput, {flex: 1, marginRight: 30}]}
            />
            <TouchableOpacity onPress={() => selectImage(false)}>
              {avatarImage.length ? (
                <Image
                  source={{uri: avatarImage[0].uri}}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require('../../images/olaf.jpeg')}
                  style={styles.profileImage}
                />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.semiTitle}>가게주소</Text>
          <TextInput
            onChangeText={text => handleTextInput('zipcode', text)}
            value={dto.zipcode}
            placeholder="우편번호"
            style={styles.textinput}
          />
          <TextInput
            onChangeText={text => handleTextInput('mainAddress', text)}
            value={dto.mainAddress}
            placeholder="주소"
            style={styles.textinput}
          />
          <TextInput
            onChangeText={text => handleTextInput('detailAddress', text)}
            value={dto.detailAddress}
            placeholder="상세주소"
            style={styles.textinput}
          />

          <Text style={styles.semiTitle}>전화번호</Text>
          <TextInput
            onChangeText={text => handleTextInput('phoneNumber', text)}
            value={dto.phoneNumber}
            placeholder="전화번호"
            style={styles.textinput}
          />

          <Text style={styles.semiTitle}>영업정보</Text>
          <TextInput
            onChangeText={text => handleTextInput('startTime', text)}
            value={dto.startTime}
            placeholder="영업시간"
            style={styles.textinput}
          />
          <TextInput
            onChangeText={text => handleTextInput('holiday', text)}
            value={dto.holiday}
            placeholder="가게 휴무일"
            style={styles.textinput}
          />

          <Text style={styles.semiTitle}>가게소개</Text>
          <TextInput
            onChangeText={text => handleTextInput('introduce', text)}
            value={dto.introduce}
            placeholder="가게소개"
            style={styles.textinput}
          />

          <Text style={styles.semiTitle}>메뉴판</Text>
          <View style={styles.rowBox}>
            <TouchableOpacity
              onPress={() => selectImage(true)}
              style={styles.fileButton}>
              <Text style={styles.fileText}>파일 첨부</Text>
            </TouchableOpacity>
            {!!menuImage.length && (
              <Text style={styles.fileText}>{menuImage[0].fileName}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={handleUploadStoreInfo} style={styles.button}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  contentsContainer: {
    padding: 20,
    width: '100%',
  },
  textinput: {
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'black',
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  semiTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: 'black',
    marginLeft: 2,
    marginTop: 30,
    marginBottom: 10,
  },
  fileButton: {
    width: 80,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginTop: 10,
  },
  fileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 3,
  },
  button: {
    position: 'relative',
    backgroundColor: '#48d3e0',
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    bottom: 0,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
});

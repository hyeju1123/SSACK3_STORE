import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Text} from '../components/text';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useUser} from '../context/AuthContext';
import {uploadMenu} from '../api/usePost';
import Modal from '../components/Modal';

export default function PostPage(): JSX.Element {
  const {userId} = useUser();
  const [loading, setLoading] = useState(false);
  const [bargain, setBargain] = useState(true);
  const [foodStatus, setFoodStatus] = useState('EXPIRATION');
  const [images, setImages] = useState<Asset[]>([]);
  const [commonValue, setCommonValue] = useState({
    menuName: '',
    originalPrice: '',
    discountedPrice: '',
    endTime: '',
  });
  const [bargainValue, setBargainValue] = useState({
    limitTime: '',
    minPrice: '',
  });

  const selectImage = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!response || response.didCancel) {
      return;
    }

    setImages(response.assets);
  };

  const handleTextInput = (name: string, text: string, bargain: boolean) => {
    bargain
      ? setBargainValue({
          ...bargainValue,
          [name]: text,
        })
      : setCommonValue({
          ...commonValue,
          [name]: text,
        });
  };

  const initSetting = () => {
    setBargain(true);
    setFoodStatus('EXPIRATION');
    setImages([]);
    setCommonValue({
      menuName: '',
      originalPrice: '',
      discountedPrice: '',
      endTime: '',
    });
    setBargainValue({
      limitTime: '',
      minPrice: '',
    });
    setLoading(false);
  };

  const handleUploadMenu = async () => {
    setLoading(true);
    const commonDto = {
      userId,
      menuName: commonValue.menuName,
      originalPrice: commonValue.originalPrice,
      discountedPrice: commonValue.discountedPrice,
      isBargainning: bargain ? 'T' : 'F',
      type: foodStatus,
      endTime: commonValue.endTime,
    };
    const bargainDto = {
      limitTime: bargainValue.limitTime,
      minPrice: bargainValue.minPrice,
    };
    const file = {
      name: images[0].fileName,
      type: images[0].type,
      uri: images[0].uri,
    };

    const res = await uploadMenu({commonDto, bargainDto, file});
    console.log('res in handleUploadMenu: ', res);
    initSetting();
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
                  메뉴를 업로드하고 있어요!
                </Text>
              }
            />
          )}
          <View style={styles.header}>
            <Text style={styles.headerText}>메뉴 올리기</Text>
          </View>
          <View style={styles.semiContainer}>
            <Text style={styles.titleText}>메뉴 정보</Text>
            <View style={styles.semiTextBox}>
              <Text style={styles.semiText}>이름</Text>
              <TextInput
                onChangeText={text => handleTextInput('menuName', text, false)}
                value={commonValue.menuName}
                style={styles.textinput}
              />
            </View>
            <View style={styles.semiTextBox}>
              <Text style={styles.semiText}>원래 가격</Text>
              <TextInput
                onChangeText={text =>
                  handleTextInput('originalPrice', text, false)
                }
                value={commonValue.originalPrice}
                style={styles.textinput}
              />
            </View>
            <View style={styles.semiTextBox}>
              <Text style={styles.semiText}>할인된 가격</Text>
              <TextInput
                onChangeText={text =>
                  handleTextInput('discountedPrice', text, false)
                }
                value={commonValue.discountedPrice}
                style={styles.textinput}
              />
            </View>
            <View style={styles.semiTextBox}>
              <Text style={styles.semiText}>사진</Text>
              {!!images.length && (
                <Text
                  style={[
                    styles.semiText,
                    {
                      marginTop: 8,
                      marginLeft: 110,
                    },
                  ]}>
                  {images[0].fileName?.substring(0, 15)}
                </Text>
              )}
              <TouchableOpacity onPress={selectImage} style={styles.fileButton}>
                <Text style={[styles.semiText, {fontSize: 10}]}>파일 선택</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.semiContainer}>
            <Text style={styles.titleText}>음식 상태</Text>
            <TouchableOpacity
              onPress={() => setFoodStatus('EXPIRATION')}
              style={styles.rowBox}>
              <IonIcon
                name={`${
                  foodStatus === 'EXPIRATION'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }`}
                size={13}
              />
              <Text style={styles.semiText}>유통기한 임박</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFoodStatus('WRONG_ORDER')}
              style={styles.rowBox}>
              <IonIcon
                name={`${
                  foodStatus === 'WRONG_ORDER'
                    ? 'radio-button-on'
                    : 'radio-button-off'
                }`}
                size={13}
              />
              <Text style={styles.semiText}>주문 착오</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFoodStatus('B')}
              style={styles.rowBox}>
              <IonIcon
                name={`${
                  foodStatus === 'B' ? 'radio-button-on' : 'radio-button-off'
                }`}
                size={13}
              />
              <Text style={styles.semiText}>b급 상품</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.semiContainer}>
            <Text style={styles.titleText}>흥정 여부</Text>
            <TouchableOpacity
              onPress={() => setBargain(true)}
              style={styles.rowBox}>
              <IonIcon
                name={`${bargain ? 'radio-button-on' : 'radio-button-off'}`}
                size={13}
              />
              <Text style={styles.semiText}>흥정 있음</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setBargain(false)}
              style={styles.rowBox}>
              <IonIcon
                name={`${bargain ? 'radio-button-off' : 'radio-button-on'}`}
                size={13}
              />
              <Text style={styles.semiText}>흥정 없음</Text>
            </TouchableOpacity>
          </View>
          {bargain && (
            <View style={styles.semiContainer}>
              <View style={styles.semiTextBox}>
                <Text style={styles.semiText}>제한 시간</Text>
                <TextInput
                  onChangeText={text =>
                    handleTextInput('limitTime', text, true)
                  }
                  value={bargainValue.limitTime}
                  style={styles.textinput}
                />
              </View>
              <View style={styles.semiTextBox}>
                <Text style={styles.semiText}>가격 하한선</Text>
                <TextInput
                  onChangeText={text => handleTextInput('minPrice', text, true)}
                  value={bargainValue.minPrice}
                  style={styles.textinput}
                />
              </View>
            </View>
          )}
          <View style={styles.semiContainer}>
            <Text style={styles.titleText}>마감 정보</Text>
            <View style={styles.semiTextBox}>
              <Text style={styles.semiText}>판매 마감 시간</Text>
              <TextInput
                onChangeText={text => handleTextInput('endTime', text, false)}
                value={commonValue.endTime}
                style={styles.textinput}
              />
            </View>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity onPress={handleUploadMenu} style={styles.button}>
            <Text style={styles.buttonText}>작성</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const width = Dimensions.get('window').width;

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
  headerText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    color: 'black',
  },
  semiContainer: {
    padding: 20,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 13,
    marginBottom: 10,
  },
  semiTextBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  semiText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    paddingHorizontal: 3,
  },
  fileButton: {
    width: 90,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#94E048',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    width: '60%',
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  productBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#94E048',
    marginVertical: 3,
    paddingHorizontal: 30,
  },
  button: {
    position: 'relative',
    backgroundColor: '#94E048',
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

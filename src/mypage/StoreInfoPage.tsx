import React, {useState, useEffect} from 'react';
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
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleStartTimePicker = () => {
    setShowStartTimePicker(true);
  };

  const handleEndTimePicker = () => {
    setShowEndTimePicker(true);
  };

  const handleTimeChange = (_: any, selectedTime: Date | undefined) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      const hour = selectedTime.getHours().toString().padStart(2, '0');
      const minute = selectedTime.getMinutes().toString().padStart(2, '0');
      const selectedTimeStr = `${hour}:${minute}`;
      setDto(prevDto => ({...prevDto, startTime: selectedTimeStr}));
    }
  };
  const handleEndTimeChange = (_: any, selectedTime: Date | undefined) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      const hour = selectedTime.getHours().toString().padStart(2, '0');
      const minute = selectedTime.getMinutes().toString().padStart(2, '0');
      const selectedTimeStr = `${hour}:${minute}`;
      setDto(prevDto => ({...prevDto, endTime: selectedTimeStr}));
    }
  };

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  useEffect(() => {
    setDto(prevDto => ({...prevDto, holiday: selectedDays.join(',')}));
  }, [selectedDays]);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const handleDayPress = day => {
    setSelectedDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(d => d !== day);
      }
      return [...prevSelectedDays, day];
    });
  };

  const handleTextInput = (name: string, text: string) => {
    setDto({
      ...dto,
      [name]: text,
      holiday: selectedDays.join(','),
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

    const profileImages = {
      name: avatarImage[0].fileName,
      type: avatarImage[0].type,
      uri: avatarImage[0].uri,
    };

    const menuImages = {
      name: menuImage[0].fileName,
      type: menuImage[0].type,
      uri: menuImage[0].uri,
    };

    const res = await uploadStoreInfo({
      dto: infoDto,
      profileImages,
      menuImages,
    });
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
          <View style={styles.container2}>
            <TextInput
              onChangeText={text => handleTextInput('zipcode', text)}
              value={dto.zipcode}
              placeholder="우편번호"
              style={styles.textinput}
            />
          </View>
          <View style={styles.container2}>
            <TextInput
              onChangeText={text => handleTextInput('mainAddress', text)}
              value={dto.mainAddress}
              placeholder="주소"
              style={styles.textinput}
            />
          </View>
          <View style={styles.container2}>
            <TextInput
              onChangeText={text => handleTextInput('detailAddress', text)}
              value={dto.detailAddress}
              placeholder="상세주소"
              style={styles.textinput}
            />
          </View>

          <Text style={styles.semiTitle}>전화번호</Text>
          <View style={styles.container2}>
            <TextInput
              onChangeText={text => handleTextInput('phoneNumber', text)}
              value={dto.phoneNumber}
              placeholder="전화번호"
              style={styles.textinput}
            />
          </View>

          <Text style={styles.semiTitle}>영업정보</Text>

          <Text style={styles.semiTitle2}> 영업시간을 선택하세요</Text>
          <View style={styles.TimeRow}>
            <TouchableOpacity
              onPress={handleStartTimePicker}
              style={styles.timeButton}>
              <Text style={styles.timeButtonText}>
                {dto.startTime ? dto.startTime : '09:00'}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                mode="time"
                is24Hour
                display="spinner"
                onChange={handleTimeChange}
                value={new Date()}
              />
            )}
            <TouchableOpacity
              onPress={handleEndTimePicker}
              style={styles.timeButton}>
              <Text style={styles.timeButtonText}>
                {dto.endTime ? dto.endTime : '21:00'}
              </Text>
            </TouchableOpacity>
          </View>
          {showEndTimePicker && (
            <DateTimePicker
              mode="time"
              is24Hour
              display="spinner"
              onChange={handleEndTimeChange}
              value={new Date()}
            />
          )}

          <Text style={styles.semiTitle2}> 휴무일 선택하세요</Text>
          <View>
            <View style={styles.dayButtonsContainer}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dayButton,
                    selectedDays.includes(day) && styles.selectedDayButton,
                  ]}
                  onPress={() => handleDayPress(day)}>
                  <Text
                    style={[
                      styles.dayText,
                      selectedDays.includes(day) && styles.selectedDayText,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <Text>선택한 휴무일: {dto.holiday}</Text> */}
          </View>

          <Text style={styles.semiTitle}>가게소개</Text>
          <View style={styles.container2}>
            <TextInput
              onChangeText={text => handleTextInput('introduce', text)}
              value={dto.introduce}
              placeholder="가게소개"
              style={styles.textinput}
            />
          </View>

          <Text style={styles.semiTitle}>메뉴판</Text>
          <View style={styles.rowBox}>
            <TouchableOpacity
              onPress={() => selectImage(true)}
              style={styles.fileButton}>
              <Text style={styles.fileText}>파일 첨부</Text>
            </TouchableOpacity>
            {!!menuImage.length && (
              <Text style={styles.fileText2}>{menuImage[0].fileName}</Text>
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
  container2: {
    backgroundColor: 'white',
    padding: 6,
    marginBottom: 3,
  },
  textinput: {
    width: '100%',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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
    fontSize: 15,
    color: 'black',
    marginLeft: 2,
    marginTop: 30,
    marginBottom: 10,
  },
  semiTitle2: {
    marginBottom: 13,
    fontSize: 15,
    color: 'black',
  },
  fileButton: {
    width: 80,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
  },
  fileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 3,
  },
  fileText2: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 3,
    marginRight: 160,
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
  dayButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayButton: {
    flex: 1,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 100,
    marginRight: 5,
  },
  selectedDayButton: {
    backgroundColor: '#CCCCCC',
  },
  dayText: {
    fontSize: 16,
  },
  selectedDayText: {
    color: '#fff',
  },

  timeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    width: '50%',
    height: 50,
    marginBottom: 8,
  },
  timeButtonText: {
    fontSize: 16,
  },
  TimeRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

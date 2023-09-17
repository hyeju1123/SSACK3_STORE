import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {ChatStackParamList} from '../navigation/ChatStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LOCAL_IP} from '../ipConfig';
import customAxios from '../api/customAxios';

export type ChatScreenProps = NativeStackScreenProps<
  ChatStackParamList,
  'ChatScreen'
>;

export type ChatMessageProps = {
  content: string;
  createdDate: string;
  writerId: number;
};

export default function ChatScreen({route}: ChatScreenProps) {
  const {name, role, userId, roomId, counterpartId} = route.params;
  const ws = useRef<WebSocket | null>(null);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);

  const handleSendMessage = () => {
    const sendingData = {
      senderId: userId,
      roomId: roomId,
      receiverId: counterpartId,
      content: inputText,
    };
    const updateData = {
      content: inputText,
      createdDate: '',
      writerId: parseInt(userId, 10),
    };
    setMessages(m => [...m, updateData]);
    ws.current && ws.current.send(JSON.stringify(sendingData));
    setInputText('');
  };

  const convertTimeFormat = (dateString: string) => {
    if (dateString === '') {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();

      return `${year}년 ${month}월 ${day}일`;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const getMessages = () => {
    const url = `/api/chat/content/${roomId}`;
    customAxios()
      .then(res => res && res.get(url))
      .then(res => setMessages(res.data));
  };

  useEffect(() => {
    getMessages();

    ws.current = new WebSocket(`ws://${LOCAL_IP}:8080/ws/chat`, [], {
      headers: {userId: JSON.stringify(route.params.userId)},
    });
    ws.current.onopen = () => {
      console.log('connected');
    };

    ws.current.onmessage = e => {
      setMessages(m => [
        ...m,
        {
          content: e.data,
          createdDate: '',
          writerId: 5,
        },
      ]);
    };
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.pageContainer}>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>{name}</Text>
            <Text style={styles.pageTitle2}>{role}</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages &&
          messages.map(({content, writerId, createdDate}, index) => {
            const previousMessage = messages[index - 1];
            const currentDate = convertTimeFormat(createdDate);
            const previousDate = convertTimeFormat(
              previousMessage?.createdDate,
            );

            const shouldDisplayDate = currentDate !== previousDate;

            return (
              <View key={index}>
                {shouldDisplayDate && (
                  <Text style={styles.dateSeparator}>{currentDate}</Text>
                )}
                <View
                  style={[
                    styles.messageItem,
                    writerId === parseInt(userId, 10)
                      ? styles.myMessage
                      : styles.otherMessage,
                  ]}>
                  <Text style={styles.messageText}>{content}</Text>
                  <Text style={styles.messageTime}>{currentDate}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#FFFFFF"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <IonIcon name="paper-plane-outline" size={30} color="#231F20" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 10,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  pageTitle2: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageItem: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  messageTime: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#398908',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#94E048',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#94E048',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    color: 'white',
  },
  dateSeparator: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#808080',
    fontSize: 12,
  },
});

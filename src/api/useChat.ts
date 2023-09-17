import {ChatRoom} from '../model/chat';
import customAxios from './customAxios';

type ChatRoomProps = {
  roomId: number;
  userId1: number;
  userId2: number;
};

export const makeChatRoom = async (
  userId1: number,
  userId2: number,
): Promise<ChatRoomProps | undefined> => {
  const url = '/api/chat/room';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const {data} = await fetcher.post(url, {userId1, userId2});
  return data;
};

export const getChatRoomList = async (
  id: string,
): Promise<ChatRoom[] | undefined> => {
  const url = `/api/chat/room/list/${id}`;
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const {data} = await fetcher.get(url);
  return data;
};

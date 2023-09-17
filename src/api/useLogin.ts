import EventSource from 'react-native-sse';
import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';
import {LOCAL_IP} from '../ipConfig';

let es: EventSource | null = null;

export type LoginProps = {
  username: string;
  password: string;
};

export default async function login({
  username,
  password,
  handleModal,
}: LoginProps): Promise<AuthUser> {
  const {data} = await customAxios().then(
    res =>
      res &&
      res.post('/api/user/login', {
        username,
        password,
      }),
  );

  const parsedData = JwtDecoder(data.accessToken);

  const {data: imageURL} = await customAxios().then(
    res => res && res.get(`/api/customer/profile/show/${parsedData.userId}`),
  );

  if (!es) {
    es = new EventSource(
      `http://${LOCAL_IP}:8080/notifications/subscribe/${parsedData.userId}`,
    );

    console.log('es in login:: ', es);

    es.addEventListener('open', () => {
      console.log('Open SSE connection');
    });

    es.addEventListener('sse', event => {
      console.log('new message event: ', event.data);
      if (event.data.startsWith('EventStream')) {
        return;
      }
      handleModal(true, event.data);
    });

    es.addEventListener('error', event => {
      if (event.type === 'error') {
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    });

    es.addEventListener('close', () => {
      console.log('Close SSE connection.');
    });
  }

  return {...parsedData, imageURL};
}

export function logout() {
  es = null;
}

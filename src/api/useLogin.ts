import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';

export type LoginProps = {
  username: string;
  password: string;
};

export default async function login({
  username,
  password,
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

  return {...parsedData, imageURL};
}

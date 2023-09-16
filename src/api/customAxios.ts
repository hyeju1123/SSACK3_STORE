import axios from 'axios';
import {LOCAL_IP} from '../ipConfig';

export default async function customAxios() {
  const instance = axios.create({baseURL: `http://${LOCAL_IP}:8080`});
  return instance;
}

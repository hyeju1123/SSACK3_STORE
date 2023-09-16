import jwt_decode from 'jwt-decode';
import {AuthUser} from '../model/user';

export default function JwtDecoder(token: string): AuthUser {
  return jwt_decode(token);
}

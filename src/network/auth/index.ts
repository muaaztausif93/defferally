import { Login, Register } from '@/src/interfaces/request/user';
import { HttpService } from '../http';

export class AuthService extends HttpService {

  signIn = async (data: Login): Promise<any> => {
    try {
      const apiResponse = await this.post(`api/users/login`, data);

      return apiResponse;
    } catch (error) {
      throw error;
    }
  };

  signUp = async (data: Register): Promise<any> => {
    try {
      const apiResponse = await this.post(`api/users/register`, data);

      return apiResponse;
    } catch (error) {
      throw error;
    }
  };
}
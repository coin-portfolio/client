import { axiosInstance } from './instance';
import { signUpParmasObj } from '@/types/user';

export const idCheckApi = async (id: string) => {
  try {
    const res = await axiosInstance.post('/api/auth/checkid', id);
    return res;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const sendAuthCodeEmailApi = async (email: string) => {
  try {
    const res = await axiosInstance.post('/api/auth/email', email);
    return res;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const checkAuthCodeApi = async (params: any) => {
  try {
    const res = await axiosInstance.post('/api/auth/email/result', params);
    return res;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const signUpApi = async (params: signUpParmasObj) => {
  try {
    const res = await axiosInstance.post('/api/auth/signUp', params);
    return res;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

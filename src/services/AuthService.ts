import type { ISignIn, ISignUp } from "../interfaces/user.interfaces";
import { api } from "../lib/axios";

export interface IGoogleToken {
  idToken: string;
}

export const signIn = async (data: ISignIn) => {

  try {

    const response = await api.post('/auth/login', data);
    const token = response.data.accessToken;
    const userId = response.data.userId;


    if (!token || !userId) {
      throw new Error('Authentication failed: Missing token or user ID');
    }

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    window.dispatchEvent(
      new CustomEvent('userLoggedIn', { detail: { userId } })
    );

    return response;

  } catch (error: any) {
    return error.response;
  }
};

export const signUp = async (data: ISignUp) => {
  try {
    return await api.post('/user-config/create', data);
  } catch (error: any) {
    return error.response;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  delete api.defaults.headers.common['Authorization'];
  location.reload();
};



export const signInWithGoogle = async (googleToken: IGoogleToken) => {
  try {
    const response = await api.post('/auth/google', googleToken);
    const { accessToken, userId } = response.data;

    if (!accessToken || !userId) {
      throw new Error('Authentication failed: Missing token or user ID');
    }

    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', String(userId));
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    window.dispatchEvent(
      new CustomEvent('userLoggedIn', { detail: { userId } })
    );

    return response;
  } catch (error: any) {
    return error.response;
  }
};
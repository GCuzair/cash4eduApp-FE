// utils/FireApi.js
import Toast from 'react-native-toast-message';
import { Storage } from './Storage';

export const baseURL = "http://192.168.18.11:5000/v1/";

export async function FireApi<TResponse, TBody = unknown>(
  endpoint: string,
  method: string,
  options: FireApiOptions = {},
  data?: TBody,
  skipToken: boolean = false

): Promise<TResponse | null> {
  try {    
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };
    
    if (!skipToken) {
      const token = await Storage.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    console.log('API Request:', method, endpoint, data);
    const response = await fetch(`${baseURL}${endpoint}`, {
      method,
      ...options,
      headers: headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    const result = await response.json();
    console.log(' Response JSON:', result);

    if (!response.ok) {
      console.log('Response not OK:', response.status, response.statusText);
      Toast.show({
        type: 'error',
        text1: `Error ${response.status}`,
        text2: result.error || result.message || "Request failed",
      });
      return null;
    };
    if (result.status === false) {
      console.log('API returned status: false');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: result.error || "Something went wrong while processing the request.",
      });
      return null;
    }

    return result as TResponse;
  } catch (error) {
    console.error('Fetch error:', error);
    if (error instanceof Error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.message,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: "Unknown error occurred",
      });
    }
    return null;
  }
}
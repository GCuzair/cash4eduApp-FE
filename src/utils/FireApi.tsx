// utils/FireApi.js
import Toast from 'react-native-toast-message';
import { Storage } from './Storage';

export const baseURL = "https://cashapp.devocra.com/v1/";

export async function FireApi(
  endpoint,
  method,
  options = {},
  data,
  skipToken = false
) {
  try {
    // Check if data is FormData
    const isFormData = data instanceof FormData;
    
    // Prepare headers
    let headers = {};
    
    // Only set Content-Type if not FormData
    if (!isFormData && data) {
      headers["Content-Type"] = "application/json";
    }
    
    // Add custom headers from options
    if (options.headers) {
      headers = { ...headers, ...options.headers };
    }
    
    // Add Authorization token
    if (!skipToken) {
      const token = await Storage.getToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }
    
    console.log(`API Request: ${method} ${endpoint}`);
    console.log('Data:', data);
    console.log('Headers:', headers);
    
    const response = await fetch(`${baseURL}${endpoint}`, {
      method,
      headers,
      body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
    });
    
    const result = await response.json();
    console.log(` Response (${response.status}):`, result);

    if (!response.ok) {
      console.log(' Response not OK:', response.status);
      Toast.show({
        type: 'error',
        text1: `Error ${response.status}`,
        text2: result.error || result.message || "Request failed",
      });
      return null;
    }
    if(result)
    return result;
    
  } catch (error) {
    console.error(' Fetch error:', error);
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: error.message || "Failed to connect to server",
    });
    return null;
  }
}
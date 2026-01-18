import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'LOGIN_TOKEN';
const USER_KEY = 'USER';
const USER_WALLET_KEY = 'USER_WALLET';

export const setToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const setUser = async (user) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const setUserWallet = async (wallet) => {
  await AsyncStorage.setItem(USER_WALLET_KEY, JSON.stringify(wallet));
};

export const getToken = async () => {
  return AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
  await AsyncStorage.removeItem(USER_WALLET_KEY);
};

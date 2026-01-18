import React, { createContext, useReducer, useEffect } from 'react';
import { setToken, getToken, removeToken } from '../services/token.service';
import { login as loginApi } from '../api/public/auth.api';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'STOP_LOADING':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      const token = await getToken();
      if (token) dispatch({ type: 'LOGIN' });
      dispatch({ type: 'STOP_LOADING' });
    };
    init();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginApi(credentials);
    await setToken(data.token);
    dispatch({ type: 'LOGIN' });
  };

  const logout = async () => {
    await removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../redux/slices/userSlice';
import { useAuthStore } from '../stores';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const RootNavigator = () => {
  // const user = useAuthStore(state => state.user);
  const user = useSelector(selectEmail);
  return <>{user ? <HomeStack /> : <AuthStack />}</>;
};

export default RootNavigator;

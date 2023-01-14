import React from 'react';
import { useAuthStore } from '../stores';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const RootNavigator = () => {
  const user = useAuthStore(state => state.user);
  return <>{user ? <HomeStack /> : <AuthStack />}</>;
};

export default RootNavigator;

import React from 'react';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const isSignedIn = false;
const RootNavigator = () => {
  return <>{isSignedIn ? <HomeStack /> : <AuthStack />}</>;
};

export default RootNavigator;

import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Container, TabBarContainer} from './TabBar.style';
import {useWindowDimensions} from 'react-native';
import {Tab} from '../Tab';
export function TabBar({navigators, descriptors, state}: BottomTabBarProps) {
  const {width} = useWindowDimensions();

  function handlePress() {
    console.log('handlePress()');
  }

  return (
    <Container>
      <TabBarContainer width={width}>
        <Tab label="Home" onPress={handlePress} />
        <Tab label="Profile" onPress={handlePress} />
      </TabBarContainer>
    </Container>
  );
}

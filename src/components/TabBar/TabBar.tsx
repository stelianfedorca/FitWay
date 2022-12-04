import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Container, TabBarContainer} from './TabBar.style';
import {useWindowDimensions} from 'react-native';
import {Tab} from '../Tab';
import {Icons} from '../../assets';
export function TabBar({navigators, descriptors, state}: BottomTabBarProps) {
  const {width} = useWindowDimensions();

  function handlePress() {
    console.log('handlePress()');
  }

  return (
    <Container>
      <TabBarContainer width={width}>
        <Tab label="Home" onPress={handlePress} icon={Icons.Home} />
        <Tab label="Profile" onPress={handlePress} icon={Icons.Home} />
      </TabBarContainer>
    </Container>
  );
}

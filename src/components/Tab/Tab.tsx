import React from 'react';
import {Pressable, TabInnerContainer, TabLabel} from './Tab.style';
import {TabProps} from './Tab.types';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Tab({onPress, label, icon: Icon}: TabProps) {
  return (
    <Pressable onPress={onPress}>
      <TabInnerContainer>
        <MIcon name="rocket" size={24} color="red" />
        <TabLabel>{label}</TabLabel>
      </TabInnerContainer>
    </Pressable>
  );
}

import { ColorValue, Pressable, TextProps, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import CircularProgress from 'react-native-circular-progress-indicator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  DetailsContainer,
  HeaderContainer,
  InfoContainer,
  ProgressContainer,
  ProgressTitle,
  ProgressValue,
  styles,
  SubTitleHeader,
  TitleHeader,
} from './Item.style';
import React, { ReactNode } from 'react';
import { ItemDetails } from '../ItemDetails';
import { useProfileStore } from '../../stores';

interface IconTypeProps {
  name?: string;
  size?: number;
  color?: string;
}

export type ItemProps = {
  horizontal?: boolean;
  title: string;
  icon: string;
  progressTitle: string;
  progressValue: number;
  max?: number;
  food?: number;
};
// icon: React.ComponentProps<typeof Ionicons>['name'];

export function Item({
  horizontal,
  title,
  icon,
  progressTitle,
  progressValue,
  max,
  food,
}: ItemProps) {
  const profile = useProfileStore(state => state.profile);

  function progressValueFormater(value: number) {
    'worklet';
    return Math.round(2170 - value);
  }

  return (
    <>
      {horizontal ? (
        <Pressable
          style={[
            styles.container,
            { width: '100%', height: 140, justifyContent: 'space-evenly' },
          ]}>
          <HeaderContainer>
            <TitleHeader>{title}</TitleHeader>
            <Ionicons name={icon} size={24} color="#465cc9" />
          </HeaderContainer>
          <ProgressContainer>
            <ProgressValue>{progressValue}</ProgressValue>
            <ProgressTitle>{progressTitle}</ProgressTitle>
          </ProgressContainer>
        </Pressable>
      ) : (
        <Pressable
          style={[styles.container, styles.shadowProp]}
          onPress={() => console.log('press')}>
          <HeaderContainer>
            <View>
              <TitleHeader>{title}</TitleHeader>
              <SubTitleHeader>
                Remaining = Goal - Food + Exercise
              </SubTitleHeader>
            </View>

            <Ionicons name={icon} size={24} color="#465cc9" />
          </HeaderContainer>
          <InfoContainer>
            <CircularProgress
              value={progressValue}
              progressValueFontSize={24}
              radius={65}
              duration={500}
              progressValueColor="black"
              maxValue={max ?? 2000}
              inActiveStrokeColor="#EDF1F9"
              activeStrokeColor="#465cc9"
              title={progressTitle}
              titleFontSize={16}
              titleColor="#c3c4c7"
              subtitleColor="white"
              progressValueStyle={{
                backgroundColor: 'white',
                color: 'white',
                fontSize: 22,
                fontWeight: '500',
              }}
              // progressFormatter={progressValueFormater}
              clockwise={false}
            />
            <DetailsContainer>
              <ItemDetails
                title="Base Goal"
                value={max ?? 0}
                icon="flag"
                iconColor="grey"
              />
              <ItemDetails
                title="Food"
                value={food ?? 0}
                icon="fastfood"
                iconColor="#465cc9"
              />
              <ItemDetails
                title="Exercise"
                value={profile?.exercise ?? 0}
                icon="local-fire-department"
                iconColor="orange"
              />
            </DetailsContainer>
          </InfoContainer>
        </Pressable>
      )}
    </>
  );
}

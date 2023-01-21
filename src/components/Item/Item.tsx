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

interface IconTypeProps {
  name?: string;
  size?: number;
  color?: string;
}

type IconType = (props: IconTypeProps) => JSX.Element;

export type ItemProps = {
  horizontal?: boolean;
  title: string;
  icon: string;
  progressTitle: string;
  progressValue: number;
};
// icon: React.ComponentProps<typeof Ionicons>['name'];

export function Item({
  horizontal,
  title,
  icon,
  progressTitle,
  progressValue,
}: ItemProps) {
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
              radius={65}
              duration={500}
              progressValueColor="black"
              maxValue={2000}
              activeStrokeWidth={12}
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
            />
            <DetailsContainer>
              <ItemDetails
                title="Base Goal"
                value={2000}
                icon="flag"
                iconColor="grey"
              />
              <ItemDetails
                title="Food"
                value={1348}
                icon="fastfood"
                iconColor="#465cc9"
              />
              <ItemDetails
                title="Exercise"
                value={0}
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

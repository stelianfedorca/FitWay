import { ColorValue, Pressable, TextProps, View } from 'react-native';
import { Text } from 'react-native-paper';

import CircularProgress from 'react-native-circular-progress-indicator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  HeaderContainer,
  ProgressContainer,
  ProgressTitle,
  ProgressValue,
  styles,
  TitleHeader,
} from './Item.style';
import React, { ReactNode } from 'react';

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
          style={styles.container}
          onPress={() => console.log('press')}>
          <HeaderContainer>
            <TitleHeader>{title}</TitleHeader>

            {/* {React.createElement(icon)} */}
            <Ionicons name={icon} size={24} color="#465cc9" />
          </HeaderContainer>
          <CircularProgress
            value={progressValue}
            radius={60}
            duration={600}
            progressValueColor="black"
            maxValue={2000}
            activeStrokeWidth={14}
            inActiveStrokeColor="#EDF1F9"
            activeStrokeColor="#465cc9"
            title={progressTitle}
            titleColor="#c3c4c7"
            // progressValueFontSize={28}
            subtitleColor="white"
            progressValueStyle={{
              backgroundColor: 'white',
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
            }}
          />
        </Pressable>
      )}
    </>
  );
}

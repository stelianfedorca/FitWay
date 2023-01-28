import { ReactNode } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import {
  HeaderContainer,
  ProgressContainer,
  styles,
  Title,
} from './ItemStatistics.style';

export type ItemStatisticsProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export function ItemStatistics({
  title,
  style,
  children,
}: ItemStatisticsProps) {
  return (
    <Pressable style={[styles.container, styles.shadow, style]}>
      <HeaderContainer>
        <Title>{title}</Title>
      </HeaderContainer>
      <ProgressContainer>{children}</ProgressContainer>
    </Pressable>
  );
}

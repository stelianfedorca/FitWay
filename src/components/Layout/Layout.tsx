/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type LayoutProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  paddingTop?: boolean;
  paddingBottom?: boolean;
};
export function Layout({
  children,
  style,
  paddingTop,
  paddingBottom,
}: LayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: paddingTop ? insets.top : 0,
          paddingBottom: paddingBottom ? insets.bottom : 0,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

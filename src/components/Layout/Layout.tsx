/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ReactNode} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type LayoutProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  paddingTop?: boolean;
};
export function Layout({children, style, paddingTop}: LayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          flex: 1,
          paddingTop: paddingTop ? insets.top : 0,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

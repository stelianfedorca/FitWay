import { useState } from 'react';

import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  Easing,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { RulerPicker } from 'react-native-ruler-picker';
import { Label } from '../Label/Label';
import { Option } from '../Option';

export type InputDropdownType = {
  title?: string;
  defaultValue?: string | number;
  value: number;
  unit?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  childStyle?: StyleProp<ViewStyle>;
  unitLabel?: StyleProp<ViewStyle>;
};
export function InputDropdown({
  title,
  defaultValue,
  children,
  unit,
  style,
  labelStyle,
  childStyle,
  unitLabel,
  value = 0,
}: InputDropdownType) {
  const height = useSharedValue(0);

  const expandedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 444,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }),
    };
  });

  function handlePress() {
    if (height.value === 0) {
      height.value = 75;
    } else {
      height.value = 0;
    }
  }
  return (
    <>
      <TouchableOpacity
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            paddingHorizontal: 15,
          },
          style,
        ]}
        onPress={handlePress}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
          {title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Label
            value={value}
            defaultValue={defaultValue}
            style={[
              {
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0,
              },
              labelStyle,
            ]}
          />

          {unit && (
            <Label
              value={unit!}
              defaultValue={defaultValue}
              valueColor="black"
              style={[
                {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: '#f0f0f0',
                },
                unitLabel,
              ]}
            />
          )}

          {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>{unit}</Text> */}
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[styles.expandedItem, expandedAnimation, childStyle]}>
        {children}
      </Animated.View>
    </>
  );
}

export const styles = StyleSheet.create({
  expandedItem: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});

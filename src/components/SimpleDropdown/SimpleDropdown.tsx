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
  value: number | string;
  secondLabel?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<ViewStyle>;
  childStyle?: StyleProp<ViewStyle>;
  unitLabel?: StyleProp<ViewStyle>;
  timeframeOption: number;
  onOptionPress: (option: number) => void;
};
export function SimpleDropdown({
  title,
  defaultValue,
  children,
  secondLabel,
  style,
  labelStyle,
  childStyle,
  timeframeOption,
  onOptionPress,
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
          <Option
            title="Day"
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
              borderBottomWidth: 0.3,
            }}
            isSelected={timeframeOption === 0 ? true : false}
            onPress={() => onOptionPress(0)}
          />
          <Option
            title="Week"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              alignItems: 'center',
              marginBottom: 0,
              borderBottomWidth: 0.3,
            }}
            isSelected={timeframeOption === 1 ? true : false}
            onPress={() => onOptionPress(1)}
          />
          {/* <Label
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

          {secondLabel && (
            <Label
              value={secondLabel!}
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
          )} */}

          {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>{unit}</Text> */}
        </View>
      </TouchableOpacity>
    </>
  );
}

export const styles = StyleSheet.create({
  expandedItem: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});

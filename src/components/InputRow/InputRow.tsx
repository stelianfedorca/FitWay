import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  Pressable,
  View,
  GestureResponderEvent,
  StyleSheet,
  Text,
} from 'react-native';

import { InputRowProps } from './InputRow.types';

import { Option } from '../Option';
import { ExpandedItem } from './InputRow.style';
import { useProfileStore } from '../../stores';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Label } from '../Label/Label';

// const activityLevelData = [
//   {
//     id: 1,
//     title: 'Sedentary',
//     subtitle: 'You spend most of your day sitting',
//   },
//   {
//     id: 2,
//     title: 'Lightly Active',
//     subtitle: 'You will spend a large part of your day on your feet',
//   },
//   {
//     id: 3,
//     title: 'Moderately Active',
//     subtitle: 'You do cardio 3 to 5 days a week',
//   },
//   {
//     id: 4,
//     title: 'Very Active',
//     subtitle: 'You do intentional exercise every day',
//   },
// ];
export const InputRow = forwardRef<TextInput, InputRowProps>(
  (
    {
      value,
      title,
      dropdown = false,
      children,
      optionIndex,
      data,
      onChangeText,
      setOptionIndex,
    },
    forwardRef,
  ) => {
    const height = useSharedValue(0);

    function handleRowPress() {
      height.value =
        height.value === 0 ? (height.value = 200) : (height.value = 0);
    }

    const expandedAnimation = useAnimatedStyle(() => {
      return {
        height: withTiming(height.value, {
          duration: 444,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        }),
      };
    });

    return (
      <>
        <Pressable
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            paddingHorizontal: 15,
          }}
          onPress={handleRowPress}>
          <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>
            {title}
          </Text>
          <Label
            value={data![optionIndex!].title}
            style={{
              width: 200,
              padding: 5,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />

          {/* <Text style={{ fontSize: 18, fontWeight: '400' }}>
            {data![optionIndex!].title}
          </Text> */}
        </Pressable>
        {dropdown && (
          <Animated.View style={[styles.expandedItem, expandedAnimation]}>
            {data!.map((activity, index) => (
              <Option
                title={activity.title}
                subtitle={activity.subtitle}
                key={activity.id}
                onPress={() => setOptionIndex?.(index)}
                isSelected={optionIndex === index}
              />
            ))}
          </Animated.View>
        )}
      </>
    );
  },
);

export const styles = StyleSheet.create({
  expandedItem: {
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});

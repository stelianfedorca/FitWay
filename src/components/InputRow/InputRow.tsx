import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  Pressable,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Text } from 'react-native-paper';
import { InputRowProps } from './InputRow.types';

import { Option } from '../Option';
import { ExpandedItem } from './InputRow.style';
import { useProfileStore } from '../../stores';

const activityLevelData = [
  {
    id: 1,
    title: 'Sedentary',
    subtitle: 'You spend most of your day sitting',
  },
  {
    id: 2,
    title: 'Lightly Active',
    subtitle: 'You will spend a large part of your day on your feet',
  },
  {
    id: 3,
    title: 'Moderately Active',
    subtitle: 'You do cardio 3 to 5 days a week',
  },
  {
    id: 4,
    title: 'Very Active',
    subtitle: 'You do intentional exercise every day',
  },
];
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
    const [isExpanded, setIsExpanded] = useState(false);

    function handleRowPress() {
      setIsExpanded(!isExpanded);
    }

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
          <Text variant="titleLarge" style={{ color: '#668ecf' }}>
            {title}
          </Text>
          {!dropdown ? (
            <TextInput
              style={{
                borderRadius: 10,
                height: 50,
                width: '45%',
                padding: 10,
                fontSize: 18,
                borderWidth: 1,
              }}
              keyboardType="numeric"
              onChangeText={onChangeText}
              value={value}
            />
          ) : (
            <>
              <Text style={{ fontSize: 18, fontWeight: '400' }}>
                {activityLevelData[optionIndex!].title}
              </Text>
            </>
          )}
        </Pressable>
        {dropdown && isExpanded && (
          <ExpandedItem>
            {activityLevelData.map((activity, index) => (
              <Option
                title={activity.title}
                subtitle={activity.subtitle}
                key={activity.id}
                onPress={() => setOptionIndex?.(index)}
                isSelected={optionIndex === index}
              />
            ))}
          </ExpandedItem>
        )}
      </>
    );
  },
);

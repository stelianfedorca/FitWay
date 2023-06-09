import { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type AccordionItemProps = {
  item: { label: string; value: string };
};
export function AccordionItem({ item }: AccordionItemProps) {
  return (
    <TouchableOpacity
      style={{
        height: 40,
        borderWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 150,
        borderRadius: 5,
        padding: 5,
      }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );
}

export type AccordionProps = {
  defaultValue?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};
export function Accordion({ children }: AccordionProps) {
  const [items, setItems] = useState([
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
  ]);

  const height = useSharedValue(0);

  function handlePress() {
    if (height.value === 0) {
      height.value = 75;
    } else {
      height.value = 0;
    }
  }

  const expandedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 444,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }),
    };
  });

  const defaultValue = items[0].label;

  return (
    <View>
      <TouchableOpacity
        style={{
          height: 40,
          borderWidth: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 150,
          borderRadius: 5,
          padding: 5,
        }}
        onPress={handlePress}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{defaultValue}</Text>
        <MaterialIcons name="keyboard-arrow-right" size={30} />
      </TouchableOpacity>
      <Animated.View style={[styles.expandedItem, expandedAnimation]}>
        {children}
      </Animated.View>
    </View>
  );
}

export const styles = StyleSheet.create({
  expandedItem: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
});

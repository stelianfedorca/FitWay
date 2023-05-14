import { ReactNode } from 'react';
import {
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';

type OptionGroupProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
};

export function OptionGroup({ children, style, onPress }: OptionGroupProps) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      {children}
    </View>
  );
}

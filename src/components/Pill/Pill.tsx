import { format } from 'date-fns';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export type PillProps<T> = {
  data?: T;
  title?: string;
  subtitle?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
export function Pill<T>({
  data,
  title,
  subtitle,
  active,
  style,
  onPress,
}: PillProps<T>) {
  return (
    <TouchableOpacity
      style={[active ? styles.activeContainer : styles.container, , style]}
      onPress={onPress}>
      <Text
        style={{
          fontSize: 18,
          color: active ? 'white' : 'black',
          fontWeight: '500',
        }}>
        {title}
      </Text>
      <Text style={{ fontSize: 16, color: active ? '#c7c7c7' : '#9f9f9f' }}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 20,
  },
  activeContainer: {
    backgroundColor: '#212121',
    borderRadius: 20,
    paddingVertical: 15,
    width: 50,
    height: 85,
    justifyContent: 'space-between',
    alignItems: 'center',
    // shadowColor: 'black',
    // shadowRadius: 1,
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
  },
});

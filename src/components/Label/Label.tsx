import {
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

export type LabelProps = {
  value: string | number;
  defaultValue?: string | number;
  valueColor?: string;
  style?: StyleProp<ViewStyle>;
};
export function Label({ value, defaultValue, valueColor, style }: LabelProps) {
  return (
    <Pressable style={[styles.container, style]}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: valueColor ?? 'white',
        }}>
        {value}
      </Text>
      {/* <Text style={{ fontSize: 12, fontWeight: '400' }}>{subtitle}</Text> */}
    </Pressable>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#457ad7',
    padding: 5,
    width: 60,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

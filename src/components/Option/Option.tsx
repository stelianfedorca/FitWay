import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

export type OptionProps = {
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};
export function Option({
  title,
  subtitle,
  style,
  isSelected,
  disabled,
  onPress,
}: OptionProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.container,
        { backgroundColor: isSelected ? '#457ad7' : '#eef4fe' },
        style,
      ]}
      onPress={onPress}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: isSelected ? 'white' : 'black',
        }}>
        {title}
      </Text>
      {/* <Text style={{ fontSize: 12, fontWeight: '400' }}>{subtitle}</Text> */}
    </TouchableOpacity>
  );
}

//'#457ad7' : '#eef4fe',

export const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
  },
});

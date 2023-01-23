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
  subtitle: string;
  style?: StyleProp<ViewStyle>;
  isSelected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};
export function Option({
  title,
  subtitle,
  style,
  isSelected,
  onPress,
}: OptionProps) {
  return (
    <Pressable
      style={[
        styles.container,
        style,
        { backgroundColor: isSelected ? '#457ad7' : '#eef4fe' },
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
    </Pressable>
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
    borderRadius: 15,
    marginBottom: 10,
  },
});

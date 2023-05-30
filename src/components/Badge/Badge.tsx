import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './Badge.style';

type BadgeProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};
export function Badge({ color, style, children }: BadgeProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: color }, style]} />
      <View style={{ justifyContent: 'space-evenly' }}>{children}</View>
    </View>
  );
}

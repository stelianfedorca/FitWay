import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';

type PrimaryButtonProps = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};
export function PrimaryButton({
  title,
  style,
  icon,
  children,
  onPress,
}: PrimaryButtonProps) {
  const Icon = icon;
  return (
    <TouchableOpacity
      style={[
        {
          width: '100%',
          backgroundColor: '#457ad7',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
          flexDirection: 'row',
        },
        style,
      ]}
      onPress={onPress}>
      <>
        {children}
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
            color: 'white',
          }}>
          {title}
        </Text>
        <View style={{ position: 'absolute', right: 20 }}>{icon}</View>
      </>
    </TouchableOpacity>
  );
}

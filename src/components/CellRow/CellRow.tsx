import { Pressable, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type CellRowProps = {
  onPress?: () => void;
};
export function CellRow({ onPress }: CellRowProps) {
  return (
    <Pressable
      style={{
        // backgroundColor: '#ebe5e5',
        justifyContent: 'center',
        height: 70,
        padding: 15,
        borderBottomWidth: 1,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialIcons
          name="logout"
          size={24}
          style={{ marginRight: 16 }}
          color="red"
        />
        <Text variant="titleMedium" style={{ fontWeight: '600' }}>
          Log Out
        </Text>
      </View>
    </Pressable>
  );
}

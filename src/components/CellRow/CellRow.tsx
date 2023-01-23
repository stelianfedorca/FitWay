import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './CellRow.style';

type CellRowProps = {
  title: string;
  hasInput?: boolean;
  onPress?: () => void;
};
export function CellRow({ title, hasInput, onPress }: CellRowProps) {
  const [age, setAge] = useState(0);
  return (
    <Pressable
      style={{
        // backgroundColor: '#ebe5e5',
        justifyContent: 'center',
        height: 70,
        padding: 15,
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <MaterialIcons
          name="logout"
          size={24}
          style={{ marginRight: 16 }}
          color="red"
        />
        <Text style={{ fontSize: 18, fontWeight: '500', flex: 1 }}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

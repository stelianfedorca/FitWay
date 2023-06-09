import { ReactSVG, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon, IconProps } from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './CellRow.style';

type CellRowProps = {
  title: string;
  hasInput?: boolean;
  icon?: Partial<Icon>;
  onPress?: () => void;
};
export function CellRow({ title, hasInput, icon, onPress }: CellRowProps) {
  const [age, setAge] = useState(0);
  const Icon = icon;
  return (
    <TouchableOpacity
      style={{
        // backgroundColor: '#ebe5e5',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        height: 70,
        padding: 15,
        paddingRight: 20,
        borderBottomWidth: 0.3,
        borderBottomColor: 'grey',
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <>
          {Icon}
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              marginLeft: 15,
            }}>
            {title}
          </Text>
        </>
      </View>
      <TouchableOpacity style={{}}>
        <MaterialIcons name="arrow-forward-ios" size={20} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

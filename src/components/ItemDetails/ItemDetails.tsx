import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native-paper';

export type ItemDetailsProps = {
  title: string;
  value: number;
  icon?: string;
  iconColor?: string;
};
export function ItemDetails({
  title,
  value,
  icon,
  iconColor,
}: ItemDetailsProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <MaterialIcons
        name={icon ?? 'bookmark-outline'}
        size={26}
        color={iconColor}
      />
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 14, fontWeight: '300', marginBottom: 2 }}>
          {title}
        </Text>
        <Text style={{ fontWeight: '700' }}>{value}</Text>
      </View>
    </View>
  );
}

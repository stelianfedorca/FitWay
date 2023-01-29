import { useState } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useSearchStore } from '../../stores';

export type SearchBarProps = {
  style?: StyleProp<ViewStyle>;
};
export function SearchBar({ style }: SearchBarProps) {
  const { search, setSearch } = useSearchStore();

  function handleOnChangeText(query: string) {
    setSearch(query.length === 0 ? undefined : query);
  }

  return (
    <View style={style}>
      <Searchbar
        value={search ?? ''}
        onChangeText={handleOnChangeText}
        placeholder="Search for a food"
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
        }}
        inputStyle={{ fontSize: 16 }}
        placeholderTextColor="grey"
      />
    </View>
  );
}

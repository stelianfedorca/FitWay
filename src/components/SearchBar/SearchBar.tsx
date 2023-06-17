import { useState } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setSearch } from '../../redux/slices/searchSlice';
import { useSearchStore } from '../../stores';

export type SearchBarProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};
export function SearchBar({ style, onPress }: SearchBarProps) {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  function handleOnChangeText(query: string) {
    dispatch(setSearch(query));
  }

  function handleClearPress() {
    dispatch(setSearch(''));
  }

  return (
    <View style={style}>
      <Searchbar
        value={search ?? ''}
        onChangeText={handleOnChangeText}
        placeholder="Search for a food"
        style={{
          backgroundColor: '#EDF1F9',
          borderRadius: 10,
        }}
        inputStyle={{ fontSize: 16, color: 'black' }}
        placeholderTextColor="grey"
        onIconPress={onPress}
        iconColor="#4659b8"
        onClearIconPress={handleClearPress}
      />
    </View>
  );
}

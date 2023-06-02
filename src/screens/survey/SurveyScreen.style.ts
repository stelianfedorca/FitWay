import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(ScrollView)`
  flex: 1;
  /* padding-bottom: 150px; */
`;

export const RowContainer = styled(Pressable)`
  height: 60px;
  border-bottom-width: 0.6px;
`;

export const PrimaryButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 30px;
  background-color: #457ad7;
`;

export const TitleButton = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

export const ButtonContainer = styled(View)`
  padding-horizontal: 20px;
  margin-top: 50px;
`;

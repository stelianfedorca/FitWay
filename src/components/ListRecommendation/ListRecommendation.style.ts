import { SafeAreaView, StyleSheet, Pressable, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  /* flex-grow: 1; */
`;

export const ItemContainer = styled(Pressable)`
  background-color: #f8f8f8;
  height: 200px;
  justify-content: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

export const DetailsContainer = styled(View)`
  flex-direction: row;
`;

export const styles = StyleSheet.create({});

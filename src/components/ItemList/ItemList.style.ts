import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(TouchableOpacity)`
  height: 60px;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
`;

export const DetailsContainer = styled(View)`
  flex-direction: row;
`;

export const styles = StyleSheet.create({});

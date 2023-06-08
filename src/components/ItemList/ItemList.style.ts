import { StyleSheet, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(TouchableOpacity)`
  background-color: #f8f8f8;
  /* height: 70px; */
  justify-content: center;
  padding-vertical: 10px;
  /* margin-bottom: 10px; */
  border-radius: 10px;
`;

export const DetailsContainer = styled(View)`
  /* flex-direction: row; */
  padding-left: 15px;
  padding-right: 15px;
`;

export const styles = StyleSheet.create({});

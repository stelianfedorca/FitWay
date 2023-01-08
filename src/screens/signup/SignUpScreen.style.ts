import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
  padding-horizontal: 20px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(Text)``;

export const NextButton = styled(TouchableOpacity)`
  background-color: aquamarine;
  padding: 15px;
  border-radius: 10px;
`;

export const TextButton = styled(Text)`
  font-size: 16px;
  color: white;
`;

export const styles = StyleSheet.create({});

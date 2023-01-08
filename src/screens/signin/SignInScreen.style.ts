import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
  padding-horizontal: 20px;
  justify-content: center;
  border-width: 4px;
  border-color: red;
`;

export const Title = styled(Text)``;

export const BackButton = styled(TouchableOpacity)`
  background-color: azure;
  padding: 10px;
  border-radius: 15px;
`;

export const TextButton = styled(Text)<{color?: string}>`
  color: ${({color}) => color};
  font-size: 16px;
`;

export const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-radius: 15px;
  width: 100%;
  height: 50px;
  margin-top: 30px;
  padding: 10px;
`;

export const SignInButton = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: green;
  border-radius: 15px;
  border-color: green;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

export const styles = StyleSheet.create({});

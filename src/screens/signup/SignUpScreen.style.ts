import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
  padding-horizontal: 20px;
  justify-content: center;
`;

export const SignInContainer = styled(View)`
  flex-direction: row;
  margin-top: 20px;
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  padding-horizontal: 5px;
  padding-vertical: 5px;

  border-bottom-width: 1.5px;
  border-radius: 10px;
  border-color: #0d679c;
`;

export const SignUpButton = styled(TouchableOpacity)`
  align-self: center;
  margin-top: 50px;
  height: 55px;
  /* padding: 15px; */
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #0d679c;
`;

export const TitleButton = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const TextError = styled(Text)`
  color: red;
`;
export const SubTitle = styled(Text)`
  font-size: 16px;
`;

export const Link = styled(TouchableOpacity)``;

export const TextLink = styled(Text)`
  font-size: 16px;
  /* font-weight: bold; */
  text-decoration: underline;
  /* text-decoration: solid; */
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

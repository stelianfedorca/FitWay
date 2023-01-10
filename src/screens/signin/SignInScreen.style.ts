import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Layout = styled(View)`
  flex: 1;
`;
// export const Container = styled(SafeAreaView)`
//   flex: 1;
//   background-color: white;
//   /* padding-horizontal: 20px; */
//   justify-content: center;
// `;

export const TitleContainer = styled(View)<{ margin?: number }>`
  margin-bottom: ${({ margin }) => (margin ? margin : 0)}px;
`;
export const SubTitleContainer = styled(View)<{ margin?: number }>`
  flex-direction: row;
  margin-top: 4px;
  padding-bottom: ${({ margin }) => (margin ? margin : 0)}px;
`;
export const Title = styled(Text)<{
  size?: number;
  color?: string;
  fontWeight?: string;
}>`
  font-size: ${({ size }) => (size ? size : 14)}px;
  color: ${({ color }) => color};
  font-weight: bold;
`;

export const TextError = styled(Text)`
  color: red;
`;
export const TitleButton = styled(Text)`
  color: white;
  font-size: 18px;
`;
export const SubTitle = styled(Text)``;

export const BackButton = styled(Text)`
  background-color: azure;
  padding: 10px;
  border-radius: 15px;
`;

export const TextButton = styled(TouchableOpacity)<{ color?: string }>`
  color: ${({ color }) => color};
  font-size: 16px;
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  padding-horizontal: 5px;
  padding-vertical: 5px;
  border-bottom-width: 1.5px;
  border-radius: 10px;
  border-color: #7f6853;
`;

export const SignInButton = styled(TouchableOpacity)`
  height: 50px;
  background-color: #614f3f;
  border-radius: 15px;
  border-color: green;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const Container = styled(View)`
  flex: 1.5;
  border-top-left-radius: 55px;
  border-top-right-radius: 55px;
  background-color: white;
  bottom: 50px;
  padding: 40px;
  padding-bottom: 50px;
`;

export const styles = StyleSheet.create({});

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(View)`
  flex: 1;
  background-color: #f2f2f3;
  /* padding-horizontal: 20px; */
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  width: 100%;
  height: 600px;
  bottom: 50px;
  /* justify-content: center; */
`;

export const SignInContainer = styled(View)`
  align-self: center;
  flex-direction: row;
  margin-top: 20px;
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  background-color: #f2f2f3;
`;

export const SignUpButton = styled(TouchableOpacity)`
  align-self: center;
  margin-top: 50px;
  height: 50px;
  /* padding: 15px; */
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #465cc9;
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
  font-weight: 500;
`;

export const Link = styled(TouchableOpacity)``;

export const TextLink = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #4a9cef;
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

export const HeaderContainer = styled(View)`
  margin-top: 20px;
  margin-bottom: 30px;
`;
export const HeaderTitle = styled(Text)`
  font-weight: 600;
  font-size: 40px;
`;
export const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

import {
  Pressable,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
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
  align-self: center;
  margin-bottom: ${({ margin }) => (margin ? margin : 0)}px;
`;
export const SubTitleContainer = styled(View)<{ margin?: number }>`
  align-self: center;
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
  font-weight: 500;
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
  /* font-weight: 600; */
`;

export const StyledInput = styled(TextInput)`
  width: 100%;
  /* padding: 15px; */
  /* height: 30px; */
  border-radius: 10px;
  background-color: #f2f2f3;
  /* border-color: #7f6853; */
`;

export const SignInButton = styled(TouchableOpacity)`
  height: 50px;
  background-color: #465cc9;
  border-radius: 15px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

export const TitleSignUp = styled(Text)`
  color: #4a9cef;
  font-size: 18px;
`;
export const SignUpButton = styled(TouchableOpacity)`
  position: absolute;
  top: 20px;
  right: 50px;
`;

export const LinkText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #4a9cef;
  padding-horizontal: 5px;
`;

export const Link = styled(TouchableOpacity)``;

export const BottomTextContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
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

// export const KeyboardAwareContainer = styled(KeyboardAwareScrollView)`

// `

export const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
});

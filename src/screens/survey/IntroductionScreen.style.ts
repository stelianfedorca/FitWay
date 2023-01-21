import { TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components';

export const ButtonsContainer = styled(View)`
  margin-top: 40px;
`;

export const PrimaryButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #4264ea;
  border-radius: 30px;
`;

export const SecondaryButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  background-color: orange;
  height: 50px;
  border-radius: 30px;
`;

export const TitleButton = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

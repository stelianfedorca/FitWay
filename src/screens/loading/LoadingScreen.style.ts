import { TouchableOpacity, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

export const Container = styled(View)`
  flex: 1;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #f3f3f3;
`;

export const AnimatedPrimaryButton = styled(AnimatedButton)`
  height: 50px;
  border-radius: 30px;
  background-color: #457ad7;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  align-self: center;
  bottom: 80px;
`;

export const TextContinue = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

export const AnimatedHeaderText = styled(AnimatedText)`
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

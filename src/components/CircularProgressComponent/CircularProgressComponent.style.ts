import { View, Text } from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  align-items: center;
  justify-content: space-between;
`;

export const TextTop = styled(Text)<{ color?: string }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ color }) => (color ? color : 'black')};
`;

export const TextBottom = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`;

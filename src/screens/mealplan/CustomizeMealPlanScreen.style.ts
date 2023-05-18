import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
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

export const Title = styled(Text)`
  font-size: 26px;
  text-align: center;
  margin-bottom: 40px;
`;

export const ButtonTitle = styled(Text)`
  font-size: 18px;
  color: white;
  font-weight: 600;
`;

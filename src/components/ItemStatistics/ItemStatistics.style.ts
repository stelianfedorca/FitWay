import { StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  padding-left: 10px;
  width: 100%;
`;

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;

export const ProgressContainer = styled(View)`
  flex: 5;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 250,
    width: '100%',
    borderRadius: 20,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  shadow: {
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowColor: '#171717',
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
});

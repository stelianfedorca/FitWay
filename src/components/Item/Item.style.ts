import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import styled from 'styled-components';

export const Container = styled(Pressable)``;

export const HeaderContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: flex-start;
  margin-top: 20px;
`;

export const TitleHeader = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #c3c4c7;
`;

export const ProgressContainer = styled(View)`
  width: 100%;
  justify-content: space-between;
  margin-top: 5px;
`;

export const ProgressValue = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;
export const ProgressTitle = styled(Text)`
  font-weight: 600;
  color: #c3c4c7;
`;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 210,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

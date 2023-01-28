import { Pressable, StyleSheet, View, Text } from 'react-native';
// import { Text } from 'react-native-paper';
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

export const InfoContainer = styled(View)`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
`;

export const DetailsContainer = styled(View)`
  height: 100%;
  justify-content: space-between;
`;

export const TitleHeader = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;

export const SubTitleHeader = styled(Text)`
  font-size: 12px;
  /* font-weight: 500; */
  color: grey;
  margin-top: 5px;
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
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: 250,
    borderRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingBottom: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

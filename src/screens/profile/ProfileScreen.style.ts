import { ScrollView, StyleSheet, View } from 'react-native';
import styled from 'styled-components';

export const Container = styled(ScrollView)`
  flex: 1;
  padding-top: 20px;
  background-color: white;
  /* background-color: #f2f1f1; */
  /* padding-horizontal: 20px; */
`;
export const ProfileDetailsContainer = styled(View)`
  flex: 1;
  padding-horizontal: 20px;
  flex-direction: row;
`;

export const DetailsContainer = styled(View)`
  margin-left: 15px;
  justify-content: center;
`;

export const ContentContainer = styled(View)`
  margin-top: 30px;
  height: 110px;
  justify-content: space-evenly;
  padding-horizontal: 20px;
`;

export const SettingsContainer = styled(View)`
  flex: 1;
  margin-top: 30px;
  /* background-color: white; */
`;

export const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#EDF1F9',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  /* flex: 1; */
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 15px;
`;

export const TitleHeader = styled(Text)`
  font-size: 16px;
  font-weight: 500;
  color: #4a9cef;
`;

export const ContentContainer = styled(View)`
  flex: 1;
  width: 100%;
  padding: 10px 25px;
`;

export const QuantityContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const QuantityValueContainer = styled(View)`
  width: 60px;
  padding: 5px;
  justify-content: center;
  align-items: flex-end;
  border-width: 1px;
  border-radius: 5px;
`;

export const MacrosDetails = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const TextQuantity = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`;
export const TextName = styled(Text)`
  font-size: 12px;
  font-weight: 300;
  margin-top: 3px;
`;
export const MacrosItem = styled(View)`
  justify-content: center;
  align-items: center;
`;

export const styles = StyleSheet.create({
  container: {
    height: 350,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  addIcon: {
    position: 'absolute',
    top: 7,
    right: 20,
  },
  indicator: {
    position: 'absolute',
    top: 50,
  },
});

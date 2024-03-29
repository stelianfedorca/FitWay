import { StyleSheet, View } from 'react-native';
import styled from 'styled-components';

export const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20px;
`;

export const ItemColumn = styled(View)<{ marginRight?: number }>`
  width: 50%;
  flex: 1;
  /* border-width: 3px; */
  marginright: ${({ marginRight }) => (marginRight ? marginRight : 0)}px;
`;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F2F1F1',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { Pressable, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import { ItemStatistics } from '../../components/ItemStatistics';

export const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});

export const Title = styled(Text)`
  font-size: 22px;
  font-weight: 600;
`;

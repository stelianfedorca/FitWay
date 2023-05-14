import { View, Text } from 'react-native';
import { Card } from '../../components';
import { Layout } from '../../components/Layout';
import { styles } from './MealPlanScreen.style';

export function MealPlan() {
  return (
    <Layout paddingBottom paddingTop style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}></View>
    </Layout>
  );
}

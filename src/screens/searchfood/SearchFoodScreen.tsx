import { Layout } from '../../components/Layout';
import { List } from '../../components/List';
import { useFoodCollection } from '../../hooks';
import { useFoodStore } from '../../stores';

export function SearchFoodScreen() {
  useFoodCollection();
  return (
    <Layout paddingBottom paddingTop>
      <List />
    </Layout>
  );
}

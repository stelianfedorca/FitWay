import { Layout } from '../../components/Layout';
import { useFoodCollection } from '../../hooks';

export function SearchFoodScreen() {
  useFoodCollection();
  return <Layout paddingBottom paddingTop></Layout>;
}

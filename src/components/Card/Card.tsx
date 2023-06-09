import { Pressable, Text, Image, View } from 'react-native';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';
import Svg, { Circle } from 'react-native-svg';
import { MealPlanDetails } from '../../redux/slices/mealPlanSlice';
import { styles } from './Card.style';

export type CardProps = {
  data: MealPlanDetails | null;
};
export function Card({ data }: CardProps) {
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <View
      style={{
        flex: 1,
        paddingRight: 10,
        flexDirection: 'row',
      }}
      key={data?.id}>
      <Image
        source={{ uri: data?.image }}
        style={{
          height: 150,
          width: 150,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          marginVertical: 25,
          flex: 1,
          paddingLeft: 10,
          justifyContent: 'space-around',
        }}>
        <Text style={{ flexWrap: 'wrap', fontWeight: '500' }}>
          {data?.title}
        </Text>
        <Text
          style={{
            flexWrap: 'wrap',
            fontWeight: '400',
            color: '#414141',
            // marginTop: 5,
          }}>
          {capitalizeFirstLetter(data?.dishTypes[0]!)}
        </Text>
        <View
          style={{
            backgroundColor: '#e3e3e3',
            width: 75,
            padding: 5,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flexWrap: 'wrap',
              fontWeight: '400',
              color: '#d8611c',
            }}>
            {Math.round(data?.nutrition.nutrients[0].amount ?? 0)} kcal
          </Text>
        </View>
      </View>
    </View>
  );
}

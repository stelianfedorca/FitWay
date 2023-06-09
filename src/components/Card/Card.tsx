import { Pressable, Text, Image, View } from 'react-native';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';
import Svg, { Circle } from 'react-native-svg';
import { MealPlanDetails } from '../../redux/slices/mealPlanSlice';
import { styles } from './Card.style';
import { FoodImage } from '../../assets/images';

export type CardProps = {
  data: MealPlanDetails | null;
};
export function Card({ data }: CardProps) {
  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const imageSource = data?.image ? { uri: data?.image } : FoodImage;
  return (
    <Pressable
      style={{
        flex: 1,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        borderBottomWidth: 0.2,
      }}
      key={data?.id}>
      <Image
        source={imageSource}
        style={{
          height: 80,
          width: 80,
          borderRadius: 20,
        }}
        resizeMode="cover"
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
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 10,
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
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
              backgroundColor: '#f0f0f0',
              width: 75,
              padding: 5,
              borderRadius: 10,
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Text
              style={{
                flexWrap: 'wrap',
                fontWeight: '400',
                // color: '#d8611c',
              }}>
              {Math.round(data?.nutrition.nutrients[0].amount ?? 0)} kcal
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

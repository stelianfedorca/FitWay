import { Layout } from '../../components/Layout';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ListRenderItem,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigators/HomeStack';
import { Routes } from '../../navigators';
import { FoodImage } from '../../assets/images';
import { Item } from '../../components/Item';
import CircularProgress from 'react-native-circular-progress-indicator';
import {
  addMealInDiary,
  addMealPlanToFirestore,
  getMealInstructions,
} from '../../services/mealplan.service';
import { useEffect, useState } from 'react';
import { Step } from '../../redux/slices/mealPlanSlice';
import { Badge } from '../../components/Badge';
import { useSelector } from 'react-redux';
import { selectUid } from '../../redux/slices/userSlice';
import { selectCurrentDate } from '../../redux/slices/dateSlice';
import { FoodFirestore } from '../../types/types';
interface DetailScreenProps
  extends NativeStackScreenProps<RootStackParams, Routes.MealDetails> {
  // other props ...
}

function EmptyList() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator />
    </View>
  );
}

export function DetailsScreen({ route, navigation }: DetailScreenProps) {
  const params = route.params;
  const [steps, setSteps] = useState<Step[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const uid = useSelector(selectUid);
  const selectedCurrentDate = useSelector(selectCurrentDate);

  const mealDetails = params.item;
  const isSaved = params.saved;

  const mapDishType = (dishTypes: string[]) => {
    return dishTypes.filter(value => {
      if (value === 'breakfast' || value === 'dinner' || value === 'lunch') {
        return true;
      }

      return false;
    })[0];
  };

  const addMeal = async () => {
    const meal: FoodFirestore = {
      id: String(mealDetails.id),
      name: mealDetails.title,
      image: mealDetails.image,
      type: capitalizeFirstLetter(mapDishType(mealDetails.dishTypes)),
      brand: '',
      nutrition: {
        caloricBreakdown: mealDetails.nutrition.caloricBreakdown,
        calories: mealDetails.nutrition.nutrients[0].amount,
        servings: {
          size: mealDetails.nutrition.weightPerServing.amount,
          number: 1,
        },
        carbs:
          mealDetails.nutrition.nutrients.find(
            nutrient => nutrient.name === 'Carbohydrates',
          )?.amount ?? 200,
        fat:
          mealDetails.nutrition.nutrients.find(
            nutrient => nutrient.name === 'Fat',
          )?.amount ?? 200,
        protein:
          mealDetails.nutrition.nutrients.find(
            nutrient => nutrient.name === 'Protein',
          )?.amount ?? 200,
      },
      isMeal: true,
    };
    await addMealInDiary(uid, selectedCurrentDate, meal);
  };

  useEffect(() => {
    getMealInstructions(mealDetails.id).then(steps => {
      if (steps) {
        setSteps(steps);
        setIsLoading(false);
      }
    });
  }, [mealDetails.id]);

  const _renderItem: ListRenderItem<Step> = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 0.3,
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            width: 70,
          }}>
          <Text style={{ fontWeight: 'bold' }}>{`Step ${item.number}`}</Text>
        </View>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              flex: 1,
              flexWrap: 'wrap',
            }}>{`${item.step}`}</Text>
        </View>
      </View>
    );
  };

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function findItem(value: string, index: number, obj: string[]) {
    return value === 'breakfast' || value === 'lunch' || value === 'dinner';
  }
  const imageSource = mealDetails.image
    ? { uri: mealDetails.image }
    : FoodImage;
  return (
    <Layout paddingBottom>
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 10,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {isSaved && (
          <TouchableOpacity
            style={{
              backgroundColor: 'green',
              padding: 5,
              alignItems: 'center',
              width: '40%',
              alignSelf: 'flex-end',
              borderRadius: 10,
              shadowColor: 'black',
              shadowRadius: 2,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.3,
            }}
            onPress={addMeal}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'white' }}>
              Add Meal
            </Text>
          </TouchableOpacity>
        )}
        <Image
          style={{ width: '100%', height: 250, borderRadius: 25 }}
          resizeMode="contain"
          source={imageSource}
        />
        <View>
          <View
            style={{
              marginTop: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                flex: 1,
              }}>{`${mealDetails.title}`}</Text>
            <View
              style={{
                backgroundColor: '#457ad7',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 5,
                borderRadius: 10,
                padding: 10,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'white',
                }}>{`${mealDetails.nutrition.weightPerServing.amount} g`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '400',
              }}>{`${capitalizeFirstLetter(
              mealDetails.dishTypes.filter(value => {
                if (
                  value === 'breakfast' ||
                  value === 'dinner' ||
                  value === 'lunch'
                ) {
                  return true;
                }

                return false;
              })[0],
            )}`}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <CircularProgress
            value={mealDetails.nutrition.nutrients[0].amount}
            progressValueFontSize={16}
            radius={50}
            duration={500}
            progressValueColor="black"
            activeStrokeColor="#465cc9"
            maxValue={mealDetails.nutrition.nutrients[0].amount}
            inActiveStrokeColor={'#EDF1F9'}
            activeStrokeWidth={10}
            inActiveStrokeWidth={10}
            title="Calories"
            titleFontSize={12}
            titleColor="#c3c4c7"
            subtitleColor="white"
            progressValueStyle={{
              backgroundColor: 'white',
              color: 'white',
              fontSize: 22,
              fontWeight: '500',
            }}
          />

          <Badge color="#3db9d5">
            <Text style={{ fontWeight: '600' }}>
              {`${Math.round(
                mealDetails.nutrition.nutrients.find(
                  nutrient => nutrient.name === 'Carbohydrates',
                )?.amount ?? 200,
              )}`}
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Carbs</Text>
          </Badge>
          <Badge color="#4a62d8">
            <Text style={{ fontWeight: '600' }}>
              {`${Math.round(
                mealDetails.nutrition.nutrients.find(
                  nutrient => nutrient.name === 'Fat',
                )?.amount ?? 200,
              )}`}
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Fat</Text>
          </Badge>
          <Badge color="#d38723">
            <Text style={{ fontWeight: '600' }}>
              {`${Math.round(
                mealDetails.nutrition.nutrients.find(
                  nutrient => nutrient.name === 'Protein',
                )?.amount ?? 200,
              )}`}
            </Text>
            <Text style={{ color: '#3e3e3e' }}>Protein</Text>
          </Badge>
        </View>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: '500' }}>
            Instructions steps
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            {steps.map(item => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 10,
                    borderBottomWidth: 0.3,
                  }}
                  key={item.number}>
                  <View
                    style={{
                      height: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 70,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                      }}>{`Step ${item.number}`}</Text>
                  </View>
                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        flex: 1,
                        flexWrap: 'wrap',
                      }}>{`${item.step}`}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* <FlatList
          data={steps}
          renderItem={_renderItem}
          ListEmptyComponent={EmptyList}
        /> */}
      </ScrollView>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

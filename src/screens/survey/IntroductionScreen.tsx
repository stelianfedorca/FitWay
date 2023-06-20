import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { Layout } from '../../components/Layout';
import { Routes } from '../../navigators';
import {
  ButtonsContainer,
  PrimaryButton,
  TitleButton,
} from './IntroductionScreen.style';
import { IntroductionScreenNavigationProp } from './IntroductionScreen.types';

export function IntroductionScreen() {
  const navigation = useNavigation<IntroductionScreenNavigationProp>();

  function handleContinue() {
    navigation.navigate(Routes.Survey);
  }
  return (
    <Layout paddingBottom paddingTop>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          marginHorizontal: 20,
          paddingTop: 150,
          paddingBottom: 250,
        }}>
        <View>
          <Text
            variant="headlineLarge"
            style={{ textAlign: 'center', color: 'black' }}>
            Almost There!
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              marginTop: 15,
              textAlign: 'center',
              fontSize: 16,
              color: 'black',
            }}>
            In order to proceed, we need a little more information about you.
          </Text>
        </View>

        <ButtonsContainer>
          <PrimaryButton onPress={handleContinue} style={styles.shadowButton}>
            <TitleButton>Continue</TitleButton>
          </PrimaryButton>
        </ButtonsContainer>
      </View>
    </Layout>
  );
}
export const styles = StyleSheet.create({
  shadowButton: {
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
  },
});

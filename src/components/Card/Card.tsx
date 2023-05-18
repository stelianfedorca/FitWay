import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import CircularProgress, {
  CircularProgressBase,
} from 'react-native-circular-progress-indicator';
import Svg, { Circle } from 'react-native-svg';
import { styles } from './Card.style';

export function Card() {
  return <Pressable style={styles.container}></Pressable>;
}

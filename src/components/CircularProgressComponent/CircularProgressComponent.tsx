import {
  Container,
  TextBottom,
  TextTop,
} from './CircularProgressComponent.style';

import CircularProgress from 'react-native-circular-progress-indicator';
import { Badge } from 'react-native-paper';

export type CircularProgressComponentProps = {
  textTop?: string;
  textBottom?: string | number;
  progressTitle: string;
  progressValue: number;
  activeStrokeColor?: string;
  max?: number;
};

export function CircularProgressComponent({
  textTop,
  textBottom,
  progressTitle,
  progressValue,
  activeStrokeColor,
  max,
}: CircularProgressComponentProps) {
  return (
    <Container>
      <TextTop color={activeStrokeColor}>{textTop}</TextTop>
      <CircularProgress
        value={max! - progressValue}
        progressValueFontSize={16}
        radius={50}
        duration={500}
        progressValueColor="black"
        maxValue={max ?? 500}
        inActiveStrokeColor="#EDF1F9"
        activeStrokeColor={activeStrokeColor}
        title={progressTitle}
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

      <TextBottom>{textBottom}</TextBottom>
    </Container>
  );
}

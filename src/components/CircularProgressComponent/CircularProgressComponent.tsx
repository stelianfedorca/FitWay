import {
  Container,
  TextBottom,
  TextTop,
} from './CircularProgressComponent.style';

import CircularProgress from 'react-native-circular-progress-indicator';

export type CircularProgressComponentProps = {
  textTop?: string;
  textBottom?: string | number;
  progressTitle: string;
  progressValue: number;
  activeStrokeColor?: string;
  max?: number;
  radius?: number;
  activeStrokeColorWidth?: number;
  duration?: number;
  inactiveStrokeColor?: string;
  inActiveStrokeWidth?: number;
};

export function CircularProgressComponent({
  textTop,
  textBottom,
  progressTitle,
  progressValue,
  activeStrokeColor,
  max,
  radius,
  activeStrokeColorWidth,
  duration,
  inactiveStrokeColor,
  inActiveStrokeWidth,
}: CircularProgressComponentProps) {
  return (
    <Container>
      <TextTop color={activeStrokeColor}>{textTop}</TextTop>
      <CircularProgress
        value={progressValue}
        progressValueFontSize={16}
        radius={radius ?? 50}
        duration={duration ?? 500}
        progressValueColor="black"
        maxValue={max}
        inActiveStrokeColor={inactiveStrokeColor ?? '#EDF1F9'}
        activeStrokeColor={activeStrokeColor}
        activeStrokeWidth={activeStrokeColorWidth ?? 10}
        inActiveStrokeWidth={inActiveStrokeWidth ?? 10}
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

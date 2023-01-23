import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Container } from './Ruler.style';

const segmentsLength = 91;
const minAge = 14;
const segmentWidth = 2;
const segmentSpacing = 20;
const snapSegment = segmentWidth + segmentSpacing;
const indicatorWidth = 100;
const indicatorHeight = 80;

const data = [...Array(segmentsLength).keys()].map(i => i + minAge);
export function Ruler() {
  const { width } = useWindowDimensions();
  const spacerWidth = (width - segmentWidth) / 2;
  const rulerWidth = spacerWidth * 2 + (segmentsLength - 1) * snapSegment;

  return (
    <Container style={[styles.ruler, { width: rulerWidth }]}>
      <View style={[styles.spacer, { width: 10 }]} />
      {data.map(i => {
        const tenth = i % 10 === 0;
        return (
          <View
            key={i}
            style={[
              { width: segmentWidth },
              {
                backgroundColor: tenth ? '#333' : '#999',
                height: tenth ? 40 : 20,
                marginRight: i === data.length - 1 ? 0 : segmentSpacing,
              },
            ]}
          />
        );
      })}
    </Container>
  );
}

export const styles = StyleSheet.create({
  ruler: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  spacer: {
    backgroundColor: 'red',
  },
});

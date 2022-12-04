import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  bottom: 0;
`;

export const TabBarContainer = styled.View<{width: number}>`
  width: ${({width}) => width}px;
  flex-direction: row;
  justify-content: space-between;

  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 90px;
  background-color: white;
  elevation: 1;
  shadow-opacity: 0.15;
  shadow-radius: 24px;
`;

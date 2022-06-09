import styled from 'styled-components';

export const FeedButtonStyled = styled.View`
  width: 100%;
  min-height: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor || '#f9f9f9'};
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor || '#dbdbe9'};
  border-radius: 7px;
  padding-left: 5px;
  justify-content: center;
  ${(props) => props.start && 'justify-content: center;'}
  margin-bottom: 10px;
  opacity: ${({ showAsSelected }) => (showAsSelected ? 1 : 0.3)};
`;

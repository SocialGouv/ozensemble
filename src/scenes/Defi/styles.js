import styled, { css } from 'styled-components';
import UnderlinedButton from '../../components/UnderlinedButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import H1 from '../../components/H1';
import H2 from '../../components/H2';

export const FeedContainer = styled.View`
  background-color: #efefef;
  padding: 20px;
  padding-bottom: 100px;
  padding-top: 30px;
`;

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

/*
  Top part
*/

export const ScreenBgStyled = styled.ScrollView`
  background-color: #f9f9f9;
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
`;

export const TopContainer = styled.View`
  padding: 20px;
`;

export const Title = styled(H1)`
  ${commonCss}
  margin-top: 10px;
`;

export const SubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  ${(props) => props.last && 'margin-bottom: 40px;'}
`;

export const FeedDay = styled.View`
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 0;
`;

export const FeedDayContent = styled.View`
  flex-grow: 1;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;

export const FeedBottomButton = styled(UnderlinedButton)`
  align-items: center;
  margin-bottom: 15px;
`;

export const FeedCTAContainer = styled.View`
  margin-top: -45px;
  margin-bottom: -20px;
  align-items: center;
`;

export const FeedCTAButton = styled(ButtonPrimary)`
  flex-grow: 0;
`;

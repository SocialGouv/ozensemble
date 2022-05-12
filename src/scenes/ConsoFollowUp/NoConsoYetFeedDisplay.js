import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import H3 from '../../components/H3';
import { makeSureTimestamp } from '../../helpers/dateHelpers';
import matomo from '../../services/matomo';
import { setNoDrink } from './consoDuck';
import { FeedButtonStyled, FeedNoDrinkTodayTopButton } from './styles';

const NoConsoYetFeedDisplay = ({ selected, timestamp }) => {
  return (
    <FeedButtonStyled showAsSelected={selected}>
      <Content>
        <Caption>Vous n'avez pas saisi de consommation</Caption>
        <NoDrinkTodayButton disabled={!selected} timestamp={timestamp} />
      </Content>
    </FeedButtonStyled>
  );
};

const dispatchToProps = {
  setNoDrink,
};

export const NoDrinkTodayButton = connect(
  null,
  dispatchToProps
)(({ content = "Je n'ai rien bu !", setNoDrink, timestamp, disabled }) => (
  <FeedNoDrinkTodayTopButton
    content={content}
    disabled={disabled}
    onPress={() => {
      matomo.logNoConso();
      setNoDrink(makeSureTimestamp(timestamp));
    }}
  />
));

const Content = styled.View`
  padding-top: 15px;
  align-items: center;
  justify-content: center;
`;

const Caption = styled(H3)``;

export default NoConsoYetFeedDisplay;

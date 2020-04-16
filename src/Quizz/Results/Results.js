import React from 'react';
import CONSTANTS from '../../reference/constants';
import ResultGood from './ResultGood';
import ResultRisk from './ResultRisk';
import ResultAddicted from './ResultAddicted';
import ResultEmpty from './ResultEmpty';
import { EmptyView } from './styles';
import matomo from '../../matomo';

const Results = ({ setView, backToQuestions, resultKey }) => {
  const onActionButtonPress = async action => {
    switch (action) {
      case CONSTANTS.ACTION_CONSOMMATION:
        setView(CONSTANTS.VIEW_CONSO);
        await matomo.logConsoOpen(CONSTANTS.FROM_RESULT);
        return;
      case CONSTANTS.ACTION_CONSEILLER:
        setView(CONSTANTS.VIEW_CONTACT);
        await matomo.logContactOpen(CONSTANTS.FROM_RESULT);
        return;
      case CONSTANTS.ACTION_QUESTIONS:
        backToQuestions();
        await matomo.logQuizzOpen(CONSTANTS.FROM_RESULT);
        return;
      default:
        console.log('error in button: no action is taken', action);
        return;
    }
  };

  switch (resultKey) {
    default:
    case null:
      return <EmptyView />;
    case 'no-result':
      return <ResultEmpty onActionButtonPress={onActionButtonPress} />;
    case CONSTANTS.RESULT_GOOD:
      return <ResultGood onActionButtonPress={onActionButtonPress} />;
    case CONSTANTS.RESULT_RISK:
      return <ResultRisk onActionButtonPress={onActionButtonPress} />;
    case CONSTANTS.RESULT_ADDICTED:
      return <ResultAddicted onActionButtonPress={onActionButtonPress} />;
  }
};

export default Results;

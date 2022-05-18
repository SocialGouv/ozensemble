import React from 'react';
import styled from 'styled-components';
import H1 from '../../components/H1';
import H2 from '../../components/H2';
import TextStyled from '../../components/TextStyled';
import Reminder from '../Infos/Reminder';

const WeeklyReminder = ({ navigation, route }) => (
  <Reminder navigation={navigation} route={route} storageKey="@GainsReminder" offset="week">
    {({ reminder }) => (
      <>
        <SubTitle>
          {reminder ? (
            <>
              <TextStyled color="#191919">Pour un meilleur suivi, un rappel est programmé : </TextStyled>
              <TextStyled color="#4030a5">DIMANCHE À {`\n ${reminder.getLocalePureTime('fr')} \n `}</TextStyled>
              <TextStyled color="#191919">tous les jours.</TextStyled>
            </>
          ) : (
            <>
              <Title>
                <TextStyled color="#4030a5">
                  Un rappel permet de remplir plus souvent l'application et obtenir des résultats plus efficaces
                </TextStyled>
              </Title>
              <TextStyled color="#191919">
                Définissez un rappel quotidien sur votre téléphone pour vous rappeler
              </TextStyled>
            </>
          )}
        </SubTitle>
      </>
    )}
  </Reminder>
);

const Title = styled(H1)`
  margin-bottom: 15px;
  margin-top: 15px;
  width: 80%;
  flex-shrink: 0;
  text-align: center;
`;

export const SubTitle = styled(H2)`
  width: 80%;
  margin-bottom: 15px;
  flex-shrink: 0;
  flex-direction: column;
  text-align: center;
`;

export default WeeklyReminder;

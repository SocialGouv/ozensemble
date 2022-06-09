import React, { useState } from 'react';
import { Alert } from 'react-native';
import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import H2 from '../../components/H2';
import BackButton from '../../components/BackButton';
import TextStyled from '../../components/TextStyled';
import { TIPIMAIL_API_KEY, TIPIMAIL_API_USER, TIPIMAIL_EMAIL_FROM } from '../../config';
import { consolidatedCatalogSelector, drinksState } from '../../recoil/consos';
import { useToast } from '../../services/toast';
import { defaultPaddingFontScale } from '../../styles/theme';
import { getDisplayName, mapDrinkToDose, NO_CONSO } from '../ConsoFollowUp/drinksCatalog';

export const HTMLExportSelector = selector({
  key: 'HTMLExportSelector',
  get: ({ get }) => {
    const consolidatedCatalog = get(consolidatedCatalogSelector);
    const drinks = get(drinksState);
    return formatHtmlTable(drinks, consolidatedCatalog);
  },
});

const formatHtmlTable = (drinks, catalog) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="https://www.w3.org/1999/xhtml">
    <head>
      <title>Bilan des consommations</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
      <style>
      table { background-color: white; width: 100%; }
      td, th { border: 1px solid #ddd; text-align: center; }
      span { font-weight: bold; }
      </style>
    </head>
    <body>
      <span>Bilan des consommations</span>
      <table class="table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Quantité</th>
          </tr>
          ${[...drinks]
            .sort((drink1, drink2) => {
              if (drink1.timestamp < drink2.timestamp) return -1;
              return 1;
            })
            .map((drink) => {
              const doses = mapDrinkToDose(drink, catalog);
              const time = new Date(drink.timestamp).getLocaleDateAndTime('fr');
              if (drink.drinkKey === NO_CONSO) return `<tr><td>${time}</td><td>Pas bu ce jour</td></tr>`;
              const name = getDisplayName(drink.drinkKey, drink.quantity, catalog);
              return `<tr>
                  <td>${time}</td>
                  <td>${drink.quantity} ${name} (${doses} dose${doses > 1 ? 's' : ''})</td>
                </tr>`;
            })
            .join('')}
        </tbody>
      </table>
    </body>
  </html>
  `;
};

const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
const Export = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const htmlExport = useRecoilValue(HTMLExportSelector);
  const exportData = async () => {
    if (!emailFormat(email)) {
      Alert.alert('Adresse email non valide');
      return;
    }
    const res = await fetch('https://api.tipimail.com/v1/messages/send', {
      method: 'POST',
      headers: {
        'X-Tipimail-ApiUser': TIPIMAIL_API_USER,
        'X-Tipimail-ApiKey': TIPIMAIL_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [
          {
            address: email,
          },
        ],
        msg: {
          from: {
            address: TIPIMAIL_EMAIL_FROM,
            personalName: 'Oz Ensemble',
          },
          subject: 'Export de données',
          html: htmlExport,
        },
      }),
    }).catch((err) => console.log('sendNPS err', err));
    console.log('email sent', res);
    toast.show(`Email envoyé à ${email}`);
    navigation.goBack();
  };

  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()} />
      <SubContainer>
        <Title>
          <TextStyled color="#4030a5">Exporter mes données</TextStyled>
        </Title>
        <TextInputStyled
          value={email}
          placeholder="Adresse email"
          onChangeText={setEmail}
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="go"
          textContentType="emailAddress"
          onSubmitEditing={exportData}
          placeholderTextColor="#c9c9cc"
        />
        <ButtonsContainer>
          <ButtonPrimary content="Envoyer" disabled={!email} onPress={exportData} />
        </ButtonsContainer>
      </SubContainer>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  flex: 1;
  padding-horizontal: ${defaultPaddingFontScale()}px;
`;

const SubContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 100px;
  background-color: #f9f9f9;
  flex: 1;
`;

const Title = styled(H2)`
  margin-vertical: 15px;
  margin-horizontal: 15px;
  flex-shrink: 0;
  text-align: left;
  width: 100%;
`;

const ButtonsContainer = styled.View`
  align-items: flex-start;
  margin-vertical: 30px;
  width: 100%;
`;

const TextInputStyled = styled.TextInput`
  width: 100%;
  height: 50px;
  background-color: #f3f3f6;
  border: 1px solid #dbdbe9;
  color: #4030a5;
  border-radius: 7px;
  padding-left: 15px;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 15px;
`;

export default Export;

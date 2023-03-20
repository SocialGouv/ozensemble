import React, { useState } from 'react';
import { Alert } from 'react-native';
import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import TextInputStyled from '../../components/TextInputStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import { consolidatedCatalogSelector, drinksState } from '../../recoil/consos';
import { useToast } from '../../services/toast';
import { screenHeight } from '../../styles/theme';
import { getDisplayName, mapDrinkToDose, NO_CONSO } from '../ConsoFollowUp/drinksCatalog';
import WrapperContainer from '../../components/WrapperContainer';
import { sendMail } from '../../services/mail';
import { P } from '../../components/Articles';
import dayjs from 'dayjs';
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
              const time = dayjs(drink.timestamp).format('dddd DD MMMM YYYY');
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
    const res = await sendMail({
      to: email,
      subject: 'Export de données',
      html: htmlExport,
    }).catch((err) => console.log('sendNPS err', err));
    console.log('email sent', res);
    toast.show(`Email envoyé à ${email}`);
    navigation.goBack();
  };

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Exporter mes données">
      <P>
        Partagez votre agenda de consommation auprès de la personne de votre choix, renseignez son adresse email
        ci-dessous{'\u00A0'}:
      </P>
      <SubContainer>
        <EmailInput
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
    </WrapperContainer>
  );
};

const SubContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: ${screenHeight * 0.2}px;
  background-color: #f9f9f9;
  flex: 1;
`;

const ButtonsContainer = styled.View`
  align-items: flex-start;
  margin-vertical: 30px;
  width: 100%;
`;

const EmailInput = styled(TextInputStyled)`
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

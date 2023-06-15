import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView } from 'react-native';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import dayjs from 'dayjs';
import TextInputStyled from '../../components/TextInputStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import { consolidatedCatalogObjectSelector } from '../../recoil/consos';
import { useToast } from '../../services/toast';
import { screenHeight } from '../../styles/theme';
import { getDisplayDrinksModalName, getDisplayName } from '../ConsoFollowUp/drinksCatalog';
import WrapperContainer from '../../components/WrapperContainer';
import { sendMail } from '../../services/mail';
import { P } from '../../components/Articles';
import { storage } from '../../services/storage';
import API from '../../services/api';
const Buffer = require('buffer').Buffer;
const formatHtmlTable = (consoFilteredByWeek, catalog, firstDay) => {
  const docHeader = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="https://www.w3.org/1999/xhtml">
  <head>
    <title>Export des consommations - Oz Ensemble</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <style>
    table { background-color: white; width: 100%; }
    td, th { border: 1px solid #ddd; text-align: center; padding: 5px;
  }
    span { font-weight: bold; }
    .bg-oz {background-color: #4030A5; color: white;}
    </style>
  </head>
  <body>
    <span>Export des consommations - Oz Ensemble</span>
    <br>
    <br>
      `;
  const docClosing = `
</body>
</html>
`;
  let body = '';
  consoFilteredByWeek.forEach((week, index) => {
    const firstDayOfWeek = firstDay.add(index, 'week');
    const lastDay = firstDayOfWeek.endOf('week');
    const displayedDate =
      firstDayOfWeek.format('MM') === lastDay.format('MM')
        ? firstDayOfWeek.format('DD') +
          ' au ' +
          lastDay.format('DD ') +
          lastDay.format('MMMM ').capitalize() +
          lastDay.format('YYYY')
        : firstDayOfWeek.format('DD ') +
          firstDayOfWeek.format('MMMM').capitalize() +
          ' au ' +
          lastDay.format('DD ') +
          lastDay.format('MMMM ').capitalize() +
          lastDay.format('YYYY');
    let sumWeeklyDoses = 0;
    const weekHeader = ` <tr class="bg-oz"><td colspan="3">Semaine du ${displayedDate}</td></tr> 
<tr class="bg-oz">
    <th>Date</th>
    <th>Boisson</th>
    <th>Unité d'alcool</th>
</tr>`;
    let dailycontent = '';
    week.forEach((day, index) => {
      if (day.length === 0) {
        const nothingRegisteredDate =
          firstDayOfWeek.add(index, 'day').format('dddd DD ').capitalize() +
          firstDayOfWeek.add(index, 'day').format('MMMM').capitalize();
        dailycontent += `<tr><td>${nothingRegisteredDate}</td><td colspan="2">Pas de consommation enregistrée</td></tr>`;
      } else {
        const dayDate =
          dayjs(day[0].date).format('dddd DD ').capitalize() + dayjs(day[0].date).format('MMMM').capitalize();
        let sumDayDoses = 0;
        let consosInfos = '';
        day.forEach((conso, index) => {
          if (conso.drinkKey === 'no-conso') {
            if (day.length < 2) {
              consosInfos += 'Pas bu ce jour';
            }
          } else {
            // if conso is beer need to add the contenent in front of name beer
            const displayName = ['beer-half', 'cider-half', 'beer-pint', 'cider-pint'].includes(conso.drinkKey)
              ? getDisplayDrinksModalName(conso.drinkKey, catalog, conso.quantity).toLowerCase() +
                ' de ' +
                getDisplayName(conso.drinkKey, (quantity = 1), catalog)
              : getDisplayName(conso.drinkKey, (quantity = 1), catalog);
            consosInfos += conso.quantity + ' ' + displayName;
            const numberVolume = Number(conso.volume.split(' ')[0]);
            const alcoolPercentage = Math.round((conso.doses * 100) / numberVolume / 0.8);
            consosInfos += ` (${alcoolPercentage}%)`;
            if (index + 1 !== day.length) {
              // is conso not last of the day the day add <br>
              consosInfos += `<br>`;
            }
          }
          sumDayDoses += conso.doses * conso.quantity;
        });
        sumDayDoses = Math.round(sumDayDoses * 10) / 10;
        const sumDayDosesDisplay = sumDayDoses > 1 ? sumDayDoses + ' unités' : sumDayDoses + ' unité';
        dailycontent += `<tr><td>${dayDate}</td><td>${consosInfos}</td><td>${sumDayDosesDisplay}</td></tr>`;
        sumWeeklyDoses += sumDayDoses;
      }
    });
    const sumWeeklyDosesDisplay = sumWeeklyDoses > 1 ? sumWeeklyDoses + ' unités' : sumWeeklyDoses + ' unité';

    const weekClosing = `<tr class="bg-oz"><td colspan="2">Total semaine du ${displayedDate}</td><td style="font-weight: bold;">${sumWeeklyDosesDisplay}</td></tr>`;
    body = '<table><tbody>' + weekHeader + dailycontent + weekClosing + '</tbody></table> <br><br>' + body;
  });

  return docHeader + body + docClosing;
};

const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
const Export = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(!email);
  const toast = useToast();
  const catalog = useRecoilValue(consolidatedCatalogObjectSelector);
  let consos = [];
  const exportData = async () => {
    if (!emailFormat(email)) {
      Alert.alert('Adresse email non valide');
      return;
    }
    setDisable(true);
    const matomoId = storage.getString('@UserIdv2');
    const file = {
      contentType: 'text/csv',
      filename: 'MesConsommationOz.csv',
      content: `Date,Consommation,Unité(s),Quantité,Volume,Calories,Prix (Euros)\n`,
    };
    const htmlExport = await API.get({ path: '/consommation/get-all-consos', query: { matomoId } }).then((response) => {
      if (response.ok) {
        consos = response.data;
        const firstDay = dayjs(consos[0].date).startOf('week');
        const nbDays = dayjs().diff(firstDay, 'days');
        const consoFilteredByWeek = [];
        let weeklyConsos = [];
        for (let i = 0; i <= nbDays; i++) {
          const dailyConsos = consos.filter((conso) => {
            return dayjs(conso.date).format('YYYY-MM-DD') === firstDay.add(i, 'day').format('YYYY-MM-DD');
          });
          weeklyConsos.push(dailyConsos);
          if (firstDay.add(i, 'days').format('dddd') === 'dimanche' || i === nbDays) {
            consoFilteredByWeek.push(weeklyConsos);
            weeklyConsos = [];
          }
        }
        consos.forEach((conso) => {
          if (conso.drinkKey === 'no-conso') {
            file.content += `${dayjs(conso.date).format('DD/MM/YYYY')},Pas bu ce jour,0,1,0,0,0 \n`;
          } else {
            const drinkFromCatalog = catalog[conso.drinkKey];
            const numberVolume = Number(conso.volume.split(' ')[0]);
            const alcoolPercentage = Math.round((conso.doses * 100) / numberVolume / 0.8);
            const displayName = drinkFromCatalog?.categoryKey.includes('own')
              ? drinkFromCatalog.displayFeed + ` (${alcoolPercentage}%)`
              : drinkFromCatalog?.categoryKey.split(':')[0].replace(',', '.');
            file.content += `${dayjs(conso.date).format('DD/MM/YYYY')},${displayName},${conso.doses},${
              conso.quantity
            },${conso.volume},${Math.round(conso.kcal)},${conso.price} \n`;
          }
        });
        return formatHtmlTable(consoFilteredByWeek, catalog, firstDay);
      }
      return null;
    });

    file.content = Buffer.from(file.content, 'binary').toString('base64');

    const res = await sendMail({
      to: email,
      subject: 'Export des consommations',
      html: htmlExport,
      attachments: [file],
    }).catch((err) => console.log('sendNPS err', err));
    console.log('email sent', res);
    toast.show(`Email envoyé à ${email}`);
    navigation.goBack();
  };

  return (
    <WrapperContainer onPressBackButton={navigation.goBack} title="Exporter mes données">
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: null })}
        keyboardVerticalOffset={Platform.select({ ios: 250, android: 250 })}>
        <P>
          Partagez votre agenda de consommation auprès de la personne de votre choix, renseignez son adresse email
          ci-dessous{'\u00A0'}:
        </P>
        <SubContainer>
          <EmailInput
            value={email}
            placeholder="Adresse email"
            onChangeText={(value) => {
              setEmail(value);
              setDisable(!value);
            }}
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
            <ButtonPrimary content="Envoyer" disabled={disable} onPress={exportData} />
          </ButtonsContainer>
        </SubContainer>
      </KeyboardAvoidingView>
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

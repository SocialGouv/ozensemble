import React, { useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { selector, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import TextInputStyled from '../../components/TextInputStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import { consolidatedCatalogSelector, drinksState } from '../../recoil/consos';
import { useToast } from '../../services/toast';
import { screenHeight } from '../../styles/theme';
import { getDisplayDrinksModalName, getDisplayName, mapDrinkToDose, NO_CONSO } from '../ConsoFollowUp/drinksCatalog';
import WrapperContainer from '../../components/WrapperContainer';
import { sendMail } from '../../services/mail';
import { P } from '../../components/Articles';
import dayjs from 'dayjs';
import { storage } from '../../services/storage';
import API from '../../services/api';

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
    body += '<table><tbody>';
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
    var sumWeeklyDoses = 0;
    const weekHeader = ` <tr class="bg-oz"><td colspan="3">Semaine du ${displayedDate}</td></tr> 
<tr class="bg-oz">
    <th>Date</th>
    <th>Boisson</th>
    <th>Unité d'alcool</th>
</tr>`;
    let dailycontent = '';
    week.forEach((day) => {
      if (day.length === 0) {
        dailycontent += `<tr><td colspan="3"> Pas de consommation enregistrée</td></tr>`;
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
            const displayName = conso.drinkKey.includes('beer')
              ? getDisplayDrinksModalName(conso.drinkKey, catalog, conso.quantity).capitalize() + ' de bière'
              : getDisplayName(conso.drinkKey, (quantity = 1), catalog).capitalize();
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
    body += weekHeader + dailycontent + weekClosing + '</tbody></table> <br>';
  });

  return docHeader + body + docClosing;
};

const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
const Export = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const catalog = useRecoilValue(consolidatedCatalogSelector);
  const exportData = async () => {
    const matomoId = storage.getString('@UserIdv2');
    htmlExport = await API.get({ path: '/consommation/get-all-consos', query: { matomoId } }).then((res) => {
      if (res.ok) {
        const consos = res.data;
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
        return formatHtmlTable(consoFilteredByWeek, catalog, firstDay);
      }
      return null;
    });
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
    //navigation.goBack();
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

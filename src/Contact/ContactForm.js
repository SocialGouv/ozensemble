import React from 'react';
import { Linking, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { withTheme } from 'styled-components';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { useFetchResultKey, usefetchQuizzAnswers } from '../helpers/customHooks';
import ButtonPrimary from '../components/ButtonPrimary';
import TextStyled from '../components/TextStyled';
import CONSTANTS from '../reference/constants';
import {
  ScreenBgStyled,
  TopContainer,
  TopTitle,
  TopSubTitle,
  TopButtonContainer,
  FormContainer,
  LabelStyled,
  TextInputStyled,
  Extra,
  ErrorStyled,
} from './styles';
import questions from '../Quizz/questions';
import matomo from '../matomo';

const mapResult = resultKey => {
  if (resultKey === CONSTANTS.RESULT_ADDICTED) {
    return 'RISQUE FORT';
  }
  if (resultKey === CONSTANTS.RESULT_RISK) {
    return 'RISQUE MOYEN';
  }
  if (resultKey === CONSTANTS.RESULT_GOOD) {
    return 'RISQUE FAIBLE';
  }
  return 'RISQUE NON MESURÉ';
};

const formatQuestionAndAnswer = (question, answers) => {
  if (!answers) return `  - ${question.questionTitle} -> Pas de réponse`;
  let answer = question.answers.find(({ answerKey }) => answerKey === answers[question.questionKey]);
  if (!answer) {
    answer = 'Pas de réponse';
  } else {
    answer = answer.content;
  }
  return `  - ${question.questionTitle} -> ${answer}`;
};

const formatText = (name, phone, resultKey, answers) =>
  `${new Date().getLocaleDateAndTime('fr')}, ${name || 'X'} a demandé à être recontacté(e) au ${phone}.\n\n
Ses réponses au questionnaire sont :\n\n
${questions.map(q => formatQuestionAndAnswer(q, answers)).join('\n\n')}
`;

const sendContact = async (name, phone, resultKey, answers) =>
  fetch('https://api.tipimail.com/v1/messages/send', {
    method: 'POST',
    headers: {
      'X-Tipimail-ApiUser': '2fbfeec4905f352f871b2590da840571',
      'X-Tipimail-ApiKey': 'e94f70b1c2dd423a446efbbc788200cb',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: 'e94f70b1c2dd423a446efbbc788200cb',
      to: [
        {
          address: 'addicto@selego.co',
        },
      ],
      msg: {
        from: {
          address: 'addicto@selego.co',
          personalName: 'App Addicto',
        },
        subject: `Nouvelle demande [${mapResult(resultKey)}]`,
        text: formatText(name, phone, resultKey, answers),
      },
    }),
  })
    .then(res => res.json())
    .catch(err => console.log('sendContact err', err));

const onCallRequest = () => {
  matomo.logContactNumberCalled();
  Linking.openURL('tel:+33148571421');
};

const ContactForm = ({ theme, onActionButtonPress, onTextFocusInput, onTextFocusBlur }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [showError, setShowError] = React.useState(false);

  const resultKey = useFetchResultKey();
  const answers = usefetchQuizzAnswers();

  return (
    <KeyboardAvoidingView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: 'padding', android: null })}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
      <ScreenBgStyled>
        <TopContainer>
          <TopTitle>
            <TextStyled type="title">Échangez</TextStyled>
            <TextStyled type="buttonPrimary"> gratuitement </TextStyled>
            <TextStyled type="title">avec un professionnel de l'addiction</TextStyled>
          </TopTitle>
          <TopSubTitle>
            <TextStyled type="basicText">Indiquez-nous votre numéro, nous vous rappelons sous</TextStyled>
            <TextStyled type="title"> 48h </TextStyled>
            <TextStyled type="basicText">pour un échange de</TextStyled>
            <TextStyled type="title"> 15 minutes.</TextStyled>
          </TopSubTitle>
          <FormContainer>
            <LabelStyled>Prénom ou pseudo</LabelStyled>
            <TextInputStyled
              value={name}
              onChangeText={setName}
              enablesReturnKeyAutomatically
              placeholderTextColor={theme.colors.placeholder}
              autoCapitalize="words"
              autoCorrect={false}
              autoCompleteType="name"
              keyboardType={Platform.select({
                android: 'default',
                ios: 'name-phone-pad',
              })}
              placeholder="Prénom"
              returnKeyLabel="next"
              returnKeyType="next"
              textContentType="name"
              onFocus={onTextFocusInput}
              onBlur={onTextFocusBlur}
            />
            <LabelStyled>Numéro de téléphone</LabelStyled>
            <TextInputStyled
              value={phone}
              onChangeText={setPhone}
              enablesReturnKeyAutomatically
              placeholderTextColor={theme.colors.placeholder}
              autoCapitalize="words"
              autoCorrect={false}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              placeholder="06 12 34 56 78"
              returnKeyLabel="done"
              returnKeyType="done"
              textContentType="telephoneNumber"
              onFocus={onTextFocusInput}
              onBlur={onTextFocusBlur}
            />
            {showError && <ErrorStyled>Veuillez rentrer un numero de téléphone valide</ErrorStyled>}
          </FormContainer>
          <TopButtonContainer>
            <ButtonPrimary
              content="Être recontacté"
              disabled={!phone}
              onPress={async () => {
                Keyboard.dismiss();
                if (!isMobilePhone(phone.replace(/\s/g, ''))) {
                  setShowError(true);
                  return;
                }
                if (showError) setShowError(false);
                await sendContact(name, phone, resultKey, answers);
                onActionButtonPress(CONSTANTS.ACTION_CONTACT);
                await matomo.logContactAskForBeingCalled();
              }}
            />
            <ButtonPrimary content="Appeler" onPress={onCallRequest} />
          </TopButtonContainer>
          <Extra>
            <TextStyled type="extra">
              Nos équipes sont des professionnels spécialisés en addictions et vous aideront à faire le point ou
              répondront à vos questions. Nos locaux sont situés à Montreuil -{' '}
            </TextStyled>
            <TextStyled
              onPress={() => {
                matomo.logContactWebsiteOpened();
                Linking.openURL('https://www.capasscite.fr/');
              }}
              type="link">
              Qui sommes nous ?
            </TextStyled>
          </Extra>
          <Extra>
            <TextStyled type="extra">
              Vous pouvez également nous joindre au{' '}
              <TextStyled type="number" onPress={onCallRequest}>
                01 48 57 14 21
              </TextStyled>{' '}
              (Du lundi au vendredi de 9h à 18h)
            </TextStyled>
          </Extra>
        </TopContainer>
      </ScreenBgStyled>
    </KeyboardAvoidingView>
  );
};

export default withTheme(ContactForm);

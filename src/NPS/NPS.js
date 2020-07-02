import React from 'react';
import styled, { css } from 'styled-components';
import { Modal, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TextStyled from '../components/TextStyled';
import H2 from '../components/H2';
import H3 from '../components/H3';
import Background from '../components/Background';
import ButtonPrimary from '../components/ButtonPrimary';
import matomo from '../matomo';
import CONSTANTS from '../reference/constants';
import UnderlinedButton from '../components/UnderlinedButton';

const formatText = (useful, reco, feedback) =>
  `
userId: ${matomo.getUserId()}
Ce service vous a-t-il été utile: ${useful}
Quelle est la probabilité que vous recommandiez ce service à un ami ou un proche: ${reco}
Comment pouvons-nous vous être encore plus utile: ${feedback}
`;

const NPSTimeoutMS = 1000 * 60 * 60 * 24 * 3;

class NPS extends React.Component {
  state = {
    visible: false,
    useful: null,
    reco: null,
    feedback: '',
    sendButton: 'Envoyer',
  };

  async componentDidMount() {
    const NPSDone = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_NPS_DONE);
    if (NPSDone) return;

    const appFirstOpening = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_INITIAL_OPENING);
    if (!appFirstOpening) {
      await AsyncStorage.setItem(CONSTANTS.STORE_KEY_INITIAL_OPENING, new Date().toISOString());
      this.props.notificationService.scheduleNotification({
        date: new Date(Date.now() + NPSTimeoutMS),
        title: CONSTANTS.NOTIF_NPS_TITLE,
        message: CONSTANTS.NOTIF_NPS_MESSAGE,
      });
      return;
    }

    const opening = await AsyncStorage.getItem(CONSTANTS.STORE_KEY_INITIAL_OPENING);
    const timeForNPS = Date.now() - Date.parse(new Date(opening)) > NPSTimeoutMS;
    if (!timeForNPS) return;
    matomo.logNPSOpen();
    await AsyncStorage.setItem(CONSTANTS.STORE_KEY_NPS_DONE, 'true');
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ visible: true });
  }

  setUseful = useful => this.setState({ useful });
  setReco = reco => this.setState({ reco });
  setFeedback = feedback => this.setState({ feedback });
  setSendButton = sendButton => this.setState({ sendButton });
  onClose = async () => {
    this.setState({ visible: false });
  };

  sendNPS = async () => {
    const { useful, reco, feedback } = this.state;
    this.setSendButton('Merci !');
    matomo.logNPSSend();
    await fetch('https://api.tipimail.com/v1/messages/send', {
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
            address: 'nps_addicto@selego.co',
          },
        ],
        msg: {
          from: {
            address: 'addicto@selego.co',
            personalName: 'App Addicto',
          },
          subject: 'NPS Addicto',
          text: formatText(useful, reco, feedback),
        },
      }),
    }).catch(err => console.log('sendNPS err', err));
    this.onClose();
  };

  render() {
    const { visible, useful, reco, feedback, sendButton } = this.state;
    return (
      <Modal visible={visible} animationType="slide" onDismiss={this.onClose}>
        <SafeAreaProvider>
          <Background color="whiteBg">
            <Container>
              <KeyboardAvoidingViewStyled
                behavior={Platform.select({ ios: 'padding', android: null })}
                keyboardVerticalOffset={Platform.select({ ios: 50, android: 250 })}>
                <ScreenBgStyled>
                  <CloseNPS>
                    <UnderlinedButton content="Fermer" bold onPress={this.onClose} />
                  </CloseNPS>
                  <TopTitle>
                    <TextStyled type="title">Vos retours sont importants pour nous</TextStyled>
                  </TopTitle>
                  <TopSubTitle>
                    <TextStyled type="basicText">
                      Ce service vous a-t-il été utile{'\u00A0'}?
                    </TextStyled>
                  </TopSubTitle>
                  <Mark selected={useful} onPress={this.setUseful} />
                  <MarkHint>
                    <TextStyled type="light">Pas utile du tout</TextStyled>
                    <TextStyled type="light">Extrêmement utile</TextStyled>
                  </MarkHint>
                  <TopSubTitle>
                    <TextStyled type="basicText">
                      Quelle est la probabilité que vous recommandiez ce service à un ami ou un
                      proche
                      {'\u00A0'}?
                    </TextStyled>
                  </TopSubTitle>
                  <Mark selected={reco} onPress={this.setReco} />
                  <MarkHint>
                    <TextStyled type="light">Pas du tout probable</TextStyled>
                    <TextStyled type="light">Très probable</TextStyled>
                  </MarkHint>
                  <TopSubTitle>
                    <TextStyled type="basicText">
                      Comment pouvons-nous vous être encore plus utile{'\u00A0'}? Comment
                      pouvons-nous améliorer ce service{'\u00A0'}?
                    </TextStyled>
                  </TopSubTitle>
                  <FeedBackStyled
                    onChangeText={this.setFeedback}
                    value={feedback}
                    multiline
                    textAlignVertical="top"
                  />
                  <ButtonContainer>
                    <ButtonPrimary
                      content={sendButton}
                      disabled={sendButton === 'Merci !' || (!useful && !reco && !feedback.length)}
                      onPress={this.sendNPS}
                    />
                  </ButtonContainer>
                </ScreenBgStyled>
              </KeyboardAvoidingViewStyled>
            </Container>
          </Background>
        </SafeAreaProvider>
      </Modal>
    );
  }
}

const Mark = ({ onPress, selected }) => (
  <MarkContainer>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mark, i, arr) => (
      <MarkButton onPress={() => onPress(mark)} key={mark}>
        <MarkStyled withMargin={i !== arr.length - 1} selected={mark === selected}>
          <MarkText selected={mark === selected}>{mark}</MarkText>
        </MarkStyled>
      </MarkButton>
    ))}
  </MarkContainer>
);

const Container = styled.View`
  height: 100%;
  width: ${Dimensions.get('window').width}px;
`;

const paddingHorizontal = 30;
const ScreenBgStyled = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.whiteBg};
  flex-shrink: 1;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 100%;
  padding: 20px ${paddingHorizontal}px ${props => (props.shortPaddingBottom ? 30 : 100)}px;
`;

const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView`
  flex: 1;
  min-height: 100%;
`;

const commonCss = css`
  width: 95%;
  flex-shrink: 0;
`;

const TopTitle = styled(H2)`
  ${commonCss}
  margin-top: 10px;
  margin-bottom: 20px;
`;

const TopSubTitle = styled(H3)`
  ${commonCss}
`;

const MarkContainer = styled.View`
  ${commonCss}
  margin-vertical: 15px;
  flex-direction: row;
  width: 100%;
`;

const MarkStyled = styled.View`
  height: 40px;
  ${props => props.withMargin && 'margin-right: 3px;'}
  border: 1px solid #b8b8b8;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  ${props => props.selected && `background-color: ${props.theme.colors.title};`}
`;

const MarkText = styled(H2)`
  font-weight: bold;
  color: ${({ selected, theme: { colors } }) => (selected ? colors.whiteBg : colors.basicText)};
`;

const MarkButton = styled.TouchableOpacity`
  flex-basis: 20px;
  flex-grow: 1;
`;

const MarkHint = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

const FeedBackStyled = styled.TextInput`
  width: 100%;
  height: 100px;
  border-radius: 3px;
  border: 1px solid #b8b8b8;
  padding: 5px;
  margin-top: 15px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ButtonContainer = styled.View`
  margin-vertical: 20px;
  align-items: flex-start;
  flex-grow: 0;
  flex-direction: row;
  justify-content: space-around;
  margin-left: -${paddingHorizontal}px;
  width: ${({ theme }) => theme.dimensions.screen.width}px;
  margin-bottom: 150px;
`;

export const CloseNPS = styled.View`
  margin-left: auto;
`;
export default NPS;

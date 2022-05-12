import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import ButtonPrimary from '../../components/ButtonPrimary';
import H2 from '../../components/H2';
import TextStyled from '../../components/TextStyled';
import UnderlinedButton from '../../components/UnderlinedButton';
import { TIPIMAIL_API_KEY, TIPIMAIL_API_USER, TIPIMAIL_EMAIL_FROM } from '../../config';
import { withToast } from '../../services/toast';
import { defaultPadding } from '../../styles/theme';
import { getHTMLExport } from '../ConsoFollowUp/consoDuck';

const emailFormat = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(email);
class Export extends Component {
  state = {
    email: '',
  };

  setEmail = (email) => this.setState({ email });

  exportData = async () => {
    const { email } = this.state;
    if (!emailFormat(email)) {
      Alert.alert('Adresse email non valide');
      return;
    }
    const { htmlExport, setToast, onBackPress } = this.props;
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
    setToast(`Email envoyé à ${email}`);
    onBackPress();
  };

  render() {
    const { email } = this.state;
    const { navigation } = this.props;
    return (
      <Container>
        <BackButton content="< Retour" onPress={navigation.goBack} bold />
        <SubContainer>
          <Title>
            <TextStyled color="#4030a5">Exporter mes données</TextStyled>
          </Title>
          <TextInputStyled
            value={email}
            ref={(r) => (this.emailInput = r)}
            placeholder="Adresse email"
            onChangeText={this.setEmail}
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="go"
            textContentType="emailAddress"
            onSubmitEditing={this.sendNPS}
          />
          <ButtonsContainer>
            <ButtonPrimary content="Envoyer" disabled={!email} onPress={this.exportData} />
          </ButtonsContainer>
        </SubContainer>
      </Container>
    );
  }
}

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  flex: 1;
  padding-horizontal: ${defaultPadding}px;
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

const BackButton = styled(UnderlinedButton)`
  margin-right: auto;
  margin-left: -20px;
`;

const makeStateToProps = () => (state) => ({
  htmlExport: getHTMLExport(state),
});

export default compose(connect(makeStateToProps), withToast)(Export);

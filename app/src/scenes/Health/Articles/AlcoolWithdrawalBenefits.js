import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import ButtonPrimary from '../../../components/ButtonPrimary';
import styled from 'styled-components';
import { screenWidth } from '../../../styles/theme';
import { logEvent } from '../../../services/logEventsWithMatomo';

const AlcoolWithdrawalBenefits = () => {
  const title = 'Les bénéfices au sevrage';
  const navigation = useNavigation();
  return (
    <NavigationWrapper title={title} timeReading={2}>
      <TopContainer>
        <H2 color={'#4030a5'} underline>
          Court terme
        </H2>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits1.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits2.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits3.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits4.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits5.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits6.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits7.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits8.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits9.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits10.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits11.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits12.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <P>
          Selon le degré initial d'habitation au corps à l'alcool, il peut y avoir des <Bold>symptômes de sevrage</Bold>{' '}
          lors de l'arrêt des consommations, les plus connus sont&nbsp;:
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>transpiration,
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>anxiété et nervosité,
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>agitation,
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>sentiment de « malaise »,
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>insomnie,
        </P>
        <P noMarginBottom>
          <Bold>{'   •  '}</Bold>nausées,
        </P>
        <P>
          Ces symptômes s'ils restent légers ne sont pas dangereux en soi et disparaissent habituellement au bout de 7 à
          10 jours d'abstinence.
        </P>
        <P>
          Mais si vous présentez des symptômes importants, qui vous inquiètent comme des tremblements, n'hésitez pas à
          en parler à un médecin ou un professionnel Oz.
        </P>
        <Spacer size={20} />
        <ButtonPrimary
          content={'Contacter un addictologue'}
          onPress={() => {
            logEvent({
              category: 'CONTACT',
              action: 'CONTACT_OPEN',
              name: 'HEALTH',
            });
            navigation.navigate('CONTACT');
          }}
          widthSmall
          small
        />
        <Spacer size={50} />
        <H2 color={'#4030a5'} underline>
          Moyen terme
        </H2>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_1.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_2.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_3.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_4.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_5.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_6.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_7.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_8.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_9.png')} />
        </ImageContainer>
        <Spacer size={50} />
        <H2 color={'#4030a5'} underline>
          Long terme
        </H2>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP3.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP3_2.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP3_3.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP3_4.png')} />
        </ImageContainer>
        <Spacer size={20} />
      </TopContainer>
    </NavigationWrapper>
  );
};

const ImageContainer = styled.View`
  align-items: center;
`;

const ImageStyled = styled.Image`
  width: ${screenWidth * 0.85}px;
  height: ${screenWidth * 0.85}px;
`;

export default AlcoolWithdrawalBenefits;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Spacer, P, TopContainer, Bold } from '../../../components/Articles';
import H2 from '../../../components/H2';
import NavigationWrapper from './NavigationWrapper';
import ButtonPrimary from '../../../components/ButtonPrimary';
import styled from 'styled-components';
import { screenWidth } from '../../../styles/theme';
import { logEvent } from '../../../services/logEventsWithMatomo';
import { View, Text } from 'react-native';

const AlcoolWithdrawalBenefits = () => {
  const title = 'Les bénéfices au sevrage';
  const navigation = useNavigation();
  return (
    <NavigationWrapper title={title} timeReading={4}>
      <TopContainer>
        <H2 color={'#4030a5'}>8 clés pour maitriser sa consommation</H2>
        <Spacer size={20} />
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">1</Text>
          </View>
          <Text className="font-semibold">Se fixer un objectif d'arrêt ou de réduction</Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">2</Text>
          </View>
          <Text className="font-semibold">Ne pas avoir d'alcool disponible à la maison </Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">3</Text>
          </View>
          <Text className="font-semibold">Ne pas prendre «{'\u00A0'}juste un verre de plus{'\u00A0'}» qui en appelle un autre </Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">4</Text>
          </View>
          <Text className="font-semibold">Ne pas « compenser » avec du tabac, café, sucre </Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">5</Text>
          </View>
          <Text className="font-semibold">Éviter les consommations déclenchant l'envie</Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">6</Text>
          </View>
          <Text className="font-semibold">S'hydrater régulièrement et en grande quantité</Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">7</Text>
          </View>
          <Text className="font-semibold">L'envie de consommer dure 15 min{'\u00A0'}: distrayez-vous</Text>
        </View>
        <View className="flex flex-row space-x-1 items-center mb-4">
          <View className="rounded-full w-7 aspect-square bg-[#4030A5] flex flex-row justify-center items-center">
            <Text className="text-white font-bold text-base">8</Text>
          </View>
          <Text className="font-semibold">Faire de l'exercice physique pour gérer le stress</Text>
        </View>
        <Spacer size={20} />
        <H2 color={'#4030a5'}>
          Bénéfices à <Text className="underline">court terme</Text>
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
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits13.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits14.png')} />
        </ImageContainer>
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/Benefits15.png')} />
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
          <Bold>{'   •  '}</Bold>sentiment de «&nbsp;malaise&nbsp;»,
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
        <H2 color={'#4030a5'}>
          Bénéfices à <Text className="underline">moyen terme</Text>
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
        <Spacer size={20} />
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP2_10.png')} />
        </ImageContainer>
        <Spacer size={50} />
        <H2 color={'#4030a5'}>
          Bénéfices à <Text className="underline">long terme</Text>
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
        <ImageContainer>
          <ImageStyled source={require('../../../assets/images/withdrawalBenefits/BenefitsP3_5.png')} />
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

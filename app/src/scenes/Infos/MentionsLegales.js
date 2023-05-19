import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import TextStyled from '../../components/TextStyled';
import BackButton from '../../components/BackButton';
import Pdf from 'react-native-pdf';
import { defaultPaddingFontScale } from '../../styles/theme';

const pdfUrl = 'https://ozensemble.fr/files/12052023-Mentionslegales_App-OzEnsemble.pdf';

const MentionsLegales = ({ onClose }) => (
  <View className="flex-1 justify-start items-center mt-6">
    <View className="flex flex-row w-full mb-4" style={{ paddingHorizontal: defaultPaddingFontScale() }}>
      <BackButton onPress={onClose} />
    </View>
    <Pdf
      trustAllCerts={false}
      source={{
        uri: pdfUrl,
        cache: true,
      }}
      className="flex-1 w-screen h-screen"
    />
  </View>
);

const P = styled(TextStyled)`
  margin-bottom: 15px;
`;

const Spacer = styled.View`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
`;

export default MentionsLegales;

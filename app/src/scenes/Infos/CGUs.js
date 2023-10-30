import React from 'react';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';

const pdfUrl = 'https://ozensemble.fr/files/CGU_app.pdf';

const CGUs = ({ onClose }) => (
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

export default CGUs;

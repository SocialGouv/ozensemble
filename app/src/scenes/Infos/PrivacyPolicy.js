import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

const pdfUrl =
  'https://ozensemble.fr/files/11042023_oz_ensemble_politique_de_confidentialit%C3%A9_de_l_application_v_3.pdf';

const PrivacyPolicy = ({ onClose }) => (
  <View style={styles.container}>
    <Pdf
      trustAllCerts={false}
      source={{
        uri: pdfUrl,
        cache: true,
      }}
      style={styles.pdf}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PrivacyPolicy;

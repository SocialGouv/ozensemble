import React from 'react';
import { View, Text } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import WrapperContainer from '../../components/WrapperContainer';
import BackButton from '../../components/BackButton';
import ProfilIcon from '../../components/illustrations/ProfilIcon';
import testimonies from '../../reference/TestimoniesList';

const Testimonies = ({ navigation }) => {
  return (
    <WrapperContainer title="Témoignages" onPressBackButton={navigation.goBack}>
      <View className="mt-8 flex justify-start">
        {testimonies.map((testimony, index) => {
          return (
            <React.Fragment key={index}>
              <View key={index} className="flex flex-row gap-4 mb-10">
                <ProfilIcon size={40} />
                <View>
                  <Text className="mr-14">{testimony.text}</Text>
                  <Text className="text-[#4030A5] font-bold mt-5">{testimony.pseudo}</Text>
                </View>
              </View>
              {index % 2 === 0 ? (
                <View className="items-center border-[#DBDBE8] bg-[#EFEFEF] rounded-lg border mb-10 p-4">
                  <Text className="font-bold mb-6">
                    Vous aussi partagez votre témoignage anonymement, et donnez du courage à ceux qui en ont besoin.{' '}
                  </Text>
                  <ButtonPrimary
                    color="#4030A5"
                    content="Partager mon témoignage"
                    onPress={() => {
                      navigation.navigate('OWN_TESTIMONY');
                    }}
                  />
                </View>
              ) : (
                <View className="left-1/4 w-1/2 h-O border rounded-xl mb-10 -ml-4 border-[#4030A5]"></View>
              )}
            </React.Fragment>
          );
        })}

        <BackButton content="< Retour" bold onPress={navigation.goBack} bottom />
      </View>
    </WrapperContainer>
  );
};
export default Testimonies;

import React, { useEffect, useState } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import BackButton from '../../components/BackButton';
import { defaultPaddingFontScale } from '../../styles/theme';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import TextStyled from '../../components/TextStyled';
import ButtonPrimary from '../../components/ButtonPrimary';
import CocktailGlass from '../../components/illustrations/drinksAndFood/CocktailGlass';
import H3 from '../../components/H3';
import H2 from '../../components/H2';
import API from '../../services/api';
const AddCocktail = ({ navigation }) => {
  const [cocktailsCatalog, setCocktailsCatalog] = useState([]);
  const getCocktailsCatalog = async () => {
    const res = await API.get({ path: '/drinks/cocktails' });
    setCocktailsCatalog(res.data);
  };

  const [newCocktailName, setNewCocktailName] = useState('');

  useEffect(() => {
    if (cocktailsCatalog.length === 0) {
      getCocktailsCatalog();
    }
  }, [cocktailsCatalog]);
  return (
    <View className="h-full bg-white py-10">
      <View className="bg-white rounded-xl mt-auto absolute bottom-0 w-full h-full shadow-xl shadow-[#5E5E5E]">
        <ScrollView className="pb-5" style={{ padding: defaultPaddingFontScale() }}>
          <BackButton content="Retour" bold onPress={() => navigation.goBack()} />
          <H2 color="#4030a5" className="mt-5 mb-4">
            Sélectionnez un cocktail
          </H2>
          <TextStyled italic className="text-xs mb-4">
            Cliquez sur un cocktail pour compléter le champ. Si votre dose d'alcool est plus importante, revenez en
            arrière et cliquez sur «non» pour paramétrer la quantité d'alcool.
          </TextStyled>
          {cocktailsCatalog.map((cocktail) => {
            return (
              <TouchableOpacity
                key={cocktail.drinkKey}
                className="flex flex-row bg-[#F3F3F6] h-12 mb-3 rounded-lg border border-[#DBDBE8] items-center px-2"
                onPress={() => {
                  //TODO
                }}>
                <CocktailGlass size={32} />
                <View className="flex flex-row flex-wrap ml-2 w-10/12">
                  <TextStyled bold className="">
                    {cocktail.displaySelection} :{' '}
                  </TextStyled>
                  <Text>{cocktail.volume}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <View className="mt-7 mb-20">
            <H3 bold color="#4030a5">
              {'Vous ne trouvez pas votre cocktail\u00A0?'}
            </H3>
            <TextStyled italic className="text-xs mt-3 mb-5 flex flex-col">
              Demandez à ce qu'il soit ajouté à la liste ci-dessus.
            </TextStyled>
            <TextInput
              className="bg-[#F3F3F6] h-14 rounded-lg border border-[#DBDBE9] text-[#4030A5] px-4 my-2"
              placeholder="Nom d'un nouveau cocktail"
              onChangeText={setNewCocktailName}
              value={newCocktailName}
            />
            <View className="flex flex-row mt-3">
              <ButtonPrimary small content={'Envoyer'} disabled={newCocktailName === ''} />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AddCocktail;

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import TextStyled from '../../components/TextStyled';
import {
    ScreenBgStyled,
    TopContainer,
    Title
} from '../ConsoFollowUp/styles';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import { createStackNavigator } from '@react-navigation/stack';
import Goal from './Goal';
import MesGains from './MesGains';

const GainsStack = createStackNavigator();

const GainsNavigator = () => {
    const [initialScreen, setInitialScreen] = useState(null);
    const initNavigator = async () => {
        return setInitialScreen("GAINS");
    };
    useEffect(() => {
        initNavigator();
    }, []);
    return (
        <Background color="#39cec0" withSwiperContainer>
            <HeaderBackground />
            {!!initialScreen && (
                <GainsStack.Navigator headerMode="none" initialRouteName={initialScreen}>
                    <GainsStack.Screen name="GAINS" component={MesGains} />
                    <GainsStack.Screen name="OBJECTIF" component={Goal} />
                </GainsStack.Navigator>
            )}
        </Background>
    );
};


export default GainsNavigator;



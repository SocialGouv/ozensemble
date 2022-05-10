import React, { useState, useEffect } from 'react';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';
import { createStackNavigator } from '@react-navigation/stack';
import Goal from './Goal';
import MesGains from './MesGains';
import CountConsumptiom from './CountConsumption';
import Consumptions from './Consumptions';
import Estimation from './Estimation';
import SevragesSign from './SevragesSign';

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
                    <GainsStack.Screen name="GOAL" component={Goal} />
                    <GainsStack.Screen name="HOWCOUNT" component={CountConsumptiom} />
                    <GainsStack.Screen name="CONSUMPTIONS" component={Consumptions} />
                    <GainsStack.Screen name="ESTIMATION" component={Estimation} />
                    <GainsStack.Screen name="SEVRAGESIGN" component={SevragesSign} />
                </GainsStack.Navigator>
            )}
        </Background>
    );
};


export default GainsNavigator;



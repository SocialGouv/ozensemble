import React from 'react';
import { connect } from 'react-redux';
import TextStyled from '../../components/TextStyled';
import {
    ScreenBgStyled,
    TopContainer,
    Title
} from '../ConsoFollowUp/styles';
import Background from '../../components/Background';
import HeaderBackground from '../../components/HeaderBackground';


const Gains = () => {

    return (
        <Background color="#39cec0" withSwiperContainer>
            <HeaderBackground />
            <ScreenBgStyled>
                <TopContainer>
                    <Title>
                        <TextStyled color="#4030a5">Mes gains</TextStyled>
                    </Title>
                </TopContainer>
            </ScreenBgStyled>
        </Background>
    );
};


export default Gains;

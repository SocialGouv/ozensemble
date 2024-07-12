import styled from "styled-components";
import TextStyled from "../../components/TextStyled";
import { listConseils } from "./ListConseil";
import { defaultPaddingFontScale, screenHeight, screenWidth } from "../../styles/theme";
import { logEvent } from "../../services/logEventsWithMatomo";
import WrapperContainer from "../../components/WrapperContainer";

const Conseils = ({ navigation }) => {
  return (
    <WrapperContainer
      title="Mes articles conseils"
      onPressBackButton={() => {
        navigation.goBack();
      }}>
      <ViewConseilsContainer>
        {listConseils.map((conseil, index) => (
          <ConseilContainer
            onPress={() => {
              logEvent({
                category: "HEALTH",
                action: "HEALTH_ARTICLE",
                name: conseil.title,
              });
              navigation.navigate(conseil.link);
            }}
            key={index}>
            <ImageStyled source={conseil.img} />
            <TitleConseilContainer>
              <TextStyled> {conseil.title}</TextStyled>
            </TitleConseilContainer>
          </ConseilContainer>
        ))}
        <Space />
      </ViewConseilsContainer>
    </WrapperContainer>
  );
};

const ViewConseilsContainer = styled.View`
  margin-left: -${defaultPaddingFontScale()}px;
  margin-right: -${defaultPaddingFontScale()}px;
  margin-top: 20px;
  padding-left: ${defaultPaddingFontScale()}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ConseilContainer = styled.TouchableOpacity`
  shadow-color: #000000cc;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.34;
  shadow-radius: 6.27px;
  elevation: 10;
  width: ${screenWidth * 0.4}px;
  border-radius: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const TitleConseilContainer = styled(TextStyled)`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const ImageStyled = styled.Image`
  width: ${screenWidth * 0.4}px;
  height: ${screenHeight * 0.15}px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;

const Space = styled.View`
  width: 50px;
`;

export default Conseils;

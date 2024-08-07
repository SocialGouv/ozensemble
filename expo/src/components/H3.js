import styled, { css } from "styled-components";
import { mediaHeight } from "../styles/mediaQueries";
import TextStyled from "./TextStyled";

const bigH3 = css`
  font-size: 16px;
  line-height: 18px;
`;

const mediumH3 = css`
  font-size: 16px;
  line-height: 20px;
`;

const smallH3 = css`
  font-size: 16px;
  line-height: 16px;
`;

const H3 = styled(TextStyled)`
  color: ${({ color }) => (color ? color : "#191919")};
  ${bigH3}
  ${mediaHeight.medium`${mediumH3}`}
  ${mediaHeight.small`${smallH3}`}
`;

export default H3;

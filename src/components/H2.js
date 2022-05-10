import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';

const bigH2 = css`
  font-size: 20px;
  line-height: 30px;
`;

const mediumH2 = css`
  font-size: 17.5px;
  line-height: 23px;
`;

const smallH2 = css`
  font-size: 16px;
  line-height: 20px;
`;

const H2 = styled.Text`
  color: ${({ color }) => color ? color : "#191919"};;
  font-weight: bold;
  ${bigH2}
  ${mediaHeight.medium`${mediumH2}`}
  ${mediaHeight.small`${smallH2}`}
`;

export default H2;

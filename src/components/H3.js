import styled, { css } from 'styled-components';
import { mediaHeight } from '../styles/mediaQueries';

const bigH3 = css`
  font-size: 14px;
  line-height: 18px;
`;

const mediumH3 = css`
  font-size: 14px;
  line-height: 20px;
`;

const smallH3 = css`
  font-size: 14px;
  line-height: 16px;
`;

const H3 = styled.Text`
  color: ${({ color }) => color ? color : "#191919"};;
  ${bigH3}
  ${mediaHeight.medium`${mediumH3}`}
  ${mediaHeight.small`${smallH3}`}
`;

export default H3;

import styled, { css } from 'styled-components';
import H1 from '../../components/H1';

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

export const Title = styled(H1)`
  ${commonCss}
  margin-top: 10px;
`;

import styled, { css } from 'styled-components';
import H2 from '../../components/H2';

const commonCss = css`
  width: 85%;
  flex-shrink: 0;
`;

export const SubTitle = styled(H2)`
  ${commonCss}
  font-weight: 500;
  ${(props) => props.last && 'margin-bottom: 40px;'}
`;

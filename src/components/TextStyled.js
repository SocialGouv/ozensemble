import styled from 'styled-components';

const TextStyled = styled.Text`
  color: ${({ theme, type }) => {
    switch (type) {
      case 'title':
        return theme.colors.title;
      case 'basicText':
      case 'extra':
      default:
        return theme.colors.basicText;
      case 'buttonPrimary':
      case 'selected':
        return theme.colors.buttonPrimary;
      case 'link':
        return theme.colors.title;
      case 'light':
        return '#999999';
    }
  }};
  ${({ type }) => type === 'link' && 'text-decoration-line: underline;'}
  ${({ type, theme }) => type === 'number' && `color: ${theme.colors.buttonPrimary};`}
  font-style: ${({ type }) => {
    switch (type) {
      case 'title':
      case 'basicText':
      default:
        return 'normal';
      case 'extra':
      case 'number':
      case 'link':
        return 'italic';
    }
  }};
  ${props => props.bold && 'font-weight: bold;'}
`;

export default TextStyled;

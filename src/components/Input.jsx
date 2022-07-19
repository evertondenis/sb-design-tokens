import { styled } from '@storybook/theming';

export const Input = styled.input(() => ({
  appearance: 'none',
  background: '#ffffff',
  border: '0 none',
  borderRadius: '4px',
  boxShadow: 'rgb(0 0 0 / 10%) 0 0 0 1px inset',
  boxSizing: 'inherit',
  color: '#333333',
  display: ' block',
  fontSize: '13px',
  lineHeight: '20px',
  margin: ' 0',
  padding: '6px 10px',
  position: 'relative',
  transition: 'all 200ms ease-out',
  width: '100%',

  '&:focus': {
    boxShadow: 'rgb(30 165 253) 0 0 0 1px inset',
    outline: 'none'
  },
  '&[disabled]': {
    cursor: 'not-allowed',
    opacity: 0.5
  },

  '&:-webkit-autofill': {
    // WebkitBoxShadow: `0 0 0 3em ${theme.color.lightest} inset`
  },

  '::placeholder': {
    color: '#333333',
  }
}));
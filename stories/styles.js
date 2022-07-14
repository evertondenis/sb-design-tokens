import styled from 'styled-components';
import './assets/_colors.css'
import './assets/_typography.css'

export const StyledButton = styled.button`
  border: 0;
  background-color: var(--w-color-brandcolor-primary);
`

export const StyledText = styled.p`
  color: var(--w-color-additional-add-04);
  font-family: var(--token-font-family-01);
  font-weight: var(--token-font-weight-bold);
  font-size: var(--token-font-size-giant);
`

export const StyledPanel = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--w-color-gradient-02);
`
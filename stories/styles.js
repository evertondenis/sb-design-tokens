import styled from 'styled-components';
import './assets/_colors.css'
import './assets/_typography.css'
import './assets/_spacers.css'

export const StyledButton = styled.button`
  border: 0;
  padding: var(--token-space-stack-sm);
  color: var(--token-color-neutral-neu-01);
  background-color: var(--token-color-brandcolor-primary);
`

export const StyledText = styled.p`
  color: var(--token-color-additional-add-04);
  font-family: var(--token-font-family-01);
  font-weight: var(--token-font-weight-bold);
  font-size: var(--token-font-size-giant);
`

export const StyledPanel = styled.div`
  width: 100%;
  height: 100vh;
  background: 'tomato';
`
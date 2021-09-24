import styled from "styled-components"

export const ButtonContainer = styled.button`
height: 50px;
border-radius: 8px;
font-weight: 500;
background: #835afd;
color: #FFF;
padding: 0 32px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
border: 0;
transition: filter 0.2s;

&:not(:disabled):hover {
  filter: brightness(0.9)
}

&:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
`

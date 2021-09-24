import { useParams } from 'react-router-dom'

import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'

import {
  Container,
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  RoomContainer,
  RoomTitleContainer,
  RoomTitle,
  RoomQuestions,
  FormContainer,
  FormTextArea,
  FormFooter,
  FormFooterText,
  FooterTextButton,
} from './styles'

import logoImg from '../../assets/images/logo.svg'

type RoomParams = {
  id: string;
}

export const Room = () => {
  const { id } = useParams<RoomParams>()

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <HeaderLogo src={logoImg} alt="Letmeask" />
          <RoomCode code={id} />
        </HeaderContent>
      </HeaderContainer>
      <RoomContainer>
        <RoomTitleContainer>
          <RoomTitle>Sala React</RoomTitle>
          <RoomQuestions>4 perguntas</RoomQuestions>
        </RoomTitleContainer>
        <FormContainer>
          <FormTextArea placeholder="O que vocẽ quer perguntar?" />
          <FormFooter>
            <FormFooterText>
              Para enviar uma pergunta, <FooterTextButton>faça seu login</FooterTextButton>.
            </FormFooterText>
            <Button type="submit">Enviar pergunta</Button>
          </FormFooter>
        </FormContainer>        
      </RoomContainer>
    </Container>
  )
}

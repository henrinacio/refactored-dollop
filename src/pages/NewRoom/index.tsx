import { useAuth } from '../../core/contexts/Auth'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'

import {
  Container,
  OnboardingContainer,
  Illustration,
  Title,
  Subtitle,
  LoginContainer,
  MainContent,
  Logo,
  CreateRoomButton,
  FormContainer,
  RoomCodeInput,
  CreateRoomTitle,
  EnterRoomText,
  EnterRoomLink
 } from './styles'

export const NewRoom = () => {
  const { user } = useAuth()

  return (
    <Container>
      <OnboardingContainer>
        <Illustration src={illustrationImg} alt='Ilustração simbolizando perguntas e respostas' />
        <Title>
          Crie salas de Q&amp;A ao-vivo
        </Title>
        <Subtitle>
          Tire as dúvidas da sua audiência em tempo real
        </Subtitle>
      </OnboardingContainer>
      <LoginContainer>
        <MainContent>
          <Logo src={logoImg} alt='Letmeask' />
          <h1>{user?.name}</h1>
          <CreateRoomTitle>
            Criar uma nova sala
          </CreateRoomTitle>
          <FormContainer>
            <RoomCodeInput
              type='text'
              placeholder='Nome da sala'
            />
            <CreateRoomButton type='submit'>
              Criar sala
            </CreateRoomButton>
          </FormContainer>
          <EnterRoomText>
            Quer entrar em uma sala existente? <EnterRoomLink to="/">clique aqui</EnterRoomLink>
          </EnterRoomText>
        </MainContent>
      </LoginContainer>
    </Container>
  )
}

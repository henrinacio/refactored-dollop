import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../core/contexts/Auth'
import { get } from '../../core/services/firebase'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

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
  Separator,
  GoogleIcon,
  FormContainer,
  RoomCodeInput,
  EnterRoomButton
 } from './styles'

export const Home = () => {
  const { user, signInWithGoogle } = useAuth()
  const history = useHistory()
  const [roomCode, setRoomCode] = useState('')

  const handleCreateRoom = async () => {   
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const firebaseRoom = await get(`rooms/${roomCode}`)

    if (!firebaseRoom.exists()) {
      alert('Room does not exist')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

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
          <CreateRoomButton onClick={handleCreateRoom}>
            <GoogleIcon src={googleIconImg} alt='Logo do Google' />
            Crie sua sala com o Google
          </CreateRoomButton>
          <Separator>
            ou entre em uma sala
          </Separator>
          <FormContainer onSubmit={handleJoinRoom}>
            <RoomCodeInput 
              type='text' 
              placeholder='Digite o código da sala'
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <EnterRoomButton type='submit'>
              Entrar na sala
            </EnterRoomButton>
          </FormContainer>
        </MainContent>
      </LoginContainer>
    </Container>
  )
}

import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router'

import { useAuth } from '../../core/hooks/useAuth'
import { push } from '../../core/services/firebase'

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
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('')

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault()
    
    if (newRoom.trim() === '') {
      return
    }

    const createRoomData = {
      title: newRoom,
      authorId: user?.id,
    }

    const firebaseRoom = await push('rooms', createRoomData)

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <CreateRoomTitle>
            Criar uma nova sala
          </CreateRoomTitle>
          <FormContainer onSubmit={handleCreateRoom}>
            <RoomCodeInput
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={(e) => setNewRoom(e.target.value)}
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

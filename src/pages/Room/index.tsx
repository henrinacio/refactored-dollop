import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../../core/contexts/Auth'
import { push, onValue } from '../../core/services/firebase'

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
  UserInfoContainer,
  UserInfoAvatar,
  UserInfoName
} from './styles'

import logoImg from '../../assets/images/logo.svg'

type RoomParams = {
  id: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

export const Room = () => {
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParams>()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    onValue(`rooms/${roomId}`, (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions)
        .map(([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered
          }
        })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  const handleSendQuestion = async (e: FormEvent) => {
    e.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await push(`rooms/${roomId}/questions`, question)

    setNewQuestion('')
  }

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <HeaderLogo src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </HeaderContent>
      </HeaderContainer>
      <RoomContainer>
        <RoomTitleContainer>
          <RoomTitle>
            Sala {title}
          </RoomTitle>
          {questions.length > 0 &&
            <RoomQuestions>
              {questions.length} pergunta(s)
            </RoomQuestions>
          }
        </RoomTitleContainer>
        <FormContainer onSubmit={handleSendQuestion}>
          <FormTextArea
            placeholder="O que vocẽ quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <FormFooter>
            {user
              ? (
                <UserInfoContainer>
                  <UserInfoAvatar src={user.avatar} alt={user.name} />
                  <UserInfoName>
                    {user.name}
                  </UserInfoName>
                </UserInfoContainer>
              )
              : (
                <FormFooterText>
                  Para enviar uma pergunta, <FooterTextButton>faça seu login</FooterTextButton>.
                </FormFooterText>
              )
            }
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </FormFooter>
        </FormContainer>
      </RoomContainer>
    </Container>
  )
}

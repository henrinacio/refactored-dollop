import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../../core/hooks/useAuth'
import { push, remove } from '../../core/services/firebase'
import { useRoom } from '../../core/hooks/useRoom'

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
  UserInfoName,
  QuestionList,
  LikeButton,
  LikeIcon,
  LikeCount,
} from './styles'

import logoImg from '../../assets/images/logo.svg'
import likeImg from '../../assets/images/like.svg'
import { Question } from '../../components/Question'

type RoomParams = {
  id: string;
}

export const Room = () => {
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParams>()
  const { questions, title } = useRoom(roomId)
  const [newQuestion, setNewQuestion] = useState('')

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

  const handleLikeQuestion = async (questionId: string, likeId: string | undefined) => {
    if (likeId) {
      await remove(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
    } else {
      await push(`rooms/${roomId}/questions/${questionId}/likes`, {
        authorId: user?.id
      })
    }    
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
          <RoomTitle>Sala {title}</RoomTitle>
          {questions.length > 0 && <RoomQuestions>{questions.length} pergunta(s)</RoomQuestions>}
        </RoomTitleContainer>
        <FormContainer onSubmit={handleSendQuestion}>
          <FormTextArea
            placeholder="O que você quer perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />
          <FormFooter>
            {user
              ? (
                <UserInfoContainer>
                  <UserInfoAvatar src={user.avatar} alt={user.name} />
                  <UserInfoName>{user.name}</UserInfoName>
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
        <QuestionList>
          {questions.map((question) => (
            <Question key={question.id} content={question.content} author={question.author}>
              <LikeButton
                type='button'
                $liked={Boolean(question.likeId)}
                onClick={() => handleLikeQuestion(question.id, question.likeId)}
              >
                {question.likeCount > 0 && <LikeCount>{question.likeCount}</LikeCount>}
                <LikeIcon src={likeImg} $liked={Boolean(question.likeId)} />
              </LikeButton>
            </Question>
          ))}
        </QuestionList>        
      </RoomContainer>
    </Container>
  )
}

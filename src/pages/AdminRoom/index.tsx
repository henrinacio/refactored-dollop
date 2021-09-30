import { useParams, useHistory } from 'react-router-dom'

import { useRoom } from '../../core/hooks/useRoom'
import { remove, update, get } from '../../core/services/firebase'

import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'

import {
  Container,
  HeaderContainer,
  Header,
  Logo,
  RoomDetails,
  CloseRoomButton,
  RoomContainer,
  RoomTitleContainer,
  RoomTitle,
  RoomQuestions,
  QuestionList,
  ActionButton,
  ActionIcon
} from './styles'

import logoImg from '../../assets/images/logo.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'
import deleteImg from '../../assets/images/delete.svg'

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const history = useHistory()
  const { id: roomId } = useParams<RoomParams>()
  const { questions, title } = useRoom(roomId)

  const handleEndRoom = async () => {
    await update(`rooms/${roomId}`, { endedAt: new Date() })

    history.push('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await remove(`rooms/${roomId}/questions/${questionId}`)
    }
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await update(`rooms/${roomId}/questions/${questionId}`, {
      isAnswered: true,
    })
  }
  
  const handleHighlightQuestion = async (questionId: string) => {
    const isHighlighted = await get(`rooms/${roomId}/questions//${questionId}/isHighlighted`)

    if (isHighlighted.val()) {
      return await update(`rooms/${roomId}/questions/${questionId}`, {
        isHighlighted: false,
      })
    }

    await update(`rooms/${roomId}/questions/${questionId}`, {
      isHighlighted: true,
    })
  }

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <Logo src={logoImg} alt="Letmeask" />
          <RoomDetails>
            <RoomCode code={roomId} />
            <CloseRoomButton isOutlined onClick={handleEndRoom}>Encerrar sala</CloseRoomButton>
          </RoomDetails>
        </Header>
      </HeaderContainer>
      <RoomContainer>
        <RoomTitleContainer>
          <RoomTitle>Sala {title}</RoomTitle>
          {questions.length > 0 && <RoomQuestions>{questions.length} pergunta(s)</RoomQuestions>}
        </RoomTitleContainer>
        <QuestionList>
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted && !question.isAnswered}
            >
              {!question.isAnswered && (
                <>
                  <ActionButton type='button' onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                    <ActionIcon src={checkImg} alt="Marcar pergunta como respondida" />
                  </ActionButton>
                  <ActionButton type='button' onClick={() => handleHighlightQuestion(question.id)}>
                    <ActionIcon src={answerImg} alt="Dar destaque à pergunta" />
                  </ActionButton>
                </>
              )}
              <ActionButton type='button' onClick={() => handleDeleteQuestion(question.id)}>
                <ActionIcon src={deleteImg} alt="Remover pergunta" />
              </ActionButton>
            </Question>
          ))}
        </QuestionList>
      </RoomContainer>
    </Container>
  )
}

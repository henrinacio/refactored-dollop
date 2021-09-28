import { useParams, useHistory } from 'react-router-dom'

import { useRoom } from '../../core/hooks/useRoom'
import { remove, update } from '../../core/services/firebase'

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
  DeleteButton,
  DeleteIcon
} from './styles'

import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const history = useHistory()
  const { id: roomId } = useParams<RoomParams>()
  const { questions, title } = useRoom(roomId)

  const handleEndRoom = async () => {
    await update(`rooms/${roomId}`, { endedAt: new Date()})

    history.push('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if(window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await remove(`rooms/${roomId}/questions/${questionId}`)
    }
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
            <Question key={question.id} content={question.content} author={question.author}>
              <DeleteButton type='button'onClick={() => handleDeleteQuestion(question.id)}>
                <DeleteIcon src={deleteImg} alt="Remover pergunta" />
              </DeleteButton>
            </Question>
          ))}
        </QuestionList>        
      </RoomContainer>
    </Container>
  )
}

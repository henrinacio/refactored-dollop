import styled from 'styled-components'
import { Button } from '../../components/Button'

export const Container = styled.div``

export const HeaderContainer = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;
`

export const Header = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.img`
  max-height: 45px;
`

export const RoomDetails = styled.div`
  display: flex;
  gap: 16px;
`

export const CloseRoomButton = styled(Button)`
  height: 40px;
`

export const RoomContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
`

export const RoomTitleContainer = styled.div`
  margin: 32px 0 24px;
  display: flex;
  align-items: center;
`

export const RoomTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  color: #29292e;
`

export const RoomQuestions = styled.span`
  margin-left: 16px;
  background: #e559f9;
  border-radius: 9999px;
  padding: 16px;
  color: #FFF;
  font-weight: 500;
  font-size: 14px;
`

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`

export const UserInfoAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 25%;
`

export const UserInfoName = styled.span`
  margin-left: 8px;
  color: #29292e;
  font-weight: 500;
  font-size: 14px;
`

export const QuestionList = styled.div`
  margin-top: 32px;
`

export const DeleteButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  color: #737380;
  gap: 8px;
  transition: filter(0.2);

  &:hover {
    filter: brightness(0.7);
  }
`

export const DeleteIcon = styled.img``
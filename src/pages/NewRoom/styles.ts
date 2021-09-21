import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`

export const OnboardingContainer = styled.aside`
  flex: 7;
  background: #835afd;
  color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 120px 80px;
`

export const Illustration = styled.img`
  max-width: 320px;
`

export const Title = styled.strong`
  font: 700 36px 'Poppins', sans-serif;
  line-height: 42px;
  margin-top: 16px;
`

export const Subtitle = styled.p`
  font-size: 24px;
  line-height: 32px;
  margin-top: 16px;
  color: #f0f0f0;
`

export const LoginContainer = styled.main`
  flex: 8;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;
`

export const Logo = styled.img`
  align-self: center;
`

export const CreateRoomTitle = styled.h2`
  font-size: 24px;
  margin: 64px 0 24px;
  font-family: 'Poppin', sans-serif;
`

export const FormContainer = styled.form``

export const RoomCodeInput = styled.input`
  height: 50px;
  border-radius: 8px;
  padding: 0 16px;
  background: #FFF;
  border: 1px solid #a8a8b3;
  width: 100%;
`

export const CreateRoomButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`

export const EnterRoomText = styled.p`
  font-size: 14px;
  color: #737388;
  margin-top: 16px;
`

export const EnterRoomLink = styled(Link)`
  color: #e55ef9;
`
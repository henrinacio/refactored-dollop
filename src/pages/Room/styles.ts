import styled from 'styled-components'

export const Container = styled.div``

export const HeaderContainer = styled.header`
  padding: 24px;
  border-bottom: 1px solid #e2e2e2;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const HeaderLogo = styled.img`
  max-height: 45px;
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

export const FormContainer = styled.form``

export const FormTextArea = styled.textarea`
  width: 100%;
  border: 0;
  padding: 16px;
  border-radius: 8px;
  background: #fefefe;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  resize: vertical;
  min-height: 130px;
`

export const FormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

export const FormFooterText = styled.span`
  font-size: 14px;
  color: #737380;
  font-weight: 500;
`

export const FooterTextButton = styled.button`
  background: transparent;
  border: 0;
  color: #8354FD;
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`

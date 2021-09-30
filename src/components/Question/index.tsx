import { ReactNode } from "react"
import styled, { css } from "styled-components"

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

type ContainerProps = {
  $highlighted?: boolean;
  $answered?: boolean;
}

const Container = styled.div`
  background: #FEFEFE;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + & {
    margin-top: 8px;
  }

  ${({ $highlighted }: ContainerProps) => $highlighted && css`
    background: #F4F0FF;
    border: 1px solid #835AFD;
  `}

  ${({ $answered }: ContainerProps) => $answered && css`
    background: #DBDCDD;
  `}
`

const QuestionDescription = styled.p`
  color: #29292e;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 25%;
`

const Author = styled.span`
  margin-left: 8px;
  color: #737388;
  font-size: 14px;

  ${({ $highlighted }: ContainerProps) => $highlighted && css`
    color: #29292E;
  `}
`

const IconsContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const Question = ({ 
  content, 
  author, 
  children, 
  isAnswered = false, 
  isHighlighted = false,
}: QuestionProps) => {
  return (
    <Container $highlighted={isHighlighted} $answered={isAnswered}>
      <QuestionDescription>{content}</QuestionDescription>
      <Footer>
        <UserInfo>
          <Avatar src={author.avatar} alt={author.name} />
          <Author $highlighted={isHighlighted}>{author.name}</Author>
        </UserInfo>
        <IconsContainer>{children}</IconsContainer>
      </Footer>
    </Container>
  )
}
import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export const Button = ({isOutlined = false, ...props}: ButtonProps) => {
  return (
    <Container $outlined={isOutlined} {...props} />
  )
}

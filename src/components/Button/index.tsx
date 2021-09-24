import { ButtonHTMLAttributes } from 'react'
import { ButtonContainer } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  return (
    <ButtonContainer {...props} />
  )
}

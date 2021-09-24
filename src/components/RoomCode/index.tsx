import { ButtonContainer, ButtonAccessory, ButtonLabel } from './styles'

import copyImg from '../../assets/images/copy.svg'

type RoomCodeProps = {
  code: string;
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <ButtonContainer onClick={copyRoomCodeToClipboard}>
      <ButtonAccessory>
        <img src={copyImg} alt="" />
      </ButtonAccessory>
      <ButtonLabel>
        Sala {code}
      </ButtonLabel>
    </ButtonContainer>
  )
}

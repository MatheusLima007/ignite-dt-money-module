import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps {
  toggleNewtrasanctionModalOpen: () => void
}

export function Header({ toggleNewtrasanctionModalOpen }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={toggleNewtrasanctionModalOpen}>
          Nova Transação
        </button>
      </Content>
    </Container>
  )
}

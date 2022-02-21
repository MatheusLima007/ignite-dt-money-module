import ReactModal from 'react-modal'
import { Container, RadioBox, TransactionTypeButton } from './styles'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault()

    await createTransaction({ title, amount, category, type })

    onClose()
    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder="Título" />
        <input
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
          placeholder="Valor"
        />

        <TransactionTypeButton>
          <RadioBox type="button" activeColor="green" isActive={type === 'deposit'} onClick={() => setType('deposit')}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox type="button" activeColor="red" isActive={type === 'withdraw'} onClick={() => setType('withdraw')}>
            <img src={outcomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
        </TransactionTypeButton>

        <input
          type="text"
          value={category}
          onChange={event => setCategory(event.target.value)}
          placeholder="Categoria"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </ReactModal>
  )
}

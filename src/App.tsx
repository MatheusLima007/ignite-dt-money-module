import { useState } from 'react'
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyle } from './styles/global'
import { TransactionsProvider } from './hooks/useTransactions'

Modal.setAppElement('#root')

export function App() {
  const [isNewtrasanctionModalOpen, setIsNewtrasanctionModalOpen] = useState(false)
  const toggleNewtrasanctionModalOpen = () => setIsNewtrasanctionModalOpen(!isNewtrasanctionModalOpen)

  return (
    <TransactionsProvider>
      <Header toggleNewtrasanctionModalOpen={toggleNewtrasanctionModalOpen} />
      <Dashboard />

      <NewTransactionModal isOpen={isNewtrasanctionModalOpen} onClose={toggleNewtrasanctionModalOpen} />
      <GlobalStyle />
    </TransactionsProvider>
  )
}

import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: string
}

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextProps {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext<TransactionsContextProps>({} as TransactionsContextProps)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get('transactions').then(response => setTransactions(response.data.transactions))
  }, [])

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() })

    const { transactions: transaction } = response.data

    setTransactions([...transactions, transaction])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>{children}</TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)
  return context
}

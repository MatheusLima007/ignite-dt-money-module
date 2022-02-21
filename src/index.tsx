import { createServer, Model } from 'miragejs'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

createServer({
  models: {
    transactions: Model,
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1, 
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-12-12')
        },{
          id: 2, 
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 650,
          createdAt: new Date('2022-01-05')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => this.schema.all('transactions'))
    this.post('/transactions', (schema, request) => schema.create('transactions', JSON.parse(request.requestBody)))
  },
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

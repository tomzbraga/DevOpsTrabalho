require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pedidosRoutes = require('./routes/pedidos')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'pedidofacil-backend'
  })
})

app.use('/pedidos', pedidosRoutes)

app.get('/', (req, res) => {
  res.json({ mensagem: 'API PedidoFácil está no ar!' })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
  })
}

module.exports = app

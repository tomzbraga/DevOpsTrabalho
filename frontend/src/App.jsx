import { useState } from 'react'
import PedidoForm from './components/PedidoForm'
import PedidoList from './components/PedidoList'

export default function App() {
  const [novoPedido, setNovoPedido] = useState(null)

  return (
    <div className="container">
      <h1>🍔 PedidoFácil</h1>
      <PedidoForm onNovoPedido={setNovoPedido} />
      <PedidoList novoPedido={novoPedido} />
    </div>
  )
}
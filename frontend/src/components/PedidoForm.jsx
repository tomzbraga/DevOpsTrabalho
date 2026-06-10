import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function PedidoForm({ onNovoPedido }) {
  const [cliente, setCliente] = useState('')
  const [item, setItem] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async () => {
    if (!cliente.trim() || !item.trim()) {
      setErro('Preencha todos os campos.')
      return
    }
    setErro('')
    setCarregando(true)
    try {
      const resp = await axios.post(`${API_URL}/pedidos`, {
        cliente: cliente.trim(),
        item: item.trim(),
        quantidade: Number(quantidade)
      })
      onNovoPedido(resp.data)
      setCliente('')
      setItem('')
      setQuantidade(1)
    } catch (e) {
      setErro('Erro ao criar pedido. Verifique se a API está online.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="card">
      <h2>Novo Pedido</h2>
      <input
        placeholder="Nome do cliente"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
      />
      <input
        placeholder="Item do pedido (ex: X-Burguer)"
        value={item}
        onChange={e => setItem(e.target.value)}
      />
      <input
        type="number"
        min="1"
        placeholder="Quantidade"
        value={quantidade}
        onChange={e => setQuantidade(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={carregando}>
        {carregando ? 'Enviando...' : 'Fazer Pedido'}
      </button>
      {erro && <p className="erro">{erro}</p>}
    </div>
  )
}
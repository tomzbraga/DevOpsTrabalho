import { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function PedidoList({ novoPedido }) {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const carregarPedidos = async () => {
    try {
      const resp = await axios.get(`${API_URL}/pedidos`)
      setPedidos(resp.data)
    } catch (e) {
      setErro('Não foi possível carregar os pedidos.')
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    carregarPedidos()
  }, [])

  useEffect(() => {
    if (novoPedido) {
      setPedidos(prev => [novoPedido, ...prev])
    }
  }, [novoPedido])

  return (
    <div className="card">
      <h2>Pedidos Realizados</h2>
      {carregando && <p className="vazio">Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}
      {!carregando && pedidos.length === 0 && (
        <p className="vazio">Nenhum pedido ainda.</p>
      )}
      {pedidos.map(p => (
        <div key={p.id} className="pedido-item">
          <strong>#{p.id} — {p.cliente}</strong>
          <span>
            {p.quantidade}x {p.item} &nbsp;|&nbsp;
            <span className={`status-${p.status}`}>{p.status}</span>
          </span>
        </div>
      ))}
    </div>
  )
}
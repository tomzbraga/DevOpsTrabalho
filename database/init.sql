-- Script de inicialização do banco de dados PedidoFácil

CREATE TABLE IF NOT EXISTS pedidos (
    id          SERIAL PRIMARY KEY,
    cliente     VARCHAR(100) NOT NULL,
    item        VARCHAR(200) NOT NULL,
    quantidade  INTEGER      NOT NULL DEFAULT 1,
    status      VARCHAR(50)  NOT NULL DEFAULT 'pendente',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pedidos (cliente, item, quantidade, status) VALUES
    ('João Silva',    'X-Burguer',    2, 'pendente'),
    ('Maria Santos',  'Batata Frita', 1, 'pronto'),
    ('Carlos Souza',  'Refrigerante', 3, 'pendente');

DO $$
BEGIN
  RAISE NOTICE 'Banco de dados inicializado com sucesso!';
END $$;

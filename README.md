# 🍔 PedidoFácil — Sistema de Pedidos Online

Sistema full stack de pedidos, desenvolvido como trabalho prático de DevOps.

## Tecnologias

| Camada     | Tecnologia              |
| ---------- | ----------------------- |
| Frontend   | React + Vite + Nginx    |
| Backend    | Node.js + Express       |
| Banco      | PostgreSQL 15           |
| Containers | Docker + Docker Compose |
| CI/CD      | GitHub Actions          |
| Testes     | Jest + Supertest        |

---

## Como executar o projeto completo

### Pré-requisitos

- Docker Desktop instalado
- Git instalado

### 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/pedidofacil.git
cd pedidofacil
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
# Edite o .env se necessário
```

### 3. Suba todos os containers

```bash
docker compose up --build
```

### 4. Acesse o sistema

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001
- **Health check**: http://localhost:3001/health

---

## Como executar os testes

```bash
cd backend
npm install
npm test
```

---

## Como subir containers individualmente

```bash
# Apenas o banco:
docker compose up db

# Banco + backend:
docker compose up db backend

# Tudo:
docker compose up --build
```

---

## Como executar a pipeline CI/CD

A pipeline executa automaticamente ao fazer push para a branch main:

```bash
git add .
git commit -m "feat: minha alteração"
git push origin main
```

Acesse a aba **Actions** no GitHub para acompanhar.

---

## Validação do projeto

### 1. Testar os testes:
```bash
cd backend && npm test
# Todos os testes devem passar (✓)
```

### 2. Testar o Docker Compose completo:
```bash
cd .. # raiz do projeto
docker compose up --build
# Aguardar todos os containers ficarem healthy
```

### 3. Verificar saúde dos containers:
```bash
docker compose ps
# Todos devem mostrar "healthy" ou "running"
```

### 4. Verificar logs:
```bash
docker compose logs backend
docker compose logs frontend
docker compose logs db
```

### 5. Testar a API:
```bash
curl http://localhost:3001/health
curl http://localhost:3001/pedidos
```

### 6. Abrir o frontend:
- http://localhost:3000

---

## Estrutura do projeto

```
pedidofacil/
├── frontend/              # Interface React
├── backend/               # API Node.js + Express
├── database/              # Script SQL de inicialização
├── docker-compose.yml
├── .env.example
├── .gitignore
└── .github/workflows/ci.yml
```

---

## Integrantes

- **Integrante 1** — Frontend React
- **Integrante 2** — Backend + Banco de Dados
- **Integrante 3** — DevOps, Testes e CI/CD

---

## Soluções implementadas

| Problema | Solução |
|----------|---------|
| Backend não conecta ao banco | `DB_HOST=db` + `depends_on` com `condition: service_healthy` |
| Frontend não acessa API | Variável `VITE_API_URL` via `.env` + build argument no Dockerfile |
| Containers fora de ordem | `depends_on` com `condition: service_healthy` + healthchecks |
| Banco perde dados | Volume persistente `postgres_data` |
| Build quebrando | Node 18 fixo + multi-stage Dockerfile |
| Sem testes automatizados | Jest + Supertest com mock do banco |
| Variáveis sensíveis expostas | Arquivo `.env` no `.gitignore` + GitHub Secrets no CI/CD |
| Sem rollback | Job de deploy com `if: failure()` |
| Sem healthcheck | Healthcheck em todos os serviços |
| Sem restart policy | `restart: unless-stopped` |

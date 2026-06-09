const request = require("supertest");
const app = require("../src/index");
// Mock do módulo de banco de dados
// (evita precisar de PostgreSQL rodando nos testes)
jest.mock("../src/db", () => {
  const pedidosMock = [
    {
      id: 1,
      cliente: "João",
      item: "X-Burguer",
      quantidade: 2,
      status: "pendente",
      created_at: new Date().toISOString(),
    },
  ];
  return {
    query: jest.fn(async (sql, params) => {
      // GET /pedidos
      if (sql.includes("SELECT * FROM pedidos ORDER BY")) {
        return { rows: pedidosMock };
      }
      // GET /pedidos/:id — encontrado
      if (sql.includes("WHERE id =") && params[0] === 1) {
        return { rows: [pedidosMock[0]] };
      }
      // GET /pedidos/:id — não encontrado
      if (sql.includes("WHERE id =") && params[0] === 999) {
        return { rows: [] };
      }
      // POST /pedidos
      if (sql.includes("INSERT INTO pedidos")) {
        return {
          rows: [
            {
              id: 2,
              cliente: params[0],
              item: params[1],
              quantidade: params[2],
              status: "pendente",
              created_at: new Date().toISOString(),
            },
          ],
        };
      }
      return { rows: [] };
    }),
  };
});
describe("GET /pedidos", () => {
  it("deve retornar lista de pedidos com status 200", async () => {
    const res = await request(app).get("/pedidos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
describe("POST /pedidos", () => {
  it("deve criar um pedido e retornar status 201", async () => {
    const novoPedido = { cliente: "Maria", item: "Pizza", quantidade: 1 };
    const res = await request(app).post("/pedidos").send(novoPedido);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.cliente).toBe("Maria");
    expect(res.body.status).toBe("pendente");
  });
  it("deve retornar 400 se faltar campos obrigatórios", async () => {
    const res = await request(app).post("/pedidos").send({ cliente: "Ana" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("erro");
  });
});
describe("GET /pedidos/:id", () => {
  it("deve retornar 404 para id inexistente", async () => {
    const res = await request(app).get("/pedidos/999");
    expect(res.statusCode).toBe(404);
  });
});

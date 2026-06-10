const request = require("supertest");
const app = require("../src/index");
describe("GET /health", () => {
  it("deve retornar status 200 e status ok", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status", "ok");
    expect(res.body).toHaveProperty("service", "pedidofacil-backend");
  });
  it("deve retornar um timestamp válido", async () => {
    const res = await request(app).get("/health");
    const timestamp = new Date(res.body.timestamp);
    expect(timestamp).toBeInstanceOf(Date);
    expect(isNaN(timestamp.getTime())).toBe(false);
  });
});

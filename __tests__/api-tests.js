const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")


beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
    
})

afterAll(async () => {
    await db.destroy()
})

describe("Auth intergration tests", ()=> {
    it("POST /register", async () =>{
        const data = {Username: "User88", Password: "password", Email: "email@mail.com", Account: "Editor"}
        const res = await supertest(server).post("/auth/register").send(data)
        expect(res.statusCode).toBe(201)
    })

    it("POST /login", async () =>{
        const data = {Email: "user2@email.com", Password: "Password1!"}
        const res = await supertest(server).post("/auth/login").send(data)
        expect(res.statusCode).toBe(200)
    })
})

describe("Users intergration tests", ()=> {
    it("GET /users", async () =>{
        const res = await supertest(server).get("/api/users")
        expect(res.statusCode).toBe(200)
    })


})

describe("entry intergration tests", ()=> {
    it("POST /entries", async () =>{
        const data = {Users_id: 1, Title: "New how to", Content: "New Content", Category: "DIY"}
        const res = await supertest(server).post("/api/entries").send(data)
        expect(res.statusCode).toBe(201)
    })


})
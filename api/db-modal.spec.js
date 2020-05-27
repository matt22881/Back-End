const db = require("./db-modal")

const database = require("../data/config")

beforeEach(async () => {
    await database.seed.run()
})

afterAll(async () => {
    await database.destroy()
})

describe("db functions unit tests", () =>{
    it("Adds a user", () => {
        return db.add({
            "Username": "test1",
            "Password": "password",
            "Email": "test1@email.com",
            "Account": "Editor"
        })
        .then(res =>{
            expect(res).toMatchObject({
                "Username": "test1",
                "Account": "Editor"
            })
        })
    })


})
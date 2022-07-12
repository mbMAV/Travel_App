const app = require('../src/server/server');
const supertest = require("supertest");
const request = supertest(app);

describe("Test for local Server listening for get/test route", () => {
    test("Server need OK response code 200 and message Success", async () => {
        const response = await request.get("/test");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Success");
    });
});

describe("Test for geoApi Server listening", () => {
    test("Server need OK response code 200", async () => {
        const response = await request.post("/geonamesApi");
        expect(response.statusCode).toBe(200);
    });
});
// Import the js file to test
import "../src/server/server.js"

describe("Testing the app.listen functionality", () => {
    // port needs to be defined
    test("Testing", () => {
        const port = 8083
        expect(port).toBeDefined
    });
});
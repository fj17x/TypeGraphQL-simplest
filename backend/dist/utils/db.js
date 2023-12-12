import pkg from "pg";
const { Client } = pkg;
const client = new Client({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    port: 5432,
    database: "postgres",
});
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to PostgreSQL database!");
    }
    catch (err) {
        console.log("Error connecting to db.", err);
    }
}
export { client, connectToDB };
//# sourceMappingURL=db.js.map
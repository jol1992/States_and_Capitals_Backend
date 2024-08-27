import express from "express";
import pg from "pg";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "usa_trivia",
  password: "oshay1992",
  port: 5432,
});

db.connect();

app.get("/", async (req, res) => {
  const data = await db.query("select * from states_and_capitals");
  res.json({ data: data.rows });
});

app.get("/get-region", async (req, res) => {
  const data = await db.query(
    "select distinct region from states_and_capitals"
  );
  res.json({ data: data.rows });
});
app.get("/region", async (req, res) => {
  const data = await db.query(
    `select * from states_and_capitals where region ='${req.query.region}'`
  );
  res.json({ data: data.rows });
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});

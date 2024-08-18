import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { DogecoinRCPClent } from "./DogecoinRCPClent";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

const dogecoinRCPClent = new DogecoinRCPClent();

// dogecoinRCPClent.GetBlock("9c7f36f170ccb64630fbca8d9a665f4a439a3698dd1f6cb06b619ae6c7c76dd5");
// dogecoinRCPClent.GetBlockCount();

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.get("/BlockCount", async (request: Request, response: Response) => {
  let count = await dogecoinRCPClent.GetBlockCount();
  response.status(200).send(count.toString());
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
  console.log(`http://localhost:${PORT}`);

}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});
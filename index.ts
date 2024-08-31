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

dogecoinRCPClent.GetRowTransaction("ad471b1ba72d313bdc0c421f2ecc7ae79c413669c87f473bbd866bdec11c4b36");



app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.get("/BlockHeightInfo", async (request: Request, response: Response) => {

  let height = await dogecoinRCPClent.GetBlockHeight();

  let heightInfoList = [];

  let currentHeight = height;
  for(let i = 0 ; i < 6 ; i++) {
    let blockHash = await dogecoinRCPClent.GetBlockHash(currentHeight);
    heightInfoList.push({height: currentHeight, blockHash: blockHash});

    currentHeight--;
    if(currentHeight < 0) {
      break;
    }
  }
  response.json(heightInfoList);
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
  console.log(`http://localhost:${PORT}`);

}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

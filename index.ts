import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { DogecoinRCPClent } from "./DogecoinRCPClent";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

const dogecoinRCPClent = new DogecoinRCPClent();

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

app.get("/Block/:hashId", async (request: Request, response: Response) => {
  let blockInfo = await dogecoinRCPClent.GetBlock(request.params.hashId);
  response.json(blockInfo);
});

app.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
  console.log(`http://localhost:${PORT}`);

}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});

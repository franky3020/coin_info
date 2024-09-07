
import { DogecoinRCPClent } from "./DogecoinRCPClent";
import { BlockTxAboutAddressInfo } from "./Models/BlockTxAboutAddressInfo";


export class CoinAddressInfo {

    dogecoinRCPClent: DogecoinRCPClent;

    constructor() {
        this.dogecoinRCPClent = new DogecoinRCPClent();
    }

    async GetLatestBlockAddress(): Promise<Dictionary<BlockTxAboutAddressInfo>> {

        const eachAddressVinDict: Dictionary<BlockTxAboutAddressInfo> = {};

        let height = await this.dogecoinRCPClent.GetBlockHeight();

        let heightInfoList = [];

        let currentHeight = height;
        for(let i = 0 ; i < 1 ; i++) {
          let blockHash = await this.dogecoinRCPClent.GetBlockHash(currentHeight);
          heightInfoList.push({height: currentHeight, blockHash: blockHash});

          currentHeight--;
          if(currentHeight < 0) {
            break;
          }
        }

        for(let i = 0 ; i < heightInfoList.length ; i++) {
            const heightInfo = heightInfoList[i];
            let blockInfoRes = await this.dogecoinRCPClent.GetBlock(heightInfo.blockHash);
            const blockTxAboutAddressInfo = BlockTxAboutAddressInfo.transformApiResponse(blockInfoRes);
            eachAddressVinDict[heightInfo.blockHash] = blockTxAboutAddressInfo;
        }

        console.log("目前高度: " + height);
        console.log("目前hash: " + heightInfoList[0].blockHash);
        return eachAddressVinDict;
    }

}

interface Dictionary<T> {
  [Key: string]: T;
}

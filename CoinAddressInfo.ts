
import { DogecoinRCPClent } from "./DogecoinRCPClent";


export class CoinAddressInfo {

    dogecoinRCPClent: DogecoinRCPClent;

    constructor() {
        this.dogecoinRCPClent = new DogecoinRCPClent();
    }


    async GetLatestBlockAddressIn(address: string) {
        let height = await this.dogecoinRCPClent.GetBlockHeight();

        let heightInfoList = [];

        let currentHeight = height;
        for(let i = 0 ; i < 6 ; i++) {
          let blockHash = await this.dogecoinRCPClent.GetBlockHash(currentHeight);
          heightInfoList.push({height: currentHeight, blockHash: blockHash});

          currentHeight--;
          if(currentHeight < 0) {
            break;
          }
        }

        for(let i = 0 ; i < heightInfoList.length ; i++) {
            const heightInfo = heightInfoList[i];
            let blockInfo = await this.dogecoinRCPClent.GetBlock(heightInfo.blockHash);
            // 資料轉換時 只需要認 單一地址的 交易 的 vin
        }
        // heightInfoList TODO: 可以檢查是否為空
    }

}


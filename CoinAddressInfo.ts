
import { DogecoinRCPClent } from "./DogecoinRCPClent";


export class CoinAddressInfo {

    dogecoinRCPClent: DogecoinRCPClent;

    // 用一個 list 存順序
    eachAddressVinDict: Dictionary<EachAddressVin[]> = {};

    constructor() {
        this.dogecoinRCPClent = new DogecoinRCPClent();
    }


    async GetLatestBlockAddress() {
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
            let blockInfo = await this.dogecoinRCPClent.GetBlock(heightInfo.blockHash);

            let txList = blockInfo.tx as any[];

            txList.forEach(tx => {

              let voutList = tx.vout as any[];

              voutList.forEach(vout => {

                let address = vout.scriptPubKey.addresses[0]; // TODO: 暫時先這樣
                let eachAddressVin = new EachAddressVin();
                eachAddressVin.address = address;
                eachAddressVin.vin = vout.value;
                if (Array.isArray(this.eachAddressVinDict[heightInfo.blockHash])) {
                  this.eachAddressVinDict[heightInfo.blockHash].push(eachAddressVin);
                } else {
                  this.eachAddressVinDict[heightInfo.blockHash] = [];
                  this.eachAddressVinDict[heightInfo.blockHash].push(eachAddressVin);
                }
              });

            });
            // 資料轉換時 只需要認 單一地址的 交易 的 vin
        }
        console.log(this.eachAddressVinDict);
        console.log("目前高度: " + height);
        console.log("目前hash: " + heightInfoList[0].blockHash);
    }

}

interface Dictionary<T> {
  [Key: string]: T;
}

interface NDictionary<T> {
  [Key: number]: T;
}

class EachAddressVin {
  address: string = "";
  vin: number = 0;
}

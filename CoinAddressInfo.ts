
import { DogecoinRCPClent } from "./DogecoinRCPClent";
import { BlockTxAboutAddressInfo } from "./Models/BlockTxAboutAddressInfo";


export class CoinAddressInfo {

    dogecoinRCPClent: DogecoinRCPClent;

    constructor() {
        this.dogecoinRCPClent = new DogecoinRCPClent();
    }

    async GetLatestBlockAddress(): Promise<GetLatestBlockAddressView[]> {

        const getLatestBlockAddressView: GetLatestBlockAddressView[] = [];

        let height = await this.dogecoinRCPClent.GetBlockHeight();

        let heightInfoList = [];

        let currentHeight = height;
        for(let i = 0 ; i < 10 ; i++) {
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
            getLatestBlockAddressView.push({
              height: heightInfo.height,
              blockHash: heightInfo.blockHash,
              blockTxAboutAddressInfo: blockTxAboutAddressInfo
            })
        }
        return getLatestBlockAddressView;
    }

}

interface GetLatestBlockAddressView {
  height: number;
  blockHash: string;
  blockTxAboutAddressInfo: BlockTxAboutAddressInfo;
}

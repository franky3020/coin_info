
import { DogecoinRCPClent } from "./DogecoinRCPClent";
import { BlockTxAboutAddressInfo } from "./Models/BlockTxAboutAddressInfo";
import memoryCache, { CacheClass } from 'memory-cache';

const memCacheDuration = 30 * 60 * 1000 ; // 30分鐘的快取



export class CoinAddressInfo {

    dogecoinRCPClent: DogecoinRCPClent;

    blockHeightMemCache: CacheClass<number, string> = new memoryCache.Cache();

    blockTxAboutAddressInfoMemCache: CacheClass<string, BlockTxAboutAddressInfo> = new memoryCache.Cache();


    constructor() {
        this.dogecoinRCPClent = new DogecoinRCPClent();
    }

    async GetLatestBlockAddress(): Promise<GetLatestBlockAddressView[]> {

        const getLatestBlockAddressView: GetLatestBlockAddressView[] = [];

        let height = await this.dogecoinRCPClent.GetBlockHeight();

        let heightInfoList = [];

        let currentHeight = height;
        for(let i = 0 ; i < 10 ; i++) {

          let blockHash = this.blockHeightMemCache.get(currentHeight);
          if (blockHash === null) {
            blockHash = await this.dogecoinRCPClent.GetBlockHash(currentHeight);
            this.blockHeightMemCache.put(currentHeight, blockHash, memCacheDuration);
          }

          heightInfoList.push({height: currentHeight, blockHash: blockHash});

          currentHeight--;
          if(currentHeight < 0) {
            break;
          }
        }

        for(let i = 0 ; i < heightInfoList.length ; i++) {
            const heightInfo = heightInfoList[i];

            let blockTxAboutAddressInfo = this.blockTxAboutAddressInfoMemCache.get(heightInfo.blockHash);

            if (blockTxAboutAddressInfo === null) {
              let blockInfoRes = await this.dogecoinRCPClent.GetBlock(heightInfo.blockHash);
              blockTxAboutAddressInfo = BlockTxAboutAddressInfo.transformApiResponse(blockInfoRes);
              this.blockTxAboutAddressInfoMemCache.put(heightInfo.blockHash, blockTxAboutAddressInfo, memCacheDuration);
            }

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

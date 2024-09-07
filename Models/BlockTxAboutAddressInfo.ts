import { GetBlockRes } from "../resModels/GetBlockRes";

export class BlockTxAboutAddressInfo {
  eachAddressVinList: EachAddressVin[] = [];

  static transformApiResponse(getBlockRes: GetBlockRes): BlockTxAboutAddressInfo {
    const blockTxAboutAddressInfo = new BlockTxAboutAddressInfo();

    let txList = getBlockRes.tx;

    txList.forEach((tx) => {
      let voutList = tx.vout;

      voutList.forEach((vout) => {

        if (typeof vout.scriptPubKey === "undefined") {
            console.error("getBlockRes.hash: ", getBlockRes.hash);
            console.error("getBlockRes.height: ", getBlockRes.height);
            console.error("typeof vout.scriptPubKey ===  undefined");
            return;
        }

        if (typeof vout.scriptPubKey.addresses === "undefined") {
            console.error("getBlockRes.hash: ", getBlockRes.hash);
            console.error("getBlockRes.height: ", getBlockRes.height);
            console.error("typeof vout.scriptPubKey.addresses ===  undefined");
            return;
        }

        // TODO: 暫時先這樣
        if (vout.scriptPubKey.addresses.length !== 1) {
            console.error("getBlockRes.hash: ", getBlockRes.hash);
            console.error("getBlockRes.height: ", getBlockRes.height);
            console.error("out.scriptPubKey.addresses.length !== 1");
            return;
        }

        let address = vout.scriptPubKey.addresses[0];
        let eachAddressVin = new EachAddressVin();
        eachAddressVin.address = address;
        eachAddressVin.vin = vout.value;

        blockTxAboutAddressInfo.eachAddressVinList.push(eachAddressVin);
      });
    });

    return blockTxAboutAddressInfo;
  }
}

class EachAddressVin {
  address: string = "";
  vin: number = 0;
}

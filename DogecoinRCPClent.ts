import axios from 'axios';
import { GetBlockRes } from './resModels/GetBlockRes';

export class DogecoinRCPClent {


    GetBlock(blockHash: string): Promise<GetBlockRes>{
        const url = process.env.NODE_URL as string;

        const auth = {
            username: process.env.NODE_USER_NAME as string,
            password: process.env.NODE_PW as string
        };
        const data = {
            method: "getblock",
            params: [blockHash, 3]
        };

        return new Promise<GetBlockRes>((resolve, reject) => {
            axios.post(url, data, {
                auth: auth
            })
            .then(response => {
                resolve(JSON.parse(JSON.stringify(response.data.result)));
            })
            .catch(error => {
                reject(error.response.data.error);
            });
        })
    }

    GetBlockHash(blockHeight: number): Promise<string>{
        const url = process.env.NODE_URL as string;

        const auth = {
            username: process.env.NODE_USER_NAME as string,
            password: process.env.NODE_PW as string
        };
        const data = {
            method: "getblockhash",
            params: [blockHeight]
        };
        return new Promise<string>((resolve, reject) => {
            axios.post(url, data, {
                auth: auth
            })
            .then(response => {
                resolve(response.data.result as string);
            })
            .catch(error => {
                console.log(error.response.data.error);
                reject();
            });
        })
    }

    GetBlockHeight(): Promise<number>{
        const url = process.env.NODE_URL as string;

        const auth = {
            username: process.env.NODE_USER_NAME as string,
            password: process.env.NODE_PW as string
        };
        const data = {
            method: "getblockcount",
            params: []
        };
        return new Promise<number>((resolve, reject) => {
            axios.post(url, data, {
                auth: auth
            })
            .then(response => {
                resolve(response.data.result as number);
            })
            .catch(error => {
                reject();
            });
        })
    }

    GetRowTransaction(txid: string): Promise<any>{
        const url = process.env.NODE_URL as string;

        const auth = {
            username: process.env.NODE_USER_NAME as string,
            password: process.env.NODE_PW as string
        };
        const data = {
            method: "getrawtransaction",
            params: [txid, true]
        };
        return new Promise<number>((resolve, reject) => {
            axios.post(url, data, {
                auth: auth
            })
            .then(response => {
                console.log("Ok");
                console.log(response);
                resolve(response.data.result);
            })
            .catch(error => {
                console.log(error);
                reject();
            });
        })
    }

}

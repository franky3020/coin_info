import axios from 'axios';
import dotenv from "dotenv";

export class DogecoinRCPClent {


    GetBlock(blockHash: string){
        const url = process.env.NODE_URL as string;

        const auth = {
            username: process.env.NODE_USER_NAME as string,
            password: process.env.NODE_PW as string
        };
        const data = {
            method: "getblock",
            params: [blockHash, 2]
        };

        axios.post(url, data, {
            auth: auth
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    GetBlockCount(): Promise<number>{
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
}

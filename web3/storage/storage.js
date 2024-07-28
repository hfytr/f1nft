"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const baseUrl = 'https://rest.unique.network/opal/v1';
// function createSdk(account) {
//     const options = {
//         baseUrl,
//         signer: account,
//     }
//     return new Sdk(options);
// }
// 
// export async function createCollection(sdk, address, name, description) {
//     const { parsed, error } = await sdk.collection.create.submitWaitResult({
//         address,
//         name,
//         description,
//         tokenPrefix: 'TST',
//     });
//   
//     if (error) {
//         console.log('The error occurred while creating a collection. ', error);
//         process.exit();
//     }
//   
//     const { collectionId } = parsed;
//   
//     return sdk.collection.get({ collectionId });
// }
// 
// async function main() {
//     const fs = require("node:fs");
//     const file = fs.readFileSync('./mnemonic.txt', 'utf-8').split('\n');
//     const mnemonic = file.length >= 1 ? file[0] : Sr25519Account.generateMnemonic();
//     const account = Sr25519Account.fromUri(mnemonic)
//     
//     const signer = await KeyringProvider.fromMnemonic(mnemonic);
//     const address = signer.instance.address;
// 
//     const sdk = createSdk(signer);
//     
//     const collectionId = file.length >= 2 ? (+file[1]) : await createCollection(sdk, address, 'drivers', 'collection of all driver nfts');
//     console.log('The collection was create. ID: ', collectionId);
// }
// main();

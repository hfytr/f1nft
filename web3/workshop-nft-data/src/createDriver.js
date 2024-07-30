import { connectSdk } from "./utils/connect-sdk.js";
import { getRandomInt } from "./utils/random.js";
import Sdk, { CHAIN_CONFIG } from "@unique-nft/sdk";
import { KeyringProvider } from "@unique-nft/accounts/keyring";

// node ./src/create-token.js {collectionId} {address} {nickname}
// i.e. node ./src/create-token.js 3131 5HRADyd2sEVtpqh3cCdTdvfshMV7oK4xXJyM48i4r9S3TNGH Speedy777
export async function createToken(drivers) {
  const account = await KeyringProvider.fromMnemonic(
    "warrior depend labor else empty forest bronze never border hire twenty there"
  );
  const address = account.address;

  const sdk = new Sdk({
    baseUrl: CHAIN_CONFIG.opal.restUrl,
    signer: account,
  });

  ////////////////////////////////////
  // Create collection - quick simple way
  ////////////////////////////////////
  const { parsed, error } = await sdk.collection.create.submitWaitResult({
    address,
    name: "Test collection",
    description: "My test collection",
    tokenPrefix: "TST",
  });

  if (error) {
    console.log("create collection error", error);
    process.exit();
  }
  const collectionId = parsed?.collectionId;
  console.log(`Collection created. Id: ${collectionId}`);
  console.log(
    `View this minted collection at https://uniquescan.io/opal/collections/${collectionId}`
  );
  console.log(
    drivers.map((driver) => ({
      data: {
        name: {
          _: driver.name,
        },
        points: { _: driver.points },
        price: { _: drver.price },
        image: {
          ipfsCid: driver.imageCid, // Assuming you have image CIDs or URLs
        },
      },
    }))
  );

  const result = await sdk.token.createMultiple.submitWaitResult({
    address,
    collectionId,
    tokens: [
      drivers.map((driver) => ({
        data: {
          name: {
            _: driver.name,
          },
          points: { _: driver.points },
          price: { _: drver.price },
          image: {
            ipfsCid: driver.imageCid, // Assuming you have image CIDs or URLs
          },
        },
      })),
    ],
  });

  const mintedTokensCount = result.parsed?.length;

  let currentTokenId;
  result.parsed?.forEach((token, index) => {
    currentTokenId = token?.tokenId;
    console.log(
      `Minted token ID #${currentTokenId}/${mintedTokensCount} in collection ${collectionId}`
    );
    console.log(
      `View this minted token at https://uniquescan.io/opal/tokens/${collectionId}/${currentTokenId}`
    );
  });

  // const url = "http://127.0.0.1:8000/";
  // const res = await fetch(url);
  // const resData = res["data"];
  // console.log(resData);

  //const { account, sdk } = await connectSdk();

  //// Get pseudo-random car image for fun
  //const tokenImage =
  //  getRandomInt(2) === 0
  //    ? "https://gateway.pinata.cloud/ipfs/QmfWKy52e8pyH1jrLu4hwyAG6iwk6hcYa37DoVe8rdxXwV"
  //    : "https://gateway.pinata.cloud/ipfs/QmNn6jfFu1jE7xPC2oxJ75kY1RvA2tz9bpQDsqweX2kDig";

  //const tokenTx = await sdk.token.createV2({
  //  collectionId,
  //  image: tokenImage,
  //  owner,
  //  attributes: [
  //    {
  //      trait_type: "Nickname",
  //      value: nickname,
  //    },
  //    {
  //      trait_type: "Points",
  //      value: points,
  //    },
  //    {
  //      trait_type: "Price",
  //      value: price,
  //    },
  //  ],
  //});
  //console.log(tokenTx);

  //const token = tokenTx.parsed;
  //if (!token) throw Error("Cannot parse token");

  //console.log(
  //  `Explore your NFT: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`
  //);

  //process.exit(0);
}
//
//const args = process.argv.slice(2);
//
//const [collectionId, owner, nickname, points, price] = args;
//
//createToken(collectionId, owner, nickname, points, price).catch((e) => {
//  console.log("Something wrong during token creation");
//  throw e;
//});
//

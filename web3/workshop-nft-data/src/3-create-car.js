import { connectSdk } from "./utils/connect-sdk.js";
import { getRandomInt } from "./utils/random.js";


// node ./src/create-token.js {collectionId} {address} {nickname}
// i.e. node ./src/create-token.js 3131 5HRADyd2sEVtpqh3cCdTdvfshMV7oK4xXJyM48i4r9S3TNGH Speedy777
async function createToken(collectionId, owner, nickname, points, price) {
  const url = "http://127.0.0.1:8000/";
  const res = await fetch(url);
  const resData = res["data"];
  console.log(resData);

  const {account, sdk} = await connectSdk();

  // Get pseudo-random car image for fun
  const tokenImage = getRandomInt(2) === 0
    ? "https://gateway.pinata.cloud/ipfs/QmfWKy52e8pyH1jrLu4hwyAG6iwk6hcYa37DoVe8rdxXwV"
    : "https://gateway.pinata.cloud/ipfs/QmNn6jfFu1jE7xPC2oxJ75kY1RvA2tz9bpQDsqweX2kDig"

  const tokenTx = await sdk.token.createV2({
    collectionId,
    image: tokenImage,
    owner,
    attributes: [
      {
        trait_type: "Nickname",
        value: nickname,
      },
      {
        trait_type: "Points",
        value: points,
      },
      {
        trait_type: "Price",
        value: price
      }
    ],
  });

  const token = tokenTx.parsed;
  if (!token) throw Error("Cannot parse token");

  console.log(`Explore your NFT: https://uniquescan.io/opal/tokens/${token.collectionId}/${token.tokenId}`);
 
  process.exit(0);
}

const args = process.argv.slice(2);

const [collectionId, owner, nickname, points, price] = args;

createToken(collectionId, owner, nickname, points, price).catch(e => {
  console.log('Something wrong during token creation');
  throw e;
});
import { changeAttribute } from "./utils/change-attribute.js";
import { connectSdk } from "./utils/connect-sdk.js";
import { getRandomInt } from "./utils/random.js";
import { Address } from "@unique-nft/sdk/utils";


async function play(collectionId, tokenId1, tokenId2, priceDiff1, priceDiff2, pointDiff1, pointDiff2) {
  const {account, sdk} = await connectSdk();

  let {nonce} = await sdk.common.getNonce(account);
  const transactions = [];

  const players = [
    [tokenId1, await sdk.token.getV2({collectionId, tokenId: tokenId1})],
    [tokenId2, await sdk.token.getV2({collectionId, tokenId: tokenId2})],
  ];
  [
    ["Points", pointDiff1, players[0]],
    ["Price",  priceDiff1, players[0]],
    ["Points", pointDiff2, players[1]],
    ["Price",  priceDiff2, players[1]]
  ]
  .forEach((attr, diff, player) => {
    transactions.push(sdk.token.setProperties({
      collectionId,
      tokenId: player[0],
      // NOTICE: Attributes stored in "tokenData" property
      properties: [{
        key: "tokenData",
        value: changeAttribute(player[1], attr, player[1].attributes.find(a => a.trait_type === attr))
      }]
    }, { nonce: nonce++}));
  });

  await Promise.all(transactions);

  console.log(`TokenID ${winner} has ${winnerVictories + 1} wins`);
  console.log(`TokenID ${loser} has ${loserDefeats + 1} defeats`);

  console.log(`Winner: https://uniquescan.io/opal/tokens/${collectionId}/${winner}`);
  console.log(`Loser: https://uniquescan.io/opal/tokens/${collectionId}/${loser}`);

  process.exit(0);
}

const args = process.argv.slice(2);

const [collectionId, tokenId1, tokenId2, priceDiff1, priceDiff2, pointDiff1, pointDiff2] = args;
play(collectionId, tokenId1, tokenId2, priceDiff1, priceDiff2, pointDiff1, pointDiff2).catch(e => {
  console.log("Something went wrong during play");
  throw e;
})
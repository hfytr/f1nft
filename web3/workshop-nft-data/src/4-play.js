import { changeAttribute } from "./utils/change-attribute.js";
import { connectSdk } from "./utils/connect-sdk.js";
import { getRandomInt } from "./utils/random.js";
import { Address } from "@unique-nft/sdk/utils";

export async function play(
  collectionId,
  tokenId1,
  tokenId2,
  priceDiff1,
  priceDiff2,
  pointDiff1,
  pointDiff2
) {
  const { account, sdk } = await connectSdk();

  let { nonce } = await sdk.common.getNonce(account);
  const transactions = [];

  const players = [
    [tokenId1, await sdk.token.getV2({ collectionId, tokenId: tokenId1 })],
    [tokenId2, await sdk.token.getV2({ collectionId, tokenId: tokenId2 })],
  ];
  [
    ["Points", pointDiff1, players[0]],
    ["Price", priceDiff1, players[0]],
    ["Points", pointDiff2, players[1]],
    ["Price", priceDiff2, players[1]],
  ].forEach((item) => {
    const [attr, diff, player] = item;
    transactions.push(
      sdk.token.setProperties(
        {
          collectionId,
          tokenId: player[0],
          // NOTICE: Attributes stored in "tokenData" property
          properties: [
            {
              key: "tokenData",
              value: changeAttribute(
                player[1],
                attr,
                parseFloat(
                  player[1].attributes.find((a) => a.trait_type === attr).value
                ) + diff
              ),
            },
          ],
        },
        { nonce: nonce++ }
      )
    );
  });

  await Promise.all(transactions);
}

// const args = process.argv.slice(2);
//
// const [
//   collectionId,
//   tokenId1,
//   tokenId2,
//   rawPriceDiff1,
//   rawPriceDiff2,
//   rawPointDiff1,
//   rawPointDiff2,
// ] = args;
// const priceDiff1 = parseFloat(rawPriceDiff1);
// const priceDiff2 = parseFloat(rawPriceDiff2);
// const pointDiff1 = parseFloat(rawPointDiff1);
// const pointDiff2 = parseFloat(rawPointDiff2);
// play(
//   collectionId,
//   tokenId1,
//   tokenId2,
//   priceDiff1,
//   priceDiff2,
//   pointDiff1,
//   pointDiff2
// ).catch((e) => {
//   console.log("Something went wrong during play");
//   throw e;
// });
//
// const { account, sdk } = await connectSdk();
// console.log("hiiiiiiiiii");
// console.log(await sdk.token.getV2({ collectionId, tokenId: tokenId1 }));
// console.log(await sdk.token.getV2({ collectionId, tokenId: tokenId2 }));
//

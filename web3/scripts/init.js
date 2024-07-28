"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sr25519_1 = require("@unique-nft/sr25519");
var mnemonic = sr25519_1.Sr25519Account.generateMnemonic();
console.log(mnemonic);
var account = sr25519_1.Sr25519Account.fromUri(mnemonic);
console.log(account);

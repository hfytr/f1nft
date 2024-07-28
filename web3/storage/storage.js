"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = createCollection;
var sr25519_1 = require("@unique-nft/sr25519");
var sdk_1 = __importDefault(require("@unique-nft/sdk"));
var keyring_1 = require("@unique-nft/accounts/keyring");
var baseUrl = 'https://rest.unique.network/opal/v1';
function createSdk(account) {
    var options = {
        baseUrl: baseUrl,
        signer: account,
    };
    return new sdk_1.default(options);
}
function createCollection(sdk, address, name, description) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, parsed, error, collectionId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, sdk.collection.create.submitWaitResult({
                        address: address,
                        name: name,
                        description: description,
                        tokenPrefix: 'TST',
                    })];
                case 1:
                    _a = _b.sent(), parsed = _a.parsed, error = _a.error;
                    if (error) {
                        console.log('The error occurred while creating a collection. ', error);
                        process.exit();
                    }
                    collectionId = parsed.collectionId;
                    return [2 /*return*/, sdk.collection.get({ collectionId: collectionId })];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var fs, file, mnemonic, account, signer, address, sdk, collectionId, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fs = require("node:fs");
                    file = fs.readFileSync('./mnemonic.txt', 'utf-8').split('\n');
                    mnemonic = file.length >= 1 ? file[0] : sr25519_1.Sr25519Account.generateMnemonic();
                    account = sr25519_1.Sr25519Account.fromUri(mnemonic);
                    return [4 /*yield*/, keyring_1.KeyringProvider.fromMnemonic(mnemonic)];
                case 1:
                    signer = _b.sent();
                    address = signer.instance.address;
                    sdk = createSdk(signer);
                    if (!(file.length >= 2)) return [3 /*break*/, 2];
                    _a = (+file[1]);
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, createCollection(sdk, address, 'drivers', 'collection of all driver nfts')];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    collectionId = _a;
                    console.log('The collection was create. ID: ', collectionId);
                    return [2 /*return*/];
            }
        });
    });
}
main();

import '@nomiclabs/hardhat-ethers';
declare const _default: {
    solidity: {
        version: string;
        settings: {
            viaIR: boolean;
            optimizer: {
                enabled: boolean;
                runs: number;
            };
        };
    };
    networks: {
        fuji: {
            url: string;
            gasPrice: number;
            chainId: number;
            accounts: (string | undefined)[];
        };
    };
};
export default _default;

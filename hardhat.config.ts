import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
    defaultNetwork: "hardhat",
    networks: {
        redstonetest: {
            url: "https://rpc.holesky.redstone.xyz",
            accounts:
                process.env.PRIVATE_KEY !== undefined
                    ? [process.env.PRIVATE_KEY]
                    : [],
        },
        hardhat: {},
    },
    solidity: {
        compilers: [
            // {
            //     version: "0.8.20",
            //     settings: {
            //         optimizer: {
            //             enabled: true,
            //             runs: 200,
            //         },
            //     },
            // },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
            {
                version: "0.4.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    paths: {
        artifacts: "./artifacts",
        cache: "./cache",
        sources: "./contracts",
    },
    etherscan: {
        apiKey: {
            redstonetest: "api",
        },
        customChains: [
            {
                network: "redstonetest",
                chainId: 17001,
                urls: {
                    apiURL: process.env.BLOCKSCOUT_URL! + "/api",
                    browserURL: process.env.BLOCKSCOUT_URL!,
                },
            },
        ],
    },
}

export default config

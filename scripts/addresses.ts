import env from "hardhat"

export const getAddresses = () => {
    switch (env.network.name) {
        case "redstonetest":
            return {
                Deployer: "0x6C4502B639ab01Cb499cEcCA7D84EB21Fde928F8",
                MockERC20: "0xA321c4DE2A1aCCD8CBe78bC79E9623F8E18A2837",
                WETH: "0x09d940117bd1df3165A22820517A946426605F60",
                ORB: "0xE7E4cdF4d2A2A6FCf7c6f4B4178c0715169Ca6a6",
                RedswapFactory: "0x4eE2d27970abDdBb76be8cFf21E80a040E1dcf5d",
                RedswapRouter: "0x9d8148d2382eaF2c2E917a34341e7A38Aa7Cb120",
            }
    }
}

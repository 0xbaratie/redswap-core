import env from "hardhat"

export const getAddresses = () => {
    switch (env.network.name) {
        case "redstonetest":
            return {
                Deployer: "0x6C4502B639ab01Cb499cEcCA7D84EB21Fde928F8",
                MockERC20: "0xA321c4DE2A1aCCD8CBe78bC79E9623F8E18A2837",
                WETH: "0x09d940117bd1df3165A22820517A946426605F60",
                ORB: "0xE7E4cdF4d2A2A6FCf7c6f4B4178c0715169Ca6a6",
                RedswapFactory: "0x12DF9BEA3f7Cc25e385A30a0F53C317Bdeaa5E42",
                RedswapRouter: "0x1EF188F9A24e2581C6C5c68A41C279459946F62c",
            }
    }
}

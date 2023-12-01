import env from "hardhat"

export const getAddresses = () => {
    switch (env.network.name) {
        case "redstonetest":
            return {
                Deployer: "0x6C4502B639ab01Cb499cEcCA7D84EB21Fde928F8",
                MockERC20: "0xA321c4DE2A1aCCD8CBe78bC79E9623F8E18A2837",
                WETH: "0x053CB170062bB18A0071ACEEA923FA377B8bC321",
                PancakeFactory: "0x4fE3FC701504Ac72BFF774e42E78fb349607de56",
                PancakeRouter: "0x7be2225AE24CFFa2CF234337CD542E4DeACD7762",
            }
    }
}

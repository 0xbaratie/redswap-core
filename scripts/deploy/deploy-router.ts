import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

const main = async () => {
    const a = getAddresses()!

    const pancakeFactory = await ethers.deployContract("PancakeRouter", [
        a.PancakeFactory,
        a.WETH,
    ])

    console.log("Token address:", await pancakeFactory.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const factory = await ethers.getContractAt(
        "RedswapFactory",
        a.RedswapFactory
    )

    const tx = await factory.createPair(a.WETH, a.ORB)
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

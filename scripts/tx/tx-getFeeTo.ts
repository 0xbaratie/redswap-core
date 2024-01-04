import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const factory = await ethers.getContractAt(
        "RedswapFactory",
        a.RedswapFactory
    )

    const tx = await factory.feeTo()
    console.log("feeTo by factory:", tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

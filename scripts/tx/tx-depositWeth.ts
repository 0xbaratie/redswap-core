import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const weth = await ethers.getContractAt("WETH9", a.WETH)
    const tx = await weth.deposit({ value: ethers.parseEther("0.2") })
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const weth = await ethers.getContractAt("WETH9", a.WETH)

    const tx = await weth.approve(a.RedswapRouter, ethers.MaxUint256)
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

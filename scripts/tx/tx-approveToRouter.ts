import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const weth = await ethers.getContractAt("WETH9", a.WETH)

    const tx = await weth.approve(a.RedswapRouter, ethers.MaxUint256)
    console.log(tx)

    const orb = await ethers.getContractAt("WETH9", a.ORB)

    const tx2 = await orb.approve(a.RedswapRouter, ethers.MaxUint256)
    console.log(tx2)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

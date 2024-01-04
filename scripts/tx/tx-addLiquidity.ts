import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const router = await ethers.getContractAt("RedswapRouter", a.RedswapRouter)

    const tx = await router.addLiquidity(
        a.WETH,
        a.ORB,
        ethers.parseEther("0.05"),
        ethers.parseEther("0.05"),
        ethers.parseEther("0.01"),
        ethers.parseEther("0.01"),
        a.Deployer,
        991701419330
    )
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

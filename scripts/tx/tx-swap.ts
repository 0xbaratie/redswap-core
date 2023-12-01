import { ethers } from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    const router = await ethers.getContractAt("PancakeRouter", a.PancakeRouter)

    const tx = await router.swapExactTokensForETH(
        ethers.parseEther("0.01"),
        ethers.parseEther("0.001"),
        [a.MockERC20, a.WETH],
        a.Deployer,
        991701419330
    )
    console.log(tx)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

import { ethers } from "hardhat"
import { keccak256, solidityPacked } from "ethers"
import { getAddresses } from "../addresses"

function getPairAddress(
    factory: string,
    tokenA: string,
    tokenB: string,
    initCodeHash: string
): string {
    const [token0, token1] =
        tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA]
    const pair = keccak256(
        solidityPacked(
            ["bytes1", "address", "bytes32", "bytes32"],
            [
                "0xff",
                factory,
                keccak256(
                    solidityPacked(["address", "address"], [token0, token1])
                ),
                initCodeHash,
            ]
        )
    ).slice(-40) // Get last 40 characters

    return `0x${pair}`
}

async function main() {
    const a = getAddresses()!

    const factory = await ethers.getContractAt(
        "PancakeFactory",
        a.PancakeFactory
    )

    const tx = await factory.allPairs(0)
    console.log("allPairs by factory:", tx)

    const initCodeHash =
        "0x68b99b402ebe213798c86d04c78d2f0d8e499fc9cdb039ac83c20aa954a09407"

    const pairAddress = getPairAddress(
        a.PancakeFactory,
        a.MockERC20,
        a.WETH,
        initCodeHash
    )
    console.log("pairAddress by library", pairAddress)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

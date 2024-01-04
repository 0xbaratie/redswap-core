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
        "RedswapFactory",
        a.RedswapFactory
    )

    const tx = await factory.allPairs(0)
    console.log("allPairs by factory:", tx)

    const initCodeHash =
        "0x3b8df7d60bfd1587124e5b93a5bc0ea844b3ba4c938828c1bdd3ce412cce1c6e"

    const pairAddress = getPairAddress(
        a.RedswapFactory,
        a.ORB,
        a.WETH,
        initCodeHash
    )
    console.log("pairAddress by library", pairAddress)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

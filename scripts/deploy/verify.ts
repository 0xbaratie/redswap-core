import env from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    // weth
    await env.run("verify:verify", {
        address: a.WETH,
    })

    // factory
    await env.run("verify:verify", {
        address: a.RedswapFactory,
        constructorArguments: [a.Deployer],
    })

    // router
    await env.run("verify:verify", {
        address: a.RedswapRouter,
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

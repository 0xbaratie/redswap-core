import env from "hardhat"
import { getAddresses } from "../addresses"

async function main() {
    const a = getAddresses()!

    // weth
    await env.run("verify:verify", {
        address: a.WETH,
    })

    // mock
    await env.run("verify:verify", {
        address: a.MockERC20,
    })

    // factory
    await env.run("verify:verify", {
        address: a.PancakeFactory,
        constructorArguments: [a.Deployer],
    })

    // router
    await env.run("verify:verify", {
        address: a.PancakeRouter,
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

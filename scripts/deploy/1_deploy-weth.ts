import { ethers } from "hardhat"

const main = async () => {
    const weth = await ethers.deployContract("WETH9")

    console.log("Contract address:", await weth.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

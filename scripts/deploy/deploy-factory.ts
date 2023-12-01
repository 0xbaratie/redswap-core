import { ethers } from "hardhat"

const main = async () => {
    const [deployer] = await ethers.getSigners()
    console.log("Deployer:", deployer.address)

    const pancakeFactory = await ethers.deployContract("PancakeFactory", [
        deployer.address,
    ])

    console.log("Token address:", await pancakeFactory.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

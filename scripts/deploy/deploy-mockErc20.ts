import { ethers } from "hardhat"

const main = async () => {
    const mock = await ethers.deployContract("MockERC20")

    console.log("Contract address:", await mock.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

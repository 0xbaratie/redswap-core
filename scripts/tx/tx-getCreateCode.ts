import { ethers } from "hardhat"

async function main() {
    const RedswapPairFactory = await ethers.getContractFactory("RedswapPair")
    const creationCode = RedswapPairFactory.bytecode
    // console.log("creationCode:", creationCode)

    const bytecodeHash = ethers.keccak256(creationCode)
    console.log("bytecodeHash:", bytecodeHash)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

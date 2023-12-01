import { ethers } from "hardhat"

async function main() {
    const PancakePairFactory = await ethers.getContractFactory("PancakePair")
    const creationCode = PancakePairFactory.bytecode
    // console.log("creationCode:", creationCode)

    const bytecodeHash = ethers.keccak256(creationCode)
    console.log("bytecodeHash:", bytecodeHash)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})

const { expect } = require("chai")
const { ethers } = require("hardhat")
const { BigNumber } = require("ethers")

describe("MinimumAmountTest", function () {
    let weth, factory, router, mock
    before(async () => {
        ;[owner, alice, bob] = await ethers.getSigners()
        const WETH9 = await ethers.getContractFactory("WETH9")
        weth = await WETH9.deploy()

        const RedswapFactory = await ethers.getContractFactory("RedswapFactory")
        factory = await RedswapFactory.deploy(owner.address)

        const RedswapRouter = await ethers.getContractFactory("RedswapRouter")
        router = await RedswapRouter.deploy(factory.target, weth.target)

        const Mock = await ethers.getContractFactory("MockERC20old")
        mock = await Mock.deploy()
    })

    describe("exec", function () {
        it("success", async () => {
            await weth.deposit({ value: ethers.parseEther("5") })
            await mock.mint(ethers.parseEther("500"))
            await weth.approve(router.target, ethers.parseEther("5"))
            await mock.approve(router.target, ethers.parseEther("500"))
            await factory.createPair(weth.target, mock.target)
            await router.addLiquidity(
                weth.target,
                mock.target,
                ethers.parseEther("1"),
                ethers.parseEther("100"),
                0,
                0,
                owner.address,
                10000000000
            )
            await router.addLiquidity(
                weth.target,
                mock.target,
                ethers.parseEther("1"),
                ethers.parseEther("110"),
                ethers.parseEther("0.9"),
                ethers.parseEther("100"),
                owner.address,
                10000000000
            )
        })
        // it("fail", async () => {
        //     await expect(mock.connect(alice).exec(proof1)).to.revertedWith(
        //         "201"
        //     )
        // })
    })
})

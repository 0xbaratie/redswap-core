# RedSwap

This repo contains all the contracts used in RedSwap on RedStone network. It is divided in independent projects where each of them contains its smart contracts files.

RedSwap is based on uniswap-v2-periphery without fee structure with foundry tests.

Contract(Redstone Testnet): [0x9d8148d2382eaF2c2E917a34341e7A38Aa7Cb120](https://explorer.holesky.redstone.xyz/address/0x9d8148d2382eaF2c2E917a34341e7A38Aa7Cb120)

## Tree

```
./contracts
├── RedswapERC20.sol
├── RedswapFactory.sol
├── RedswapPair.sol
├── RedswapRouter.sol
├── RedswapRouter01.sol
├── WETH.sol
├── interfaces
│   ├── IERC20.sol
│   ├── IRedswapCallee.sol
│   ├── IRedswapERC20.sol
│   ├── IRedswapFactory.sol
│   ├── IRedswapMigrator.sol
│   ├── IRedswapPair.sol
│   ├── IRedswapRouter01.sol
│   ├── IRedswapRouter02.sol
│   └── IWETH.sol
└── libraries
    ├── Math.sol
    ├── RedswapLibrary.sol
    ├── SafeMath.sol
    └── UQ112x112.sol
...
```

## Acknowledgements

-   [Uniswap Labs](https://github.com/Uniswap)
-   [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
-   [Hardhat](https://hardhat.org/)
-   [RedStone](https://redstone.xyz/)

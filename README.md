# Uniswap-V2 on Redstone

Port of uniswap-v2-core and uniswap-v2-periphery without fee structure with foundry tests.

## Tree

```
├── SETUP.md
├── src
│  ├── interfaces
│  │  ├── IERC20.sol
│  │  ├── IUniswapV2Factory:.sol
│  │  └── IUniswapV2Pair.sol
│  ├── libraries
│  │  ├── Math.sol
│  │  ├── UniswapV2Library.sol
│  │  └── UQ112x112.sol
│  ├── test
│  │  ├── UniswapV2Factory.t.sol
│  │  ├── UniswapV2Pair.t.sol
│  │  ├── UniswapV2Router.t.sol
│  │  └── utils
│  ├── UniswapV2Factory.sol
│  ├── UniswapV2Pair.sol
│  └── UniswapV2Router.sol
```

## Acknowledgements

-   [Uniswap Labs](https://github.com/Uniswap)
-   [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
-   [foundry](https://github.com/gakonst/foundry)
-   [forge-std](https://github.com/brockelmore/forge-std)


## Deploy & Verify on Redstone
To deploy and verify UniswapV2Factory, do the following

### Deploy

```
forge create --rpc-url https://rpc.holesky.redstone.xyz --private-key [YOUR PRIVATE KEY] src/UniswapV2Factory.sol:UniswapV2Factory
```

### Verify

```
forge create --rpc-url https://rpc.holesky.redstone.xyz --private-key [YOUR PRIVATE KEY] src/UniswapV2Factory.sol:UniswapV2Factory --verify --verifier blockscout --verifier-url https://17001-explorer-api.quarry.linfra.xyz/api 
```

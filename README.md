# Uniswap-V2

Port of uniswap-v2-core and uniswap-v2-periphery without fee structure with foundry tests.

These contracts are inspired from amazing blog posts of [Programming Uniswap](https://jeiwan.net/posts/programming-defi-uniswap-1/). Please do look at it.

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
-   [solmate](https://github.com/Rari-Capital/solmate)
-   [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
-   [femplate](https://github.com/abigger87/femplate)
-   [foundry](https://github.com/gakonst/foundry)
-   [forge-std](https://github.com/brockelmore/forge-std)

## Disclaimer

_These smart contracts are being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the user interface or the smart contracts. They have not been audited and as such there can be no assurance they will work as intended, and users may experience delays, failures, errors, omissions, loss of transmitted information or loss of funds. The creators are not liable for any of the foregoing. Users should proceed with caution and use at their own risk._

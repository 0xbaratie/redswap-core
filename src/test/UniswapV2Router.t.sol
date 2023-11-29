// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import {DSTest} from "ds-test/test.sol";
import {Vm} from "forge-std/Vm.sol";
import {MockERC20} from "solmate/test/utils/mocks/MockERC20.sol";
import {IERC20} from "../interfaces/IERC20.sol";
import {UniswapV2Factory} from "../UniswapV2Factory.sol";
import {UniswapV2Router} from "../UniswapV2Router.sol";
import {UniswapV2Pair} from "../UniswapV2Pair.sol";
import {UniswapV2Library} from "../libraries/UniswapV2Library.sol";

contract TestUniswapV2Router is DSTest {
    Vm internal constant vm = Vm(HEVM_ADDRESS);

    UniswapV2Factory public factory;
    UniswapV2Router public router;

    MockERC20 public token0;
    MockERC20 public token1;

    function setUp() public {
        factory = new UniswapV2Factory();
        router = new UniswapV2Router(address(factory));

        token0 = new MockERC20("UnifapToken0", "UT0", 18);
        token1 = new MockERC20("UnifapToken1", "UT1", 18);

        token0.mint(address(this), 10 ether);
        token1.mint(address(this), 10 ether);
    }

    function testAddLiquidityPairFor() public {
        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 1 ether);

        (address _token0, address _token1) = UniswapV2Library.sortPairs(
            address(token0),
            address(token1)
        );
        address pair = UniswapV2Library.pairFor(
            address(factory),
            _token0,
            _token1
        );

        (, , uint256 liquidity) = router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            1 ether,
            1 ether,
            1 ether,
            address(this),
            block.timestamp + 1
        );

        assertEq(liquidity, 1 ether - UniswapV2Pair(pair).MINIMUM_LIQUIDITY());
        assertEq(factory.pairs(address(token0), address(token1)), pair);
    }

    function testAddLiquidityNoPair() public {
        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 1 ether);

        (address _token0, address _token1) = UniswapV2Library.sortPairs(
            address(token0),
            address(token1)
        );

        address pair = UniswapV2Library.pairFor(
            address(factory),
            _token0,
            _token1
        );

        (uint256 amount0, uint256 amount1, uint256 liquidity) = router
            .addLiquidity(
                address(token0),
                address(token1),
                1 ether,
                1 ether,
                1 ether,
                1 ether,
                address(this),
                block.timestamp + 1
            );

        assertEq(amount0, 1 ether);
        assertEq(amount1, 1 ether);
        assertEq(liquidity, 1 ether - UniswapV2Pair(pair).MINIMUM_LIQUIDITY());

        assertEq(factory.pairs(address(token0), address(token1)), pair);
        assertEq(UniswapV2Pair(pair).token0(), address(token0));
        assertEq(UniswapV2Pair(pair).token1(), address(token1));

        (uint256 reserve0, uint256 reserve1, ) = UniswapV2Pair(pair)
            .getReserves();
        assertEq(reserve0, 1 ether);
        assertEq(reserve1, 1 ether);
        assertEq(token0.balanceOf(address(pair)), 1 ether);
        assertEq(token1.balanceOf(address(pair)), 1 ether);
        assertEq(token0.balanceOf(address(this)), 9 ether);
        assertEq(token1.balanceOf(address(this)), 9 ether);
    }

    function testAddLiquidityInsufficientAmountB() public {
        token0.approve(address(router), 4 ether);
        token1.approve(address(router), 8 ether);

        router.addLiquidity(
            address(token0),
            address(token1),
            4 ether,
            8 ether,
            4 ether,
            8 ether,
            address(this),
            block.timestamp + 1
        );

        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 2 ether);

        vm.expectRevert(abi.encodeWithSignature("InsufficientAmountB()"));
        router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            2 ether,
            1 ether,
            2.3 ether,
            address(this),
            block.timestamp + 1
        );
    }

    function testAddLiquidityAmountBDesiredHigh() public {
        token0.approve(address(router), 4 ether);
        token1.approve(address(router), 8 ether);

        router.addLiquidity(
            address(token0),
            address(token1),
            4 ether,
            8 ether,
            4 ether,
            8 ether,
            address(this),
            block.timestamp + 1
        );

        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 2 ether);

        (uint256 amount0, uint256 amount1, ) = router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            2.3 ether,
            1 ether,
            2 ether,
            address(this),
            block.timestamp + 1
        );

        assertEq(amount0, 1 ether);
        assertEq(amount1, 2 ether);
    }

    function testAddLiquidityAmountBDesiredLow() public {
        token0.approve(address(router), 4 ether);
        token1.approve(address(router), 8 ether);

        router.addLiquidity(
            address(token0),
            address(token1),
            4 ether,
            8 ether,
            4 ether,
            8 ether,
            address(this),
            block.timestamp + 1
        );

        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 2 ether);

        (uint256 amount0, uint256 amount1, ) = router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            1.5 ether,
            0.75 ether,
            2 ether,
            address(this),
            block.timestamp + 1
        );

        assertEq(amount0, 0.75 ether);
        assertEq(amount1, 1.5 ether);
    }

    function testAddLiquidityInsufficientAmountA() public {
        token0.approve(address(router), 4 ether);
        token1.approve(address(router), 8 ether);

        router.addLiquidity(
            address(token0),
            address(token1),
            4 ether,
            8 ether,
            4 ether,
            8 ether,
            address(this),
            block.timestamp + 1
        );

        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 2 ether);

        vm.expectRevert(abi.encodeWithSignature("InsufficientAmountA()"));
        router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            1.5 ether,
            1 ether,
            2 ether,
            address(this),
            block.timestamp + 1
        );
    }

    function testAddLiquidityExpired() public {
        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 1 ether);

        vm.warp(2);
        vm.expectRevert(abi.encodeWithSignature("Expired()"));
        router.addLiquidity(
            address(token0),
            address(token1),
            1 ether,
            1 ether,
            1 ether,
            1 ether,
            address(this),
            1
        );
    }

    function testRemoveLiquidity() public {
        token0.approve(address(router), 1 ether);
        token1.approve(address(router), 1 ether);

        (uint256 amount0, uint256 amount1, uint256 liquidity) = router
            .addLiquidity(
                address(token0),
                address(token1),
                1 ether,
                1 ether,
                1 ether,
                1 ether,
                address(this),
                block.timestamp + 1
            );

        address pair = factory.pairs(address(token0), address(token1));
        assertEq(IERC20(pair).balanceOf(address(this)), liquidity);

        router.removeLiquidity(
            address(token0),
            address(token1),
            liquidity,
            amount0,
            amount1,
            address(this),
            block.timestamp + 1
        );
    }
}

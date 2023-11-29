// SPDX-License-Identifier: MIT
pragma solidity >=0.8.10;

import {DSTest} from "ds-test/test.sol";
import {Vm} from "forge-std/Vm.sol";
import {UniswapV2Factory} from "../UniswapV2Factory.sol";
import {UniswapV2Pair} from "../UniswapV2Pair.sol";
// import {IUniswapV2Pair} from "../interfaces/IUniswapV2Pair.sol";
import {MockERC20} from "solmate/test/utils/mocks/MockERC20.sol";
import {UniswapV2Library} from "../libraries/UniswapV2Library.sol";

contract TestUniswapV2Factory is DSTest {
    Vm internal constant vm = Vm(HEVM_ADDRESS);

    UniswapV2Factory public factory;
    MockERC20 public token0;
    MockERC20 public token1;
    MockERC20 public token2;
    MockERC20 public token3;

    function setUp() public {
        factory = new UniswapV2Factory();

        token0 = new MockERC20("UnifapToken0", "UT0", 18);
        token1 = new MockERC20("UnifapToken1", "UT1", 18);
        token2 = new MockERC20("UnifapToken2", "UT2", 18);
        token3 = new MockERC20("UnifapToken3", "UT3", 18);
    }

    function testCreatePair() public {
        address tokenPair = factory.createPair(
            address(token0),
            address(token1)
        );

        (address _token0, address _token1) = UniswapV2Library.sortPairs(
            address(token0),
            address(token1)
        );

        assertEq(factory.getAllPairLength(), 1);
        assertEq(factory.getAllPairsIndex(0), tokenPair);
        assertEq(UniswapV2Pair(tokenPair).token0(), _token0);
        assertEq(UniswapV2Pair(tokenPair).token1(), _token1);
    }

    function testCreatePairMultipleTokens() public {
        address tokenPair0 = factory.createPair(
            address(token0),
            address(token1)
        );
        address tokenPair1 = factory.createPair(
            address(token2),
            address(token3)
        );

        (address _token0, address _token1) = UniswapV2Library.sortPairs(
            address(token0),
            address(token1)
        );
        (address _token2, address _token3) = UniswapV2Library.sortPairs(
            address(token2),
            address(token3)
        );

        assertEq(factory.getAllPairLength(), 2);
        assertEq(factory.getAllPairsIndex(0), tokenPair0);
        assertEq(factory.getAllPairsIndex(1), tokenPair1);
        assertEq(UniswapV2Pair(tokenPair0).token0(), _token0);
        assertEq(UniswapV2Pair(tokenPair0).token1(), _token1);
        assertEq(UniswapV2Pair(tokenPair1).token0(), _token2);
        assertEq(UniswapV2Pair(tokenPair1).token1(), _token3);
    }

    function testCreatePairChained() public {
        address tokenPair0 = factory.createPair(
            address(token0),
            address(token1)
        );
        address tokenPair1 = factory.createPair(
            address(token1),
            address(token2)
        );
        address tokenPair2 = factory.createPair(
            address(token2),
            address(token3)
        );

        assertEq(factory.getAllPairLength(), 3);
        assertEq(factory.getAllPairsIndex(0), tokenPair0);
        assertEq(factory.getAllPairsIndex(1), tokenPair1);
        assertEq(factory.getAllPairsIndex(2), tokenPair2);
    }

    function testCreatePairIdenticalTokens() public {
        vm.expectRevert(abi.encodeWithSignature("IdenticalTokens()"));
        factory.createPair(address(token0), address(token0));
    }

    function testCreatePairInvalidToken() public {
        vm.expectRevert(abi.encodeWithSignature("InvalidToken()"));
        factory.createPair(address(0), address(token1));

        vm.expectRevert(abi.encodeWithSignature("InvalidToken()"));
        factory.createPair(address(token0), address(0));
    }

    function testCreatePairDuplicatePair() public {
        factory.createPair(address(token0), address(token1));
        vm.expectRevert(abi.encodeWithSignature("DuplicatePair()"));
        factory.createPair(address(token0), address(token1));
    }
}

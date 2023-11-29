// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract ERC20ExcessDecimalsMock {
    function decimals() public pure returns (uint256) {
        return type(uint256).max;
    }
}

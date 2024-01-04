// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("MockERC20", "MockERC20") {}

    function mintTokens(uint256 _amount) external {
        _mint(msg.sender, _amount);
    }
}

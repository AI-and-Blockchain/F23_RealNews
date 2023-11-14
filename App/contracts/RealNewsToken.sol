// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RealNewsToken is ERC20, Ownable {
    // Constructor to set up the initial supply, name of the token, and the initial owner
    constructor(uint256 initialSupply) ERC20("RealNewsToken", "RNT") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    // Function to reward users (fact-checkers, validators)
    function rewardUser(address user, uint256 amount) public onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        _mint(user, amount);
    }

    // Function to burn tokens from an address (e.g., when a fact-checker is found to be fraudulent)
    function burnFrom(address user, uint256 amount) public onlyOwner {
        _burn(user, amount);
    }

    // Override the transfer function to possibly include additional logic (if needed)
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        return super.transfer(recipient, amount);
    }

    // Override the transferFrom function to possibly include additional logic (if needed)
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        return super.transferFrom(sender, recipient, amount);
    }
}

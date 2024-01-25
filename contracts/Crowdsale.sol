// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Token} from "./Token.sol";

contract Crowdsale is Ownable {
    uint256 rate;
    Token token;

    uint256 public openingTime;
    uint256 public closingTime;

    bool public isOpen = false;

    constructor(Token _token, uint256 _rate, uint256 _openingTime, uint256 _closingTime, address initialOwner) Ownable(initialOwner) {
        require(_rate > 0, "Rate is 0");
        require(_closingTime > _openingTime, "Invalid closing time");

        token = _token;
        rate = _rate;
        openingTime = _openingTime;
        closingTime = _closingTime;
    }

    modifier onlyWhileOpen() {
        require(isOpen, "Crowdsale not open");
        require(block.timestamp >= openingTime && block.timestamp <= closingTime, "Crowdsale not within the time limit");
        _;
    }

    function openCrowdsale() public onlyOwner {
        require(!isOpen, "Crowdsale is already open");
        isOpen = true;
    }

    function closeCrowdsale() public onlyOwner {
        require(isOpen, "Crowdsale is not open");
        isOpen = false;
    }

    function tokensPurchased() public payable onlyWhileOpen {
        require(msg.value > 0, "No ether sent");
        uint tokenAmount = msg.value / rate;
        require(token.balanceOf(address(this)) >= tokenAmount, "Not enough tokens in the reserve");

        token.transfer(msg.sender, tokenAmount);
    }

    function withdrawTokens() public onlyOwner {
        require(!isOpen, "Cannot withdraw tokens while the crowdsale is still open");
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");

        token.transfer(owner(), remainingTokens);
    }

    function withdrawEther() public onlyOwner {
        require(!isOpen, "Cannot withdraw ethers while the crowdsale is still open");
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");

        payable(owner()).transfer(balance);
    }

    function balanceOf(address _address) public view returns(uint256) {
        return token.balanceOf(_address);
    }
}

//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract TicTacToe {

    address payable public player1_;
    address payable public player2_;
    address public winner;
    mapping(address => uint256) public wagers_;

    function placeWager() external payable {
        require(msg.sender == player1_ || msg.sender == player2_, "Not a valid player.");
        wagers_[msg.sender] = msg.value;
    }
    
    function startGame(address payable _player1, address payable _player2) external {
        player1_ = _player1;
        player2_ = _player2;
    }

    function isWinner(address payable player) public payable {
         if (player == player1_) {
            player1_.transfer(address(this).balance);
            winner = player1_;
        } else if(player == player2_){
             player2_.transfer(address(this).balance);
             winner = player2_;
        }else {
            player1_.transfer(wagers_[player1_]);
            player2_.transfer(wagers_[player2_]);
        }
    }   
}

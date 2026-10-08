// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MemberDeposit {
    address public owner;
    uint256 public totalDeposited;

    mapping(address => bool) public isMember;
    mapping(address => uint256) private deposits;
    address[] private members;

    event MemberAdded(address indexed member);
    event Deposited(address indexed member, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Owner adds members who are allowed to deposit
    function addMember(address member) external onlyOwner {
        require(member != address(0), "Invalid address");
        require(!isMember[member], "Already a member");
        isMember[member] = true;
        members.push(member);
        emit MemberAdded(member);
    }

    // Contract receives ETH (only members allowed)
    receive() external payable {
        require(isMember[msg.sender], "Not a member");
        require(msg.value > 0, "Send some ETH");
        deposits[msg.sender] += msg.value;
        totalDeposited += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // View: how much one member sent
    function getDeposit(address member) external view returns (uint256) {
        return deposits[member];
    }

    // View: total of all members
    function getTotalDeposited() external view returns (uint256) {
        return totalDeposited;
    }

    // View (optional): list of members
    function getMembers() external view returns (address[] memory) {
        return members;
    }

    // View (optional): contract's current ETH balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

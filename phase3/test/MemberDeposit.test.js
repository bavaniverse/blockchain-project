const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MemberDeposit", function () {
  let contract, owner, s, sak, outsider;

  beforeEach(async function () {
    [owner, s, sak, outsider] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("MemberDeposit");
    contract = await Factory.deploy();
    await contract.waitForDeployment();
  });

  // Helper: send ETH directly to the contract address (triggers receive())
  async function send(signer, amountEth) {
    return signer.sendTransaction({
      to: await contract.getAddress(),
      value: ethers.parseEther(amountEth),
    });
  }

  it("sets the deployer as owner", async function () {
    expect(await contract.owner()).to.equal(owner.address);
  });

  it("owner can add members", async function () {
    await contract.addMember(s.address);
    expect(await contract.isMember(s.address)).to.equal(true);
    expect(await contract.getMembers()).to.deep.equal([s.address]);
  });

  it("non-owner cannot add members", async function () {
    await expect(contract.connect(outsider).addMember(s.address)).to.be.revertedWith("Only owner");
  });

  it("cannot add the same member twice", async function () {
    await contract.addMember(s.address);
    await expect(contract.addMember(s.address)).to.be.revertedWith("Already a member");
  });

  it("cannot add the zero address", async function () {
    await expect(contract.addMember(ethers.ZeroAddress)).to.be.revertedWith("Invalid address");
  });

  it("stores per-member deposits: s -> 1 ETH, sak -> 2 ETH", async function () {
    await contract.addMember(s.address);
    await contract.addMember(sak.address);
    await send(s, "1");
    await send(sak, "2");
    expect(await contract.getDeposit(s.address)).to.equal(ethers.parseEther("1"));
    expect(await contract.getDeposit(sak.address)).to.equal(ethers.parseEther("2"));
  });

  it("returns total deposited = 3 ETH", async function () {
    await contract.addMember(s.address);
    await contract.addMember(sak.address);
    await send(s, "1");
    await send(sak, "2");
    expect(await contract.getTotalDeposited()).to.equal(ethers.parseEther("3"));
    expect(await contract.getBalance()).to.equal(ethers.parseEther("3"));
  });

  it("adds up multiple deposits from the same member", async function () {
    await contract.addMember(s.address);
    await send(s, "1");
    await send(s, "1");
    expect(await contract.getDeposit(s.address)).to.equal(ethers.parseEther("2"));
  });

  it("rejects ETH from non-members", async function () {
    await expect(send(outsider, "1")).to.be.revertedWith("Not a member");
    expect(await contract.getTotalDeposited()).to.equal(0n);
  });

  it("rejects zero-value deposits", async function () {
    await contract.addMember(s.address);
    await expect(send(s, "0")).to.be.revertedWith("Send some ETH");
  });

  it("emits Deposited event", async function () {
    await contract.addMember(s.address);
    await expect(send(s, "1"))
      .to.emit(contract, "Deposited")
      .withArgs(s.address, ethers.parseEther("1"));
  });
});

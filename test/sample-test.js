const { expect } = require("chai");
const { ethers } = require("hardhat");


function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

async function randomizeDeposits(addresses, contract) {
  console.log(addresses.length);
  for (let i =0; i<= addresses.length-1; i++) {
    let number = getRandomNumber(0.4, 5); 
    let depositTxn = await contract.connect(addresses[i]).deposit({
      value: ethers.utils.parseEther(number.toString())
    });
    console.log(addresses[i].address, number, " ether")
  }
}

describe("Test Deposit", function () {
  it("Should add money to contract", async function () {
    const addresses = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("RaffleEscrow");
    console.log(addresses[1].address)
    const escrow = await Escrow.deploy(addresses[0].address);
    await escrow.deployed();
    const depositTx = await escrow.deposit({
      value: ethers.utils.parseEther("8")
    });   
     const depositTxTwo = await escrow.deposit({
      value: ethers.utils.parseEther("8")
    });   
    await randomizeDeposits(addresses, escrow); 
    console.log("------ CONTRACT BALANCE (ETHER) ------");
    await escrow.getBalance();
  });
});

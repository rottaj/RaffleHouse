const { expect } = require("chai");
const { ethers } = require("hardhat");
const VRFCoordinator = "0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B";


function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

async function randomizeDeposits(addresses, contract) {
  console.log(addresses.length);
  for (let i =0; i<= addresses.length-1; i++) {
    let number = getRandomNumber(0.4, 5); 
    let depositTxn = await contract.connect(addresses[i]).deposit(parseInt(parseFloat(number) / 0.01),{
      value: ethers.utils.parseEther(number.toString())
    });
    console.log(addresses[i].address, number, " ether", parseInt(parseFloat(number) / 0.01), " tickets")
  }
}

describe("Test Deposit", function () {
  it("Should add money to contract", async function () {
    const addresses = await ethers.getSigners();
    const Escrow = await ethers.getContractFactory("RaffleEscrow");
    console.log(addresses[1].address)
    const escrow = await Escrow.deploy(addresses[0].address,
                                       parseInt("0.08"),
                                       "hello",
                                       );
    await escrow.deployed();
    const depositTx = await escrow.deposit(6, {
      value: ethers.utils.parseEther("8")
    });   
     const depositTxTwo = await escrow.deposit(7, {
      value: ethers.utils.parseEther("8")
    });   
    await randomizeDeposits(addresses, escrow); 
    console.log("------ CONTRACT BALANCE (ETHER) ------");
    await escrow.getBalance();
    await escrow.getRandomNumber();
    await escrow.getWinner();
  });
});

describe("Test Raffles", function () {
  it ("Should test raffles", async function () {
    const addresses = await ethers.getSigners();
    const Raffles = await ethers.getContractFactory("Raffles");
    const raffles = await Raffles.deploy();
    await raffles.deployed()
    console.log("Raffles deployed");
    const addRaffleTxn = await raffles.addRaffle();
    console.log("Added Raffle", addRaffleTxn)
    const rafflesAmount = await raffles.getRaffles();
    console.log("----------------------------------------------");
    console.log("Num Raffles: ", rafflesAmount);
    const raffleOne = await raffles.getRaffleByIndex(0);
    console.log("Raffle 1: ", raffleOne);
  })
});


const hre = require("hardhat");

async function main() {
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy("Token deployed!");
    await token.deployed();

    console.log("Token deployed to: ", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
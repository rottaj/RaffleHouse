const { task, types } = require("hardhat/config");
const Contract = require("ethers");
task("deploy-token", "Deploys contract").setAction(async (_, hre) => {
    return hre.ethers
        .getContractFactory("Token")
        .then((contractFactory) => contractFactory.deploy())
        .then((result) => {
            console.log("Contract address: ", result.address)
        })
});
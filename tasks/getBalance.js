//const { web3 } = require("hardhat");
const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-web3");

task("balance", "Prints an accounts balance").setAction(async () => {})
    .addParam("account", "The accounts address")
    .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);
    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
    });
module.exports = {}
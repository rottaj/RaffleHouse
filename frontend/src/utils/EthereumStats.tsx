const ETHERSCAN_API_LAST_PRICE = 
"https://api.etherscan.io/api?module=stats&action=ethprice&apikey=";

const ETHERSCAN_API_GAS_PRICE =  "https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey="
const ETHERSCAN_API_KEY = "FS4Q2NK8JQJ7DPD73R3G1S1T948RPY3JSI";

export const getCurrentEthereumPrice = async () => {
    var ethereumPrice: any; 
    const url =
        ETHERSCAN_API_LAST_PRICE +
        ETHERSCAN_API_KEY;
    await fetch(url)
        .then((res) => {
        return res.json();
        }).then((data) => {
            ethereumPrice = data;
        })
    return ethereumPrice;
}

export const getCurrentEthereumGasPrice = async () => {
    var gasPrice: any;
    const url =
        ETHERSCAN_API_GAS_PRICE +
        ETHERSCAN_API_KEY;
    await fetch(url)
        .then((res) => {
        return res.json();
        }).then((data) => {
            gasPrice = data;
        })
    return gasPrice;
} 
const { FireblocksWeb3Provider, ChainId } = require("@fireblocks/fireblocks-web3-provider")
const ethers = require("ethers")

// Import the vPool ABI
const ABI = require("./vPool.abi.json");

// Mainnet vPool Contract Address
// https://etherscan.io/address/0x8eea6cc08d824b20efb3bf7c248de694cb1f75f4
const CONTRACT_ADDRESS = "0x8eea6cc08D824B20Efb3bf7C248de694cb1f75F4"

// Mainnet Exit Queue Address
// https://etherscan.io/address/0x86358f7b33b599c484e0335b8ee4f7f7f92d8b60
const EXIT_QUEUE_ADDRESS = "0x86358F7B33b599c484e0335B8Ee4f7f7f92d8b60"

const eip1193Provider = new FireblocksWeb3Provider({
    privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
    apiKey: process.env.FIREBLOCKS_API_KEY,
    vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
    chainId: ChainId.MAINNET,
 // apiBaseUrl: ApiBaseUrl.Sandbox // If using a sandbox workspace
});


(async() => {

    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const vPool = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());

    const numOfShares = ethers.utils.parseEther('96'); // 

    // Invoke transferShares to exit queue address method
    const tx = await vPool.transferShares(
        EXIT_QUEUE_ADDRESS,
        numOfShares,
        ""
    )
   
    console.log(JSON.stringify(tx, null, 2))

})().catch(error => {
    console.log(error)
});

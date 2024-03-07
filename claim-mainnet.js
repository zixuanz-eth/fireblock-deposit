const { FireblocksWeb3Provider, ChainId } = require("@fireblocks/fireblocks-web3-provider")
const ethers = require("ethers")

// Import the vPool ABI
const ABI = require("./ExitQueue.abi.json");

// Goerli vExitQueue Contract Address
const EXIT_QUEUE_ADDRESS = "0x86358F7B33b599c484e0335B8Ee4f7f7f92d8b60"

const eip1193Provider = new FireblocksWeb3Provider({
    privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
    apiKey: process.env.FIREBLOCKS_API_KEY,
    vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
    chainId: ChainId.GOERLI,
 // apiBaseUrl: ApiBaseUrl.Sandbox // If using a sandbox workspace
});


(async() => {

    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const vExitQueue = new ethers.Contract(EXIT_QUEUE_ADDRESS, ABI, provider.getSigner());

    const ticketIDs = [744197536456092419594400366453277078454272] /
    const caskIDs = [114] 

    // Invoke claim method
    const tx = await vExitQueue.claim(
        ticketIDs,
        caskIDs,
        65535
    )
   
    console.log(JSON.stringify(tx, null, 2))

})().catch(error => {
    console.log(error)
});

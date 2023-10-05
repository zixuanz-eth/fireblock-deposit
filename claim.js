const { FireblocksWeb3Provider, ChainId } = require("@fireblocks/fireblocks-web3-provider")
const ethers = require("ethers")

// Import the vPool ABI
const ABI = require("./ExitQueue.abi.json");

// Goerli vExitQueue Contract Address
const EXIT_QUEUE_ADDRESS = "0xc1dd264ee7d1d2b6bf95f8f50566ea1be90aec06"

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

    const ticketIDs = [1,2] // TBD
    const caskIDs = [3,4] // TBD

    // Invoke claim method
    const tx = await vExitQueue.claim(
        ticketIDs,
        caskIDs,
        UINT16_MAX
    )
   
    console.log(JSON.stringify(tx, null, 2))

})().catch(error => {
    console.log(error)
});

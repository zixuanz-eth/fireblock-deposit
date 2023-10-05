const { FireblocksWeb3Provider, ChainId } = require("@fireblocks/fireblocks-web3-provider")
const ethers = require("ethers")

// Import the vPool ABI
const ABI = require("./vPool.abi.json");

// Goerli vPool Contract Address
const CONTRACT_ADDRESS = "0x182e3d45efc4436edb183f4278838505a1847e21"

const eip1193Provider = new FireblocksWeb3Provider({
    privateKey: process.env.FIREBLOCKS_API_PRIVATE_KEY_PATH,
    apiKey: process.env.FIREBLOCKS_API_KEY,
    vaultAccountIds: process.env.FIREBLOCKS_VAULT_ACCOUNT_IDS,
    chainId: ChainId.GOERLI,
 // apiBaseUrl: ApiBaseUrl.Sandbox // If using a sandbox workspace
});


(async() => {

    const provider = new ethers.providers.Web3Provider(eip1193Provider);
    const vPool = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider.getSigner());

    const amount = ethers.utils.parseEther('0.01'); // For example, 0.1 ETH

    // Invoke approve method
    const tx = await vPool.deposit({
        value: amount,
    }
    )
   
    console.log(JSON.stringify(tx, null, 2))

})().catch(error => {
    console.log(error)
});

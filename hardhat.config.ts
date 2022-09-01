import '@nomicfoundation/hardhat-toolbox'
import { config as dotenvConfig } from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'

dotenvConfig()

const API_URL = process.env.API_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

// set proxy as a workaround for contract verification connection errors
const { ProxyAgent, setGlobalDispatcher } = require('undici')
const proxyAgent = new ProxyAgent('http://127.0.0.1:7890')
setGlobalDispatcher(proxyAgent)

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
}

export default config

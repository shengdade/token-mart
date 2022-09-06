import contractInterface from './GameItems.json'

export const CONTRACT = '0xc3F1b96C51E86cBC1b64B13F0095e8B3F9f9a072'

export const OWNER = '0x950e676813f640783fef0a3cf79d30041ad7d5bb'

export const METADATA_CID =
  'bafybeidr7f2lngryuvsrzf4ctevamqos4pnheyqiltlxb3a6pcugu5esxq'

export const contractConfig = {
  addressOrName: CONTRACT,
  contractInterface: contractInterface,
}

export const ALL_TOKEN_IDS = Array.from(Array(20).keys())

export const ALL_TOKEN_OWNERS = Array(20).fill(OWNER)

export const GOERLI_NETWORK_ID = 5

export const ETHERSCAN = 'https://goerli.etherscan.io'

export const OPENSEA_LINK = `https://testnets.opensea.io/assets/goerli/${CONTRACT}/`

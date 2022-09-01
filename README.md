# GameItems

It comes with a contract, a test for that contract, and a script that deploys that contract.

Basic hardhat tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

Deploy to goerli network:

```shell
npx hardhat run scripts/deploy.ts --network goerli
```

Verify on Etherscan:

```shell
npx hardhat verify --network goerli <contract address>
```

## Initialization

`.env` is ignored for security purpose. To initialize from Git:

- Create `.env` file
- Add there environmental variables:
  - API_URL
  - PRIVATE_KEY
  - ETHERSCAN_API_KEY

## Deployment

### Goerli network

Deployed contracts:

- [0xc3F1b96C51E86cBC1b64B13F0095e8B3F9f9a072](https://goerli.etherscan.io/address/0xc3F1b96C51E86cBC1b64B13F0095e8B3F9f9a072)

IPFS images

- CID: bafybeicetyjsqovk42ylvuqo3zv4e4uhwalp7e5vfkgmuc34cb2vrw5jri
- IPFS URL: ipfs://bafybeicetyjsqovk42ylvuqo3zv4e4uhwalp7e5vfkgmuc34cb2vrw5jri
- Gateway URL: [bafybeicetyjsqovk42ylvuqo3zv4e4uhwalp7e5vfkgmuc34cb2vrw5jri](https://nftstorage.link/ipfs/bafybeicetyjsqovk42ylvuqo3zv4e4uhwalp7e5vfkgmuc34cb2vrw5jri)

IPFS metadata

- CID: bafybeidr7f2lngryuvsrzf4ctevamqos4pnheyqiltlxb3a6pcugu5esxq
- IPFS URL: ipfs://bafybeidr7f2lngryuvsrzf4ctevamqos4pnheyqiltlxb3a6pcugu5esxq
- Gateway URL: [bafybeidr7f2lngryuvsrzf4ctevamqos4pnheyqiltlxb3a6pcugu5esxq](https://nftstorage.link/ipfs/bafybeidr7f2lngryuvsrzf4ctevamqos4pnheyqiltlxb3a6pcugu5esxq)

### Legacy

IPFS

- images CID: bafybeiclwildrgedknmcldkiy27gxcg4g63n4kgkyqujqjifxdbwa22n2a
- metadata CID: bafybeiai4s3lls5nyjzj5dr7y66nodvnwq2jogsvp3vbbzqbkhi7mtvfrm

Contract

- 0xF6128A92bC60e4244831ad323FAA10E87aACf7d3
- 0xBc2CD02339ce6d75D7805D9e803D95b7f52a6e67
- 0x0b0a06880e702b4eed45edea8dad6adb1fbe023e

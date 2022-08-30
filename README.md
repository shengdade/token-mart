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

Deployed contracts on goerli network:

- [0xF6128A92bC60e4244831ad323FAA10E87aACf7d3](https://goerli.etherscan.io/address/0xF6128A92bC60e4244831ad323FAA10E87aACf7d3)

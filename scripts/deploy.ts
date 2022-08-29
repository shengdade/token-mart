import { ethers } from 'hardhat'

async function main() {
  const GameItems = await ethers.getContractFactory('GameItems')
  const gameItems = await GameItems.deploy()

  await gameItems.deployed()

  console.log(`Contract deployed to ${gameItems.address}`)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

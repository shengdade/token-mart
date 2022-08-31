import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'

describe('GameItems', function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners()

    const GameItems = await ethers.getContractFactory('GameItems')
    const gameItems = await GameItems.deploy()

    return { gameItems, owner, otherAccount }
  }

  describe('Deployment', function () {
    it('Should set the right balance', async function () {
      const { gameItems, owner } = await loadFixture(deployFixture)

      expect(await gameItems.balanceOf(owner.address, '1')).to.equal(5)
      expect(await gameItems.balanceOf(owner.address, '2')).to.equal(10)
      expect(await gameItems.balanceOf(owner.address, '3')).to.equal(3)
      expect(await gameItems.balanceOf(owner.address, '4')).to.equal(3)
      expect(await gameItems.balanceOf(owner.address, '5')).to.equal(1)
    })

    it('Should set the right supply', async function () {
      const { gameItems } = await loadFixture(deployFixture)

      expect(await gameItems.totalSupply('1')).to.equal(5)
      expect(await gameItems.totalSupply('2')).to.equal(10)
      expect(await gameItems.totalSupply('3')).to.equal(3)
      expect(await gameItems.totalSupply('4')).to.equal(3)
      expect(await gameItems.totalSupply('5')).to.equal(1)
    })

    it('Should set the right price', async function () {
      const { gameItems } = await loadFixture(deployFixture)

      expect(await gameItems.priceOf('1')).to.equal(
        ethers.utils.parseEther('0.01')
      )
      expect(await gameItems.priceOf('2')).to.equal(
        ethers.utils.parseEther('0.005')
      )
      expect(await gameItems.priceOf('3')).to.equal(
        ethers.utils.parseEther('0.008')
      )
      expect(await gameItems.priceOf('4')).to.equal(
        ethers.utils.parseEther('0.008')
      )
      expect(await gameItems.priceOf('5')).to.equal(
        ethers.utils.parseEther('0.02')
      )
    })

    it('Should set the right owner', async function () {
      const { gameItems, owner } = await loadFixture(deployFixture)

      expect(await gameItems.owner()).to.equal(owner.address)
    })
  })

  describe('Items', function () {
    describe('URI', function () {
      it('Should return the default URI', async function () {
        const { gameItems } = await loadFixture(deployFixture)

        expect(await gameItems.uri('0')).to.equal(
          'https://ipfs.io/ipfs/bafybeiai4s3lls5nyjzj5dr7y66nodvnwq2jogsvp3vbbzqbkhi7mtvfrm/0.json'
        )
      })

      it('Should allow owner to set the right URI', async function () {
        const { gameItems } = await loadFixture(deployFixture)

        await gameItems.setURI('https://ipfs.io/ipfs/test/')
        expect(await gameItems.uri('1')).to.equal(
          'https://ipfs.io/ipfs/test/1.json'
        )
      })

      it('Should revert with the right error if called from another account', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems.connect(otherAccount).setURI('https://ipfs.io/ipfs/test/')
        ).to.be.revertedWith('Ownable: caller is not the owner')
      })
    })

    describe('Prices', function () {
      it('Should return batch of prices', async function () {
        const { gameItems } = await loadFixture(deployFixture)

        expect(await gameItems.priceOfBatch(['1', '2', '3'])).to.deep.equal([
          ethers.utils.parseEther('0.01'),
          ethers.utils.parseEther('0.005'),
          ethers.utils.parseEther('0.008'),
        ])
      })

      it('Should set the right price', async function () {
        const { gameItems } = await loadFixture(deployFixture)

        await gameItems.setPrice('1', ethers.utils.parseEther('1'))
        expect(await gameItems.priceOf('1')).to.equal(
          ethers.utils.parseEther('1')
        )
      })

      it('Should batch set right prices', async function () {
        const { gameItems } = await loadFixture(deployFixture)

        await gameItems.setPriceBatch(
          ['1', '2', '3'],
          [
            ethers.utils.parseEther('1'),
            ethers.utils.parseEther('2'),
            ethers.utils.parseEther('3'),
          ]
        )
        expect(await gameItems.priceOfBatch(['1', '2', '3'])).to.deep.equal([
          ethers.utils.parseEther('1'),
          ethers.utils.parseEther('2'),
          ethers.utils.parseEther('3'),
        ])
      })
    })

    describe('Purchases', function () {
      it('Should revert with the right error if items are not available', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems
            .connect(otherAccount)
            .purchase('1', 100, { value: ethers.utils.parseEther('10') })
        ).to.be.revertedWith(
          'GameItems: insufficient items available to purchase'
        )
      })

      it('Should revert with the right error if user sent insufficient payment', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems.connect(otherAccount).purchase('1', 100, {
            value: ethers.utils.parseEther('0.9'),
          })
        ).to.be.revertedWith(
          'GameItems: insufficient items available to purchase'
        )
      })

      it("Shouldn't fail if items are available and user sent enough payment", async function () {
        const { gameItems, owner, otherAccount } = await loadFixture(
          deployFixture
        )

        expect(
          await gameItems.connect(otherAccount).purchase('1', 2, {
            value: ethers.utils.parseEther('0.02'),
          })
        ).to.changeEtherBalances(
          [gameItems, otherAccount],
          [ethers.utils.parseEther('0.02'), -ethers.utils.parseEther('0.02')]
        )
        expect(await ethers.provider.getBalance(gameItems.address)).to.equal(
          ethers.utils.parseEther('0.02')
        )
        expect(await gameItems.balanceOf(owner.address, '1')).to.equal(3)
        expect(await gameItems.balanceOf(otherAccount.address, '1')).to.equal(2)
        expect(await gameItems.totalSupply('1')).to.equal(5)
      })
    })

    describe('Batch Purchases', function () {
      it('Should revert with the right error if ids and amounts length mismatch', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems.connect(otherAccount).purchaseBatch(['1', '2'], [1], {
            value: ethers.utils.parseEther('10'),
          })
        ).to.be.revertedWith('GameItems: ids and amounts length mismatch')
      })

      it('Should revert with the right error if an item is not available', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems.connect(otherAccount).purchaseBatch(['1', '2'], [1, 100], {
            value: ethers.utils.parseEther('100'),
          })
        ).to.be.revertedWith(
          'GameItems: insufficient items available to purchase'
        )
      })

      it('Should revert with the right error if user sent insufficient payment', async function () {
        const { gameItems, otherAccount } = await loadFixture(deployFixture)

        await expect(
          gameItems.connect(otherAccount).purchaseBatch(['1', '2'], [1, 2], {
            value: ethers.utils.parseEther('0.019'),
          })
        ).to.be.revertedWith(
          'GameItems: insufficient payment for batch purchase'
        )
      })

      it("Shouldn't fail if items are available and user sent enough payment", async function () {
        const { gameItems, owner, otherAccount } = await loadFixture(
          deployFixture
        )

        expect(
          await gameItems
            .connect(otherAccount)
            .purchaseBatch(['1', '2', '3'], [1, 4, 2], {
              value: ethers.utils.parseEther('0.046'),
            })
        ).to.changeEtherBalances(
          [gameItems, otherAccount],
          [ethers.utils.parseEther('0.046'), -ethers.utils.parseEther('0.046')]
        )
        expect(await ethers.provider.getBalance(gameItems.address)).to.equal(
          ethers.utils.parseEther('0.046')
        )
        expect(
          await gameItems.balanceOfBatch(
            [
              owner.address,
              owner.address,
              owner.address,
              otherAccount.address,
              otherAccount.address,
              otherAccount.address,
            ],
            ['1', '2', '3', '1', '2', '3']
          )
        ).to.deep.equal([4, 6, 1, 1, 4, 2])
        expect(await gameItems.totalSupply('1')).to.equal(5)
        expect(await gameItems.totalSupply('2')).to.equal(10)
        expect(await gameItems.totalSupply('3')).to.equal(3)
      })
    })
  })

  describe('Withdrawals', function () {
    it('Should revert with the right error if called from another account', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await expect(
        gameItems.connect(otherAccount).withdraw(100)
      ).to.be.revertedWith('Ownable: caller is not the owner')
    })

    it('Should revert with the right error if insufficient balance', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await gameItems.connect(otherAccount).purchase('1', 2, {
        value: ethers.utils.parseEther('0.02'),
      })
      await expect(
        gameItems.withdraw(ethers.utils.parseEther('0.021'))
      ).to.be.revertedWith('Address: insufficient balance')
    })

    it('Should transfer the funds to the owner', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await gameItems.connect(otherAccount).purchase('1', 2, {
        value: ethers.utils.parseEther('0.02'),
      })

      expect(
        gameItems.withdraw(ethers.utils.parseEther('0.02'))
      ).to.changeEtherBalances(
        [gameItems, otherAccount],
        [-ethers.utils.parseEther('0.02'), ethers.utils.parseEther('0.02')]
      )
      expect(await ethers.provider.getBalance(gameItems.address)).to.equal(0)
    })
  })

  describe('Events', function () {
    it('Should emit an event on purchase', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await expect(
        gameItems.connect(otherAccount).purchase('1', 5, {
          value: ethers.utils.parseEther('0.05'),
        })
      )
        .to.emit(gameItems, 'PurchaseSingle')
        .withArgs(otherAccount.address, '1', 5, ethers.utils.parseEther('0.05'))
    })

    it('Should emit an event on batch purchase', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await expect(
        gameItems.connect(otherAccount).purchaseBatch(['1', '2'], [1, 2], {
          value: ethers.utils.parseEther('0.02'),
        })
      )
        .to.emit(gameItems, 'PurchaseBatch')
        .withArgs(
          otherAccount.address,
          ['1', '2'],
          [1, 2],
          ethers.utils.parseEther('0.02')
        )
    })

    it('Should emit an event on owner withdrawal', async function () {
      const { gameItems, otherAccount } = await loadFixture(deployFixture)

      await gameItems.connect(otherAccount).purchase('1', 5, {
        value: ethers.utils.parseEther('0.05'),
      })

      await expect(gameItems.withdraw(ethers.utils.parseEther('0.05')))
        .to.emit(gameItems, 'Withdrawal')
        .withArgs(ethers.utils.parseEther('0.05'))
    })
  })
})

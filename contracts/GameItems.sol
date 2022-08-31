// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract GameItems is ERC1155Supply, Ownable {
    // Mapping from token ID to token prices
    mapping(uint256 => uint256) private _prices;

    // Emitted when buyer purchased amount of token with given id
    event PurchaseSingle(
        address indexed buyer,
        uint256 id,
        uint256 amount,
        uint256 value
    );

    // Emitted when buyer purchased amounts of tokens with given ids
    event PurchaseBatch(
        address indexed buyer,
        uint256[] ids,
        uint256[] amounts,
        uint256 value
    );

    // Emitted when owner withdrawn amount of balance
    event Withdrawal(uint amount);

    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant THORS_HAMMER = 2;
    uint256 public constant SWORD = 3;
    uint256 public constant SHIELD = 4;

    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/bafybeiclwildrgedknmcldkiy27gxcg4g63n4kgkyqujqjifxdbwa22n2a/"
        )
    {
        _mint(msg.sender, GOLD, 18, "");
        _mint(msg.sender, SILVER, 27, "");
        _mint(msg.sender, THORS_HAMMER, 1, "");
        _mint(msg.sender, SWORD, 2, "");
        _mint(msg.sender, SHIELD, 9, "");

        _setPrice(GOLD, 0.1 ether);
        _setPrice(SILVER, 0.01 ether);
        _setPrice(THORS_HAMMER, 0.2 ether);
        _setPrice(SWORD, 0.01 ether);
        _setPrice(SHIELD, 0.01 ether);
    }

    /**
     * Get URI of token with given id.
     */
    function uri(uint256 _tokenid)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    ERC1155.uri(_tokenid),
                    Strings.toString(_tokenid),
                    ".json"
                )
            );
    }

    /**
     * Get price of token with given id.
     *
     * Requirements:
     * - token exists with given id.
     */
    function priceOf(uint256 id) public view returns (uint256) {
        require(exists(id), "GameItems: get price to nonexistent item");
        return _prices[id];
    }

    /**
     * Batch get prices of tokens with given ids.
     */
    function priceOfBatch(uint256[] memory ids)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory batchPrices = new uint256[](ids.length);

        for (uint256 i = 0; i < ids.length; ++i) {
            batchPrices[i] = priceOf(ids[i]);
        }

        return batchPrices;
    }

    /**
     * Set price of token with given id.
     *
     * Requirements:
     * - only owner can call this function.
     * - token exists with given id.
     */
    function setPrice(uint256 id, uint256 price) public onlyOwner {
        require(exists(id), "GameItems: set price to nonexistent item");
        _setPrice(id, price);
    }

    /**
     * Batch set prices of tokens with given ids.
     *
     * Requirements:
     * - only owner can call this function.
     * - `ids` and `prices` must have the same length.
     */
    function setPriceBatch(uint256[] memory ids, uint256[] memory prices)
        public
        onlyOwner
    {
        require(
            ids.length == prices.length,
            "GameItems: ids and prices length mismatch"
        );

        for (uint256 i = 0; i < ids.length; ++i) {
            setPrice(ids[i], prices[i]);
        }
    }

    /**
     * Purchase amount of tokens with given id.
     *
     * Requirements:
     * - owner has enough items to purchase.
     * - token exists with given id (through priceOf).
     * - owner has sent enough payment.
     */
    function purchase(uint256 id, uint256 amount) public payable {
        uint256 available = balanceOf(owner(), id);
        require(
            available >= amount,
            "GameItems: insufficient items available to purchase"
        );

        uint256 total = priceOf(id) * amount;
        require(
            msg.value >= total,
            "GameItems: insufficient payment for purchase"
        );

        _safeTransferFrom(owner(), _msgSender(), id, amount, "");
        emit PurchaseSingle(_msgSender(), id, amount, msg.value);
    }

    /**
     * Batch purchase amounts of tokens with given ids.
     *
     * Requirements:
     * - owner has enough items to purchase.
     * - tokens exist with given ids (through priceOf).
     * - owner has sent enough payment.
     */
    function purchaseBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        payable
    {
        require(
            ids.length == amounts.length,
            "GameItems: ids and amounts length mismatch"
        );

        uint256 total = 0;
        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];
            uint256 available = balanceOf(owner(), id);
            require(
                available >= amount,
                "GameItems: insufficient items available to purchase"
            );

            total += priceOf(id) * amount;
        }
        require(
            msg.value >= total,
            "GameItems: insufficient payment for batch purchase"
        );

        _safeBatchTransferFrom(owner(), _msgSender(), ids, amounts, "");
        emit PurchaseBatch(_msgSender(), ids, amounts, msg.value);
    }

    /**
     * Withdraw amount of balance to the owner
     *
     * Requirements:
     * - only owner can call this function.
     */
    function withdraw(uint256 amount) public onlyOwner {
        Address.sendValue(payable(owner()), amount);
        emit Withdrawal(amount);
    }

    /**
     * Private function to set a token price.
     */
    function _setPrice(uint256 id, uint256 price) private {
        _prices[id] = price;
    }
}

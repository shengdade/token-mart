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

    uint256 public constant AXE = 1;
    uint256 public constant KNIFE = 2;
    uint256 public constant DART = 3;
    uint256 public constant MACE = 4;
    uint256 public constant GUN = 5;
    uint256 public constant SPEAR = 6;
    uint256 public constant SWORD = 7;
    uint256 public constant SLINGSHOT = 8;
    uint256 public constant SHURIKEN = 9;
    uint256 public constant BOW = 10;
    uint256 public constant REGULAR_CAR = 11;
    uint256 public constant BOAT = 12;
    uint256 public constant ROCKET = 13;
    uint256 public constant SUBMARINE = 14;
    uint256 public constant MINI_CAR = 15;
    uint256 public constant JET_SKI = 16;
    uint256 public constant SPORT_CAR = 17;
    uint256 public constant SUPER_CAR = 18;
    uint256 public constant CAMEL = 19;
    uint256 public constant SKATEBOARD = 20;

    /**
     * Constructor
     */
    constructor()
        ERC1155(
            "https://ipfs.io/ipfs/bafybeiai4s3lls5nyjzj5dr7y66nodvnwq2jogsvp3vbbzqbkhi7mtvfrm/"
        )
    {
        _mintWithPrice();
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
     * Withdraw amount of balance to the owner.
     *
     * Requirements:
     * - only owner can call this function.
     */
    function withdraw(uint256 amount) public onlyOwner {
        Address.sendValue(payable(owner()), amount);
        emit Withdrawal(amount);
    }

    /**
     * Sets a new URI for all token types.
     *
     * Requirements:
     * - only owner can call this function.
     */
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /**
     * Private function to set a token price.
     */
    function _setPrice(uint256 id, uint256 price) private {
        _prices[id] = price;
    }

    /**
     * Private function to mint tokens and set prices.
     */
    function _mintWithPrice() private {
        _mint(msg.sender, AXE, 5, "");
        _mint(msg.sender, KNIFE, 10, "");
        _mint(msg.sender, DART, 3, "");
        _mint(msg.sender, MACE, 3, "");
        _mint(msg.sender, GUN, 1, "");
        _mint(msg.sender, SPEAR, 4, "");
        _mint(msg.sender, SWORD, 10, "");
        _mint(msg.sender, SLINGSHOT, 20, "");
        _mint(msg.sender, SHURIKEN, 10, "");
        _mint(msg.sender, BOW, 15, "");
        _mint(msg.sender, REGULAR_CAR, 40, "");
        _mint(msg.sender, BOAT, 8, "");
        _mint(msg.sender, ROCKET, 3, "");
        _mint(msg.sender, SUBMARINE, 2, "");
        _mint(msg.sender, MINI_CAR, 10, "");
        _mint(msg.sender, JET_SKI, 5, "");
        _mint(msg.sender, SPORT_CAR, 2, "");
        _mint(msg.sender, SUPER_CAR, 1, "");
        _mint(msg.sender, CAMEL, 6, "");
        _mint(msg.sender, SKATEBOARD, 30, "");

        _setPrice(AXE, 0.01 ether);
        _setPrice(KNIFE, 0.005 ether);
        _setPrice(DART, 0.008 ether);
        _setPrice(MACE, 0.008 ether);
        _setPrice(GUN, 0.02 ether);
        _setPrice(SPEAR, 0.005 ether);
        _setPrice(SWORD, 0.002 ether);
        _setPrice(SLINGSHOT, 0.004 ether);
        _setPrice(SHURIKEN, 0.002 ether);
        _setPrice(BOW, 0.003 ether);
        _setPrice(REGULAR_CAR, 0.001 ether);
        _setPrice(BOAT, 0.005 ether);
        _setPrice(ROCKET, 0.02 ether);
        _setPrice(SUBMARINE, 0.03 ether);
        _setPrice(MINI_CAR, 0.01 ether);
        _setPrice(JET_SKI, 0.008 ether);
        _setPrice(SPORT_CAR, 0.03 ether);
        _setPrice(SUPER_CAR, 0.04 ether);
        _setPrice(CAMEL, 0.01 ether);
        _setPrice(SKATEBOARD, 0.002 ether);
    }
}

// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

contract ERC721 {
    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 indexed _tokenId
    );

    event Approval(
        address indexed _owner,
        address indexed _approved,
        uint256 _tokenId
    );

    event ApprovedForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );

    // track the NFT balances by owner's address
    mapping(address => uint256) internal _balances;

    // track the owner by tokenId(NFT)
    mapping(uint256 => address) internal _owners;

    // track the operator permissions: NFT address is mapped to a mapping of the
    // operator address to check approval status
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // tracks whether or not tokenIDs are approved addresses
    mapping(uint256 => address) public _tokenApprovals;

    // return the number of NFTs assigned to owner
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "Address is zero");
        return _balances[owner];
    }

    // find the owner of an NFT
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "TokenID does not exist");
        return owner;
    }

    // enables/disables operator to manage all of msg.sender's assets
    function setApprovalForAll(address operator, bool approved) public {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovedForAll(msg.sender, operator, approved);
    }

    // checks to see if address is operator for another address
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    // updates an address, to approved, for an NFT
    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "Msg.sender is not the owner or an approved operator"
        );
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    // gets the approved address for a single NFT
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        return _tokenApprovals[tokenId];
    }

    //transfer ownership of an NFT and update balances
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        address owner = ownerOf(tokenId);
        require(
            msg.sender == owner ||
                getApproved(tokenId) == msg.sender ||
                isApprovedForAll(owner, msg.sender),
            "Msg.sender neither owner nor approved"
        );
        require(owner == from, "From address is not the owner");
        require(to != address(0), "Address is zero");
        require(_owners[tokenId] != address(0), "Token ID does not exist");
        approve(address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }

    // similar to standard transferFrom
    // checks if onERC721Received is implemented
    // WHEN sending to smart contracts
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public {
        transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(), "Receiver not implemented");
    }

    // no bytes data
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    // ** oversimplified not fully implemented - usually call this function
    // to get a response from the external contract
    function _checkOnERC721Received() private pure returns (bool) {
        return true;
    }

    // EIP165: query if a contract implements another interface
    function supportsInterface(bytes4 interfaceId)
        public
        pure
        virtual
        returns (bool)
    {
        return interfaceId == 0x80ac58cd;
    }
}

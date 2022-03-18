// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract ERC1155 {
    event TransferSingle(
        address indexed _operator,
        address indexed _from,
        address indexed _to,
        uint256 _id,
        uint256 _value
    );

    event ApprovalForAll(
        address indexed _owner,
        address indexed _operator,
        bool _approved
    );

    // Mapping from TokenID to account balances (balanceOf)
    mapping(uint256 => mapping(address => uint256)) internal _balances;

    // Mapping from account to operator approvals (isApprovedForAll)
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Gets the balance of an account's tokens
    function balanceOf(address account, uint256 id)
        public
        view
        returns (uint256)
    {
        require(account != address(0), "Address is zero!");
        return _balances[id][account];
    }

    // Gets the balance of multiple accounts' tokens
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        public
        view
        returns (uint256[] memory)
    {
        require(
            accounts.length == ids.length,
            "Accounts and ids are not the same length!"
        );
        uint256[] memory batchBalances = new uint256[](accounts.length);

        for (uint256 i = 0; i < accounts.length; i++) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    // Checks operator status of an address
    function isApprovedForAll(address account, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[account][operator];
    }

    // Enables or disables an operator to manage all of msg.senders' assets
    function setApprovalForAll(address operator, bool approved) public {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    // This function is for unsafe testing purposes
    function _transfer(
        address from,
        address to,
        uint256 id,
        uint256 amount
    ) private {
        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "Insufficient balance!");
        _balances[id][from] = fromBalance = amount;
        _balances[id][to] += amount;
    }

    // Transfer a single balance safely
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        // bytes memory data
    ) public virtual {
        require(from == msg.sender || isApprovedForAll(from, msg.sender), "Msg.sender is neither owner nor approved for transfer!");
        require(to != address(0), "Address is zero!");
        _transfer(from, to, id, amount);
        emit TransferSingle(msg.sender, from, to, id, amount);

        require(_checkOnERC1155Received(), "Receiver is not implemented!");
    }

    // Dummy function, oversimplified
    function _checkOnERC1155Received() private pure returns (bool) {
        return true;
    }

    //
    function safeBatchTransferFrom() {}
}

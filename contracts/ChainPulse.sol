// SPDX-License-Identifier: ISC
pragma solidity ^0.8.20;

contract ChainPulse {
    function snapshot()
        external
        view
        returns (
            uint256 blockNumber,
            uint256 timestamp,
            uint256 basefee,
            address coinbase
        )
    {
        blockNumber = block.number;
        timestamp = block.timestamp;
        basefee = block.basefee;
        coinbase = block.coinbase;
    }

    function codeSize(address target) external view returns (uint256 size) {
        assembly {
            size := extcodesize(target)
        }
    }
}

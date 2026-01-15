// SPDX-License-Identifier: ISC
pragma solidity ^0.8.20;

contract RuntimeIndex {
    mapping(address => uint256) private firstSeen;

    function register(address target) external {
        if (firstSeen[target] == 0) {
            firstSeen[target] = block.timestamp;
        }
    }

    function seenAt(address target) external view returns (uint256) {
        return firstSeen[target];
    }

    function exists(address target) external view returns (bool) {
        return firstSeen[target] != 0;
    }
}

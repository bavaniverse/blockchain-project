# Concepts

| Concept | Meaning |
|---|---|
| Contract address | The contract has a wallet-like address. Members send ETH to it. |
| payable / receive() | Needed for the contract to accept ETH. Without it the transaction fails. |
| Member-only deposit | Only addresses added by the owner can send. Others get reverted and their ETH returns. |
| Mapping | A table that stores data, e.g. s -> 1 ETH, sak -> 2 ETH. |
| Total | Sum of all members' deposits (1 + 2 = 3 ETH). |
| view function | Only reads data, costs no gas, returns data when someone asks. |

## Flow
Owner adds members -> member sends ETH -> contract updates per-member amount and total -> anyone can call view functions to read data.

# Vulnerability analysis

## Safe
- Reentrancy: not possible, the contract never sends ETH out.
- Overflow: Solidity 0.8+ checks automatically.
- Non-member deposit: blocked by require.

## Gaps
1. No withdraw function: ETH sent to the contract is stuck forever. (important)
2. No ownership transfer: if the owner key is lost, no more members can be added.
3. No removeMember: a wrongly added member cannot be removed.
4. Forced ETH via selfdestruct: contract balance can differ from totalDeposited, so use getTotalDeposited() for totals, not getBalance().
5. Single owner: full control with one account (centralization).

## Verdict
Fine for learning, demo and testnet. Add withdraw and ownership transfer before any real-money use.

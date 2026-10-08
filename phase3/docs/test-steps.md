# Test steps (Remix)

1. Deploy `MemberDeposit` (mandatory). The deploying account is the owner.
2. Call `addMember` with the s address and the sak address (mandatory).
3. Send ETH (mandatory): set the Value field, then use "Low level interactions" -> Transact.
   - From s: 1 ETH
   - From sak: 2 ETH
4. Verify (mandatory):
   - getDeposit(s) = 1000000000000000000 (1 ETH in wei)
   - getDeposit(sak) = 2000000000000000000 (2 ETH in wei)
   - getTotalDeposited() = 3000000000000000000 (3 ETH in wei)
5. Negative test (optional): send ETH from a non-member account. It should revert with "Not a member".

## Automated tests (Hardhat)
Run `npx hardhat test` in the project folder. 11 test cases cover:
owner set, add member, non-owner blocked, duplicate/zero address blocked,
s -> 1 ETH and sak -> 2 ETH stored, total = 3 ETH, repeat deposits add up,
non-member rejected, zero-value rejected, Deposited event emitted.

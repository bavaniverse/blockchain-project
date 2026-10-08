# Phase 3 - Member Deposit Contract

## Project structure
```
phase3-member-deposit/
|-- README.md                      (this file)
|-- package.json                   (dependencies)
|-- hardhat.config.js              (Hardhat config)
|-- contracts/MemberDeposit.sol    (the smart contract)
|-- test/MemberDeposit.test.js     (11 test cases)
`-- docs/
    |-- concepts.md                (concepts explained)
    |-- code-explanation.md        (code explained, 2 lines each)
    |-- test-steps.md              (how to test in Remix)
    `-- vulnerabilities.md         (security analysis)
```

## Requirement (summary)
1. Contract has an address and can receive ETH (payable).
2. Only members added by the owner can deposit (option 2).
3. Contract stores what each member sent (s -> 1 ETH, sak -> 2 ETH).
4. Anyone can read the data using view functions, including the total (3 ETH).

## How to run in VS Code (Hardhat)
1. Open this folder in VS Code (mandatory)
2. Terminal: `npm install` (mandatory, first time only)
3. Terminal: `npx hardhat compile` (mandatory)
4. Terminal: `npx hardhat test` (mandatory). Expected: 11 passing
5. Deploy to a testnet (optional, only if sir asks)

## Alternative: Remix (no install needed)
1. Open https://remix.ethereum.org (mandatory)
2. Create a file `MemberDeposit.sol` and paste the code from `contracts/` (mandatory)
3. Compile with Solidity 0.8.20 or higher (mandatory)
4. Follow `docs/test-steps.md` (mandatory)

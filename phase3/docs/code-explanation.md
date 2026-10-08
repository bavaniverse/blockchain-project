# Code explanation (2 lines each)

## State variables
`owner` is the admin, `totalDeposited` is the sum of all deposits.
`deposits` stores per-member amount, `isMember` marks who is allowed, `members` is the list.

## onlyOwner + constructor
Whoever deploys the contract becomes the owner.
`onlyOwner` restricts a function so only the owner can call it.

## addMember(address)
Owner registers an address as a member. Duplicates and the zero address are blocked.

## receive() external payable
Runs when ETH is sent to the contract. Checks the sender is a member, then adds the amount to that member's deposit and to the total.

## getDeposit(address) / getTotalDeposited()
First returns how much one member sent (s -> 1 ETH). Second returns the total of everyone (3 ETH).

## getMembers() / getBalance() (optional)
Returns the member list and the contract's actual ETH balance. Not needed for the core requirement.

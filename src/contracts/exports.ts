export const masterAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "addSponsor",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_sponsor", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createEvent",
    inputs: [{ name: "_name", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createTeam",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      {
        name: "_team",
        type: "tuple",
        internalType: "struct Team",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "leader", type: "address", internalType: "address" },
          { name: "members", type: "address[]", internalType: "address[]" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "events",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "owner", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEvent",
    inputs: [{ name: "_eventId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Event",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "owner", type: "address", internalType: "address" },
          { name: "teamIds", type: "uint256[]", internalType: "uint256[]" },
          { name: "sponsors", type: "address[]", internalType: "address[]" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEventSponsor",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_sponsorIndex", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEventTeam",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_teamIndex", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "teamId_", type: "uint256", internalType: "uint256" },
      {
        name: "team_",
        type: "tuple",
        internalType: "struct Team",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "leader", type: "address", internalType: "address" },
          { name: "members", type: "address[]", internalType: "address[]" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTeam",
    inputs: [{ name: "_teamId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Team",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "leader", type: "address", internalType: "address" },
          { name: "members", type: "address[]", internalType: "address[]" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalSponsorPrize",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "totalPrize_", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isSponsor",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "teams",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "leader", type: "address", internalType: "address" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalEvents",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalTeams",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateEventName",
    inputs: [
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateTeamMembers",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "members", type: "address[]", internalType: "address[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateTeamName",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "AlreadySponsoringEvent", inputs: [] },
  {
    type: "error",
    name: "InvalidEvent",
    inputs: [{ name: "_eventId", type: "uint256", internalType: "uint256" }],
  },
  { type: "error", name: "NotEventCreator", inputs: [] },
  { type: "error", name: "NotTeamLeader", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
] as const;
export const sponsorAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_master", type: "address", internalType: "address" },
      { name: "_eventId", type: "uint256", internalType: "uint256" },
      { name: "_name", type: "string", internalType: "string" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allocatePrizes",
    inputs: [
      { name: "_tokens", type: "address[]", internalType: "address[]" },
      { name: "_teamIds", type: "uint256[]", internalType: "uint256[]" },
      { name: "_amounts", type: "uint256[]", internalType: "uint256[]" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimPrize",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
      { name: "_claimant", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimedAmounts",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "eventId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getAllocatablePrize",
    inputs: [{ name: "_token", type: "address", internalType: "address" }],
    outputs: [{ name: "amount_", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getClaimablePrize",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "_claimant", type: "address", internalType: "address" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [
      { name: "amountLeft_", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrizeAmount",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrizeTokens",
    inputs: [{ name: "_teamId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "master",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IMaster" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "totalClaimedAmounts",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalTokenPrizeAmounts",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateName",
    inputs: [{ name: "_name", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "InvalidInput", inputs: [] },
  {
    type: "error",
    name: "InvalidTeam",
    inputs: [{ name: "_teamId", type: "uint256", internalType: "uint256" }],
  },
  {
    type: "error",
    name: "NotEnoughFunds",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "WithdrawalFailed",
    inputs: [{ name: "token", type: "address", internalType: "address" }],
  },
] as const;
export const erc20Abi = [
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address", internalType: "address" },
      { name: "spender", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalSupply",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFrom",
    inputs: [
      { name: "from", type: "address", internalType: "address" },
      { name: "to", type: "address", internalType: "address" },
      { name: "value", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      { name: "from", type: "address", indexed: true, internalType: "address" },
      { name: "to", type: "address", indexed: true, internalType: "address" },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;

export const sponsorBytecode =
  "0x60806040523480156200001157600080fd5b50604051620016043803806200160483398101604081905262000034916200016b565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000105565b50600180546001600160a01b0319166001600160a01b0385161790556002620000908282620002fb565b506003829055600154604051637d844a2960e01b8152600481018490523060248201526001600160a01b0390911690637d844a2990604401600060405180830381600087803b158015620000e357600080fd5b505af1158015620000f8573d6000803e3d6000fd5b50505050505050620003c7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200018157600080fd5b83516001600160a01b03811681146200019957600080fd5b60208581015160408701519295509350906001600160401b0380821115620001c057600080fd5b818701915087601f830112620001d557600080fd5b815181811115620001ea57620001ea62000155565b604051601f8201601f19908116603f0116810190838211818310171562000215576200021562000155565b816040528281528a868487010111156200022e57600080fd5b600093505b8284101562000252578484018601518185018701529285019262000233565b60008684830101528096505050505050509250925092565b600181811c908216806200027f57607f821691505b602082108103620002a057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f6576000816000526020600020601f850160051c81016020861015620002d15750805b601f850160051c820191505b81811015620002f257828155600101620002dd565b5050505b505050565b81516001600160401b0381111562000317576200031762000155565b6200032f816200032884546200026a565b84620002a6565b602080601f8311600181146200036757600084156200034e5750858301515b600019600386901b1c1916600185901b178555620002f2565b600085815260208120601f198616915b82811015620003985788860151825594840194600190910190840162000377565b5085821015620003b75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61122d80620003d76000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80639995225011610097578063ee97f7f311610066578063ee97f7f31461025a578063f2fde38b1461026d578063fa73300e14610280578063ffb62fea1461029357600080fd5b806399952250146101cf578063bced61ab14610209578063c253b5da1461021c578063d17c03331461024757600080fd5b80635e5101ac116100d35780635e5101ac1461016d578063715018a61461018d57806384da92a7146101975780638da5cb5b146101aa57600080fd5b806306fdde0314610105578063089cdd0c146101235780631db93e0f1461013a57806351f401841461015a575b600080fd5b61010d6102b3565b60405161011a9190610b42565b60405180910390f35b61012c60035481565b60405190815260200161011a565b61012c610148366004610b8a565b60056020526000908152604090205481565b61012c610168366004610b8a565b610341565b61018061017b366004610bae565b6103e3565b60405161011a9190610bc7565b61019561044f565b005b6101956101a5366004610c14565b610463565b6000546001600160a01b03165b6040516001600160a01b03909116815260200161011a565b61012c6101dd366004610c86565b60008281526004602090815260408083206001600160a01b038516845260010190915290205492915050565b61012c610217366004610cb6565b61047d565b61012c61022a366004610cf8565b600660209081526000928352604080842090915290825290205481565b610195610255366004610cb6565b6105f8565b6001546101b7906001600160a01b031681565b61019561027b366004610b8a565b610721565b61019561028e366004610d72565b61075f565b61012c6102a1366004610b8a565b60076020526000908152604090205481565b600280546102c090610e0c565b80601f01602080910402602001604051908101604052809291908181526020018280546102ec90610e0c565b80156103395780601f1061030e57610100808354040283529160200191610339565b820191906000526020600020905b81548152906001019060200180831161031c57829003601f168201915b505050505081565b6001600160a01b03811660008181526007602090815260408083205460059092528083205490516370a0823160e01b8152306004820152929391929091906370a0823190602401602060405180830381865afa1580156103a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c99190610e46565b6103d39190610e75565b6103dd9190610e88565b92915050565b60008181526004602090815260409182902080548351818402810184019094528084526060939283018282801561044357602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610425575b50505050509050919050565b610457610811565b610461600061083e565b565b61046b610811565b6002610478828483610ef9565b505050565b600154604051628e0f1b60e01b81526004810185905260009182916001600160a01b0390911690628e0f1b90602401600060405180830381865afa1580156104c9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104f191908101906110ac565b90506000846001600160a01b031682602001516001600160a01b03161490508061056e5760005b82604001515181101561056c57856001600160a01b0316836040015182815181106105455761054561119d565b60200260200101516001600160a01b031603610564576001915061056c565b600101610518565b505b80156105ef57600082604001515160016105889190610e88565b60008881526004602090815260408083206001600160a01b038a1684526001019091529020546105b891906111b3565b6001600160a01b038088166000908152600660209081526040808320938a16835292905220549091506105eb9082610e75565b9350505b50509392505050565b600061060584838561047d565b9050801561071b576001600160a01b03808316600090815260066020908152604080832093871683529290529081208054839290610644908490610e88565b90915550506001600160a01b03831660009081526007602052604081208054839290610671908490610e88565b909155505060405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284919082169063a9059cbb906044016020604051808303816000875af11580156106c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ec91906111d5565b61071957604051632708d81760e11b81526001600160a01b03851660048201526024015b60405180910390fd5b505b50505050565b610729610811565b6001600160a01b03811661075357604051631e4fbdf760e01b815260006004820152602401610710565b61075c8161083e565b50565b610767610811565b84831415806107765750848114155b156107945760405163b4fa3fb360e01b815260040160405180910390fd5b60005b85811015610808576108008787838181106107b4576107b461119d565b90506020020160208101906107c99190610b8a565b8686848181106107db576107db61119d565b905060200201358585858181106107f4576107f461119d565b9050602002013561088e565b600101610797565b50505050505050565b6000546001600160a01b031633146104615760405163118cdaa760e01b8152336004820152602401610710565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600154604051628e0f1b60e01b81526004810184905284916000916001600160a01b0390911690628e0f1b90602401600060405180830381865afa1580156108da573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261090291908101906110ac565b60208101519091506001600160a01b0316610933576040516369754ba960e11b815260048101859052602401610710565b6040516370a0823160e01b81523060048201526001600160a01b038316906370a0823190602401602060405180830381865afa158015610977573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099b9190610e46565b6001600160a01b03861660009081526007602090815260408083205460059092529091205485916109cb91610e75565b6109d59190610e88565b11156109ff5760405163de65498760e01b81526001600160a01b0386166004820152602401610710565b6001600160a01b03851660009081526005602052604081208054859290610a27908490610e88565b909155505060008481526004602090815260408083206001600160a01b038916845260010190915281208054859290610a61908490610e88565b9091555060009050805b600086815260046020526040902054811015610ad857600086815260046020526040902080546001600160a01b038916919083908110610aad57610aad61119d565b6000918252602090912001546001600160a01b031603610ad05760019150610ad8565b600101610a6b565b5080610b165760008581526004602090815260408220805460018101825590835291200180546001600160a01b0319166001600160a01b0388161790555b505050505050565b60005b83811015610b39578181015183820152602001610b21565b50506000910152565b6020815260008251806020840152610b61816040850160208701610b1e565b601f01601f19169190910160400192915050565b6001600160a01b038116811461075c57600080fd5b600060208284031215610b9c57600080fd5b8135610ba781610b75565b9392505050565b600060208284031215610bc057600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610c085783516001600160a01b031683529284019291840191600101610be3565b50909695505050505050565b60008060208385031215610c2757600080fd5b823567ffffffffffffffff80821115610c3f57600080fd5b818501915085601f830112610c5357600080fd5b813581811115610c6257600080fd5b866020828501011115610c7457600080fd5b60209290920196919550909350505050565b60008060408385031215610c9957600080fd5b823591506020830135610cab81610b75565b809150509250929050565b600080600060608486031215610ccb57600080fd5b833592506020840135610cdd81610b75565b91506040840135610ced81610b75565b809150509250925092565b60008060408385031215610d0b57600080fd5b8235610d1681610b75565b91506020830135610cab81610b75565b60008083601f840112610d3857600080fd5b50813567ffffffffffffffff811115610d5057600080fd5b6020830191508360208260051b8501011115610d6b57600080fd5b9250929050565b60008060008060008060608789031215610d8b57600080fd5b863567ffffffffffffffff80821115610da357600080fd5b610daf8a838b01610d26565b90985096506020890135915080821115610dc857600080fd5b610dd48a838b01610d26565b90965094506040890135915080821115610ded57600080fd5b50610dfa89828a01610d26565b979a9699509497509295939492505050565b600181811c90821680610e2057607f821691505b602082108103610e4057634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610e5857600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156103dd576103dd610e5f565b808201808211156103dd576103dd610e5f565b634e487b7160e01b600052604160045260246000fd5b601f821115610478576000816000526020600020601f850160051c81016020861015610eda5750805b601f850160051c820191505b81811015610b1657828155600101610ee6565b67ffffffffffffffff831115610f1157610f11610e9b565b610f2583610f1f8354610e0c565b83610eb1565b6000601f841160018114610f595760008515610f415750838201355b600019600387901b1c1916600186901b178355610719565b600083815260209020601f19861690835b82811015610f8a5786850135825560209485019460019092019101610f6a565b5086821015610fa75760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6040516060810167ffffffffffffffff81118282101715610fdc57610fdc610e9b565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561100b5761100b610e9b565b604052919050565b805161101e81610b75565b919050565b600082601f83011261103457600080fd5b8151602067ffffffffffffffff82111561105057611050610e9b565b8160051b61105f828201610fe2565b928352848101820192828101908785111561107957600080fd5b83870192505b848310156110a157825161109281610b75565b8252918301919083019061107f565b979650505050505050565b600060208083850312156110bf57600080fd5b825167ffffffffffffffff808211156110d757600080fd5b90840190606082870312156110eb57600080fd5b6110f3610fb9565b82518281111561110257600080fd5b8301601f8101881361111357600080fd5b80518381111561112557611125610e9b565b611137601f8201601f19168701610fe2565b818152898783850101111561114b57600080fd5b61115a82888301898601610b1e565b83525061116a9050838501611013565b84820152604083015193508184111561118257600080fd5b61118e87858501611023565b60408201529695505050505050565b634e487b7160e01b600052603260045260246000fd5b6000826111d057634e487b7160e01b600052601260045260246000fd5b500490565b6000602082840312156111e757600080fd5b81518015158114610ba757600080fdfea264697066735822122022458c8273c7983b574933b52f4bdad5e61a3ba2fb70b253214ef1e50e729f9764736f6c63430008180033";

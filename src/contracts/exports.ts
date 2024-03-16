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
  "0x60806040523480156200001157600080fd5b506040516200154b3803806200154b83398101604081905262000034916200016b565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000105565b50600180546001600160a01b0319166001600160a01b0385161790556002620000908282620002fb565b506003829055600154604051637d844a2960e01b8152600481018490523060248201526001600160a01b0390911690637d844a2990604401600060405180830381600087803b158015620000e357600080fd5b505af1158015620000f8573d6000803e3d6000fd5b50505050505050620003c7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200018157600080fd5b83516001600160a01b03811681146200019957600080fd5b60208581015160408701519295509350906001600160401b0380821115620001c057600080fd5b818701915087601f830112620001d557600080fd5b815181811115620001ea57620001ea62000155565b604051601f8201601f19908116603f0116810190838211818310171562000215576200021562000155565b816040528281528a868487010111156200022e57600080fd5b600093505b8284101562000252578484018601518185018701529285019262000233565b60008684830101528096505050505050509250925092565b600181811c908216806200027f57607f821691505b602082108103620002a057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f6576000816000526020600020601f850160051c81016020861015620002d15750805b601f850160051c820191505b81811015620002f257828155600101620002dd565b5050505b505050565b81516001600160401b0381111562000317576200031762000155565b6200032f816200032884546200026a565b84620002a6565b602080601f8311600181146200036757600084156200034e5750858301515b600019600386901b1c1916600185901b178555620002f2565b600085815260208120601f198616915b82811015620003985788860151825594840194600190910190840162000377565b5085821015620003b75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61117480620003d76000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80638da5cb5b11610097578063ee97f7f311610066578063ee97f7f314610215578063f2fde38b14610228578063fa73300e1461023b578063ffb62fea1461024e57600080fd5b80638da5cb5b1461019f57806399952250146101c4578063bced61ab146101d7578063c253b5da146101ea57600080fd5b8063521e75e1116100d3578063521e75e11461014f5780635e5101ac14610164578063715018a61461018457806384da92a71461018c57600080fd5b806306fdde03146100fa578063089cdd0c146101185780631db93e0f1461012f575b600080fd5b61010261026e565b60405161010f9190610a89565b60405180910390f35b61012160035481565b60405190815260200161010f565b61012161013d366004610ad1565b60056020526000908152604090205481565b61016261015d366004610af5565b6102fc565b005b610177610172366004610b25565b610426565b60405161010f9190610b3e565b610162610492565b61016261019a366004610b8b565b6104a6565b6000546001600160a01b03165b6040516001600160a01b03909116815260200161010f565b6101216101d2366004610af5565b6104c0565b6101216101e5366004610bfd565b6104ed565b6101216101f8366004610c3f565b600660209081526000928352604080842090915290825290205481565b6001546101ac906001600160a01b031681565b610162610236366004610ad1565b610668565b610162610249366004610cb9565b6106a6565b61012161025c366004610ad1565b60076020526000908152604090205481565b6002805461027b90610d53565b80601f01602080910402602001604051908101604052809291908181526020018280546102a790610d53565b80156102f45780601f106102c9576101008083540402835291602001916102f4565b820191906000526020600020905b8154815290600101906020018083116102d757829003601f168201915b505050505081565b33600061030a8483856104ed565b90508015610420576001600160a01b03808316600090815260066020908152604080832093871683529290529081208054839290610349908490610da3565b90915550506001600160a01b03831660009081526007602052604081208054839290610376908490610da3565b909155505060405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284919082169063a9059cbb906044016020604051808303816000875af11580156103cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f19190610db6565b61041e57604051632708d81760e11b81526001600160a01b03851660048201526024015b60405180910390fd5b505b50505050565b60008181526004602090815260409182902080548351818402810184019094528084526060939283018282801561048657602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610468575b50505050509050919050565b61049a610758565b6104a46000610785565b565b6104ae610758565b60026104bb828483610e36565b505050565b60008281526004602090815260408083206001600160a01b03851684526001019091529020545b92915050565b600154604051628e0f1b60e01b81526004810185905260009182916001600160a01b0390911690628e0f1b90602401600060405180830381865afa158015610539573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105619190810190610fe9565b90506000846001600160a01b031682602001516001600160a01b0316149050806105de5760005b8260400151518110156105dc57856001600160a01b0316836040015182815181106105b5576105b56110da565b60200260200101516001600160a01b0316036105d457600191506105dc565b600101610588565b505b801561065f57600082604001515160016105f89190610da3565b60008881526004602090815260408083206001600160a01b038a16845260010190915290205461062891906110f0565b6001600160a01b038088166000908152600660209081526040808320938a168352929052205490915061065b9082611112565b9350505b50509392505050565b610670610758565b6001600160a01b03811661069a57604051631e4fbdf760e01b815260006004820152602401610415565b6106a381610785565b50565b6106ae610758565b84831415806106bd5750848114155b156106db5760405163b4fa3fb360e01b815260040160405180910390fd5b60005b8581101561074f576107478787838181106106fb576106fb6110da565b90506020020160208101906107109190610ad1565b868684818110610722576107226110da565b9050602002013585858581811061073b5761073b6110da565b905060200201356107d5565b6001016106de565b50505050505050565b6000546001600160a01b031633146104a45760405163118cdaa760e01b8152336004820152602401610415565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600154604051628e0f1b60e01b81526004810184905284916000916001600160a01b0390911690628e0f1b90602401600060405180830381865afa158015610821573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108499190810190610fe9565b60208101519091506001600160a01b031661087a576040516369754ba960e11b815260048101859052602401610415565b6040516370a0823160e01b81523060048201526001600160a01b038316906370a0823190602401602060405180830381865afa1580156108be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e29190611125565b6001600160a01b038616600090815260076020908152604080832054600590925290912054859161091291611112565b61091c9190610da3565b11156109465760405163de65498760e01b81526001600160a01b0386166004820152602401610415565b6001600160a01b0385166000908152600560205260408120805485929061096e908490610da3565b909155505060008481526004602090815260408083206001600160a01b0389168452600101909152812080548592906109a8908490610da3565b9091555060009050805b600086815260046020526040902054811015610a1f57600086815260046020526040902080546001600160a01b0389169190839081106109f4576109f46110da565b6000918252602090912001546001600160a01b031603610a175760019150610a1f565b6001016109b2565b5080610a5d5760008581526004602090815260408220805460018101825590835291200180546001600160a01b0319166001600160a01b0388161790555b505050505050565b60005b83811015610a80578181015183820152602001610a68565b50506000910152565b6020815260008251806020840152610aa8816040850160208701610a65565b601f01601f19169190910160400192915050565b6001600160a01b03811681146106a357600080fd5b600060208284031215610ae357600080fd5b8135610aee81610abc565b9392505050565b60008060408385031215610b0857600080fd5b823591506020830135610b1a81610abc565b809150509250929050565b600060208284031215610b3757600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610b7f5783516001600160a01b031683529284019291840191600101610b5a565b50909695505050505050565b60008060208385031215610b9e57600080fd5b823567ffffffffffffffff80821115610bb657600080fd5b818501915085601f830112610bca57600080fd5b813581811115610bd957600080fd5b866020828501011115610beb57600080fd5b60209290920196919550909350505050565b600080600060608486031215610c1257600080fd5b833592506020840135610c2481610abc565b91506040840135610c3481610abc565b809150509250925092565b60008060408385031215610c5257600080fd5b8235610c5d81610abc565b91506020830135610b1a81610abc565b60008083601f840112610c7f57600080fd5b50813567ffffffffffffffff811115610c9757600080fd5b6020830191508360208260051b8501011115610cb257600080fd5b9250929050565b60008060008060008060608789031215610cd257600080fd5b863567ffffffffffffffff80821115610cea57600080fd5b610cf68a838b01610c6d565b90985096506020890135915080821115610d0f57600080fd5b610d1b8a838b01610c6d565b90965094506040890135915080821115610d3457600080fd5b50610d4189828a01610c6d565b979a9699509497509295939492505050565b600181811c90821680610d6757607f821691505b602082108103610d8757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b808201808211156104e7576104e7610d8d565b600060208284031215610dc857600080fd5b81518015158114610aee57600080fd5b634e487b7160e01b600052604160045260246000fd5b601f8211156104bb576000816000526020600020601f850160051c81016020861015610e175750805b601f850160051c820191505b81811015610a5d57828155600101610e23565b67ffffffffffffffff831115610e4e57610e4e610dd8565b610e6283610e5c8354610d53565b83610dee565b6000601f841160018114610e965760008515610e7e5750838201355b600019600387901b1c1916600186901b17835561041e565b600083815260209020601f19861690835b82811015610ec75786850135825560209485019460019092019101610ea7565b5086821015610ee45760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6040516060810167ffffffffffffffff81118282101715610f1957610f19610dd8565b60405290565b604051601f8201601f1916810167ffffffffffffffff81118282101715610f4857610f48610dd8565b604052919050565b8051610f5b81610abc565b919050565b600082601f830112610f7157600080fd5b8151602067ffffffffffffffff821115610f8d57610f8d610dd8565b8160051b610f9c828201610f1f565b9283528481018201928281019087851115610fb657600080fd5b83870192505b84831015610fde578251610fcf81610abc565b82529183019190830190610fbc565b979650505050505050565b60006020808385031215610ffc57600080fd5b825167ffffffffffffffff8082111561101457600080fd5b908401906060828703121561102857600080fd5b611030610ef6565b82518281111561103f57600080fd5b8301601f8101881361105057600080fd5b80518381111561106257611062610dd8565b611074601f8201601f19168701610f1f565b818152898783850101111561108857600080fd5b61109782888301898601610a65565b8352506110a79050838501610f50565b8482015260408301519350818411156110bf57600080fd5b6110cb87858501610f60565b60408201529695505050505050565b634e487b7160e01b600052603260045260246000fd5b60008261110d57634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156104e7576104e7610d8d565b60006020828403121561113757600080fd5b505191905056fea264697066735822122072ce9bb239068a4df5b96d713076515f72526a0213b73a02677a5ae2eeff9e9e64736f6c63430008180033";

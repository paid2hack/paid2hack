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
    name: "getClaimedAmount",
    inputs: [
      { name: "_teamId", type: "uint256", internalType: "uint256" },
      { name: "_token", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
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
  "0x60806040523480156200001157600080fd5b50604051620016833803806200168383398101604081905262000034916200016b565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000105565b50600180546001600160a01b0319166001600160a01b0385161790556002620000908282620002fb565b506003829055600154604051637d844a2960e01b8152600481018490523060248201526001600160a01b0390911690637d844a2990604401600060405180830381600087803b158015620000e357600080fd5b505af1158015620000f8573d6000803e3d6000fd5b50505050505050620003c7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200018157600080fd5b83516001600160a01b03811681146200019957600080fd5b60208581015160408701519295509350906001600160401b0380821115620001c057600080fd5b818701915087601f830112620001d557600080fd5b815181811115620001ea57620001ea62000155565b604051601f8201601f19908116603f0116810190838211818310171562000215576200021562000155565b816040528281528a868487010111156200022e57600080fd5b600093505b8284101562000252578484018601518185018701529285019262000233565b60008684830101528096505050505050509250925092565b600181811c908216806200027f57607f821691505b602082108103620002a057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f6576000816000526020600020601f850160051c81016020861015620002d15750805b601f850160051c820191505b81811015620002f257828155600101620002dd565b5050505b505050565b81516001600160401b0381111562000317576200031762000155565b6200032f816200032884546200026a565b84620002a6565b602080601f8311600181146200036757600084156200034e5750858301515b600019600386901b1c1916600185901b178555620002f2565b600085815260208120601f198616915b82811015620003985788860151825594840194600190910190840162000377565b5085821015620003b75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6112ac80620003d76000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638da5cb5b116100a2578063d17c033311610071578063d17c033314610265578063ee97f7f314610278578063f2fde38b1461028b578063fa73300e1461029e578063ffb62fea146102b157600080fd5b80638da5cb5b146101c857806399952250146101ed578063bced61ab14610227578063c253b5da1461023a57600080fd5b806351f40184116100de57806351f40184146101785780635e5101ac1461018b578063715018a6146101ab57806384da92a7146101b557600080fd5b806306fdde0314610110578063089cdd0c1461012e5780631db93e0f146101455780634867b6db14610165575b600080fd5b6101186102d1565b6040516101259190610bc1565b60405180910390f35b61013760035481565b604051908152602001610125565b610137610153366004610c09565b60056020526000908152604090205481565b610137610173366004610c2d565b61035f565b610137610186366004610c09565b61038c565b61019e610199366004610c5d565b610428565b6040516101259190610c76565b6101b3610494565b005b6101b36101c3366004610cc3565b6104a8565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610125565b6101376101fb366004610c2d565b60008281526004602090815260408083206001600160a01b038516845260010190915290205492915050565b610137610235366004610d35565b6104c2565b610137610248366004610d77565b600660209081526000928352604080842090915290825290205481565b6101b3610273366004610d35565b61063d565b6001546101d5906001600160a01b031681565b6101b3610299366004610c09565b6107a0565b6101b36102ac366004610df1565b6107de565b6101376102bf366004610c09565b60076020526000908152604090205481565b600280546102de90610e8b565b80601f016020809104026020016040519081016040528092919081815260200182805461030a90610e8b565b80156103575780601f1061032c57610100808354040283529160200191610357565b820191906000526020600020905b81548152906001019060200180831161033a57829003601f168201915b505050505081565b60008281526004602090815260408083206001600160a01b03851684526002019091529020545b92915050565b6001600160a01b03811660008181526007602090815260408083205460059092528083205490516370a0823160e01b8152306004820152929391929091906370a0823190602401602060405180830381865afa1580156103f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104149190610ec5565b61041e9190610ef4565b6103869190610f07565b60008181526004602090815260409182902080548351818402810184019094528084526060939283018282801561048857602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161046a575b50505050509050919050565b61049c610890565b6104a660006108bd565b565b6104b0610890565b60026104bd828483610f78565b505050565b600154604051628e0f1b60e01b81526004810185905260009182916001600160a01b0390911690628e0f1b90602401600060405180830381865afa15801561050e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610536919081019061112b565b90506000846001600160a01b031682602001516001600160a01b0316149050806105b35760005b8260400151518110156105b157856001600160a01b03168360400151828151811061058a5761058a61121c565b60200260200101516001600160a01b0316036105a957600191506105b1565b60010161055d565b505b801561063457600082604001515160016105cd9190610f07565b60008881526004602090815260408083206001600160a01b038a1684526001019091529020546105fd9190611232565b6001600160a01b038088166000908152600660209081526040808320938a16835292905220549091506106309082610ef4565b9350505b50509392505050565b600061064a8483856104c2565b9050801561079a576001600160a01b03808316600090815260066020908152604080832093871683529290529081208054839290610689908490610f07565b909155505060008481526004602090815260408083206001600160a01b0387168452600201909152812080548392906106c3908490610f07565b90915550506001600160a01b038316600090815260076020526040812080548392906106f0908490610f07565b909155505060405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284919082169063a9059cbb906044016020604051808303816000875af1158015610747573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076b9190611254565b61079857604051632708d81760e11b81526001600160a01b03851660048201526024015b60405180910390fd5b505b50505050565b6107a8610890565b6001600160a01b0381166107d257604051631e4fbdf760e01b81526000600482015260240161078f565b6107db816108bd565b50565b6107e6610890565b84831415806107f55750848114155b156108135760405163b4fa3fb360e01b815260040160405180910390fd5b60005b858110156108875761087f8787838181106108335761083361121c565b90506020020160208101906108489190610c09565b86868481811061085a5761085a61121c565b905060200201358585858181106108735761087361121c565b9050602002013561090d565b600101610816565b50505050505050565b6000546001600160a01b031633146104a65760405163118cdaa760e01b815233600482015260240161078f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600154604051628e0f1b60e01b81526004810184905284916000916001600160a01b0390911690628e0f1b90602401600060405180830381865afa158015610959573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610981919081019061112b565b60208101519091506001600160a01b03166109b2576040516369754ba960e11b81526004810185905260240161078f565b6040516370a0823160e01b81523060048201526001600160a01b038316906370a0823190602401602060405180830381865afa1580156109f6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a1a9190610ec5565b6001600160a01b0386166000908152600760209081526040808320546005909252909120548591610a4a91610ef4565b610a549190610f07565b1115610a7e5760405163de65498760e01b81526001600160a01b038616600482015260240161078f565b6001600160a01b03851660009081526005602052604081208054859290610aa6908490610f07565b909155505060008481526004602090815260408083206001600160a01b038916845260010190915281208054859290610ae0908490610f07565b9091555060009050805b600086815260046020526040902054811015610b5757600086815260046020526040902080546001600160a01b038916919083908110610b2c57610b2c61121c565b6000918252602090912001546001600160a01b031603610b4f5760019150610b57565b600101610aea565b5080610b955760008581526004602090815260408220805460018101825590835291200180546001600160a01b0319166001600160a01b0388161790555b505050505050565b60005b83811015610bb8578181015183820152602001610ba0565b50506000910152565b6020815260008251806020840152610be0816040850160208701610b9d565b601f01601f19169190910160400192915050565b6001600160a01b03811681146107db57600080fd5b600060208284031215610c1b57600080fd5b8135610c2681610bf4565b9392505050565b60008060408385031215610c4057600080fd5b823591506020830135610c5281610bf4565b809150509250929050565b600060208284031215610c6f57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610cb75783516001600160a01b031683529284019291840191600101610c92565b50909695505050505050565b60008060208385031215610cd657600080fd5b823567ffffffffffffffff80821115610cee57600080fd5b818501915085601f830112610d0257600080fd5b813581811115610d1157600080fd5b866020828501011115610d2357600080fd5b60209290920196919550909350505050565b600080600060608486031215610d4a57600080fd5b833592506020840135610d5c81610bf4565b91506040840135610d6c81610bf4565b809150509250925092565b60008060408385031215610d8a57600080fd5b8235610d9581610bf4565b91506020830135610c5281610bf4565b60008083601f840112610db757600080fd5b50813567ffffffffffffffff811115610dcf57600080fd5b6020830191508360208260051b8501011115610dea57600080fd5b9250929050565b60008060008060008060608789031215610e0a57600080fd5b863567ffffffffffffffff80821115610e2257600080fd5b610e2e8a838b01610da5565b90985096506020890135915080821115610e4757600080fd5b610e538a838b01610da5565b90965094506040890135915080821115610e6c57600080fd5b50610e7989828a01610da5565b979a9699509497509295939492505050565b600181811c90821680610e9f57607f821691505b602082108103610ebf57634e487b7160e01b600052602260045260246000fd5b50919050565b600060208284031215610ed757600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561038657610386610ede565b8082018082111561038657610386610ede565b634e487b7160e01b600052604160045260246000fd5b601f8211156104bd576000816000526020600020601f850160051c81016020861015610f595750805b601f850160051c820191505b81811015610b9557828155600101610f65565b67ffffffffffffffff831115610f9057610f90610f1a565b610fa483610f9e8354610e8b565b83610f30565b6000601f841160018114610fd85760008515610fc05750838201355b600019600387901b1c1916600186901b178355610798565b600083815260209020601f19861690835b828110156110095786850135825560209485019460019092019101610fe9565b50868210156110265760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6040516060810167ffffffffffffffff8111828210171561105b5761105b610f1a565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561108a5761108a610f1a565b604052919050565b805161109d81610bf4565b919050565b600082601f8301126110b357600080fd5b8151602067ffffffffffffffff8211156110cf576110cf610f1a565b8160051b6110de828201611061565b92835284810182019282810190878511156110f857600080fd5b83870192505b8483101561112057825161111181610bf4565b825291830191908301906110fe565b979650505050505050565b6000602080838503121561113e57600080fd5b825167ffffffffffffffff8082111561115657600080fd5b908401906060828703121561116a57600080fd5b611172611038565b82518281111561118157600080fd5b8301601f8101881361119257600080fd5b8051838111156111a4576111a4610f1a565b6111b6601f8201601f19168701611061565b81815289878385010111156111ca57600080fd5b6111d982888301898601610b9d565b8352506111e99050838501611092565b84820152604083015193508184111561120157600080fd5b61120d878585016110a2565b60408201529695505050505050565b634e487b7160e01b600052603260045260246000fd5b60008261124f57634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561126657600080fd5b81518015158114610c2657600080fdfea2646970667358221220cd2ea7ee975c0ae1436ae862cf22d5f0f24421ce6aa67fecb4a9bc970d83044364736f6c63430008180033";

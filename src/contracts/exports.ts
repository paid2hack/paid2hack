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
  "0x60806040523480156200001157600080fd5b506040516200171f3803806200171f83398101604081905262000034916200016b565b33806200005b57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b620000668162000105565b50600180546001600160a01b0319166001600160a01b0385161790556002620000908282620002fb565b506003829055600154604051637d844a2960e01b8152600481018490523060248201526001600160a01b0390911690637d844a2990604401600060405180830381600087803b158015620000e357600080fd5b505af1158015620000f8573d6000803e3d6000fd5b50505050505050620003c7565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200018157600080fd5b83516001600160a01b03811681146200019957600080fd5b60208581015160408701519295509350906001600160401b0380821115620001c057600080fd5b818701915087601f830112620001d557600080fd5b815181811115620001ea57620001ea62000155565b604051601f8201601f19908116603f0116810190838211818310171562000215576200021562000155565b816040528281528a868487010111156200022e57600080fd5b600093505b8284101562000252578484018601518185018701529285019262000233565b60008684830101528096505050505050509250925092565b600181811c908216806200027f57607f821691505b602082108103620002a057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620002f6576000816000526020600020601f850160051c81016020861015620002d15750805b601f850160051c820191505b81811015620002f257828155600101620002dd565b5050505b505050565b81516001600160401b0381111562000317576200031762000155565b6200032f816200032884546200026a565b84620002a6565b602080601f8311600181146200036757600084156200034e5750858301515b600019600386901b1c1916600185901b178555620002f2565b600085815260208120601f198616915b82811015620003985788860151825594840194600190910190840162000377565b5085821015620003b75787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61134880620003d76000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c80638da5cb5b116100a2578063d17c033311610071578063d17c033314610265578063ee97f7f314610278578063f2fde38b1461028b578063fa73300e1461029e578063ffb62fea146102b157600080fd5b80638da5cb5b146101c857806399952250146101ed578063bced61ab14610227578063c253b5da1461023a57600080fd5b806351f40184116100de57806351f40184146101785780635e5101ac1461018b578063715018a6146101ab57806384da92a7146101b557600080fd5b806306fdde0314610110578063089cdd0c1461012e5780631db93e0f146101455780634867b6db14610165575b600080fd5b6101186102d1565b6040516101259190610c5b565b60405180910390f35b61013760035481565b604051908152602001610125565b610137610153366004610ca3565b60056020526000908152604090205481565b610137610173366004610cc7565b61035f565b610137610186366004610ca3565b61038c565b61019e610199366004610cf7565b61045e565b6040516101259190610d10565b6101b36104ca565b005b6101b36101c3366004610d5d565b6104de565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610125565b6101376101fb366004610cc7565b60008281526004602090815260408083206001600160a01b038516845260010190915290205492915050565b610137610235366004610dcf565b6104f8565b610137610248366004610e11565b600660209081526000928352604080842090915290825290205481565b6101b3610273366004610dcf565b6106a0565b6001546101d5906001600160a01b031681565b6101b3610299366004610ca3565b610803565b6101b36102ac366004610e8b565b610841565b6101376102bf366004610ca3565b60076020526000908152604090205481565b600280546102de90610f25565b80601f016020809104026020016040519081016040528092919081815260200182805461030a90610f25565b80156103575780601f1061032c57610100808354040283529160200191610357565b820191906000526020600020905b81548152906001019060200180831161033a57829003601f168201915b505050505081565b60008281526004602090815260408083206001600160a01b03851684526002019091529020545b92915050565b6001600160a01b0381166000818152600760205260408082205490516370a0823160e01b8152306004820152919283926370a0823190602401602060405180830381865afa1580156103e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104069190610f59565b6104109190610f88565b6001600160a01b0384166000908152600560205260409020549091508110610458576001600160a01b0383166000908152600560205260409020546104559082610f9b565b91505b50919050565b6000818152600460209081526040918290208054835181840281018401909452808452606093928301828280156104be57602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116104a0575b50505050509050919050565b6104d26108f3565b6104dc6000610920565b565b6104e66108f3565b60026104f3828483611014565b505050565b600154604051628e0f1b60e01b81526004810185905260009182916001600160a01b0390911690628e0f1b90602401600060405180830381865afa158015610544573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261056c91908101906111c7565b90506000846001600160a01b031682602001516001600160a01b0316149050806105e95760005b8260400151518110156105e757856001600160a01b0316836040015182815181106105c0576105c06112b8565b60200260200101516001600160a01b0316036105df57600191506105e7565b600101610593565b505b801561069757600082604001515160016106039190610f88565b60008881526004602090815260408083206001600160a01b038a16845260010190915290205461063391906112ce565b6001600160a01b038088166000908152600660209081526040808320938a16835292905220549091508110610695576001600160a01b038087166000908152600660209081526040808320938916835292905220546106929082610f9b565b93505b505b50509392505050565b60006106ad8483856104f8565b905080156107fd576001600160a01b038083166000908152600660209081526040808320938716835292905290812080548392906106ec908490610f88565b909155505060008481526004602090815260408083206001600160a01b038716845260020190915281208054839290610726908490610f88565b90915550506001600160a01b03831660009081526007602052604081208054839290610753908490610f88565b909155505060405163a9059cbb60e01b81526001600160a01b0383811660048301526024820183905284919082169063a9059cbb906044016020604051808303816000875af11580156107aa573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107ce91906112f0565b6107fb57604051632708d81760e11b81526001600160a01b03851660048201526024015b60405180910390fd5b505b50505050565b61080b6108f3565b6001600160a01b03811661083557604051631e4fbdf760e01b8152600060048201526024016107f2565b61083e81610920565b50565b6108496108f3565b84831415806108585750848114155b156108765760405163b4fa3fb360e01b815260040160405180910390fd5b60005b858110156108ea576108e2878783818110610896576108966112b8565b90506020020160208101906108ab9190610ca3565b8686848181106108bd576108bd6112b8565b905060200201358585858181106108d6576108d66112b8565b90506020020135610970565b600101610879565b50505050505050565b6000546001600160a01b031633146104dc5760405163118cdaa760e01b81523360048201526024016107f2565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600154604051628e0f1b60e01b81526004810184905284916000916001600160a01b0390911690628e0f1b90602401600060405180830381865afa1580156109bc573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109e491908101906111c7565b60208101519091506001600160a01b0316610a15576040516369754ba960e11b8152600481018590526024016107f2565b6001600160a01b0385166000908152600560205260408120548190610a3b908690610f88565b6001600160a01b0388166000908152600760205260409020549091508110610a83576001600160a01b038716600090815260076020526040902054610a809082610f9b565b91505b6040516370a0823160e01b81523060048201526001600160a01b038516906370a0823190602401602060405180830381865afa158015610ac7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aeb9190610f59565b821115610b165760405163de65498760e01b81526001600160a01b03881660048201526024016107f2565b6001600160a01b03871660009081526005602052604081208054879290610b3e908490610f88565b909155505060008681526004602090815260408083206001600160a01b038b16845260010190915281208054879290610b78908490610f88565b9091555060009050805b600088815260046020526040902054811015610bef57600088815260046020526040902080546001600160a01b038b16919083908110610bc457610bc46112b8565b6000918252602090912001546001600160a01b031603610be75760019150610bef565b600101610b82565b5080610c2d5760008781526004602090815260408220805460018101825590835291200180546001600160a01b0319166001600160a01b038a161790555b5050505050505050565b60005b83811015610c52578181015183820152602001610c3a565b50506000910152565b6020815260008251806020840152610c7a816040850160208701610c37565b601f01601f19169190910160400192915050565b6001600160a01b038116811461083e57600080fd5b600060208284031215610cb557600080fd5b8135610cc081610c8e565b9392505050565b60008060408385031215610cda57600080fd5b823591506020830135610cec81610c8e565b809150509250929050565b600060208284031215610d0957600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610d515783516001600160a01b031683529284019291840191600101610d2c565b50909695505050505050565b60008060208385031215610d7057600080fd5b823567ffffffffffffffff80821115610d8857600080fd5b818501915085601f830112610d9c57600080fd5b813581811115610dab57600080fd5b866020828501011115610dbd57600080fd5b60209290920196919550909350505050565b600080600060608486031215610de457600080fd5b833592506020840135610df681610c8e565b91506040840135610e0681610c8e565b809150509250925092565b60008060408385031215610e2457600080fd5b8235610e2f81610c8e565b91506020830135610cec81610c8e565b60008083601f840112610e5157600080fd5b50813567ffffffffffffffff811115610e6957600080fd5b6020830191508360208260051b8501011115610e8457600080fd5b9250929050565b60008060008060008060608789031215610ea457600080fd5b863567ffffffffffffffff80821115610ebc57600080fd5b610ec88a838b01610e3f565b90985096506020890135915080821115610ee157600080fd5b610eed8a838b01610e3f565b90965094506040890135915080821115610f0657600080fd5b50610f1389828a01610e3f565b979a9699509497509295939492505050565b600181811c90821680610f3957607f821691505b60208210810361045857634e487b7160e01b600052602260045260246000fd5b600060208284031215610f6b57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561038657610386610f72565b8181038181111561038657610386610f72565b634e487b7160e01b600052604160045260246000fd5b601f8211156104f3576000816000526020600020601f850160051c81016020861015610fed5750805b601f850160051c820191505b8181101561100c57828155600101610ff9565b505050505050565b67ffffffffffffffff83111561102c5761102c610fae565b6110408361103a8354610f25565b83610fc4565b6000601f841160018114611074576000851561105c5750838201355b600019600387901b1c1916600186901b1783556107fb565b600083815260209020601f19861690835b828110156110a55786850135825560209485019460019092019101611085565b50868210156110c25760001960f88860031b161c19848701351681555b505060018560011b0183555050505050565b6040516060810167ffffffffffffffff811182821017156110f7576110f7610fae565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561112657611126610fae565b604052919050565b805161113981610c8e565b919050565b600082601f83011261114f57600080fd5b8151602067ffffffffffffffff82111561116b5761116b610fae565b8160051b61117a8282016110fd565b928352848101820192828101908785111561119457600080fd5b83870192505b848310156111bc5782516111ad81610c8e565b8252918301919083019061119a565b979650505050505050565b600060208083850312156111da57600080fd5b825167ffffffffffffffff808211156111f257600080fd5b908401906060828703121561120657600080fd5b61120e6110d4565b82518281111561121d57600080fd5b8301601f8101881361122e57600080fd5b80518381111561124057611240610fae565b611252601f8201601f191687016110fd565b818152898783850101111561126657600080fd5b61127582888301898601610c37565b835250611285905083850161112e565b84820152604083015193508184111561129d57600080fd5b6112a98785850161113e565b60408201529695505050505050565b634e487b7160e01b600052603260045260246000fd5b6000826112eb57634e487b7160e01b600052601260045260246000fd5b500490565b60006020828403121561130257600080fd5b81518015158114610cc057600080fdfea26469706673582212203e8432fe1a16ec1831e01f930eff2e79619ef5c10bc08c72c4df1cd4aad406e664736f6c63430008180033";

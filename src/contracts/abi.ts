export const MasterABi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
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
        ],
      },
    ],
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
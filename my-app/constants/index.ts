export const TodoListABI = [
  {
    inputs: [{ internalType: "string", name: "_content", type: "string" }],
    name: "addTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_author", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
    ],
    name: "deleteTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_author", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
      { internalType: "string", name: "_content", type: "string" },
    ],
    name: "editTodo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_author", type: "address" }],
    name: "getAllTodos",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "author", type: "address" },
          { internalType: "string", name: "content", type: "string" },
          { internalType: "bool", name: "isCompleted", type: "bool" },
        ],
        internalType: "struct TodoList.Todo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_author", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
    ],
    name: "getTodo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "id", type: "uint256" },
          { internalType: "address", name: "author", type: "address" },
          { internalType: "string", name: "content", type: "string" },
          { internalType: "bool", name: "isCompleted", type: "bool" },
        ],
        internalType: "struct TodoList.Todo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_author", type: "address" },
      { internalType: "uint256", name: "_id", type: "uint256" },
    ],
    name: "todoIsCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "todos",
    outputs: [
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "author", type: "address" },
      { internalType: "string", name: "content", type: "string" },
      { internalType: "bool", name: "isCompleted", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "todosCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];
export const CONTRACT_ADDRESS = "0xaabEE4916b6C00173c3B87FbA520e7986095AaF9";

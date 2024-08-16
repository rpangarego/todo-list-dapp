const { expect } = require("chai");

let accounts;
const todos = [
  "build the frontend with NextJS",
  "deploy smart contract",
  "do smart contract testing",
  "go to sleep",
];
const editContent = "todo is edited";

describe("TodoList Contract", function () {
  beforeEach(async () => {
    // Get the ContractFactory and Signers here.
    const TodoList = await ethers.getContractFactory("TodoList");
    accounts = await ethers.getSigners();

    // Deploy the contract
    todoListContract = await TodoList.deploy();
  });

  it("should be able to add todo list ", async () => {
    // add todos with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);
    await todoListContract.connect(accounts[0]).addTodo(todos[1]);
    await todoListContract.connect(accounts[0]).addTodo(todos[2]);
    await todoListContract.connect(accounts[1]).addTodo(todos[3]);

    // try to access todos using account[0]
    const result = await todoListContract.getAllTodos(accounts[0].address);
    expect(result.length).to.equal(3);
  });

  it("should be able to get todo list of specific user", async () => {
    // add todos with account[1]
    await todoListContract.connect(accounts[1]).addTodo(todos[3]);

    // trying to get todo of specific user
    const result = await todoListContract.getTodo(accounts[1].address, 0);
    expect(result[0]).to.equal(0);
  });

  it("should be able to delete todo list", async () => {
    // add todos with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);
    await todoListContract.connect(accounts[0]).addTodo(todos[1]);
    await todoListContract.connect(accounts[0]).addTodo(todos[2]);

    // trying to delete the todo of index 1
    await todoListContract.deleteTodo(accounts[0].address, 1);

    const result = await todoListContract.getAllTodos(accounts[0].address);
    expect(result.length).to.equal(2);
  });

  it("should be able to checklist todo as completed", async () => {
    // add todos with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);
    await todoListContract.connect(accounts[0]).addTodo(todos[1]);

    // trying to mark the todo of index 0 as completed
    await todoListContract.todoIsCompleted(accounts[0].address, 0);

    // get todo of index 0, then mark as completed
    const result = await todoListContract.getTodo(accounts[0].address, 0);
    expect(result[3]).to.equal(true);
  });

  it("should be able to unchecklist todo as not completed", async () => {
    // add todos with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);

    // trying to mark the todo of index 0 as not completed
    await todoListContract.todoIsCompleted(accounts[0].address, 0);
    await todoListContract.todoIsCompleted(accounts[0].address, 0);

    const result = await todoListContract.getTodo(accounts[0].address, 0);
    expect(result[3]).to.equal(false);
  });

  it("should be able to edit todo content", async () => {
    // add todos with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);

    await todoListContract.editTodo(accounts[0].address, 0, editContent);

    const result = await todoListContract.getTodo(accounts[0].address, 0);
    expect(result[2]).to.equal(editContent);
  });

  it("should not allow user to delete other user todo", async () => {
    // add a todo with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);

    // try to delete the todo using account[1]
    await expect(
      todoListContract.connect(accounts[1]).deleteTodo(accounts[0].address, 0)
    ).to.be.revertedWith("You are not the author of this todo!");
  });

  it("should not allow user to edit other user todo list", async () => {
    // add a todo with account[0]
    await todoListContract.connect(accounts[0]).addTodo(todos[0]);

    // try to edit the todo using account[1]
    await expect(
      todoListContract
        .connect(accounts[1])
        .editTodo(accounts[0].address, 0, editContent)
    ).to.be.revertedWith("You are not the author of this todo!");
  });
});

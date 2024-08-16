// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract TodoList{

    struct Todo {
        uint id; 
        address author;
        string content;
        bool isCompleted;
    }

    mapping(address => Todo[]) public todos;
    mapping(address => uint256) public todosCount;
    uint256 numTodo; //0

    modifier onlyAuthor(address _author) {
        require(msg.sender == _author, "You are not the author of this todo!");
        _;
    }


    // read-view all todo
    function getAllTodos(address _author) public view returns (Todo[] memory) {
        uint count = todosCount[_author];
        Todo[] memory result = new Todo[](count);

        for (uint i = 0; i<count; i++){
            if (todos[_author][i].author != address(0)) {
                result[i]=todos[_author][i];
            }
        }

        return result;
    }

    // read-view specific todo
    function getTodo(address _author, uint _id) public view returns(Todo memory) {
        return todos[_author][_id];
    }

    // create-add todo 
    function addTodo(string memory _content) public {
        Todo memory newTodo = Todo({
            id: numTodo,
            author: msg.sender,
            content: _content,
            isCompleted: false
        });

        todos[msg.sender].push(newTodo);
        todosCount[msg.sender]++;
        numTodo++;
    }

    // delete todo
    function deleteTodo(address _author, uint _id) public onlyAuthor(_author) {
        delete todos[_author][_id];
        todosCount[_author]--;
    }

    // update-edit todo content
    function editTodo(address _author, uint _id, string memory _content) public onlyAuthor(_author) {
        todos[_author][_id].content = _content;
    }

    // check todo as completed/not
    function todoIsCompleted(address _author, uint _id) public onlyAuthor(_author) {
        todos[_author][_id].isCompleted = !todos[_author][_id].isCompleted;
    } 
}
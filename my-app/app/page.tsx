"use client";

import React, { useState, useEffect } from "react";
import { CirclePlus } from "lucide-react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoContent from "./components/TodoContent";

import { useWeb3Modal } from "@web3modal/ethers/react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract } from "ethers";
import { ethers } from "ethers";
import { TodoListABI, CONTRACT_ADDRESS } from "@/constants";

type Todo = {
  id: number;
  content: string;
  isCompleted: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const getProviderOrSigner = async (needSigner = false) => {
    if (walletProvider) {
      const provider = new ethers.BrowserProvider(walletProvider);
      if (needSigner) {
        return await provider.getSigner();
      }
      return provider;
    }
    return null;
  };

  // FETCH TODO LIST FROM SMART CONTRACT
  const fetchTodoList = async () => {
    try {
      const signer = await getProviderOrSigner(true);

      // Ensure the signer is correctly initialized
      if (!signer) {
        console.error("Signer is not available.");
        return;
      }

      // TodoListContract Object
      const TodoListContract = new Contract(
        CONTRACT_ADDRESS,
        TodoListABI,
        signer
      );
      const TodoListData = await TodoListContract.getAllTodos(address);
      console.log("todo list data", address, TodoListData);
      setTodos(TodoListData);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  // ADD TODO
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const signer = await getProviderOrSigner(true);

      // Create TodoListContract
      const TodoListContract = new Contract(
        CONTRACT_ADDRESS,
        TodoListABI,
        signer
      );

      // Call addTodo(_content) in TodoListContract
      await TodoListContract.addTodo(todoInput);
      console.log("TODO INPUT", todoInput);
      setTodoInput("");
    } catch (error) {
      console.error("Error add todo list:", error);
    }
  };

  // MARK TODO AS COMPLETED
  const handleChecklist = async (id: Number) => {
    try {
      const signer = await getProviderOrSigner(true);

      // Create TodoListContract
      const TodoListContract = new Contract(
        CONTRACT_ADDRESS,
        TodoListABI,
        signer
      );

      // Call todoIsCompleted(author, id) in TodoListContract
      await TodoListContract.todoIsCompleted(address, id);
    } catch (error) {
      console.error("Error add todo list:", error);
    }
  };

  // DELETE TODO
  const handleDelete = async (id: Number) => {
    try {
      const signer = await getProviderOrSigner(true);

      // Create TodoListContract
      const TodoListContract = new Contract(
        CONTRACT_ADDRESS,
        TodoListABI,
        signer
      );

      // Call deleteTodo(author, id) in TodoListContract
      await TodoListContract.deleteTodo(address, id);
    } catch (error) {
      console.error("Error add todo list:", error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setInterval(() => {
        console.log(todos);
        fetchTodoList();
      }, 5000); // fetch todo data every 5 secs
    }
  }, [isConnected, walletProvider]);

  const renderTodoContent = () => {
    if (!isConnected) {
      return (
        <p>
          Please connect to your <br /> metamask wallet to continue.
          <br />
          <br />
          {/* button to open web3modal wallet */}
          <button className="btn btn-primary" onClick={() => open()}>
            Connect
          </button>
        </p>
      );
    } else {
      if (!todos.length) {
        return <p>You have nothing to do (yet)</p>;
      } else {
        const todoContent = todos.map((todo, idx) => (
          <TodoContent
            key={idx}
            id={todo.id}
            content={todo.content}
            isCompleted={todo.isCompleted}
            handleChecklist={handleChecklist}
            handleDelete={handleDelete}
          />
        ));
        return todoContent;
      }
    }
  };

  return (
    <div className="w-3/4 my-10 mx-auto sm:w-3/4 md:w-3/5 lg:w-2/4 xl:w-1/4">
      <Header walletStatus={isConnected} account={address} chainId={chainId} />

      {/* TODO LIST COMPONENT */}
      <div className="bg-white shadow-md mt-5 border rounded-lg p-5">
        {/* FORM: INPUT AND BUTTON */}
        <div className="mb-5">
          <form className="flex flex-row gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-5/6 input-text"
              placeholder="Type your plan..."
              disabled={Boolean(!isConnected)}
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
              autoComplete="off"
            />
            <button
              type="submit"
              className={`w-1/6 flex justify-center btn ${
                isConnected ? "btn-primary" : "btn-disabled"
              }`}
              disabled={Boolean(!isConnected)}
            >
              <CirclePlus />
            </button>
          </form>
        </div>

        {/* TODO CONTENT */}
        <div
          className={`flex min-h-[25rem] ${
            todos.length
              ? "flex-col gap-3"
              : "justify-center items-center text-gray-500 text-center"
          }`}
        >
          {renderTodoContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
}

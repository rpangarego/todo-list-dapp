import React from "react";
import { CircleX } from "lucide-react";

type Props = {
  id: number;
  content: string;
  isCompleted: boolean;
  handleChecklist: (id: number) => void;
  handleDelete: (id: number) => void;
};

const TodoContent = ({
  id,
  content,
  isCompleted,
  handleChecklist,
  handleDelete,
}: Props) => {
  return (
    <div
      className="flex flex-row gap-3 border border-gray-400 rounded-md p-3"
      key={id}
    >
      <input
        type="checkbox"
        checked={Boolean(isCompleted)}
        onChange={(e) => handleChecklist(id)}
      />
      <p
        className={`w-5/6 ${
          Boolean(isCompleted) && "line-through text-gray-500"
        } `}
      >
        {content}
      </p>
      <button
        onClick={() => handleDelete(id)}
        className="text-orange-500 hover:text-red-600"
      >
        <CircleX />
      </button>
    </div>
  );
};

export default TodoContent;

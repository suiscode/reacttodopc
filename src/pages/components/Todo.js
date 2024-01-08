import React from "react";
import Image from "next/image";

function Todo({ todo, handleEditButton, handleDelete, setToDone }) {

  const handleDragStart = (e, todoId) => {
    e.dataTransfer.setData('text/plain', todoId);
  };

  return (
    <li className="flex  justify-between bg-white rounded-xl p-3" draggable onDragStart={e=>handleDragStart(e, todo.id)}>
      <div className="flex gap-2">
        <Image
          src={todo.status === "Done" ? "./check.svg" : "./notcheck.svg"}
          width={20}
          height={20}
          alt="delete"
          className={`border-[1px] rounded-full  p-[2px] cursor-pointer h-[20px] ${
            todo.status === "Done" ? "border-white bg-black" : "border-black"
          }`}
          onClick={() => setToDone(todo.id)}
        />
        <div className="flex flex-col gap-1 max-w-[300px]">
          <h1 className="font-bold w-[70%]">{todo.title}</h1>
          <h1 className="max-h-[100px] break-words w-full small">
            {todo.description}
          </h1>
          <div className="flex justify-between relative w-[300px]">
            <p className="text-[12px] border-[1px] flex justify-center items-center rounded-lg border-black p-1">
              {todo.priority}
            </p>
            <div className="flex gap-2 absolute bottom-1 right-0">
              <Image
                src="./delete.svg"
                width={20}
                height={20}
                alt="delete"
                className="border-[1px] rounded-full border-black p-[2px] cursor-pointer"
                onClick={() => handleDelete(todo.id)}
              />
              <Image
                src="./edit.svg"
                width={20}
                height={20}
                alt="edit"
                className="border-[1px] rounded-full border-black p-[2px] cursor-pointer"
                onClick={() => handleEditButton(todo)}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Todo;

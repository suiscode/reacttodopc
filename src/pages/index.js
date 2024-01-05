import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import Modal from "./components/Modal";

export default function Home() {
  

  const [storage, setStorage] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const container = ["To do", "Inprogress", "Stuck", "Done"];
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("High");

  useEffect(() => {
    const storedData = localStorage.getItem("tasks");
    if (storedData) {
      setStorage(JSON.parse(storedData));
    }
  }, []);

  // Save data to local storage whenever storage state changes
  useEffect(() => {
    if (storage.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(storage));
    }
  }, [storage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(false);

    if (editingTask) {
      setStorage((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? { ...task, title, description, status, priority }
            : task
        )
      );
      setEditingTask(null);
    } else {
      setStorage((prev) => [
        ...prev,
        {
          title,
          description,
          status,
          priority,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setTitle("");
    setDescription("");
    setStatus("To do");
    setPriority("High");
  };

  

  const handleDelete = (id) => {
    setStorage((prev) => prev.filter((item) => item.id !== id));
  };

  const handleModalToggle = (button) => {
    setModal(true);
    setStatus(button);
  };

  const handleEditButton = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);

    setModal(true);
  };

  const setToDone = (id) => {
    setStorage((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: "Done" } : task))
    );
  };

  return (
    <main className="flex bg-[url('/bgimage1.jpg')] justify-center items-start bg-cover w-screen h-screen p-20 relative overflow-hidden">
      {modal && (
        <Modal
          setModal={setModal}
          handleSubmit={handleSubmit}
          handleModalToggle={handleModalToggle}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          setPriority={setPriority}
        />
      )}

      <ul className="flex justify-between w-full h-full items-start gap-12">
        {container.map((item, el) => (
          <div className="bg-gray-200 flex flex-col rounded-xl w-[22%] items-start max-h-full overflow-hidden py-4 pl-3">
          <li
          key={item}
            className="bg-gray-200 flex flex-col w-full big"
          >
            <h1 className="font-bold text-[24px] mb-4">
              {item}{" "}
              {
                <span>
                  {storage.filter((todo) => todo.status === item).length}
                </span>
              }
            </h1>
            <ul className="w-full flex flex-col gap-3">
              {storage.map((todo) => {
                if (todo.status === item) {
                  return (
                    <Todo
                      key={todo.id}
                      setToDone={setToDone}
                      todo={todo}
                      handleEditButton={handleEditButton}
                      handleDelete={handleDelete}
                    />
                  );
                }
              })}
            </ul>
            {container.map((button) => {
              if (button === item) {
                return (
                  <button
                  key={button}
                    className="font-semibold mt-2"
                    onClick={() => handleModalToggle(button)}
                  >
                    + Add Card
                  </button>
                );
              }
            })}
          </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

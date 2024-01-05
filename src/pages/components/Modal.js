import React from "react";

function Modal({
  handleSubmit,
  title,
  description,
  setDescription,
  setTitle,
  setStatus,
  status,
  priority,
  setPriority,
  setModal
}) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="absolute z-20 w-full h-full top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={()=>setModal(false)}>
      <div className="bg-white rounded-xl w-1/4 h-[500px] p-8" onClick={stopPropagation}>
        <h1 className="font-bold">Add Task</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            required
            className="border-[2px] rounded-lg h-[40px]"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            className="border-[2px] rounded-lg h-[100px]"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />

          <label className="flex flex-col">
            Status
            <select
              className="border-[2px] border-black rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To do">To do</option>
              <option value="Inprogress">In Progress</option>
              <option value="Stuck">Stuck</option>
              <option value="Done">Done</option>
            </select>
          </label>
          <label className="flex flex-col">
            Priority
            <select
              className="border-[2px] border-black rounded-lg"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <button className="bg-black text-white h-9 rounded-lg">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;

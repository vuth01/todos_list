import "./App.css";
import { useState, useMemo } from "react";
import { FaTrash } from "react-icons/fa";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [status, setStatus] = useState(0);

  const handleTaskInput = (e) => {
    setTaskInput(e.target.value);
  };

  const addTodo = () => {
    const newTask = {
      id: Math.random() * 10000,
      name: taskInput,
      status: false,
    };
    if (taskInput === "") {
      return;
    }
    setTaskList([...taskList, newTask]);
    setTaskInput("");
  };

  const onKey = (e) => {
    if (e.code === "Enter") {
      addTodo();
    }
    return;
  };
  const handleCompleteTask = (task) => {
    const currentTask = taskList.find((t) => t.id === task.id);
    if (!currentTask) {
      return;
    }
    currentTask.status = !currentTask.status;
    setTaskList([...taskList]);
  };

  const deleteTask = (task) => {
    const newList = taskList.filter((todo) => todo.id !== task.id);
    setTaskList(newList);
  };

  const handleFIlter = (e) => {
    setStatus(parseInt(e.target.value));
  };

  const handleList = useMemo(() => {
    if (status === 0) {
      return taskList;
    } else if (status === 1) {
      return taskList.filter((task) => task.status === false);
    }
    return taskList.filter((task) => task.status === true);
  }, [taskList, status]);

  return (
    <div className="App">
      <div className="Header">
        <p className="heading">Let's add what you have to do!</p>
        <p className="title">
          Fill the input and click button or "Enter" to add a new task into the
          list. To mark as completed, just click directly to the task
        </p>
      </div>
      <div className="Input-Wrapper">
        <input
          type="text"
          value={taskInput}
          onChange={handleTaskInput}
          onKeyUp={onKey}
        ></input>
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="List-Todo-Wrapper">
        <div className="List-Todo-Header">
          <p>List:</p>
          <select value={status} onChange={handleFIlter}>
            <option value="0">All</option>
            <option value="1">Todo</option>
            <option value="2">Done</option>
          </select>
        </div>
        <ul className="List-Todo">
          {handleList.length > 0
            ? handleList.map((task, index) => {
                return (
                  <div className="List-Todo-Item" key={task.id}>
                    <li
                      onClick={() => handleCompleteTask(task)}
                      className={task.status ? "Complete" : " "}
                    >
                      {index + 1}.{task.name}{" "}
                    </li>
                    <span
                      onClick={() => {
                        deleteTask(task);
                      }}
                    >
                      <FaTrash className="delete-icon" />
                    </span>
                  </div>
                );
              })
            : "Todo List Is Empty"}
        </ul>
      </div>
    </div>
  );
}

export default App;

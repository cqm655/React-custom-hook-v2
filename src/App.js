import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hook/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

 

  const {isLoading, error, sendRequest: fetchTasks}  = useHttp ();

  useEffect(() => {
    const transformTasks = (tasksObj) => {

      const loadedTasks = [];
  
      for (const taskKey in tasksObj) {
        loadedTasks.push({
          id: taskKey,
          text: tasksObj[taskKey].text,
        });
        setTasks(loadedTasks);
      }
    }

    fetchTasks({
      url: "https://react-http-c5317-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
    },transformTasks)
  }, [fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

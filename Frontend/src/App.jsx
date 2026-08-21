import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -----------------------------
  // GET ALL TODOS
  const [isLightMode, setIsLightMode] = useState(true);
  // -----------------------------
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // -----------------------------
  // CREATE TODO
  // -----------------------------
  const addTodo = async () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedTitle,
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTodo = await response.json();

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      setTitle("");
    } catch (err) {
      console.error(err);
      setError("Unable to add the task.");
    }
  };

  // -----------------------------
  // DELETE TODO
  // -----------------------------
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Unable to delete the task.");
    }
  };

  // -----------------------------
  // TOGGLE TODO
  // -----------------------------
  const toggleTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: todo.title,
          completed: !todo.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTodo = await response.json();

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item.id === updatedTodo.id ? updatedTodo : item
        )
      );
    } catch (err) {
      console.error(err);
      setError("Unable to update the task.");
    }
  };

  // -----------------------------
  // FILTERING
  // -----------------------------
  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    (todo) => todo.completed
  ).length;

  const activeTasks = totalTasks - completedTasks;

  // -----------------------------
  // DATE
  // -----------------------------
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // -----------------------------
  // ENTER KEY
  // -----------------------------
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className={`app ${isLightMode ? "light-mode" : "dark-mode"}`}>
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">
            ✓
          </div>

          <div>
            <h2>TaskFlow</h2>
            <p>Stay organized. Get things done.</p>
          </div>

        </div>


        {/* Navigation */}

        <nav className="navigation">

          <button
            className={`nav-item ${
              filter === "all" ? "nav-active" : ""
            }`}
            onClick={() => setFilter("all")}
          >
            <span className="nav-icon">▣</span>
            <span>All Tasks</span>
            <span className="nav-count">{totalTasks}</span>
          </button>


          <button
            className={`nav-item ${
              filter === "active" ? "nav-active" : ""
            }`}
            onClick={() => setFilter("active")}
          >
            <span className="nav-icon">◷</span>
            <span>Active Tasks</span>
            <span className="nav-count">{activeTasks}</span>
          </button>


          <button
            className={`nav-item ${
              filter === "completed" ? "nav-active" : ""
            }`}
            onClick={() => setFilter("completed")}
          >
            <span className="nav-icon">☑</span>
            <span>Completed Tasks</span>
            <span className="nav-count">{completedTasks}</span>
          </button>

        </nav>


        {/* Productivity card */}

        <div className="productivity-card">

          <div className="rocket">
            🚀
          </div>

          <h3>Stay Productive</h3>

          <p>
            Break down big tasks into small steps
            and celebrate every win.
          </p>

          <div className="motivation">
            You got this. 💪
          </div>

        </div>
        <button
          className="sidebar-bottom"
          type="button"
          onClick={() => setIsLightMode((currentMode) => !currentMode)}
          aria-pressed={isLightMode}
          aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
        >
          <span className="sun-icon">
            {isLightMode ? "☼" : "☾"}
          </span>
          <span>{isLightMode ? "Light Mode" : "Dark Mode"}</span>
          <div className={`toggle ${isLightMode ? "toggle-on" : ""}`}>
            <div className="toggle-circle"></div>
          </div>
        </button>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="main-content">

        {/* Top header */}

        <header className="top-header">

          <div>
            Good morning, <strong>there 👋</strong>
          </div>

          <div className="date">
            <span>▣</span>
            {formattedDate}
          </div>

        </header>


        <div className="content">


          {/* Page heading */}

          <section className="page-heading">

            <div>

              <h1>My Tasks</h1>

              <div className="heading-line"></div>

              <p>
                Stay organized. Get things done.
              </p>

            </div>


            {/* Statistics */}

            <div className="statistics">

              <div className="stat">

                <div className="stat-icon purple">
                  ☷
                </div>

                <strong>{totalTasks}</strong>

                <span>Total Tasks</span>

              </div>


              <div className="stat">

                <div className="stat-icon yellow">
                  ◷
                </div>

                <strong>{activeTasks}</strong>

                <span>Active</span>

              </div>


              <div className="stat">

                <div className="stat-icon green">
                  ✓
                </div>

                <strong>{completedTasks}</strong>

                <span>Completed</span>

              </div>

            </div>

          </section>


          {/* ================= ADD TASK ================= */}

          <section className="add-task">

            <div className="plus-circle">
              +
            </div>

            <input
              type="text"
              placeholder="What do you need to accomplish?"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button
              className="add-button"
              onClick={addTodo}
            >
              Add Task
              <span>➤</span>
            </button>

          </section>


          {/* Error */}

          {error && (
            <div className="error-message">
              ⚠ {error}
            </div>
          )}


          {/* ================= FILTERS ================= */}

          <section className="task-toolbar">

            <div className="filters">

              <button
                className={
                  filter === "all"
                    ? "filter active-filter"
                    : "filter"
                }
                onClick={() => setFilter("all")}
              >
                All Tasks ({totalTasks})
              </button>


              <button
                className={
                  filter === "active"
                    ? "filter active-filter"
                    : "filter"
                }
                onClick={() => setFilter("active")}
              >
                Active ({activeTasks})
              </button>


              <button
                className={
                  filter === "completed"
                    ? "filter active-filter"
                    : "filter"
                }
                onClick={() => setFilter("completed")}
              >
                Completed ({completedTasks})
              </button>

            </div>


            <button className="sort-button">
              Sort by: Newest
              <span>⌄</span>
            </button>

          </section>


          {/* ================= TASK LIST ================= */}

          <section className="task-list">

            {loading && (
              <div className="empty-state">
                Loading tasks...
              </div>
            )}


            {!loading &&
              filteredTodos.length === 0 && (

                <div className="empty-state">

                  <div className="empty-icon">
                    ✓
                  </div>

                  <h3>No tasks here</h3>

                  <p>
                    Add a task above and start getting things done.
                  </p>

                </div>

              )}


            {!loading &&
              filteredTodos.map((todo) => (

                <div
                  className={
                    todo.completed
                      ? "task-card completed-task"
                      : "task-card"
                  }
                  key={todo.id}
                >

                  <div className="task-left">

                    <button
                      className={
                        todo.completed
                          ? "check-button checked"
                          : "check-button"
                      }
                      onClick={() => toggleTodo(todo)}
                    >
                      {todo.completed ? "✓" : ""}
                    </button>


                    <div className="task-information">

                      <h3>
                        {todo.title}
                      </h3>

                      <p>
                        <span>▣</span>
                        Task #{todo.id}
                      </p>

                    </div>

                  </div>


                  <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete task"
                  >
                    🗑
                  </button>

                </div>

              ))}

          </section>


          {/* Footer */}

          <footer className="footer">

            <span>✦</span>

            Small steps every day lead to big results.

          </footer>

        </div>

      </main>

    </div>
  );
}

export default App;

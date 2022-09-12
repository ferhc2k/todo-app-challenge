import { useState } from "react";

const App = () => {
    const [state, setState] = useState({
        todos: [],
        filter: "all"
    });

    const filterTodos = (filter) => {
        const filters = {
            all: () => (
                state.todos
            ),
            active: () => (
                state.todos.filter((todo) => !todo.isCompleted)
            ),
            completed: () => (
                state.todos.filter((todo) => todo.isCompleted)
            )
        }

        return filters[filter]();
    }

    const handleSetFilter = (filter) => {
        setState({
            ...state, 
            filter
        });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const todo = {
            id: Date.now(),
            data: formData.get("todo"),
            isCompleted: false,
        };

        setState({...state, todos: [...state.todos, todo]});

        e.target.reset();
    };

    const handleSetCompleted = (todoId, isCompleted) => {
        setState({
            ...state, 
            todos: state.todos.map((todo) => (
                (todo.id === todoId) ? { ...todo, isCompleted: !isCompleted } : todo
            ))
        });
    };

    const handleDeleteTodo = (id) => {
        setState({
            ...state, 
            todos: state.todos.filter((todo) => todo.id !== id)
        });
    }

    const handleDeleteTodosCompleted = () => {
        setState({
            ...state, 
            todos: state.todos.filter((todo) => !todo.isCompleted)
        });
    }

    const setItemActive = (filter) => (
        `header__item ${state.filter === filter ? "item--active" : ""}`
    );

    return (
        <main className="main__container">
            <h1>#todo</h1>
            <header className="header">
                <a 
                    className={setItemActive("all")} 
                    onClick={() => handleSetFilter("all")}
                >
                    All
                </a>
                <a 
                    className={setItemActive("active")} 
                    onClick={() => handleSetFilter("active")}
                >
                    Active
                </a>
                <a 
                    className={setItemActive("completed")} 
                    onClick={() => handleSetFilter("completed")}
                >
                    Completed
                </a>
            </header>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="form__text"
                    name="todo"
                    type="text"
                    placeholder="add details"
                    required
                />
                <button className="button button--primary" type="submit">
                    Add
                </button>
            </form>
            <li className="todo__list">
                {filterTodos(state.filter).map((todo) => {
                    return (
                        <ul 
                            key={todo.id} 
                            className={`todo ${todo.isCompleted ? "todo--completed" : ""}`}
                        >
                            <div>
                                <input
                                    onChange={() => handleSetCompleted(todo.id, todo.isCompleted)}
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    id={todo.id}       
                                />
                                <label htmlFor={todo.id}>
                                    {todo.data}
                                </label>
                            </div>
                            {state.filter === "completed" && (
                                <button 
                                    onClick={() => handleDeleteTodo(todo.id)} 
                                    className="button button--warning"
                                >
                                    Delete
                                </button>
                            )}
                        </ul>
                    );
                })}
            </li>
            {(state.filter === "completed" && filterTodos(state.filter).length > 0) && (
                <button 
                    onClick={handleDeleteTodosCompleted} 
                    className="button button--warning"
                >
                    Delete all
                </button>
            )}
        </main>
    );
};

export default App;

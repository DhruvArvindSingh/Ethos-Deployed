import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [showFinished, setShowFinished] = useState(true);

    useEffect(() => {
        let todoString = localStorage.getItem('todos');
        if (todoString) {
            let todos = JSON.parse(todoString);
            setTodos(todos);
        }
    }, []);

    const saveToLS = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const toggleFinished = () => {
        setShowFinished(!showFinished);
    };

    const handleEdit = (e, id) => {
        let t = todos.filter((i) => i.id === id);
        setTodo(t[0].todo);
        let newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS();
    };

    const handleDelete = (e, id) => {
        let newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
        saveToLS();
    };

    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        setTodo('');
        saveToLS();
    };

    const handleChange = (e) => {
        setTodo(e.target.value);
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex((item) => item.id === id);
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLS();
    };

    const calculateProgress = () => {
        if (todos.length === 0) return 0;
        const completed = todos.filter((item) => item.isCompleted).length;
        return Math.round((completed / todos.length) * 100);
    };

    const getProgressColor = (progress) => {
        if (progress === 100) return "linear-gradient(90deg, rgb(34, 197, 94), rgb(22, 138, 62))"; // gradient green
        if (progress >= 50) return "linear-gradient(90deg, rgb(59, 237, 178), rgb(17, 128, 108))";  // gradient teal
        return "linear-gradient(90deg, rgb(96, 165, 250), rgb(59, 130, 246))";  // gradient blue
    };

    const progress = calculateProgress();

    return (
        <>
            <div style={{ color: "rgb(59, 237, 178)" }} className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">
                <h1 className="font-bold text-center text-3xl">
                    Project Manager
                </h1>
                <div className="addTodo my-5 flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Add a Projects</h2>
                    <div className="flex">
                        <input
                            onChange={handleChange}
                            value={todo}
                            type="text"
                            className="w-full rounded-full px-5 py-1"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={todo.length <= 3}
                            className="bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <input
                    className="my-4"
                    id="show"
                    onChange={toggleFinished}
                    type="checkbox"
                    checked={showFinished}
                />
                <label className="mx-2" htmlFor="show">
                    Show Finished
                </label>
                <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
                <h2 className="text-2xl font-bold">Your Projects</h2>

                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-4 mt-4 relative group">
                    <div
                        className="h-4 rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                            background: getProgressColor(progress),
                        }}
                    ></div>
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 bg-gray-900 text-white px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {progress}%
                    </span>
                </div>
                <div style={{ backgroundColor: "rgb(235, 235, 235)", color: "rgb(0,0,0)", fontWeight: "bold" }} className="text-center my-2">
                    Progress: {progress}%
                </div>

                <div className="todos">
                    {todos.length === 0 && <div className="m-5"> No Projects to display</div>}
                    {todos.map((item) => {
                        return (
                            (showFinished || !item.isCompleted) && (
                                <div key={item.id} className="todo flex my-3 justify-between">
                                    <div className="flex gap-5">
                                        <input
                                            name={item.id}
                                            onChange={handleCheckbox}
                                            type="checkbox"
                                            checked={item.isCompleted}
                                        />
                                        <div style={{ fontSize: "20px", color: "rgb(157,145,255)" }} className={item.isCompleted ? 'line-through' : ''}>
                                            {item.todo}
                                        </div>
                                    </div>
                                    <div className="buttons flex h-full">
                                        <button style={{ backgroundColor: "rgb(0,0,0)", borderRadius: "50%" }}
                                            onClick={(e) => handleEdit(e, item.id)}
                                            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            style={{ backgroundColor: "rgb(0,0,0)", borderRadius: "50%" }}
                                            onClick={(e) => handleDelete(e, item.id)}
                                            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;

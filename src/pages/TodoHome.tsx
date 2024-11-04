import { ApiResponse } from "../dtos/ApiResponse";
import { getTodos } from "../apis/todos.api";
import { useState, useEffect } from 'react';
import { todoDto } from "../dtos/TodoDto";
import { useNavigate } from "react-router-dom";


function TodoHome() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<todoDto[]>([]);

    const fetchTodos = async() => {
        try {
            const response: Promise<ApiResponse<any>> = getTodos();
            if((await response).status === 200) {
                console.log((await response).data.data);
                setTodos((await response).data.data);
            }
        } catch {
            console.error('err');
        }
    }

     // Todo 상세보기
     const handleTodoGet = async(id: string) => {
        navigate(`/todo/${id}`);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className='flex flex-col'>
        {todos.map((todo) => (
            <div className='flex items-center text-start cursor-pointer w-full p-1 h-12'
            key={todo.id} 
            onClick={() => handleTodoGet(todo.id)}
            >
                <h5>&nbsp;💘 {todo.title}&nbsp;</h5>
            </div>
        ))}
        </div>
    )
}

export default TodoHome;
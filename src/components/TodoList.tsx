import { useNavigate } from "react-router-dom";
import { todoDto } from "../dtos/TodoDto";

interface TodoListProps {
    todoId: string | undefined
    todos: todoDto[]
    openNewModal: () => void;
}

function TodoList({todoId, todos, openNewModal} : TodoListProps) {
    const navigate = useNavigate();

    // Todo 상세보기
    const handleTodoGet = async(id: string) => {
        navigate(`/todo/${id}`);
    }

    return (
    <div className='flex flex-col'>
        {todos.map((todo) => (
            <div className='flex items-center text-start cursor-pointer w-full p-1 h-12'
            key={todo.id} 
            onClick={() => handleTodoGet(todo.id)}
            >
                <h5 className={`${todoId === todo.id ? 'bg-pink-200 font-bold' : ''}`}>&nbsp;💘 {todo.title}&nbsp;</h5>
            </div>
        ))}
        <button onClick={openNewModal}>
            <svg className="h-8 w-8 text-orange-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                <path stroke="none" d="M0 0h24v24H0z"/>  
                <line x1="12" y1="5" x2="12" y2="19" />  
                <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
        </button>
    </div>
    )
}

export default TodoList;
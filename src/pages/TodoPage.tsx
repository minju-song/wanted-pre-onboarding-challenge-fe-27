import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getTodoById,updateTodo, getTodos, deleteTodo, createTodo } from '../apis/todos.api';
import { ApiResponse } from '../dtos/ApiResponse';
import { todoDto } from '../dtos/TodoDto';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';

function TodoPage() {
    const navigate = useNavigate();

    // 현재 상세보기 중인 todo 아이디
    const id = useParams().id;
    // id를 토대로 todo 내용 받아옴
    const [todo, setTodo] = useState<todoDto|null>(null);
    // 투두 리스트
    const [todos, setTodos] = useState<todoDto[]>([]);
    // 서버로 보낼 todo 정보
    const [todoTitle, setTodoTitle] = useState('');
    const [todoContent, setTodoContent] = useState('');
    const [todoId, setTodoId] = useState('');

    // 수정 모달열기
    const openPutModal = () => {
        if (todo !== null) {
            const modal = document.getElementById('put_modal') as HTMLDialogElement;
    
            if(modal) {
                setTodoContent(todo.content); setTodoTitle(todo.title); setTodoId(todo.id);
                modal.showModal();
            }
        }
    }

    // 추가 모달열기
    const openNewModal = () => {
        const modal = document.getElementById('new_modal') as HTMLDialogElement;
        if (modal) {
            setTodoContent(''); setTodoTitle('');
            modal.showModal();
        }
    };

    // 날짜포맷
    const dateFormat = (date:Date | undefined) => {

        if(date) {
            const newDate = date instanceof Date ? date: new Date(date as string);
            if( !isNaN(newDate.getTime())) {
                return `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일 ${newDate.getHours()}시 ${newDate.getMinutes()}분`
            }
        }
    }

    // todo 받기
    const fetchTodo = async(id: string) => {
        try {
            const response: Promise<ApiResponse<any>> = getTodoById(id);
            if((await response).status === 200) {
                console.log((await response).data.data);
                setTodo((await response).data.data);
            }
        }catch {
            console.error('err')
        }
    }

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

    // todo 추가
    const handleTodoCreate = async() => {
        const modal = document.getElementById('new_modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        try {
            const response: Promise<ApiResponse<any>> = createTodo(todoTitle, todoContent);
            if((await response).status === 200) {
                const newTodo: todoDto = (await response).data.data;
                setTodos((prevTodos) => [...prevTodos, newTodo]);
                setTodoTitle('');
                setTodoContent('');
                navigate(`/todo/${newTodo.id}`)
            }
        }catch {
            console.error('err')
        }
    }

    // todo 수정
    const handleTodoPut = async() => {
        const modal = document.getElementById('put_modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        try {
            const response: Promise<ApiResponse<any>> = updateTodo(todoId, todoTitle, todoContent);
            if ((await response).status === 200) {
                const result = (await response).data.data;
                setTodoId(''); setTodoTitle(''); setTodoContent('');
                setTodo(result);
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, ...result } : todo
                    )
                );
            }
        } catch {
            console.log('err');
        }
    }

    // todo 삭제
    const handleTodoDel = async(id: string | undefined) => {
        if(id) {
            if(confirm("해당 Todo를 삭제하시겠습니까?")) {
                try {
                    const response: Promise<ApiResponse<any>> = deleteTodo(id);
                    if((await response).status === 200) {
                        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
                        navigate('/todo')
                    }
                } catch {
                    console.error('err');
                }
            }
        }
    }

    useEffect(() => {
        if(id) {
            fetchTodo(id);
        }
    }, [id]);

    useEffect(() => {
        fetchTodos();        
    }, []);

    return (
        <div className="flex justify-around h-full">
            <div className="w-40 h-80 mr-8">
                <TodoList todoId={id} todos={todos} openNewModal={openNewModal} />
            </div>
            <div className="w-96 h-80">
                <div className='h-full'>
                    <dialog id="new_modal" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-5">새로운 Todo</h3>
                            <input
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={todoTitle}
                            onChange={(e) => setTodoTitle(e.target.value)}
                            className="input input-bordered input-success w-full max-w-xs mb-3" />
                            <textarea className="textarea textarea-success w-full" 
                            value={todoContent}
                            onChange={(e) => setTodoContent(e.target.value)}
                            placeholder="내용을 입력하세요."></textarea>
                            <div className="modal-action">
                            <button className="btn btn-success"
                            onClick={handleTodoCreate}
                            >추가</button>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">닫기</button>
                            </form>
                            </div>
                        </div>
                    </dialog>
                    <dialog id="put_modal" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg mb-5">수정할 Todo</h3>
                            <input
                            type="text"
                            placeholder="제목을 입력하세요."
                            value={todoTitle}
                            onChange={(e) => setTodoTitle(e.target.value)}
                            className="input input-bordered input-success w-full max-w-xs mb-3" />
                            <textarea className="textarea textarea-success w-full" 
                            value={todoContent}
                            onChange={(e) => setTodoContent(e.target.value)}
                            placeholder="내용을 입력하세요."></textarea>
                            <div className="modal-action">
                            <button className="btn btn-success"
                            onClick={handleTodoPut}
                            >수정</button>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">닫기</button>
                            </form>
                            </div>
                        </div>
                    </dialog>
                    <div className="card bg-base-100 w-96 h-full shadow-xl" style={{padding:"0"}}>
                        <div className="card-body">
                            <h2 className="card-title">{todo?.title}</h2>
                            <p className='text-start'>{todo?.content}</p>
                            <div className="text-end text-sm text-gray-300 mb-2">
                                    작성일 : {dateFormat(todo?.createdAt)} <br/>
                                    최종수정일 : {dateFormat(todo?.updatedAt)} 
                            </div>
                            <div className="card-actions justify-end">
                                <button className="btn btn-warning m-1" 
                                onClick={openPutModal}
                                >수정</button>
                                <button className="btn btn-error m-1" 
                                onClick={() => handleTodoDel(id)}
                                >삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoPage;
import { useState, useEffect } from "react";
import { createTodo, getTodos, getTodoById, deleteTodo, updateTodo } from "../apis/todos.api";
import { ApiResponse } from "../dtos/ApiResponse";
import { todoDto } from "../dtos/TodoDto";
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [todos, setTodos] = useState<todoDto[]>([]);
    const [todo, setTodo] = useState<todoDto|null>(null);
    const [todoCreateDate, setTodoCreateDate] = useState('');
    const [todoUpdateDate, setTodoUpdateDate] = useState('');

    // 날짜 변환
    const dateFormat = async(create :Date | undefined, update: Date | undefined) => {
        console.log(create, update);

        // create가 문자열인 경우 Date 객체로 변환
        if (create !== undefined) {
            const createDate = create instanceof Date ? create : new Date(create as string);
            if (!isNaN(createDate.getTime())) { // 유효한 날짜인지 확인
                setTodoCreateDate(`${createDate.getFullYear()}년 ${createDate.getMonth() + 1}월 ${createDate.getDate()}일 ${createDate.getHours()}시 ${createDate.getMinutes()}분`);
            }
        }

        if (update !== undefined) {
    
            const updateDate = update instanceof Date ? update : new Date(update as string);
    
            if (!isNaN(updateDate.getTime())) { // 유효한 날짜인지 확인
                setTodoUpdateDate(`${updateDate.getFullYear()}년 ${updateDate.getMonth() + 1}월 ${updateDate.getDate()}일 ${updateDate.getHours()}시 ${updateDate.getMinutes()}분`);
            }

        }
    }

    // 뒤로가기
    const handlerBack = () => {
        navigate(-1);
    };

    // 생성 모달열기
    const openNewModal = () => {
        const modal = document.getElementById('new_modal') as HTMLDialogElement;
        if (modal) {
            setContent(''); setTitle('');
            modal.showModal();
        }
    };

    // 수정 모달열기
    const openPutModal = () => {
        if (todo !== null) {
            const modal = document.getElementById('put_modal') as HTMLDialogElement;
    
            if(modal) {
                setContent(todo.content); setTitle(todo.title); setId(todo.id);
                modal.showModal();
            }
        }
    }

    // 새로운 todo
    const handleTodoCreate = async() => {
        const modal = document.getElementById('new_modal') as HTMLDialogElement;
        if (modal) {
            modal.close();
        }
        try {
            const response: Promise<ApiResponse<any>> = createTodo(title, content);
            if((await response).status === 200) {
                const newTodo: todoDto = (await response).data.data;
                setTodos((prevTodos) => [...prevTodos, newTodo]);
                setTitle('');
                setContent('');
                setTodo(newTodo);
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
            const response: Promise<ApiResponse<any>> = updateTodo(id, title, content);
            if ((await response).status === 200) {
                const result = (await response).data.data;
                setId(''); setTitle(''); setContent('');
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

    // Todo 상세보기
    const handleTodoGet = async(id: string) => {
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

    // todo 삭제
    const handleTodoDel = async(id: string) => {
        if(confirm("해당 Todo를 삭제하시겠습니까?")) {
            try {
                const response: Promise<ApiResponse<any>> = deleteTodo(id);
                if((await response).status === 200) {
                    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
                    setTodo(null);
                }
            } catch {
                console.error('err');
            }
        }
    }

    // Todo 리스트 가져오기
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
    };

    useEffect(() => {
        fetchTodos();
    }, [])

    useEffect(() => {
        dateFormat(todo?.createdAt, todo?.updatedAt);
    }, [todo])


    return (
        <div>
            <div className="flex justify-around">
                <button className="btn" onClick={handlerBack}>뒤로</button>
                <button className="btn" onClick={openNewModal}>추가</button>
            </div>
            <dialog id="new_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg mb-5">새로운 Todo</h3>
                <input
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered input-success w-full max-w-xs mb-3" />
                <textarea className="textarea textarea-success w-full" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered input-success w-full max-w-xs mb-3" />
                <textarea className="textarea textarea-success w-full" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요."></textarea>
                <div className="modal-action">
                <button className="btn btn-success"
                onClick={handleTodoPut}
                >추가</button>
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">닫기</button>
                </form>
                </div>
            </div>
            </dialog>
            <div className="flex border-4 border-green-700" style={{width:"50rem", height:"30rem"}}>
                <div className="flex-1 border-r-2 border-r-green-700 overflow-scroll">
                    <h3 className="bg-green-700 text-white font-light font-sans text-xl p-1">Todo List</h3>
                    <div>
                        {todos.map((todo) => (
                            <div className="cursor-pointer p-1" key={todo.id} onClick={() => handleTodoGet(todo.id)}>
                                <h5>{todo.title}</h5>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="bg-green-700 text-white font-light font-sans text-xl p-1">Todo Page</h3>
                    <div className="h-full">
                        {todo !== null &&
                            <div className="p-2 flex flex-col justify-between" style={{height:"90%"}}>
                                <div className="underline decoration-wavy decoration-green-700 text-2xl mb-4">{todo?.title}</div>
                                <div className="mb-4 text-lg flex-1 bg-slate-300 p-2 font-normal rounded-2xl">{todo?.content}</div>
                                <div className="text-sm text-black font-light">
                                    작성일 : {todoCreateDate} <br/>
                                    최종수정일 : {todoUpdateDate}
                                </div>
                                <div>
                                    <button className="btn btn-outline btn-warning m-1" onClick={openPutModal}>수정</button>
                                    <button className="btn btn-outline btn-error m-1" onClick={() => handleTodoDel(todo.id)}>삭제</button>
                                </div>
                            </div>
                        }
                        {todo === null &&
                            <div style={{height:"90%", display:"flex", alignItems:"center", justifyContent:"center"}}>상세보기 화면</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;
import { get, post, del, put } from "../utils/serverHelper";

// todo추가
export const createTodo = async(
    title: string,
    content: string
): Promise<any> => {
    let url = '/todos'
    const body = {
        title,
        content
    };

    return (await post(url, body));
}

// todo 리스트
export const getTodos = async():Promise<any> => {
    let url = '/todos';

    return await get(url);
}

// todo 상세조회
export const getTodoById = async(
    id: string
):Promise<any> => {
    let url = `/todos/${id}`;

    return await get(url);
}


// todo 삭제
export const deleteTodo = async(
    id: string
): Promise<any> => {
    let url = `/todos/${id}`;

    return await del(url);
}

// todo 수정
export const updateTodo = async(
    id: string,
    title: string,
    content: string
): Promise<any> => {
    let url = `/todos/${id}`;
    const body = {
        title,
        content
    };
    console.log(title, content)
    return await put(url, body);
}
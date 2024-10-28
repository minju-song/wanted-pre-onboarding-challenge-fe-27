import { post } from "../utils/serverHelper";


// 회원가입
export const signUp = async(
    email: string,
    password: string
): Promise<any> => {
    let url = '/users/create';
    const body = {
        email,
        password
    };

    return (await post(url, body));
}

// 로그인
export const login = async(
    email: string,
    password: string
): Promise<any> => {
    let url = '/users/login';
    const body = {
        email,
        password
    };

    return (await post(url, body));
}
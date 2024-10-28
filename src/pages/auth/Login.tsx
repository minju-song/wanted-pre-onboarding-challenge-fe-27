import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ApiResponse } from '../../dtos/ApiResponse';
import { login } from '../../apis/users.api';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleRegisterClick = async() => {
        navigate('/auth/register');
    }

    const handleLoginClick = async() => {
        if(isValid) {
            try {
                const response: Promise<ApiResponse<any>> = login(email, password);
                if((await response).status === 200) {
                    console.log((await response).data.message);
                    localStorage.setItem('token', (await response).data.token);
                    navigate('/')
                }
            }catch {
                console.error('err')
            }
        }
    }

    useEffect(() => {
        if(password.length >= 8) setPasswordFlag(true);
    }, [password]);

    useEffect(() => {
        // 이메일 유효성 검사
        const validateEmail = () => {
            const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/; // 기본 이메일 형식 체크
            return regex.test(email);
        };
    
        setEmailFlag(validateEmail());
    }, [email]);

    useEffect(() => {
        if(emailFlag && passwordFlag) {
            setIsValid(true);
        }
    }, [emailFlag, passwordFlag])

    return (
        <div>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path
                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input type="email" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="input input-bordered flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd" />
                </svg>
                <input type="password" placeholder="Password" className="grow" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            { isValid &&
                <button className="btn btn-outline btn-success" onClick={handleLoginClick}>Sign Up</button>
            }  
            { !isValid && 
                <button className="btn" disabled>Sign Up</button>          
            }
            <button className='btn btn-outline btn-primary' onClick={handleRegisterClick}>Register</button>
        </div>
    )
}

export default Login;
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Home() {
    const navigate = useNavigate();

    const [tokenFlag, setTokenFlag] = useState(false);

    // 로그인
    const handleLoginClick = async() => {
        navigate('/auth/login');
    }

    // 로그아웃
    const handleLogoutClick = async() => {
        if(confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem('token');
            setTokenFlag(false);
        }
    }

    // todo
    const handleTodoClick = async() => {
        if(localStorage.getItem('token') == null) {
            navigate('/auth/login');
        }
        else navigate('/todo')
    }


    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setTokenFlag(true);
        }
    }, []);

    return (
        <div>
            { tokenFlag && 
                <button 
                className="btn btn-success m-3"
                onClick={handleLogoutClick}
                >Logout</button>
            }

            { !tokenFlag && 
                <button 
                className="btn btn-success m-3"
                onClick={handleLoginClick}
                >Login</button>
            }
            <button 
            className="btn btn-info m-3"
            onClick={handleTodoClick}
            >Todo</button>
        </div>
    );
}

export default Home;
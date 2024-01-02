import { useState } from "react"
import {makeRequest} from '../../utils/requestHelpers'
import { Navigate } from "react-router-dom";
import './registerPage.css';
import AnimationWrapper from "../../components/Animation/AnimationWrapper";
export default function RegisterPage() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [redirect, setRedirect] = useState(false);
    const register = async (e) => {
        e.preventDefault();
        const response = await makeRequest('POST','USER_REGISTER', {username, password}, {'Content-Type': 'application/json'},{credentials: 'include'});
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Failed to register');
        }
    }
    if (redirect) {
        return <Navigate to = {'/login'}/>
    }
    return (
        <AnimationWrapper>
            <form className="register" onSubmit={register}>
                <h1>Register</h1>
                <input 
                    type="text" 
                    placeholder="userName" 
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>
                <input 
                    type='password' 
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <button>Register</button>
            </form>
        </AnimationWrapper>
    )
}
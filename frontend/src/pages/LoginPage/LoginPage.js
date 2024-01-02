import { useContext, useState } from "react"
import {makeRequest} from '../../utils/requestHelpers'
import {Navigate} from 'react-router-dom';
import './loginPage.css';
import { UserContext } from "../../UserContext";
import AnimationWrapper from "../../components/Animation/AnimationWrapper";
import { defaultSolveException } from "../../utils/helpers";
export default function LoginPage() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [redirect,setRedirect] = useState(false)
    const login = async (e) => {
        e.preventDefault();
        const response = await makeRequest('POST','USER_LOGIN', {username, password},{'Content-Type': 'application/json'}, {credentials: 'include'});
        if (response.ok) {
            response.json().then(userInfo => setUserInfo(userInfo))
            setRedirect(true);
        } else {
            defaultSolveException(response);
        }
    }
    if (redirect) {
        return <Navigate to={'/'}/>
    }     
    return (
        <AnimationWrapper>
            <form className="login">
                <h1>Login</h1>
                <input 
                    type="text" 
                    placeholder="userName"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input 
                    type='password' 
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button onClick={login}>login</button>
            </form>
        </AnimationWrapper>
    )
}
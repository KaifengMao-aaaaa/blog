import { useState } from "react"
import {makeRequest} from '../../utils/requestHelpers'
import { Navigate, useNavigate } from "react-router-dom";
import AnimationWrapper from "../../components/Animation/AnimationWrapper";
export default function RegisterPage() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isError, setIsError] = useState(false)
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const register = async (e) => {
        e.preventDefault();
        const response = await makeRequest('POST','USER_REGISTER', {username, password}, {'Content-Type': 'application/json'},{credentials: 'include'});
        if (response.ok) {
            setRedirect(true);
        } else if (response.status !== 500) {
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
    }
    if (redirect) {
        return <Navigate to = {'/login'}/>
    }
    return (
        <AnimationWrapper>
                <form className="container-18-2-4 grid-1-5-1 gap-1">
                    <div className="font-5 font-t display blk-ctr flex">
                        <h1>Register</h1>
                    </div>
                    <div>
                        <div className="grid-5 ">
                            <div className="blk-ctr flex">
                                <input 
                                    className="in-fl in in-rd h-3-2 bg-grey"
                                    type="text"  
                                    placeholder="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                />
                            </div>
                            <div className="blk-ctr flex">
                                <input 
                                    className="in-fl in in-rd h-3-2 bg-grey"
                                    type='password' 
                                    placeholder="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                /> 
                            </div>
                        </div>
                        <div className="flex-col gap-1 flex blk-ctr-h">
                            {isError && <p className="font-2 font-warm font-b">Username existed</p>}
                            <button className='btn btn-fl btn-rd prim-hover-sdw crs font-3 font-light font-b'onClick={register}>Register</button> 
                            <p className='tet-ctr crs' onClick={() => navigate('/login')}>Have account?</p>
                        </div>
                    </div>
                </form>
        </AnimationWrapper>
    )
}
import { useContext, useState } from "react"
import {makeRequest} from '../../utils/requestHelpers'
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../UserContext";
import AnimationWrapper from "../../components/Animation/AnimationWrapper";
import { GlobalLoadingContext } from "../../GlobalLoading";
export default function LoginPage() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {globalLoading, setGlobalLoading} = useContext(GlobalLoadingContext);
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
        const response = await makeRequest('POST','USER_LOGIN', {username, password},{'Content-Type': 'application/json'}, {credentials: 'include'});
        if (response.ok) {
            await response.json().then(userInfo => {
                setUserInfo(userInfo);
                localStorage.setItem('username', userInfo.username);
            })
            navigate('/1');
            setGlobalLoading({...globalLoading, userContextLoading: true});
        } else if (response.status !== 500) {
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
    }
    return (
        <AnimationWrapper>
                <form className="container-18-2-4 grid-1-5-1 gap-1 pos-rel">
                    <button onClick={() => navigate('/1')} className="pos-abs pos-r-2-1 btn h-2-2 font-light w-8-1 font-2 crs prim-hover-ltr">Back To Home</button>
                    <div className="display blk-ctr flex font-t font-6">
                        <h1>Login</h1>
                    </div>
                    <div className="">
                        <div className="grid-5">
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
                        <div className="flex flex-col gap-1 blk-ctr-h">
                            {isError && <p className="font-2 font-warm font-b">Wrong Password Or Username</p>}
                            <button className='btn btn-fl btn-rd prim-hover-sdw crs font-3 font-b font-light'onClick={login}>login</button> 
                            <p className='tet-ctr crs' onClick={() => navigate('/register')}>Sign up now</p>
                        </div>
                    </div>
                </form>
        </AnimationWrapper>
    )
}
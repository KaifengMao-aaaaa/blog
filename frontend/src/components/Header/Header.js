import { useContext, useEffect} from "react";
import downArrow from './downArrow.png'
import {makeRequest} from '../../utils/requestHelpers';
import { UserContext } from "../../UserContext";
import './header.css';
import { defaultSolveException } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    makeRequest('GET', 'USER_PROFILE', {}, {}, {credentials: 'include'})
      .then((response) => {
        if (response.ok) {
          response.json().then(
            userInfo => {
              setUserInfo(userInfo);
            });
        } else {
          defaultSolveException(response);
        }
      })
  }, [])
  function logout() {
    makeRequest('POST', 'USER_LOGOUT', {}, {}, {credentials: 'include'})
      .then(response => {
      });
      setUserInfo(null);
      localStorage.removeItem('username');
      navigate('/login')
  }
  const username = userInfo ? userInfo.username : undefined; 
  return (
    <header className="homeNavbar-body">
      <div className="homeNavbar-body-main">
        <div className="homeNavbar-body-container">
          <button onClick={() => navigate('/')}>Home</button>
          <img src={downArrow}/>
        </div>
        <div className="homeNavbar-body-container">
          <button onClick={() => navigate('/tags')}>#Tags</button>
          <img src={downArrow}/>
        </div>
      </div>
      <div className="homeNavbar-body-side">
        <div className="homeNavbar-body-container">
          <button onClick={() => navigate('/profile')}>Profile</button>
        </div>
        <div className="homeNavbar-body-container">
          <button onClick={() => navigate('/edit')}>New Post</button>
        </div>
        <div className="homeNavbar-body-container">
          <button onClick={logout}>Logout</button>
        </div>
      </div>

    </header>
  )
}
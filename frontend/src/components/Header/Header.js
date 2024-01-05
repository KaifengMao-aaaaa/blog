import { Link} from "react-router-dom";
import { useContext, useEffect} from "react";
import {makeRequest} from '../../utils/requestHelpers';
import { UserContext } from "../../UserContext";
import styles from './header.module.css';
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
    <header>
      <a href = "/" className= {styles.logo}>Blog</a>
      <nav>
        {!username && 
          <div className= {styles.beforeLogin}>
            <Link to= "/login">Login</Link>
            <Link to = "/register">Register</Link>
          </div>
        }
        {username && (
            <div className= {styles.afterLogin}>
              <Link className = 'writeButton' to = '/edit'>Write</Link>
              <a className = 'logoutButton' onClick={logout}>Logout</a>
            </div>
          )
        }
      </nav>
    </header>
  )
}
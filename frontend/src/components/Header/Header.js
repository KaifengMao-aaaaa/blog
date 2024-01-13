import { useContext, useEffect, useState} from "react";
import downArrow from './downArrow.png'
import {makeRequest} from '../../utils/requestHelpers';
import { UserContext } from "../../UserContext";
import './header.css';
import { defaultSolveException } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { getUrlToEditPage } from "../../pages/EditPage/EditPage";
export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [tag, setTag] = useState('');
  const [pattern, setPattern] = useState('');
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
  function handleClickNewPost(e) {
    let url;
    console.log(localStorage.getItem('post'))
    if (localStorage.getItem('post')) {
      url = getUrlToEditPage('edit', '');
    } else {
      url = getUrlToEditPage('main', '');
    }
    navigate(url);
  }
  const username = userInfo ? userInfo.username : undefined; 
  return (
    <header className="homeNavbar-body">
      <div className="homeNavbar-body-main">
        <div className="homeNavbar-body-container">
          <button className="homeNavbar-body-text" onClick={() => navigate('/')}>Home</button>
          <img src={downArrow}/>
        </div>
        <div className="homeNavbar-body-container">
          <p className="homeNavbar-body-text">#Tags</p>
          <input onKeyDown={(e) => e.key === 'Enter' ? navigate(`/search/pattern=${pattern}+tag=${tag}`) : ''} onChange={(e) => setTag(e.target.value)}/>
        </div>
        <div className="homeNavbar-body-container">
          <p className="homeNavbar-body-text">Search</p>
          <input onKeyDown={(e) => e.key === 'Enter' ? navigate(`/search/pattern=${pattern}+tag=${tag}`) : ''} onChange={(e) => setPattern(e.target.value)}/>
        </div>
      </div>
      <div className="homeNavbar-body-side">
        <div className="homeNavbar-body-container">
          <button className="homeNavbar-body-text"onClick={() => navigate('/profile')}>Profile</button>
        </div>
        <div className="homeNavbar-body-container">
          <button className="homeNavbar-body-text"onClick={handleClickNewPost}>New Post</button>
        </div>
        <div className="homeNavbar-body-container">
          <button className="homeNavbar-body-text"onClick={logout}>Logout</button>
        </div>
      </div>

    </header>
  )
}
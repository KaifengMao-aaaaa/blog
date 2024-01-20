import { useContext, useEffect, useState} from "react";
import downArrow from './downArrow.png'
import searchImg from '../../utils/imgs/search.png'
import exitImg from '../../utils/imgs/exit.png'
import {makeRequest} from '../../utils/requestHelpers';
import { UserContext } from "../../UserContext";
import createImg from '../../utils/imgs/create.png';
import loginIcon from '../../utils/imgs/login.png';
import profileImg from '../../utils/imgs/profileIcon.png';
import quitImg from '../../utils/imgs/quit.png';
import './header.css';
import { useNavigate } from "react-router-dom";
import { getUrlToEditPage } from "../../pages/EditPage/EditPage";
import Logo from "../Logo/Logo";
export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  const [pattern, setPattern] = useState('');
  const [hover, setHover] = useState('');
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [isActiveSearch, setisActiveSearch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {

      // makeRequest('GET', 'USER_PROFILE', {}, {}, {credentials: 'include'})
      // .then((response) => {
      //   if (response.ok) {
      //     response.json().then(
      //       userInfo => {
      //         setUserInfo(userInfo);
      //       });
      //   } else {
      //     defaultSolveException(response);
      //   }
      // })
    makeRequest('GET', 'POST_LISTCATEGORIES', {}, {}, {credentials: 'include'})
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => setAllCategories(data.categories))
        }
      })
  }, [category])
  function logout() {
    makeRequest('POST', 'USER_LOGOUT', {}, {}, {credentials: 'include'})
      .then(response => {
      });
      setUserInfo(null);
      localStorage.removeItem('username');
  }
  function handleKeyDownCategory(e) {
    if (e.key === 'Enter') {
      makeRequest('POST', 'POST_CREATECATEGORY', {category: e.target.value}, {'Content-Type': 'application/json'}, {credentials: 'include'})
        .then(() => setCategory(''))
    }
  }
  function handleKeyDownSearch(e) {
    if (e.key === 'Enter') {
      if (pattern === '') {
        navigate('/home/1');
      } else {
        navigate(`/search/${pattern}/1`)
      }
    }
  }
  function handleHeaderButtonsClick(e) {
    const tmp = e.currentTarget.id;
    let id = e.currentTarget.id;
    if (id.startsWith('category')) {
      id = id.split('-')[0];
    }
    switch(id) {
      case 'profile': 
        navigate('/profile')
        return;
      case 'logo':
        navigate('/home/1');
        break;
      case 'newPost':
        let url;
        url = getUrlToEditPage('edit', '');
        navigate(url);
        break;
      case 'category':
        navigate(`/category/${tmp.split('-')[1]}/1`); 
        return;
    }
  }
  function login (e) {
    navigate('/login');
  }
  const activedButton = getActivedButton();
  return (
    <header className="container-full-13 grid-h-2-9 bdr-solid-bottom-1 bdr-dark pd-bottom-2 bg-dark pos-rel">
      <div id="logo" onClick={handleHeaderButtonsClick} className="blk-ctr flex crs">
          <Logo/>
      </div>
      {isActiveSearch &&  <div className="pos-abs full-w">
        <input className="full-w pos-t-0 h-2-7 bg-white pos-abs z-1 font-4 font-b pd-2-5 flex blk-ctr-h bdr-solid-bottom-1 bdr-thin bdr-dark" placeholder="Search..." onKeyDown={handleKeyDownSearch} onChange={(e) => setPattern(e.target.value)}/>
        <img className="pos-tr z-1 pos-r-1-9 icon-cont-sm crs" src={quitImg} onClick={() => setisActiveSearch(false)}/>
      </div>}
      <div className="grid-h-6-1 blk-ctr-r">
        <section className="grid-h-5-2 blk-ctr-r">
          <div className="grid-h-7 gap-4 blk-ctr-r blk-ctr-h">
            {userInfo !== null && <button id="newPost" onClick={handleHeaderButtonsClick} className="btn-xsm empty-hover-sdw btn-rd flex blk-ctr gap-1 crs">
              <p className="font-2 hf">New</p>
              <img className="icon-cont-sm" src={createImg}/>
            </button>}
            {userInfo !== null && <button id="profile" onClick={handleHeaderButtonsClick} className={`btn-xsm empty-hover-sdw btn-rd flex blk-ctr gap-1 crs ${activedButton === 'profile' ? 'btn' : ''}`}>
              <p className="font-2 hf">Profile</p>
              <img className="icon-cont-sm" src={profileImg}/>
            </button>}
            <button id="category" className={`btn-xsm empty-hover-sdw vis btn-rd flex blk-ctr gap-1 crs pos-rel ${activedButton.startsWith('category') ? 'btn' : ''}`} onMouseEnter={() => setHover('category')} onMouseLeave={() => setHover('')}>
              <p className="font-2 hf">Categories</p>
              <img className="" src={downArrow}/>
              {hover === 'category' && <div className="pos-abs pos-t-full container-8-auto flex flex-col bg-white gap-3 pd-8-4 z-1 sdw-lr-reg">
                  {allCategories.map((category, index) => <button key={index} id={`category-${category.name}`} onClick={handleHeaderButtonsClick} className={`btn-xxsm empty-hover-sdw blk-ctr flex rd-1 crs full-w blk-ctr-l ${activedButton.startsWith('category') && activedButton.split('-')[1] === category.name ? 'btn' : ''}`}>{category.name}</button> )}
                  <input className="in in-sm full-w font-b" placeholder="Add New Category" onKeyDown={handleKeyDownCategory} value={category} onChange={(e) => setCategory(e.target.value)}/>
              </div>}
            </button>
          </div>
          <div> 
              
          </div>
        </section>
        <section className="grid-h-4-4">
          <div className="blk-ctr flex">
              <img className='icon-cont-lg wrp-circle prim-hover-sdw crs' src={searchImg} onClick={() => setisActiveSearch(true)}/>
          </div>
          <div className="pd-top-3 pd-right-3 grid-1-2 blk-ctr-v">
            <img onClick={userInfo ? logout : login} className='icon-cont-mi wrp-circle prim-hover-sdw crs bg-green pos-r-6-1' src={userInfo === null ? loginIcon : exitImg}/>
            <p className="font-b">{userInfo === null ? 'Login' : 'Logout'}</p>
          </div>
        </section>
      </div>
    </header>
  )
}
function getActivedButton() {
  const pathname = window.location.pathname;
  if (pathname.startsWith('/category/')) {
      const category = pathname.split('/category/')[1];
      return `category-${category}`;
  } else if (pathname.startsWith('/profile')) {
    return 'profile'
  }
  return '';
}
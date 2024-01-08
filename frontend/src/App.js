import './App.css';
import {Route, Routes} from "react-router-dom"
import HomePageLayout from './layouts/HomePageLayout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { EditPage } from './pages/EditPage/EditPage';
import {UserProvider} from './UserContext';
import { GlobalLoadingProvider } from './GlobalLoading';
import PostPage from './pages/PostPage/PostPage';
import ProtectedRouter from './layouts/ProtectedRouter';
import LoginPageLayout from './layouts/LoginPageLayout';
import PostPageLayout from './layouts/PostPageLayout';
import ProfilePageLayout from './layouts/ProfilePageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EditPageLayout from './layouts/EditPageLayout';
function App() {
  return (
    <GlobalLoadingProvider>
      <UserProvider>
        <Routes>
          <Route path='/edit' element={<EditPageLayout/>}>
            <Route path={'/edit/:postId'} element={<ProtectedRouter element={<EditPage/>}/>}/>
            <Route path={'/edit'} element={<ProtectedRouter element={<EditPage/>}/>}/>
          </Route>
          <Route path='/' element={<HomePageLayout/>}>
            <Route index element={<ProtectedRouter element={<HomePage/>}/>}/>
          </Route>
          <Route path='/' element={<LoginPageLayout/>}>
            <Route path='register' element={<RegisterPage/>}/>
            <Route path='login' element={<LoginPage/>}/>
          </Route>
          <Route path='/post' element={<PostPageLayout/>}>
            <Route path=':postId' element={<ProtectedRouter element={<PostPage/>}/>}/>
          </Route>
          <Route path='/profile' element={<ProfilePageLayout/>}>
            <Route index element={<ProtectedRouter element={<ProfilePage/>}/>}/>
          </Route>
        </Routes>
      </UserProvider>
    </GlobalLoadingProvider>
  );
}

export default App;

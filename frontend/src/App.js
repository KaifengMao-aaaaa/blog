import './App.css';
import {Route, Routes} from "react-router-dom"
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { EditPage } from './pages/EditPage/EditPage';
import {UserProvider} from './UserContext';
import { GlobalLoadingProvider } from './GlobalLoading';
import PostPage from './pages/PostPage/PostPage';
function App() {
  return (
    <GlobalLoadingProvider>
      <UserProvider>
        <Routes>
          <Route path={'/edit/:postId'} element={<EditPage/>}/>
          <Route path={'/edit'} element={<EditPage/>}/>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Route>
          <Route path='/post/:postId' element={<PostPage/>}/>
        </Routes>
      </UserProvider>
    </GlobalLoadingProvider>
  );
}

export default App;

import {Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Header from "../components/Header/Header";
const PostPageLayout = () => {
    return (<main>
        <div>
            <Header/>
        </div>
        <Outlet/>
    </main>)
}
export default PostPageLayout;
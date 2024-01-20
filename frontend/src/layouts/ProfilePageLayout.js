import {Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
import Header from "../components/Header/Header";
const ProfilePageLayout = () => {
    return (<main>

        <div className="home-navbar">
            <Header/>
        </div>
        <Outlet/>
    </main>)
}
export default ProfilePageLayout;
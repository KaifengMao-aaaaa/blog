import {Outlet } from "react-router-dom";
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
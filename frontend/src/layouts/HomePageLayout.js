import {Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import './homePageLayout.css'
import Logo from "../components/Logo/Logo";
export default function HomePageLayout() {
    return (
        <main>
            <div style={{padding:'30px'}}>
                <Logo/>
            </div>
            <div className="home-navbar">
                <Header/>
            </div>
            <Outlet/>
        </main>
    )
}
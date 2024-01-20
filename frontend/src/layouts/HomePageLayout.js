import {Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
export default function HomePageLayout() {
    return (
        <main className="container-whole-screen grid-header-content">
                <Header/>
                <Outlet/>
        </main>
    )
}
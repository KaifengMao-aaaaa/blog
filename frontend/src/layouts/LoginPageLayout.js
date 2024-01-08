import {Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
export default function LoginPageLayout() {
    return (
        <main>
            <div style={{padding:'30px'}}>
                <Logo/>
            </div>
            <Outlet/>
        </main>
    )
}
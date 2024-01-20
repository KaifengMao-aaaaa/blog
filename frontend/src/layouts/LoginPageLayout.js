import {Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";
export default function LoginPageLayout() {
    return (
        <main className="container-whole-screen grid-logo-content gap-2">
                <div className="flex blk-ctr">
                    <Logo/>
                </div>
                <div className="flex blk-ctr-v">
                    <Outlet/>
                </div>
        </main>
    )
}
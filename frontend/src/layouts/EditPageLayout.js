import {Outlet } from "react-router-dom";
import './homePageLayout.css'
import EditHeader from "../pages/EditPage/components/EditHeader";
import { EditPageContextProvider } from "./EditPageContext";
export default function EditPageLayout() {
    return (
        <EditPageContextProvider>
            <main>
                <EditHeader/>
                <Outlet/>
            </main>
        </EditPageContextProvider>
    )
}
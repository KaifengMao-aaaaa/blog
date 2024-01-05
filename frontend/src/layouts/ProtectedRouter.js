import { Navigate } from "react-router-dom";
import { GlobalLoadingContext } from "../GlobalLoading";
import { useContext } from "react";
import Loading from "../components/Loading/Loading";
const ProtectedRouter = ({element}) => {
    const {globalLoading} = useContext(GlobalLoadingContext);
    if (!localStorage.getItem('username')) {
        return <Navigate to={'/login'}/>;
    }
    if (!globalLoading.userContextLoading) {
        return <Loading/>;
    }
    return element;
}
export default ProtectedRouter;
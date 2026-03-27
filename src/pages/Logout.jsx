import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ()=>{
    useEffect(() => {
        localStorage.removeItem('token');
        window.location.reload();

    }, []);
    
    return(
        <Navigate to={"/"} replace/>
    );
};

export default Logout;
import React from 'react';
import {useNavigate} from "react-router-dom";
import App from '../App';
const API_BASE="http://localhost:4000";

const useAuth = async () => {
    
    const navigate = useNavigate();


    try {
        const response = await fetch(API_BASE + '/api/v1/userdashboard', {
            method: "GET",
            credentials: "include"
        });

        // const convertedRespones = await response.json();
        // console.log(convertedRespones);
        // // console.log("Hi");
        return (<App />);
    } catch (error) {
        console.log(error);
        navigate("/");
        console.log("hi");
        return false;
    }
}

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const isAuth = useAuth();

    return isAuth ? (<App />) : (navigate("/"));
}

export default ProtectedRoutes;